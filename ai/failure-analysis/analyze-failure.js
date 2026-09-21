require('dotenv').config();

const fs = require('fs');
const OpenAI = require('openai');
const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const failureData = JSON.parse(
    fs.readFileSync(
        './ai/failure-analysis/failure-input.json',
        'utf-8'
    )
);

async function analyzeFailure(data) {

   const response = await client.responses.create({
    model: 'gpt-5.6-luna',
    input: `
You are a senior QA engineer specializing in P&C insurance applications.

Analyze this failed automated test:

Test Name: ${data.testName}
Error: ${data.errorMessage}
Expected: ${data.expected}
Actual: ${data.actual}
Endpoint: ${data.endpoint}
Business Rule: ${data.businessRule}

Return ONLY valid JSON using exactly these fields.
Do not invent facts that are not supported by the test failure.
Severity should reflect the potential business impact of the failure.

{
  "failureCategory": "string",
  "severity": "Low | Medium | High | Critical",
  "likelyRootCause": "string",
  "businessImpact": "string",
  "recommendedQAInvestigation": "string",
  "recommendedTestAction": "string",
  "defectSummary": "string"
}

Do not use Markdown.
Do not include explanations outside the JSON.
`});

    const aiAnalysis = JSON.parse(response.output_text);

return {
    testName: data.testName,
    aiAnalysis: aiAnalysis
};
};


analyzeFailure(failureData).then((analysis) => {

   analyzeFailure(failureData)
    .then((analysis) => {

        const reportPath =
            './ai/failure-analysis/defect-report.json';

        fs.writeFileSync(
            reportPath,
            JSON.stringify(analysis, null, 2)
        );

        console.log(
            JSON.stringify(analysis, null, 2)
        );

        console.log(
            `\nDefect report created: ${reportPath}`
        );

    })
    .catch((error) => {

        console.error('AI Failure Analysis Error:');
        console.error(error.message);

    });

});