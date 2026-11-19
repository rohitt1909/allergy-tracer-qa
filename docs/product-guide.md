# Product guide (draft from source review)

Allergy Tracer is a student prototype that searches ingredient information and flags possible allergen matches. It does not diagnose allergies or verify that products are safe. Check physical labels and consult a qualified clinician for medical questions.

- Product checker: choose Food, Medicine or Cosmetic; enter a name and check the ingredients and warnings. Food data comes from Open Food Facts; medicine and cosmetic entries come from a curated database.
- Scan Barcode: manually enter a barcode or start a camera scan; review the displayed product and ingredient/traces fields.
- Scan a Label: upload an ingredient-label image, review and correct the extracted English text, then select Check This Text. OCR can miss or misread ingredients.
- Symptom checker: enter comma-separated symptoms. Review possible associations and available alternatives; scores are prototype matching scores, not clinical probabilities.
- My Profile: select known allergies; the selections are stored in the current browser. A highlighted match does not replace a medical assessment.
- Registry: manages allergen records. Exercise create/edit/delete only against a disposable local database.

This draft was derived from implementation, not a verified live walkthrough. Validate each instruction during manual testing before publication.
