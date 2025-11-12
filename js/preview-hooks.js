// js/preview-hooks.js
import { TL_PLAN_NAME, TL_PLAN_PRICE } from './constants.js';

export function applyPlanToPreview() {
  const nameEls  = document.querySelectorAll('#planName, #previewTierName');
  const priceEls = document.querySelectorAll('#planPriceDisplay, #previewTierPrice, #planPrice');
  nameEls.forEach(el => el && (el.textContent = TL_PLAN_NAME));
  priceEls.forEach(el => el && (el.textContent = `$${TL_PLAN_PRICE.toFixed(2)}`));
}

// tiny date helpers
export const parseISO  = s => { const d=new Date(s); return isNaN(+d)?null:d; };
export const iso       = d => d.toISOString().slice(0,10);
export const addMonths = (d,m) => { const x=new Date(d); const day=x.getDate(); x.setMonth(x.getMonth()+m); if(x.getDate()!==day) x.setDate(0); return x; };
export const addDays   = (d,n) => { const x=new Date(d); x.setDate(x.getDate()+n); return x; };
