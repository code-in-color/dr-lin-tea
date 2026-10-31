<script lang="ts">
  const ingredients = [
    {
      name: 'Hibiscus',
      label: 'Whole flowers',
      description: 'We use whole hibiscus flowers grown without pesticides, selected for their bold flavor and rich ruby color.'
    },
    {
      name: 'Premium tea',
      label: 'Loose-leaf',
      description: 'Our blend includes green tea and jasmine which bring a distinctive floral note that perfectly balances the bright tartness of hibiscus.'
    },
    {
      name: 'Blue lotus',
      label: 'Whole flowers',
      description: 'Revered in ancient Egypt, blue lotus adds a bit of floral je ne sais quoi to elevate our tea to a functional drink.'
    },
    {
      name: 'Turbinado',
      label: 'Raw organic sugar',
      description: 'Turbinado brings a light sweetness and body to balance the tart hibiscus and round out the tea and floral notes.'
    },
    {
      name: 'Citric acid',
      label: 'A bright finish',
      description: 'Citric acid adds a little citrus tartness, bringing a bright finish to the blend.'
    }
  ];
</script>

<section class="ingredients-section" id="ingredients" aria-labelledby="ingredients-title">
    <div class="container">
        <p class="section-subtitle">Intentionally minimal</p>
        <h2 class="section-title" id="ingredients-title">Ingredients</h2>
        <ol class="ingredient-list">
            {#each ingredients as ingredient, index}
                <li>
                    <span class="ingredient-index" aria-hidden="true">0{index + 1}</span>
                    <div>
                        <p class="ingredient-label">{ingredient.label}</p>
                        <h3>{ingredient.name}</h3>
                        <p class="ingredient-detail">
                            {ingredient.description}
                        </p>
                    </div>
                </li>
            {/each}
        </ol>
    </div>
</section>

<style>
    .section-title {
        margin-bottom: clamp(2rem, 5dvh, 4rem);
    }

    .ingredient-list {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        column-gap: clamp(2rem, 4vw, 4rem);
        list-style: none;
    }

    .ingredient-list li {
        display: flex;
        align-items: flex-start;
        gap: var(--spacing-sm);
        padding: var(--spacing-md) 0;
        border-top: 1px solid var(--color-border);
    }

    .ingredient-index {
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 0 0 64px;
        height: 64px;
        color: var(--color-red);
        font-size: 1rem;
        letter-spacing: 1px;
    }

    .ingredient-label {
        margin-bottom: var(--spacing-xs);
        color: var(--color-red);
        font-size: 0.625rem;
        font-weight: 500;
        letter-spacing: 2px;
        text-transform: uppercase;
    }

    h3 {
        margin-bottom: var(--spacing-xs);
        font-size: 1.25rem;
        font-weight: 400;
        letter-spacing: -0.5px;
        line-height: 1.4;
    }

    .ingredient-detail {
        color: var(--color-gray);
        font-size: 0.875rem;
        line-height: 1.8;
    }

    @media (max-width: 1024px) {
        .ingredient-list {
            grid-template-columns: repeat(2, minmax(0, 1fr));
        }
    }

    @media (max-width: 640px) {
        .ingredient-list {
            grid-template-columns: 1fr;
        }

        .ingredient-list li {
            padding: var(--spacing-sm) 0;
        }
    }
</style>
