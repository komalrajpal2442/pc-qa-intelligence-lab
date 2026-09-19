const PropertyData = {
    validData: {
        insuredName: 'ABC Manufacturing',
        propertyAddress: '123 Main St, Anytown, USA',
        propertyType: 'Warehouse',
        yearBuilt: '2000'
    },
    missingInsuredName: {
        insuredName: '',
        propertyAddress: '123 Main St, Anytown, USA',
        propertyType: 'Warehouse',
        yearBuilt: '2000'
    },
    futureYearBuilt: {
        insuredName: 'ABC Manufacturing',
        propertyAddress: '123 Main St, Anytown, USA',
        propertyType: 'Warehouse',
        yearBuilt: '2050'
    },
    overFiftyYearsOld: {
        insuredName: 'ABC Manufacturing',
        propertyAddress: '123 Main St, Anytown, USA',
        propertyType: 'Warehouse',
        yearBuilt: '1970'
    }, 
    allFieldsBlank: {
        insuredName: '',
        propertyAddress: '',
        propertyType: '',
        yearBuilt: ''
    }
};
const propertyScenarios = [

    {
        name: 'Valid Property',
        data: PropertyData.validData,
        expectedMessage: 'Submission created successfully'
    },
     
    {
        name: 'Missing Insured Name',
        data: PropertyData.missingInsuredName,
        expectedMessage: 'Insured Name is required.'
    },
    {
        name: 'Future Year Property',
        data: PropertyData.futureYearBuilt,
        expectedMessage: 'Year Built cannot be in the future.'
    },

    {
        name: 'Over 50 Years Old Property',
        data: PropertyData.overFiftyYearsOld,
        expectedMessage: 'Underwriting Referral Required - Property is over 50 years old.'
    },

];

module.exports = { PropertyData, propertyScenarios };