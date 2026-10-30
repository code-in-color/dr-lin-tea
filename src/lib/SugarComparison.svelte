<script>
</script>

<section class="comparison-section" id="sugar" aria-labelledby="sugar-title">
    <div class="container">
        <div class="comparison-grid">
            <div>
                <p class="hero-subtitle">Sweetened with organic raw turbinado.</p>
                <h2 class="section-title" id="sugar-title">
                    <span class="comparison-figure">Nearly 40%</span>
                    less sugar
                </h2>
                <p class="story-text">than traditional soft-drinks<span aria-hidden="true">*</span></p>
            </div>
            <div class="sugar-amounts">
                <p class="serving-size">Sugar per serving</p>
                <dl>
                    <div class="sugar-row ruby">
                        <dt>Ruby Fizz, 8 fl oz</dt>
                        <dd>17 <span>g</span></dd>
                    </div>
                    <div class="sugar-row soda">
                        <dt>Popular soft-drink, 12 fl oz</dt>
                        <dd>39 <span>g</span></dd>
                    </div>
                </dl>
            </div>
        </div>
        <div class="comparison-note">
            <p>*Regular cola benchmark; sodas vary. Based on 1.9 g/fl oz, compared at equal volume.</p>
            <p>Draft figures: sugar comparison pending reconciliation of 10° Brix and 1.9 g/fl oz.</p>
        </div>
    </div>
</section>

<style>
    .comparison-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: clamp(2rem, 6vw, 8rem);
        align-items: center;
    }

    .section-title {
        margin-bottom: var(--spacing-md);
    }

    .comparison-figure {
        display: block;
        margin-bottom: var(--spacing-xs);
        color: var(--color-red);
        font-size: clamp(3rem, 6vw, 6rem);
        letter-spacing: -2px;
    }

    .serving-size {
        margin-bottom: var(--spacing-md);
        font-size: 0.6875rem;
        font-weight: 400;
        letter-spacing: 1.5px;
        text-transform: uppercase;
    }

    .sugar-row {
        display: grid;
        grid-template-columns: 1fr auto;
        gap: var(--spacing-sm);
        align-items: baseline;
        padding: var(--spacing-md) 0;
        border-top: 1px solid var(--color-border);
    }

    dt {
        font-size: 0.9375rem;
    }

    dd {
        font-size: 2.5rem;
        font-weight: 300;
        line-height: 1.2;
        letter-spacing: -1px;
    }

    dd span {
        font-size: 1rem;
        letter-spacing: normal;
    }

    .sugar-row::after {
        content: '';
        grid-column: 1 / -1;
        height: 4px;
    }

    .ruby::after {
        width: calc(17 / 39 * 100%);
        background: var(--color-red);
    }

    .soda::after {
        width: 100%;
        background: var(--color-gray);
    }

    .comparison-note {
        display: none;
        margin-top: var(--spacing-lg);
        color: var(--color-gray);
        font-size: 0.75rem;
        line-height: 1.8;
    }

    @media (max-width: 768px) {
        .comparison-grid {
            grid-template-columns: 1fr;
        }

        .comparison-note {
            margin-top: var(--spacing-md);
        }
    }
</style>
