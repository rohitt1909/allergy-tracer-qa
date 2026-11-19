# Allergy Tracer — Software Testing & Quality Assurance

## Project Overview
A QA assessment of Allergy Tracer, a web application designed to identify potential allergens in food, medicines and cosmetics.

## Testing Scope
- Manual functional testing
- Negative and boundary value testing
- Automated unit testing
- REST API testing
- Input validation testing
- Defect identification and reporting

## Tools and Technologies
- JavaScript and Node.js
- React.js and Express.js
- MongoDB Memory Server
- Microsoft Excel
- Git and GitHub

## Test Execution Results

| Testing Type | Executed | Passed | Failed |
|---|---:|---:|---:|
| Unit Testing | 20 | 17 | 3 |
| API Testing | 12 | 8 | 4 |
| Manual Testing | 6 | 5 | 1 |
| Total | 38 | 30 | 8 |

Overall pass rate: 78.95%

40 manual test cases were designed, of which 6 were executed and 34 remain unexecuted.

## Key Findings
- False-positive allergen detection caused by substring matching.
- Incorrect prioritization of synonym and exact matches.
- Invalid API inputs resulting in HTTP 500 errors.
- Missing barcode validation feedback.
- Unsupported category acceptance requiring requirement review.

## Defect Summary
- 9 documented findings
- 4 confirmed defect groups
- 5 findings pending verification or requirement review

## Testing Environment
Testing was performed locally using an isolated temporary MongoDB database to avoid affecting production data.

## Project Structure
- automation/ — Automated test scripts
- docs/ — QA documentation
- evidence/ — Manual testing screenshots
- QA_Tracker.xlsx — Test cases and defect tracker
- unit-results.txt — Unit testing results
- api-results.txt — API testing results

## Limitations
The assessment covers selected application functionality.
Database-backed allergen detection and remaining manual test cases require further testing.
This assessment does not establish clinical safety.

## Author
Rohit Mishra
Final Year B.Tech Computer Engineering
