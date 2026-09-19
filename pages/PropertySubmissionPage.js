class PropertySubmissionPage {

    constructor(page) {
        this.page = page;

        this.insuredName = page.getByLabel('Insured Name');
        this.propertyAddress = page.getByLabel('Property Address');
        this.propertyType = page.getByLabel('Property Type');
        this.yearBuilt = page.getByLabel('Year Built');
        this.insuredNameError =page.getByText('Insured Name is required.');
        this.propertyAddressError =page.getByText('Property Address is required.');
        this.propertyTypeError =page.getByText('Property Type is required.');
        this.yearBuiltError =page.getByText('Year Built is required.');
        this.createSubmissionButton =page.getByRole('button', { name: 'Create Submission' });
        this.resultMessage =page.getByText(/Submission created successfully: SUB-/);
        this.errorMessage =page.getByText('Insured Name is required.');
        this.yearbuiltErrormessage = page.getByText('Year Built cannot be in the future.');    
    }

    async enterInsuredName(name) {
        await this.insuredName.fill(name);
    }

    async enterPropertyAddress(address) {
        await this.propertyAddress.fill(address);
    }

    async selectPropertyType(type) {
        await this.propertyType.selectOption(type);
    }

    async enterYearBuilt(year) {
        await this.yearBuilt.fill(year);
    }

    async clickCreateSubmission() {
        await this.createSubmissionButton.click();
    }

    getSuccessMessage() {
        return this.resultMessage;
    }

    getErrorMessage() {
        return this.errorMessage;
    }

    getYearBuiltError() {
        return this.yearBuiltError;
    }

    getYearBuiltErrorMessage() {
        return this.yearbuiltErrormessage;
    }
    getInsuredNameErrorMessage() {
        return this.insuredNameError;
    }

    getPropertyAddressErrorMessage() {
        return this.propertyAddressError;
    }

    getPropertyTypeErrorMessage() {
        return this.propertyTypeError;
    }


}

module.exports = { PropertySubmissionPage };