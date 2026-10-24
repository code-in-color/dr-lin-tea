<script lang="ts">
    import { onDestroy } from 'svelte';

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
                        <p class="hero-subtitle">Sparkling Botanical Tea</p>
                        <h1 class="hero-title">Ruby <span class="hero-title-accent">Fizz</span></h1>
                        <p class="hero-description">
                            Tart hibiscus and premium loose-leaf tea come together in a crisp sparkling tea
                            with a naturally vibrant, fruit-forward character.
                        </p>
                        <p class="hero-feature">
                            Made with minimal ingredients and sweetened with raw turbinado,
                            Ruby Fizz offers a refreshing alternative to soda that is cleaner and intentionally crafted.
                        </p>
                        <div class="hero-badge">
                            <span>Minimal ingredients · Real botanicals · Nothing artificial</span>
                        </div>
                    </div>
                    <div class="hero-image">
                        <img class="floating-product" src="assets/ruby-fizz.png" alt="Dr. Lin Tea Ruby Fizz can with red hibiscus artwork, 12 fluid ounces" width="665" height="1310" fetchpriority="high">
                    </div>
                </div>
            </div>
        </section>

<!--        <section class="ingredients-section" id="ingredients">-->
<!--            <div class="container">-->
<!--                <h2 class="section-title">Minimal Ingredients</h2>-->
<!--                <div class="ingredients-grid">-->
<!--                    <div class="ingredient-card">-->
<!--                        <div class="ingredient-number">01</div>-->
<!--                        <div class="ingredient-image-frame">-->
<!--                            <img class="ingredient-image ingredient-image-stream" src="assets/flowing-stream.webp" alt="Clear stream water flowing over sunlit natural rocks" width="960" height="640" loading="lazy" decoding="async">-->
<!--                        </div>-->
<!--                        <h3>Water</h3>-->
<!--                        <p>Pure sparkling water forms the base.</p>-->
<!--                    </div>-->
<!--                    <div class="ingredient-card">-->
<!--                        <div class="ingredient-number">02</div>-->
<!--                        <div class="ingredient-image-frame">-->
<!--                            <img class="ingredient-image" src="assets/hibiscus-whole-cutout.webp" alt="Whole dried hibiscus in a terracotta bowl, from the supplied HRB-HIBS photograph" width="960" height="960" loading="lazy" decoding="async">-->
<!--                        </div>-->
<!--                        <h3>Hibiscus</h3>-->
<!--                        <p>Known for its deep ruby color and naturally tart, fruit-like flavor.</p>-->
<!--                    </div>-->
<!--                    <div class="ingredient-card">-->
<!--                        <div class="ingredient-number">03</div>-->
<!--                        <div class="ingredient-image-frame">-->
<!--                            <img class="ingredient-image" src="assets/green-tea-cutout.webp" alt="Rich green, needle-shaped loose-leaf sencha tea" width="960" height="960" loading="lazy" decoding="async">-->
<!--                        </div>-->
<!--                        <h3>Green Tea</h3>-->
<!--                        <p>Provides structure, gentle caffeine, and classic tea character.</p>-->
<!--                    </div>-->
<!--                    <div class="ingredient-card">-->
<!--                        <div class="ingredient-number">04</div>-->
<!--                        <div class="ingredient-image-frame">-->
<!--                            <img class="ingredient-image" src="assets/blue-lotus-cutout.webp" alt="Blue lotus flower, Nymphaea caerulea, with vivid blue petals and a golden center" width="960" height="960" loading="lazy" decoding="async">-->
<!--                        </div>-->
<!--                        <h3>Blue Lotus Flower</h3>-->
<!--                        <p>A botanical used in traditional herbal practices that adds delicate floral complexity.</p>-->
<!--                    </div>-->
<!--                    <div class="ingredient-card">-->
<!--                        <div class="ingredient-number">05</div>-->
<!--                        <div class="ingredient-image-frame">-->
<!--                            <img class="ingredient-image" src="assets/sugar-crystals-cutout.webp" alt="Close-up of golden brown sugar crystals catching the sunlight" width="960" height="960" loading="lazy" decoding="async">-->
<!--                        </div>-->
<!--                        <h3>Turbinado Sugar</h3>-->
<!--                        <p>Lightly processed cane sugar that preserves natural molasses notes.</p>-->
<!--                    </div>-->
<!--                </div>-->
<!--            </div>-->
<!--        </section>-->

<!--        <section class="product-gallery" id="product">-->
<!--            <div class="container">-->
<!--                <div class="gallery-grid">-->
<!--                    <div class="gallery-item gallery-large">-->
<!--                        <img class="image-placeholder" src="reference.png" alt="Dr. Lin Tea sparkling tea can with hibiscus artwork" width="1024" height="1536" loading="lazy" decoding="async">-->
<!--                        <p class="image-caption">Hibiscus Fizz — 12oz</p>-->
<!--                    </div>-->
<!--                    <div class="gallery-item">-->
<!--                        <img class="image-placeholder" src="assets/hibiscus.jpg" alt="Vibrant red hibiscus flower against green foliage" width="1239" height="1479" loading="lazy" decoding="async">-->
<!--                        <p class="image-caption">Ruby Hue<br><a href="https://commons.wikimedia.org/wiki/File:Hibiscus_flower_TZ.jpg">Muhammad Mahdi Karim</a> · <a href="assets/hibiscus-license.txt">GFDL 1.2</a> · cropped to fit</p>-->
<!--                    </div>-->
<!--                    <div class="gallery-item">-->
<!--                        <img class="image-placeholder" src="assets/tea.jpg" alt="Glass jars filled with loose-leaf teas and dried botanicals" width="1333" height="2000" loading="lazy" decoding="async">-->
<!--                        <p class="image-caption">Natural Botanicals</p>-->
<!--                    </div>-->
<!--                    <div class="gallery-item">-->
<!--                        <img class="image-placeholder" src="reference.png" alt="Detailed hibiscus artwork on the Dr. Lin Tea can" width="1024" height="1536" loading="lazy" decoding="async">-->
<!--                        <p class="image-caption">Crafted with Care</p>-->
<!--                    </div>-->
<!--                </div>-->
<!--            </div>-->
<!--        </section>-->

        <section class="story-section" id="about">
            <div class="container">
                <div class="story-grid">
                    <div class="story-content">
                        <h2 class="section-title">Why We Made This</h2>
                        <p class="story-text">
                            We wanted to create a drink that brought together centuries of botanical tradition with modern taste. 
                            Hibiscus Fizz isn't trying to be anything other than what it is: a thoughtfully crafted sparkling tea
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
                        <img class="image-placeholder" src="assets/tea.jpg" alt="Loose-leaf teas and dried botanicals in glass jars" width="1333" height="2000" loading="lazy" decoding="async">
                    </div>
                </div>
            </div>
        </section>

        <section class="final-cta" id="newsletter">
            <div class="container">
                <div class="final-cta-content">
                    <h2>Be the First to Try It</h2>
                    <p>Join our community and get notified when Hibiscus Fizz launches.</p>
                    <form class="newsletter-form newsletter-form-large" id="newsletterForm" onsubmit={subscribe} aria-busy={status === 'subscribing'}>
                        <input type="email" name="email" aria-label="Email address" autocomplete="email" placeholder="your@email.com" bind:value={email} required>
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
