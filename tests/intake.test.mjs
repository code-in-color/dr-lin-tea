import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import { test } from 'node:test';
import assert from 'node:assert/strict';

test('retrying a saved request does not add another row', () => {
  const rows = [['Submitted at (UTC)', 'Email', 'First name', 'Email consent', 'Consent text', 'Consent version', 'Request ID', 'Source']];
  const sheet = {
    getLastRow: () => rows.length,
    getRange: (row, column, count) => ({
      getValues: () => [rows[0]],
      createTextFinder: (value) => ({
        matchEntireCell: () => ({ findNext: () => rows.slice(row - 1, row - 1 + count).find((item) => item[column - 1] === value) })
      })
    }),
    appendRow: (row) => rows.push(row)
  };
  const context = {
    SpreadsheetApp: {openById: () => ({getSheetByName: () => sheet}), flush: () => {}},
    LockService: {getScriptLock: () => ({tryLock: () => true, releaseLock: () => {}})},
    ContentService: {MimeType: {JSON: 'json'}, createTextOutput: (value) => ({setMimeType: () => value})}
  };
  runInNewContext(readFileSync('google-apps-script/drlintea-pms-intake.gs', 'utf8'), context);
  const event = {postData: {contents: JSON.stringify({
    requestId: '12345678-1234-4123-8123-123456789abc', email: 'test@example.com',
    firstName: 'Test', consent: true, consentVersion: '2026-10-28', website: ''
  })}};
  assert.equal(JSON.parse(context.doPost(event)).ok, true);
  assert.equal(JSON.parse(context.doPost(event)).ok, true);
  assert.equal(rows.length, 2);
});
