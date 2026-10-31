<script lang="ts">
  import {browser, dev} from '$app/env';
  import {PUBLIC_GA_MEASUREMENT_ID} from '$app/env/public';
  import '../app.css';
  import {afterNavigate} from "$app/navigation";
  import {tick} from "svelte";

  const measurementId = PUBLIC_GA_MEASUREMENT_ID;
  const analyticsEnabled = !dev && Boolean(measurementId);
  let lastPageLocation = '';

  let {children} = $props();
  if (browser && analyticsEnabled) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function (..._args: unknown[]) {
      window.dataLayer!.push(arguments);
    };
    window.gtag('js', new Date());
    // Page views are sent through SvelteKit's navigation lifecycle below.
    window.gtag('config', measurementId, {send_page_view: false});
  }

  afterNavigate(async ({to}) => {
    if (!analyticsEnabled || !to) return;
    // In-page anchor changes are not new page views.
    const pageLocation = `${to.url.origin}${to.url.pathname}${to.url.search}`;
    if (pageLocation === lastPageLocation) return;
    const referrer = lastPageLocation || document.referrer;
    lastPageLocation = pageLocation;
    await tick();
    window.gtag?.('event', 'page_view', {
      send_to: measurementId,
      page_title: document.title,
      page_location: pageLocation,
      page_referrer: referrer
    });
  });
</script>

<svelte:head>
    {#if analyticsEnabled}
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`}></script>
    {/if}
</svelte:head>

{@render children()}
