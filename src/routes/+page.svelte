<script lang="ts">
  import {onDestroy} from 'svelte';

  let email = $state('');
  let status = $state<'idle' | 'subscribing' | 'subscribed'>('idle');
  let subscribeTimer: ReturnType<typeof setTimeout>;
  let resetTimer: ReturnType<typeof setTimeout>;

  // Preserve the existing demo until an email provider is connected.
  function subscribe(event: SubmitEvent) {
    event.preventDefault();
    if (status !== 'idle') return;

    status = 'subscribing';
    subscribeTimer = setTimeout(() => {
      status = 'subscribed';
      email = '';
      resetTimer = setTimeout(() => {
        status = 'idle';
      }, 3000);
    }, 1000);
  }

  onDestroy(() => {
    clearTimeout(subscribeTimer);
    clearTimeout(resetTimer);
  });
</script>

<svelte:head>
    <title>Dr. Lin Tea - Sparkling Botanical Tea</title>
</svelte:head>
<header class="header">
    <div class="container">
        <div class="header-content">
            <a href="/" class="logo">Dr. Lin Tea</a>
            <a href="#newsletter" class="header-cta">Newsletter</a>
        </div>
    </div>
</header>

<main>
    <section class="hero" id="product">
        <div class="container">
            <div class="hero-grid">
                <div class="hero-content">
                    <div class="hero-copy">
                    <p class="hero-subtitle">Sparkling Botanical Tea</p>
                    <h1 class="hero-title">Ruby <span class="hero-title-accent">Fizz</span></h1>
                    <p class="hero-description">
                        Tart hibiscus and premium loose-leaf tea come together in a crisp sparkling tea
                        with a naturally vibrant, fruit-forward character.
                    </p>
                    </div>
                    <p class="hero-feature">
                        Made with minimal ingredients and sweetened with raw turbinado,
                        Ruby Fizz offers a refreshing alternative to soda that is cleaner and intentionally crafted.
                    </p>
                    <div class="hero-badge">
                        <span>Minimal ingredients · Real botanicals · Nothing artificial</span>
                    </div>
                </div>
                <div class="hero-image">
                    <img class="floating-product" src="assets/ruby-fizz.png"
                         alt="Dr. Lin Tea Ruby Fizz can with red hibiscus artwork, 12 fluid ounces" width="665"
                         height="1310" fetchpriority="high">
                </div>
            </div>
        </div>
    </section>

    <section class="story-section" id="about">
        <div class="container">
            <div class="story-grid">
                <div class="story-content">
                    <h2 class="section-title">Why We Made This</h2>
                    <p class="story-text">
                        We wanted to create a drink that brought together centuries of botanical tradition with modern
                        taste.
                        Hibiscus Fizz isn't trying to be anything other than what it is: a thoughtfully crafted
                        sparkling tea
                        made from real ingredients you can recognize.
                    </p>
                    <p class="story-text">
                        No artificial flavors. No lengthy ingredient lists. Just minimal ingredients that work together
                        to create something genuinely refreshing.
                    </p>
                    <p class="story-text">
                        We're building Dr. Lin Tea for people who care about what goes into their body,
                        but don't want to sacrifice taste or enjoyment.
                    </p>
                </div>
                <div class="story-image">
                    <img class="image-placeholder" src="assets/tea.jpg"
                         alt="Loose-leaf teas and dried botanicals in glass jars" width="1333" height="2000"
                         loading="lazy" decoding="async">
                </div>
            </div>
        </div>
    </section>

    <section class="final-cta" id="newsletter">
        <div class="container">
            <div class="final-cta-content">
                <h2>Be the First to Try It</h2>
                <p>Join our community and get notified when Hibiscus Fizz launches.</p>
                <form class="newsletter-form newsletter-form-large" id="newsletterForm" onsubmit={subscribe}
                      aria-busy={status === 'subscribing'}>
                    <input type="email" name="email" aria-label="Email address" autocomplete="email"
                           placeholder="your@email.com" bind:value={email} required>
                    <button type="submit" disabled={status !== 'idle'} aria-live="polite">
                        {status === 'subscribing' ? 'Subscribing...' : status === 'subscribed' ? 'Subscribed' : 'Get Launch Updates'}
                    </button>
                </form>
            </div>
        </div>
    </section>
</main>

<footer class="footer">
    <div class="container">
        <div class="footer-content">
            <div class="footer-section">
                <h4>Dr. Lin Tea</h4>
                <p>Sparkling Botanical Tea</p>
            </div>
            <div class="footer-section">
                <h4>Product</h4>
                <ul>
                    <li><a href="#product">Ruby Fizz</a></li>
                </ul>
            </div>
            <div class="footer-section">
                <h4>Company</h4>
                <ul>
                    <li><a href="#about">About</a></li>
                    <li><a href="#newsletter">Newsletter</a></li>
                </ul>
            </div>
            <div class="footer-section">
                <h4>Follow Us</h4>
                <ul>
                    <li><span>Instagram</span></li>
                </ul>
            </div>
        </div>
    </div>
</footer>
