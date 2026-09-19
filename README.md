# P&C Insurance QA Intelligence Lab

AI-powered QA automation framework for a fictional Property & Casualty (P&C) insurance application.

## Project Overview

This project demonstrates end-to-end QA engineering practices for a Commercial Property insurance submission workflow.

The framework covers:

- Manual-style business rule validation
- UI automation
- API automation
- Positive and negative testing
- Smoke testing
- Regression testing
- Sanity testing
- Page Object Model
- Data-driven testing
- Environment configuration
- Failure evidence
- Git/GitHub integration

## Technology Stack

- JavaScript
- Playwright
- Node.js
- Express.js
- Git
- GitHub

## Application Workflow

Commercial Property Submission:

Insured Information
→ Property Details
→ Validation
→ Underwriting Rules
→ Submission Creation

## Business Rules

1. Insured Name is required.
2. Property Address is required.
3. Property Type is required.
4. Year Built is required.
5. Year Built cannot be in the future.
6. Properties over 50 years old require underwriting referral.
7. Valid submissions generate a submission number.

## Test Coverage

### UI Testing

- Valid property submission
- Missing Insured Name
- Future Year Built
- Property over 50 years old
- All required fields blank

### API Testing

- Successful submission
- Missing Insured Name
- Missing Property Address
- Missing Property Type
- Missing Year Built
- Future Year Built
- Property over 50 years old

## Test Suite Classification

| Suite | Purpose |
|---|---|
| Smoke | Critical application health |
| Regression | Complete existing functionality |
| Sanity | Focused validation of changed functionality |

## Project Structure

```text
pc-qa-intelligence-lab
├── api/
├── application/
├── pages/
├── test-data/
├── tests/
│   └── api/
├── package.json
├── playwright.config.js
└── README.md
