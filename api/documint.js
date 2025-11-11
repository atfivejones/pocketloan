// /api/documint.js
const { createHash } = require('crypto');
module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error:'Method not allowed' });
  try {
    const body = typeof req.body==='string' ? JSON.parse(req.body||'{}') : (req.body||{});
    const plan = (body.plan || 'essential').toLowerCase();
    const tpl = process.env[plan==='maximum' ? 'DOCUMINT_TEMPLATE_ID_MAXIMUM' : 'DOCUMINT_TEMPLATE_ID_ESSENTIAL'];
    if (!process.env.DOCUMINT_API_KEY || !tpl) return res.status(500).json({ error:'Missing Documint configuration' });
    const payload = { template: tpl, data: body.data || {}, meta:{ source:'trustlend-app', plan } };
    const r = await fetch('https://api.documint.me/v1/documents', { method:'POST', headers:{'Content-Type':'application/json','X-Api-Key':process.env.DOCUMINT_API_KEY}, body: JSON.stringify(payload) });
    const out = await r.json().catch(()=>null);
    if (!r.ok) return res.status(r.status).json({ error:'Documint error', details: out });
    const url = out?.download_url || out?.document?.url || out?.url;
    let pdfSha256 = null;
    if (url) { const rf = await fetch(url); const buf = Buffer.from(await rf.arrayBuffer()); pdfSha256 = createHash('sha256').update(buf).digest('hex'); }
    return res.status(200).json({ ok:true, downloadUrl:url, documint:out, audit:{ pdfSha256, serverTimestamp:new Date().toISOString(), plan } });
  } catch (e) { return res.status(500).json({ error:'Unexpected server error', details:String(e) }); }
};