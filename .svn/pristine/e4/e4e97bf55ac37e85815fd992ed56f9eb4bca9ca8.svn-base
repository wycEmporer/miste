/* ga constant */
export const Search_result1 = 'Search_result1';
export const Search_result2 = 'Search_result2';
export const Pop_in1 = 'Pop_in1';
export const Pop_in2 = 'Pop_in2';
export const Anniv_book = 'Anniv_book';
export const Anniv_start = 'Anniv_start';
export const Anniv_draw_prize = 'Anniv_draw_prize';
export const Anniv_prize1 = [];
export const HomeBanner = 'HomeBanner';
export function emitCustomEvent(label, category){
  let event = {
      'event': 'custom_event',
      'gtm.category': category || 'Banner_ADs',
      'gtm.action': 'click',
      'gtm.label': label
    };
    try{
      window.dataLayer && window.dataLayer.push(event);
    }catch(e){}
    
};