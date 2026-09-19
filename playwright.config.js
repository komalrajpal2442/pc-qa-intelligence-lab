const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({

    testDir: './tests',

    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 2 : 1,

    reporter: [
        ['list'],
        ['html', { open: 'never' }]
    ],

    projects: [

        {
            name: 'ui',
            testIgnore: ['**/api/**'],
            use: {
                baseURL: process.env.BASE_URL || 'http://localhost:3000',
                headless: true,
                screenshot: 'only-on-failure',
                video: 'retain-on-failure',
                trace: 'retain-on-failure'
            }
        },

        {
            name: 'api',
            testMatch: ['**/api/**/*.spec.js'],
            use: {
                baseURL: process.env.API_BASE_URL || 'http://localhost:4000'
            }
        }
    ]
});