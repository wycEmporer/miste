import {CookieUtil} from 'models/utils/CookieUtil';

export function skyscanerTrack(orderId){
  let isPro = process.env.NODE_ENV === 'production';
  if(!isPro) return;
  let stoName = 'SAT_' + orderId;
  let isPaySuccess = CookieUtil.getItem(stoName) === '1';
  if(isPaySuccess){
    (function(s, k, y, t, a, g){s['SkyscannerAnalyticsTag']=t;s[t]=s[t]||function(){ (s[t].buffer=s[t].buffer||[]).push(arguments);};s[t].u=y;var l=k.createElement('script'); l.src=y+'/tag.js';l.async=1;var h=k.getElementsByTagName('head')[0];h.appendChild(l); })(window, document, 'https://analytics.skyscanner.net', 'sat');

    window.sat && window.sat('init', 'SAT-909730-1') && window.sat('send', 'conversion', {bookingReference: orderId});
    CookieUtil.removeItem(stoName);
  }
}