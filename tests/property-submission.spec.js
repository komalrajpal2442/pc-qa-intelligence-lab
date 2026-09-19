const { test, expect } = require('@playwright/test');

const PropertySubmissionPage =
    require('../pages/PropertySubmissionPage').PropertySubmissionPage;

const { PropertyData, propertyScenarios } = require('../test-data/propertyData');   
let propertySubmissionPage;

test.beforeEach(async ({ page }) => {

    await page.goto('/');

    propertySubmissionPage =
        new PropertySubmissionPage(page);
});

test.describe('Commercial Property Submission', () => {

test('@smoke @regression TC001-Property Submission Valid Scenario', async ({ page }) => {

    await page.goto('http://localhost:3000/');

    const propertySubmissionPage =
        new PropertySubmissionPage(page);

    await propertySubmissionPage.enterInsuredName(PropertyData.validData.insuredName);
    await propertySubmissionPage.enterPropertyAddress(PropertyData.validData.propertyAddress);
    await propertySubmissionPage.selectPropertyType(PropertyData.validData.propertyType);
    await propertySubmissionPage.enterYearBuilt(PropertyData.validData.yearBuilt);
    await propertySubmissionPage.clickCreateSubmission();
    await expect(
        propertySubmissionPage.getSuccessMessage()
    ).toBeVisible();
//     await expect(
//     propertySubmissionPage.getSuccessMessage()
// ).toContainText('THIS WILL FAIL');
});
test('@regression TC-PROP-002 - Insured Name is mandatory', async ({ page }) => {

    await page.goto('http://localhost:3000/');

    const propertySubmissionPage =
        new PropertySubmissionPage(page);

    await propertySubmissionPage.enterPropertyAddress(PropertyData.missingInsuredName.propertyAddress);
    await propertySubmissionPage.selectPropertyType(PropertyData.missingInsuredName.propertyType);
    await propertySubmissionPage.enterYearBuilt(PropertyData.missingInsuredName.yearBuilt);
    await propertySubmissionPage.clickCreateSubmission();
    await expect(
        propertySubmissionPage.getErrorMessage()
    ).toBeVisible();
});
test('@regression @sanity TC003-Year Built in the Future', async ({ page }) => {

    await page.goto('http://localhost:3000/');

    const propertySubmissionPage =
        new PropertySubmissionPage(page);
    await propertySubmissionPage.enterInsuredName(PropertyData.futureYearBuilt.insuredName);
    await propertySubmissionPage.enterPropertyAddress(PropertyData.futureYearBuilt.propertyAddress);
    await propertySubmissionPage.selectPropertyType(PropertyData.futureYearBuilt.propertyType);
    await propertySubmissionPage.enterYearBuilt(PropertyData.futureYearBuilt.yearBuilt);
    await propertySubmissionPage.clickCreateSubmission();
    await expect(
        propertySubmissionPage.getYearBuiltErrorMessage()
    ).toBeVisible();
});
test('@regressionTC004-Property is over 50 years old', async ({ page }) => {

    await page.goto('http://localhost:3000/');

    const propertySubmissionPage =
        new PropertySubmissionPage(page);
    await propertySubmissionPage.enterInsuredName(PropertyData.overFiftyYearsOld.insuredName);
    await propertySubmissionPage.enterPropertyAddress(PropertyData.overFiftyYearsOld.propertyAddress);
    await propertySubmissionPage.selectPropertyType(PropertyData.overFiftyYearsOld.propertyType);
    await propertySubmissionPage.enterYearBuilt(PropertyData.overFiftyYearsOld.yearBuilt);
    await propertySubmissionPage.clickCreateSubmission();
    await expect(page.getByText("Underwriting Referral Required - Property is over 50 years old.")).toBeVisible();
});

test('TC-PROP-005 - All mandatory fields validation', async ({ page }) => {

    // await page.goto('/');

    // const propertySubmissionPage =
    //     new PropertySubmissionPage(page);

    await propertySubmissionPage.enterInsuredName(
        PropertyData.allFieldsBlank.insuredName
    );

    await propertySubmissionPage.enterPropertyAddress(
        PropertyData.allFieldsBlank.propertyAddress
    );

    await propertySubmissionPage.selectPropertyType(
        PropertyData.allFieldsBlank.propertyType
    );

   await propertySubmissionPage.enterYearBuilt(
    PropertyData.allFieldsBlank.yearBuilt
);

    await propertySubmissionPage.clickCreateSubmission();

   await expect(
    propertySubmissionPage.getInsuredNameErrorMessage()
).toBeVisible();

await expect(
    propertySubmissionPage.getPropertyAddressErrorMessage()
).toBeVisible();

await expect(
    propertySubmissionPage.getPropertyTypeErrorMessage()
).toBeVisible();

await expect(
    propertySubmissionPage.getYearBuiltError()
).toBeVisible();
});

for (const scenario of propertyScenarios) {

    test(`Data-driven - ${scenario.name}`, async ({ page }) => {

        // await page.goto('http://localhost:3000/');

        // const propertySubmissionPage =
        //     new PropertySubmissionPage(page);

        await propertySubmissionPage.enterInsuredName(
            scenario.data.insuredName
        );

        await propertySubmissionPage.enterPropertyAddress(
            scenario.data.propertyAddress
        );

        await propertySubmissionPage.selectPropertyType(
            scenario.data.propertyType
        );

        await propertySubmissionPage.enterYearBuilt(
            scenario.data.yearBuilt
        );

        await propertySubmissionPage.clickCreateSubmission();
    }
)};

});