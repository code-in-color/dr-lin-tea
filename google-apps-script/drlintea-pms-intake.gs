// Paste into the Google Apps Script project, run setupIntake once, then deploy
// as a Web app: Execute as Me, Who has access: Anyone. Keep the sheet private.
const SPREADSHEET_ID = '1UVzgc5xCpWoMEWcM5GZ4-EmUN1uL061sXXFtoANfTHU';
const SHEET_NAME = 'Intake';
const CONSENT_VERSION = '2026-10-28';
const CONSENT_TEXT = 'Email me Dr. Lin Tea product updates. I can unsubscribe at any time.';
const HEADERS = ['Submitted at (UTC)', 'Email', 'First name', 'Email consent', 'Consent text', 'Consent version', 'Request ID', 'Source'];

function setupIntake() {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    getIntakeSheet_();
    SpreadsheetApp.flush();
  } finally {
    lock.releaseLock();
  }
}

function getIntakeSheet_() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
  } else {
    const existing = sheet.getRange(1, 1, 1, HEADERS.length).getValues()[0];
    if (existing.some((header, i) => header !== HEADERS[i])) {
      throw new Error('Intake tab has different columns. Rename that tab before running setupIntake.');
    }
  }
  return sheet;
}

function doGet() {
  // A health check only. No spreadsheet data is ever returned.
  return json_({ service: 'Dr. Lin Tea intake', version: 1 });
}

function doPost(event) {
  let requestId = '';
  try {
    const raw = event && event.postData && event.postData.contents;
    if (typeof raw !== 'string' || raw.length > 6000) return json_({ ok: false, code: 'INVALID_INPUT', requestId });
    const input = JSON.parse(raw);
    if (!input || typeof input !== 'object' || Array.isArray(input)) return json_({ ok: false, code: 'INVALID_INPUT', requestId });
    requestId = typeof input.requestId === 'string' ? input.requestId : '';
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(requestId)) {
      return json_({ ok: false, code: 'INVALID_INPUT', requestId: '' });
    }
    if (input.consent !== true) return json_({ ok: false, code: 'CONSENT_REQUIRED', requestId });
    if (input.consentVersion !== CONSENT_VERSION) return json_({ ok: false, code: 'CONSENT_CHANGED', requestId });

    const email = typeof input.email === 'string' ? input.email.trim() : '';
    const firstName = typeof input.firstName === 'string' ? input.firstName.trim() : null;
    if (!email || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
      || /[\u0000-\u001f\u007f]/.test(email)
      || firstName === null || firstName.length > 100 || /[\u0000-\u001f\u007f]/.test(firstName)
      || !Array.isArray(interests) || interests.length > ALLOWED_INTERESTS.length
      || interests.some(value => !ALLOWED_INTERESTS.includes(value))
      || input.website !== '') {
      return json_({ ok: false, code: 'INVALID_INPUT', requestId });
    }

    const lock = LockService.getScriptLock();
    if (!lock.tryLock(10000))
      return json_({ ok: false, code: 'BUSY', requestId });

    try {
      const sheet = getIntakeSheet_();
      const lastRow = sheet.getLastRow();
      // A retry after a lost response must not append the same submission twice.
      const duplicate = lastRow > 1 && sheet.getRange(2, 8, lastRow - 1, 1)
        .createTextFinder(requestId).matchEntireCell(true).findNext();
      if (!duplicate) {
        sheet.appendRow([
          new Date().toISOString(),
          sheetText_(email),
          sheetText_(firstName),
          'Yes',
          CONSENT_TEXT,
          CONSENT_VERSION,
          requestId,
          'Dr. Lin Tea website'
        ]);
        SpreadsheetApp.flush();
      }
      return json_({ ok: true, requestId });
    } finally {
      lock.releaseLock();
    }
  } catch {
    // Do not expose account, sheet, or submission details in public errors.
    return json_({ ok: false, code: 'SAVE_FAILED', requestId });
  }
}

function sheetText_(value) {
  // User-supplied strings must never become spreadsheet formulas.
  return /^[=+\-@]/.test(value) ? "'" + value : value;
}

function json_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
