import { TL_PLAN_NAME, TL_PLAN_PRICE } from './constants.js';

export function syncPlanEverywhere() {
  const nameEls  = document.querySelectorAll('#planName,#previewTierName,#payPlanName');
  const priceEls = document.querySelectorAll('#planPrice,#planPriceDisplay,#previewTierPrice,#payPlanPrice');
  nameEls.forEach(el => el && (el.textContent = TL_PLAN_NAME));
  priceEls.forEach(el => el && (el.textContent = `$${TL_PLAN_PRICE.toFixed(2)}`));
}
