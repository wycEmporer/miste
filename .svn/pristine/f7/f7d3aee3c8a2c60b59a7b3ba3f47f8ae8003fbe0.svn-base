let docEl = document.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
export const FontUtil = {
    setFontSize(size){
        window.clientWidth = docEl.clientWidth;
        if (! window.clientWidth) return ;
        if(window.clientWidth > 640) window.clientWidth = 640;
        docEl.style.fontSize = 40 * ( window.clientWidth / 640) + 'px';
        window.base = 40 * ( window.clientWidth / 640);
    },
    init(){
        let _this = this;
        if (! document.addEventListener) return;
        window.addEventListener(resizeEvt, _this.setFontSize, false);
        document.addEventListener( 'DOMContentLoaded', _this.setFontSize, false );
    }
}
