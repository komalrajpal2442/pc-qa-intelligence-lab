const fs = require('fs');

const failureData = JSON.parse(
    fs.readFileSync(
        './ai/failure-analysis/failure-input.json',
        'utf-8'
    )
);

function analyzeFailure(data) {

    return {
        testName: data.testName,
        failureCategory: 'Business Rule Validation',
        likelyCause:
            'The API accepted a Year Built value that violates the future-year business rule.',
        affectedArea: 'Property Submission API',
        businessImpact:
            'A submission could be created with invalid property information.',
        suggestedInvestigation:
            'Verify the API validation logic for future Year Built values.',
        recommendedQAAction:
            'Add or update a negative API test for future Year Built.'
    };
}

const analysis = analyzeFailure(failureData);

console.log(
    JSON.stringify(analysis, null, 2)
);