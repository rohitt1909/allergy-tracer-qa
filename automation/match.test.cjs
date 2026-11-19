// Run from the QA folder: node --test automation/match.test.cjs
// Set ALLERGY_TRACER_ROOT to the absolute path of your private application checkout.
const {test} = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const root = process.env.ALLERGY_TRACER_ROOT;
if (!root) throw new Error('Set ALLERGY_TRACER_ROOT to your Allergy-Tracer checkout first.');
const {matchAllergensInText, classifyRisk} = require(path.join(root,'server/utils/matchEngine.js'));
const {normalizeToken,tokenizeIngredients} = require(path.join(root,'server/utils/normalize.js'));
const {levenshteinDistance,fuzzyMatch} = require(path.join(root,'server/utils/textMatch.js'));
const {cosineSimilarity,buildVocabulary,vectorize} = require(path.join(root,'server/utils/cosineSimilarity.js'));
// Synthetic fixtures; not medical validation or clinical risk predictions.
const milk={_id:'qa-milk',name:'Milk (Casein/Lactose)',commonNames:['milk','casein'],category:'food',typicalSeverity:'severe',safeAlternatives:[]};
const egg={_id:'qa-egg',name:'Eggs',commonNames:['egg'],category:'food',typicalSeverity:'moderate',safeAlternatives:[]};
const peanut={_id:'qa-peanut',name:'Peanuts',commonNames:['peanut'],category:'food',typicalSeverity:'severe',safeAlternatives:[]};
const match=(s,items=[milk,egg,peanut])=>matchAllergensInText(s,items);
test('UT-01 exact match is case insensitive',()=>{const r=match('MILK',[milk]);assert.equal(r.length,1);assert.equal(r[0].matchType,'exact');assert.equal(r[0].confidence,98)});
test('UT-02 known milk synonym whey',()=>{assert.equal(match('whey',[milk])[0].matchType,'synonym')});
test('UT-03 fuzzy typo in peanut',()=>{assert.equal(match('peanutt',[peanut])[0].matchType,'fuzzy')});
test('UT-04 unrelated ingredient yields no match',()=>{assert.equal(match('water, sugar').length,0)});
test('UT-05 repeated ingredient does not duplicate an allergen',()=>{assert.equal(match('milk,milk,MILK',[milk]).length,1)});
test('UT-06 multiple allergens are detected',()=>{assert.equal(match('milk, egg, peanut').length,3)});
test('UT-07 severe confidence threshold: 70',()=>{assert.equal(classifyRisk([{typicalSeverity:'severe',confidence:70}]),'high')});
test('UT-08 severe below threshold: 69',()=>{assert.equal(classifyRisk([{typicalSeverity:'severe',confidence:69}]),'low')});
test('UT-09 moderate threshold: 60',()=>{assert.equal(classifyRisk([{typicalSeverity:'moderate',confidence:60}]),'moderate')});
test('UT-10 empty flags classified none (not clinical safety)',()=>{assert.equal(classifyRisk([]),'none')});
test('UT-11 normalize case and whitespace',()=>{assert.equal(normalizeToken('  MILK  '),'milk')});
test('UT-12 tokenize punctuation',()=>{assert.deepEqual(tokenizeIngredients('Milk; sugar (water).'),['milk','sugar','water'])});
test('UT-13 edit distance for single insertion',()=>{assert.equal(levenshteinDistance('milk','milks'),1)});
test('UT-14 empty symptom is not a fuzzy match',()=>{assert.equal(fuzzyMatch('','itching'),false)});
test('UT-15 cosine identical vector',()=>{assert.equal(cosineSimilarity([1,0],[1,0]),1)});
test('UT-16 cosine zero vector',()=>{assert.equal(cosineSimilarity([0,0],[1,0]),0)});
test('UT-17 vocabulary case normalization',()=>{const v=buildVocabulary([['Milk'],['milk','egg']]);assert.deepEqual(vectorize([' MILK '],v),[1,0])});
// Risk-based expected behavior: these may fail on the present implementation.
test('UT-18 unrelated one-letter token must not flag milk',()=>{assert.equal(match('m',[milk]).length,0)});
test('UT-19 exact match should outrank an earlier synonym',()=>{assert.equal(match('whey, milk',[milk])[0].matchType,'exact')});
test('UT-20 unrelated word containing short term must not flag egg',()=>{assert.equal(match('eggplant',[egg]).length,0)});
