// /api/anchor-ots.js (stub)
module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error:'Method not allowed' });
  const b = typeof req.body==='string'?JSON.parse(req.body||'{}'):(req.body||{});
  const h = b.hashHex || ''; if (!/^[0-9a-f]{64}$/i.test(h)) return res.status(400).json({ error:'Invalid hashHex' });
  return res.status(200).json({ ok:true, anchor:{ method:'OpenTimestamps', status:'queued', receiptHint:`ots:proof:${h.slice(0,8)}…` } });
};