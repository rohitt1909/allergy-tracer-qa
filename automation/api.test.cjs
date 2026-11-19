// Read-only checks against a LOCAL development server with seeded test data.
const {test}=require('node:test'); const assert=require('node:assert/strict');
const base=process.env.QA_API_URL||'http://localhost:5000';
const url=new URL(base); if(!['localhost','127.0.0.1','[::1]'].includes(url.hostname)) throw Error('Use a local test server, not production.');
async function call(route,body){const r=await fetch(base+route,{...(body===undefined?{}:{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)}),signal:AbortSignal.timeout(15000)});return {status:r.status,body:await r.json()}}
test('API-01 health responds',async()=>{const r=await call('/api/health');assert.equal(r.status,200);assert.equal(typeof r.body.status,'string')});
test('API-02 allergen list is an array',async()=>{const r=await call('/api/allergens');assert.equal(r.status,200);assert.ok(Array.isArray(r.body))});
for(const [id,route,body] of [['03','/api/product-check',{productName:' '}],['04','/api/barcode-check',{barcode:''}],['05','/api/label-check',{ingredientsText:''}],['06','/api/symptom-check',{symptoms:[]}],['07','/api/alternatives',{}],['08','/api/product-check',{productName:123}],['09','/api/label-check',{ingredientsText:123}],['10','/api/symptom-check',{symptoms:[123]}]]){test('API-'+id+' validation '+route,async()=>{const r=await call(route,body);assert.equal(r.status,400);assert.equal(typeof r.body.error,'string')})}
test('API-11 label response schema',async()=>{const r=await call('/api/label-check',{ingredientsText:'milk, sugar',category:'food'});assert.equal(r.status,200);assert.equal(typeof r.body.isSafe,'boolean');assert.ok(Array.isArray(r.body.flaggedAllergens));assert.ok(['none','low','moderate','high'].includes(r.body.riskLevel))});
test('API-12 malformed category is rejected',async()=>{const r=await call('/api/label-check',{ingredientsText:'milk',category:'not-a-category'});assert.equal(r.status,400)});
