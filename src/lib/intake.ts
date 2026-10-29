export const CONSENT_VERSION = '2026-10-28';
export const CONSENT_TEXT = 'Email me Dr. Lin Tea product updates. I can unsubscribe at any time.';
export const DEFAULT_INTAKE_ENDPOINT = 'https://script.google.com/macros/s/AKfycbyH-1QRpJ1JKyPfHIwqzVcPGSkdGtRypIFB9UAlJDkj583SDjrZ9RELWvDcHWKqZdPw/exec'

export interface IntakeSubmission {
  requestId: string;
  email: string;
  firstName: string;
  consent: boolean;
  website: string;
}

interface IntakeResponse {
  requestId?: string;
  ok?: boolean;
  code?: string;
}

const messages: Record<string, string> = {
  INVALID_INPUT: 'Please check your email and form details, then try again.',
  CONSENT_REQUIRED: 'Please confirm that you want to receive Dr. Lin Tea updates.',
  CONSENT_CHANGED: 'This form has been updated. Refresh the page and try again.',
  BUSY: 'We’re receiving several submissions right now. Please try again in a moment.'
};

/**
 * A successful POST alone is not confirmation: require a readable acknowledgement
 * for this exact request. text/plain avoids Apps Script's unsupported OPTIONS route.
 */
export async function submitIntake(endpoint: string, submission: IntakeSubmission, fetcher: typeof fetch = fetch) {
  let response;
  try {
    response = await fetcher(endpoint, {
      method: 'POST',
      headers: {'Content-Type': 'text/plain;charset=utf-8'},
      credentials: 'omit',
      redirect: 'follow',
      signal: AbortSignal.timeout(25000),
      body: JSON.stringify({...submission, consentVersion: CONSENT_VERSION})
    });
  } catch {
    throw new Error('We couldn’t confirm your submission. Check your connection and try again. Retrying these same details won’t create a duplicate.');
  }

  let result: IntakeResponse | null;
  try {
    if (!response.ok) throw new Error('HTTP error');
    result = await response.json();
  } catch {
    throw new Error('We couldn’t confirm your submission. Please try again in a moment.');
  }

  if (result?.requestId !== submission.requestId || result?.ok !== true) {
    const code = result?.code;
    throw new Error((code ? messages[code] : undefined) ?? 'We couldn’t save your details. Please try again in a moment.');
  }
}
