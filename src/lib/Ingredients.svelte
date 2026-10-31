<script lang="ts">
  const ingredients = [
    {
      name: 'Hibiscus',
      label: 'Whole flowers',
      title: 'Quality you can taste',
      description: 'We use whole hibiscus flowers grown without pesticides, selected for their bold flavor and rich ruby color.'
    },
    {
      name: 'Premium tea',
      label: 'Loose-leaf',
      title: 'Flavor with depth',
      description: 'Our proprietary blend includes green tea, bringing a distinctive tea character that balances the bright tartness of hibiscus.'
    },
    {
      name: 'Blue lotus',
      label: 'Whole flowers',
      title: 'Ancient roots',
      description: 'Revered in ancient Egypt, blue lotus adds a touch of botanical tradition to a thoroughly modern drink.'
    },
    {
      name: 'Turbinado',
      label: 'Raw organic sugar',
      title: 'A little sweetness',
      description: 'Turbinado brings sweetness to balance the tart hibiscus and round out the tea and floral notes.'
    },
    {
      name: 'Citric acid',
      label: 'A bright finish',
      title: 'The finishing touch',
      description: 'Citric acid adds a little tartness, bringing a bright finish to the blend.'
    }
  ];
</script>

<section class="ingredients-section" id="ingredients" aria-labelledby="ingredients-title">
    <div class="container">
        <p class="section-subtitle">Intentionally minimal</p>
        <h2 class="section-title" id="ingredients-title">Ingredients</h2>
        <p class="ingredients-intro">
            We brought together hibiscus, a proprietary blend of teas, and blue lotus to create Ruby Fizz,
            a sparkling tea steeped in centuries of botanical tradition. Real ingredients, thoughtfully
            selected, with nothing unnecessary added.
        </p>
        <ol class="ingredient-list">
            {#each ingredients as ingredient, index}
                <li>
                    <span class="ingredient-index" aria-hidden="true">0{index + 1}</span>
                    <p class="ingredient-label">{ingredient.label}</p>
                    <h3>{ingredient.name}</h3>
                    <p class="ingredient-detail">
                        <span class="ingredient-lead">{ingredient.title}.</span>
                        {ingredient.description}
                    </p>
                </li>
            {/each}
        </ol>
    </div>
</section>

<style>
    .section-title {
        margin-bottom: var(--spacing-md);
    }

    .ingredients-intro {
        max-width: 750px;
        margin-bottom: var(--spacing-lg);
        font-size: 0.9375rem;
        line-height: 1.9;
    }

    .ingredient-list {
        display: grid;
        grid-template-columns: repeat(5, minmax(0, 1fr));
        gap: var(--spacing-md);
        list-style: none;
    }

    .ingredient-list li {
        padding-top: var(--spacing-md);
        border-top: 1px solid var(--color-border);
    }

    .ingredient-index {
        display: block;
        margin-bottom: var(--spacing-md);
        color: var(--color-gray);
        font-size: 0.875rem;
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
        margin-bottom: var(--spacing-sm);
        font-size: 1.25rem;
        font-weight: 400;
        letter-spacing: -0.5px;
        line-height: 1.4;
    }

    .ingredient-detail,
    .ingredients-finish p {
        color: var(--color-gray);
        font-size: 0.875rem;
        line-height: 1.8;
    }

    .ingredient-lead {
        color: var(--color-black);
    }

    .ingredients-finish {
        max-width: 750px;
        margin-top: var(--spacing-lg);
    }

    @media (max-width: 1024px) {
        .ingredient-list {
            grid-template-columns: repeat(3, minmax(0, 1fr));
        }
    }

    @media (max-width: 768px) {
        .ingredient-list {
            grid-template-columns: repeat(2, minmax(0, 1fr));
        }
    }

    @media (max-width: 480px) {
        .ingredient-list {
            grid-template-columns: 1fr;
        }
    }
</style>
