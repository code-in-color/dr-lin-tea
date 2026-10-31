<script lang="ts">
  const benefits = [
    {
      header: 'Relax',
      title: 'Mood & anxiety',
      description: 'Premium teas naturally contains Thiamine which helps you to focus while providing a subtle cooling effect.',
      icon: 'mood-lotus'
    },
    {
      header: 'Wind-down',
      title: 'Relax & sleep',
      description: `Revered in ancient Egypt, Blue Lotus has long been associated with calm. Our tea will leave you feeling relaxed euphoric.`,
      icon: 'sleep-moon'
    },
    {
      title: 'Anti-aging',
      header: 'Antioxidants',
      description: 'Tea is very high in antioxidants, which help protect your skin from free-radical damage that contributes to fine lines, wrinkles, and loss of elasticity.',
      icon: 'skin-sun'
    },
    {
      title: 'Blood pressure',
      header: 'Reduce',
      description: 'Whole hibiscus flowers help lower mildly elevated blood pressure when consumed regularly',
      icon: 'blood-pressure-heart'
    },
    {
      title: 'Cholesterol',
      header: 'Reduce',
      description: 'Our tea features hibiscus and green tea, which may help lower bad cholesterol (LDL) when consumed regularly.',
      icon: 'cholesterol-droplet'
    },
    {
      title: 'Liver health',
      header: 'Improve',
      description: 'Research suggests hibiscus may support liver health.',
      icon: 'liver'
    }
  ];
</script>

<section class="botanical-section" id="benefits" aria-labelledby="benefits-title">
    <div class="container">
        <p class="section-subtitle">Beyond mere refreshment</p>
        <h2 class="section-title" id="benefits-title">Benefits</h2>
        <ul class="benefits-grid">
            {#each benefits as benefit}
                <li>
                    <span class="benefit-icon" aria-hidden="true"
                          style:mask-image={`url('assets/benefits/${benefit.icon}.svg')`}></span>
                    <div>
                        <p class="botanical-name">{benefit.header}</p>
                        <h3>{benefit.title}</h3>
                        {#if benefit.description}
                            <p class="benefit-description">{benefit.description}</p>
                        {/if}
                    </div>
                </li>
            {/each}
        </ul>
    </div>
</section>

<style>
    .section-title {
        margin-bottom: clamp(2rem, 5dvh, 4rem);
    }

    .benefits-grid {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        column-gap: clamp(2rem, 4vw, 4rem);
        list-style: none;
    }

    .benefits-grid li {
        display: flex;
        align-items: flex-start;
        gap: var(--spacing-sm);
        padding: var(--spacing-md) 0;
        border-top: 1px solid var(--color-border);
    }

    .benefit-icon {
        display: block;
        flex: 0 0 64px;
        height: 64px;
        background: var(--color-red);
        mask-repeat: no-repeat;
        mask-position: center;
        mask-size: contain;
    }

    .botanical-name {
        margin-bottom: var(--spacing-xs);
        font-size: 0.625rem;
        font-weight: 500;
        letter-spacing: 2px;
        text-transform: uppercase;
        color: var(--color-red);
    }

    h3 {
        margin-bottom: var(--spacing-xs);
        font-size: 1.25rem;
        font-weight: 400;
        letter-spacing: -0.5px;
        line-height: 1.4;
    }

    .benefit-description {
        color: var(--color-gray);
        font-size: 0.875rem;
        line-height: 1.8;
    }

    .research-note {
        margin-top: var(--spacing-md);
        color: var(--color-gray);
        font-size: 0.75rem;
        line-height: 1.8;
    }

    @media (max-width: 1024px) {
        .benefits-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
        }
    }

    @media (max-width: 640px) {
        .benefits-grid {
            grid-template-columns: 1fr;
        }

        .benefits-grid li {
            padding: var(--spacing-sm) 0;
        }
    }
</style>
