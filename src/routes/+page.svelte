<script lang="ts">
  import {siteUrl, socialImage} from '../lib/site';
  import Newsletter from '../lib/Newsletter.svelte';
  import BotanicalBenefits from '../lib/BotanicalBenefits.svelte';
  import SugarComparison from '../lib/SugarComparison.svelte';
  import WhyWeMadeThis from '../lib/WhyWeMadeThis.svelte';
</script>

<svelte:head>
    <title>Dr. Lin Tea - Sparkling Botanical Tea</title>
    <meta name="description"
          content="Meet Ruby Fizz: a crisp sparkling tea with tart hibiscus, premium loose-leaf tea, and minimal ingredients.">
    <link rel="canonical" href={siteUrl}>
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="Dr. Lin Tea">
    <meta property="og:title" content="Ruby Fizz — Dr. Lin Tea">
    <meta property="og:description" content="Tart hibiscus. Real tea. A little sparkle. Meet Ruby Fizz.">
    <meta property="og:url" content={siteUrl}>
    <meta property="og:image" content={socialImage}>
    <meta property="og:image:type" content="image/jpeg">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:image:alt"
          content="Dr. Lin Tea Ruby Fizz can with red hibiscus artwork on a warm white background">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Ruby Fizz — Dr. Lin Tea">
    <meta name="twitter:description" content="Tart hibiscus. Real tea. A little sparkle. Meet Ruby Fizz.">
    <meta name="twitter:image" content={socialImage}>
    <meta name="twitter:image:alt" content="Dr. Lin Tea Ruby Fizz sparkling tea can">
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
                        <p class="section-subtitle">Sparkling Tea</p>
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

    <WhyWeMadeThis />
    <BotanicalBenefits />
    <SugarComparison />
    <Newsletter />
</main>

<footer class="footer">
    <div class="container">
        <div class="footer-content">
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
