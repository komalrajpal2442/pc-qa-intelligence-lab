const { test, expect } = require('@playwright/test');


test.describe('Property Submission API', () => {

    test('@smoke @regression API - Create Property Submission', async ({ request }) => {

        const response = await request.post(
            '/api/submissions',
            {
                data: {
                    insuredName: 'ABC Manufacturing',
                    propertyAddress: '123 Main St',
                    propertyType: 'Warehouse',
                    yearBuilt: 2000
                }
            }
        );

        expect(response.status()).toBe(201);

        const responseBody = await response.json();

        expect(responseBody.status).toBe('Created');
        expect(responseBody.submissionNumber).toMatch(/^SUB-\d{5}$/);
    });


    test('@regression API - Missing Insured Name', async ({ request }) => {

        const response = await request.post(
            '/api/submissions',
            {
                data: {
                    insuredName: '',
                    propertyAddress: '123 Main St',
                    propertyType: 'Warehouse',
                    yearBuilt: 2000
                }
            }
        );

        expect(response.status()).toBe(400);

        const responseBody = await response.json();

        expect(responseBody.error)
            .toBe('Insured Name is required.');
    });


    test('@regression API - Missing Property Address', async ({ request }) => {

        const response = await request.post(
            '/api/submissions',
            {
                data: {
                    insuredName: 'ABC Manufacturing',
                    propertyAddress: '',
                    propertyType: 'Warehouse',
                    yearBuilt: 2000
                }
            }
        );

        expect(response.status()).toBe(400);

        const responseBody = await response.json();

        expect(responseBody.error)
            .toBe('Property Address is required.');
    });


    test('@regression API - Missing Property Type', async ({ request }) => {

        const response = await request.post(
            '/api/submissions',
            {
                data: {
                    insuredName: 'ABC Manufacturing',
                    propertyAddress: '123 Main St',
                    propertyType: '',
                    yearBuilt: 2000
                }
            }
        );

        expect(response.status()).toBe(400);

        const responseBody = await response.json();

        expect(responseBody.error)
            .toBe('Property Type is required.');
    });


    test('@regression API - Missing Year Built', async ({ request }) => {

        const response = await request.post(
            '/api/submissions',
            {
                data: {
                    insuredName: 'ABC Manufacturing',
                    propertyAddress: '123 Main St',
                    propertyType: 'Warehouse',
                    yearBuilt: ''
                }
            }
        );

        expect(response.status()).toBe(400);

        const responseBody = await response.json();

        expect(responseBody.error)
            .toBe('Year Built is required.');
    });


    test('@regression API - Future Year Built', async ({ request }) => {

        const currentYear = new Date().getFullYear();

        const response = await request.post(
            '/api/submissions',
            {
                data: {
                    insuredName: 'ABC Manufacturing',
                    propertyAddress: '123 Main St',
                    propertyType: 'Warehouse',
                    yearBuilt: currentYear + 1
                }
            }
        );

        expect(response.status()).toBe(400);

        const responseBody = await response.json();

        expect(responseBody.error)
            .toBe('Year Built cannot be in the future.');
    });


    test('@regression API - Property Over 50 Years Old', async ({ request }) => {

        const currentYear = new Date().getFullYear();

        const oldYear = currentYear - 51;

        const response = await request.post(
            '/api/submissions',
            {
                data: {
                    insuredName: 'ABC Manufacturing',
                    propertyAddress: '123 Main St',
                    propertyType: 'Warehouse',
                    yearBuilt: oldYear
                }
            }
        );

        expect(response.status()).toBe(201);

        const responseBody = await response.json();

        expect(responseBody.status)
            .toBe('Underwriting Referral Required');

        expect(responseBody.message)
            .toBe('Property is over 50 years old.');
    });

});