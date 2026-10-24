import { defineEnvVars } from '@sveltejs/kit/env';

export const variables = defineEnvVars({
    PUBLIC_SITE_URL: {
        public: true,
        static: true,
        schema: (value) => {
            const url = new URL(value || 'https://code-in-color.github.io/dr-lin-tea');
            if (!['https:', 'http:'].includes(url.protocol)) {
                throw new Error('PUBLIC_SITE_URL must be an absolute HTTP or HTTPS URL');
            }
            return url.href.replace(/\/+$/, '');
        }
    }
});
