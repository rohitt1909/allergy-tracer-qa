# Test plan | Allergy Tracer QA

## Goal and scope
Assess the functional correctness, validation, usability and risk communication of a student healthcare web application. This is software QA, not medical or clinical validation. No result means a product is safe for a person with allergies.

Modules: product search (food, medicine, cosmetic), barcode lookup and camera, OCR label scan, symptom matching and alternatives, allergen registry, personal profile, localization and responsive UI. Test supporting REST APIs and matching utilities.

## Environment
Use a local checkout of the private app; record commit SHA, OS, browser/version and test date. Node.js 22+ (or the version supported by the app dependencies), npm, MongoDB with an isolated disposable database, and the React client. No production database writes, real patient data or credentials. External product data may change; record actual product label/response or use synthetic fixtures. Camera and OCR need manual checks on a supported device.

## Strategy
1. Static inspection: candidate defects are not execution results.
2. Smoke test: app opens and read-only API responds.
3. Functional/negative/boundary cases: use the workbook and record actual results before selecting status.
4. Unit tests: deterministic synthetic allergen fixtures; no database or internet needed.
5. API tests: localhost only; seed isolated test database if required.
6. Regression: rerun failed and affected cases after a fix; attach logs/screenshots.

## Entry / exit criteria
Entry: app starts, test database ready, browser and fixture images available. Exit for this portfolio: all P0 cases executed or blocked with reasons, results documented, each observed failure reproducible, no unresolved critical safety issue claimed as acceptable. No production release or clinical approval is implied.

## Priorities and status
P0: potential misleading safety verdict, unauthorized registry mutation, core flow outage. P1: major feature/validation/recovery. P2: minor usability and presentation. Pass = actual matches expected; Fail = reproducible mismatch; Blocked = precondition unavailable; Not run = not executed. Severity describes impact; priority describes urgency. Proposed risk-based expectations may need product-owner approval.

## Evidence
Capture non-sensitive screenshots, sanitized API request/response, exact fixture, commit/build, steps, expected vs observed and reproduction frequency. Keep source code private. Do not publish secrets, private database data or screenshots containing personal data.
