<script lang="ts">
  import {CONSENT_TEXT, DEFAULT_INTAKE_ENDPOINT, submitIntake} from './intake';

  let email = $state('');
  let firstName = $state('');
  let consent = $state(false);
  let submitted = $state(false);
  let submitting = $state(false);
  let formError = $state('');
  let website = $state('');
  let confirmedName = $state('');
  let lastSubmission = {fingerprint: '', requestId: ''};
  let intakeInput = DEFAULT_INTAKE_ENDPOINT || ''

  function editIntake() {
    submitted = false;
    formError = '';
  }

  async function sendIntake(event: SubmitEvent) {
    event.preventDefault();

    if (submitting || submitted)
      return;

    const details = {email: email.trim(), firstName: firstName.trim(), consent, website};
    const fingerprint = JSON.stringify(details);
    if (lastSubmission.fingerprint !== fingerprint) {
      lastSubmission = {requestId: crypto.randomUUID(), fingerprint};
    }

    submitting = true;
    formError = '';

    try {
      await submitIntake(DEFAULT_INTAKE_ENDPOINT, {...details, requestId: lastSubmission.requestId});
      confirmedName = details.firstName;
      submitted = true;
    } catch (error) {
      formError = error instanceof Error ? error.message : 'We couldn’t save your details. Please try again.';
    } finally {
      submitting = false;
    }
  }
</script>

{#if !intakeInput}
    <p class="form-notice">Signups are temporarily unavailable. Please check back soon.</p>
{/if}
<noscript><p class="form-notice">Please enable JavaScript to submit this form.</p></noscript>
<div class="intake-honeypot" aria-hidden="true"><label>Leave this field empty<input type="text" name="website" bind:value={website} tabindex="-1" autocomplete="off" /></label></div>
<form class="newsletter-form" id="newsletterForm" onsubmit={sendIntake} oninput={editIntake}
      aria-busy={submitting}>
    <input type="text" name="first-name" aria-label="First name" autocomplete="given-name"
           placeholder="Joe" bind:value={firstName} disabled={submitting} required>
    <input type="email" name="email" aria-label="Email address" autocomplete="email"
           placeholder="your@email.com" bind:value={email} disabled={submitting} required>
    <label class="consent">
        <input type="checkbox" name="consent" bind:checked={consent} disabled={submitting} required>
        <span>{CONSENT_TEXT}</span>
    </label>
    <div class="honeypot" aria-hidden="true" inert>
        <label>Website <input type="text" name="website" autocomplete="off" tabindex="-1" bind:value={website}></label>
    </div>
    <button type="submit" disabled={submitting || submitted}>
        {submitting ? 'Subscribing...' : submitted ? 'Subscribed' : 'Get Launch Updates'}
    </button>
    {#if formError}
        <p class="message" role="alert">{formError}</p>
    {/if}
    <div role="status">
        {#if submitted}
            <p class="message">Thanks, {confirmedName}! You’re signed up for launch updates.</p>
        {/if}
    </div>
</form>

<style>
    .intake-honeypot { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); }

    .newsletter-form {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-sm);
        width: 100%;
        max-width: 600px;
        margin: var(--spacing-lg) auto 0;
    }

    input:not([type="checkbox"]) {
        min-width: 0;
        width: 100%;
        padding: 1.25rem var(--spacing-md);
        border: 1px solid var(--color-black);
        background: var(--color-white);
        color: var(--color-black);
        font-family: 'Inter', sans-serif;
        font-size: 1rem;
    }

    input::placeholder {
        color: var(--color-gray);
        font-weight: 300;
    }

    input:not([type="checkbox"]):focus {
        outline: none;
        border-color: var(--color-black);
    }

    .consent {
        display: flex;
        align-items: baseline;
        gap: var(--spacing-xs);
        text-align: left;
        font-size: 0.875rem;
    }

    .consent input {
        flex: none;
        accent-color: var(--color-black);
    }

    .honeypot {
        display: none;
    }

    button {
        padding: 1.25rem var(--spacing-md);
        background: var(--color-black);
        color: var(--color-white);
        border: 1px solid var(--color-black);
        font-size: 0.75rem;
        font-weight: 400;
        cursor: pointer;
        letter-spacing: 1.5px;
        text-transform: uppercase;
    }

    button:hover {
        background: var(--color-white);
        color: var(--color-black);
    }

    .message {
        font-size: 0.875rem;
    }
</style>
