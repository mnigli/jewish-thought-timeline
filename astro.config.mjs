// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
    site: 'https://jewish-thought-timeline.netlify.app',
    i18n: {
        defaultLocale: 'he',
        locales: ['he'],
    },
    prefetch: true,
});
