<script lang="ts">
  import {siteUrl, socialImage} from '../lib/site';
  import Newsletter from '../lib/Newsletter.svelte';
  import BotanicalBenefits from '../lib/BotanicalBenefits.svelte';
  import SugarComparison from '../lib/SugarComparison.svelte';
  import WhyWeMadeThis from '../lib/WhyWeMadeThis.svelte';
  import Ingredients from '../lib/Ingredients.svelte';
  import Hero from '../lib/Hero.svelte';
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
    <Hero />
    <WhyWeMadeThis />
    <Ingredients />
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
