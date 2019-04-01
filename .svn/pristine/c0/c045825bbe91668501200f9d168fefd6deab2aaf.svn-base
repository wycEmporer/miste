export class CookieUtil {
  static getItem(sKey) {
    return (
      unescape(
        document.cookie.replace(
          new RegExp(
            "(?:(?:^|.*;)\\s*" +
            escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") +
            "\\s*\\=\\s*([^;]*).*$)|^.*$"
          ),
          "$1"
        )
      ) || null
    );
  }

  static setItem(sKey, sValue, vEnd, sPath, sDomain, bSecure) {
    if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) {
      return false;
    }
    var sExpires = "";
    if (vEnd) {
      switch (vEnd.constructor) {
        case Number:
          sExpires =
            vEnd === Infinity ?
            "; expires=Fri, 31 Dec 9999 23:59:59 GMT" :
            "; max-age=" + vEnd;
          break;
        case String:
          sExpires = "; expires=" + vEnd;
          break;
        case Date:
          sExpires = "; expires=" + vEnd.toUTCString();
          break;
      }
    }
    document.cookie =
      escape(sKey) +
      "=" +
      escape(sValue) +
      sExpires +
      (sDomain ? "; domain=" + sDomain : "") +
      (sPath ? "; path=" + sPath : ";path=/") +
      (bSecure ? "; secure" : "");
    return true;
  }

  static removeItem(sKey, sDomain, sPath) {
    
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = this.getItem(sKey);
    if (cval != null) {
      document.cookie =
        escape(sKey) +
        "=" +
        cval +
        ";expires=" +
        exp.toUTCString() +
        (sDomain ? ";domain=" + sDomain : "") + (sPath ? ";path=" + sPath : ";path=/");

      console.log(escape(sKey) +
        "=" +
        cval +
        ";expires=" +
        exp.toUTCString() +
        (sDomain ? ";domain=" + sDomain : "") + (sPath ? ";path=" + sPath : ";path=/"));
    }

    return true;
  }

  static hasItem(sKey) {
    return new RegExp(
      "(?:^|;\\s*)" +
      escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") +
      "\\s*\\="
    ).test(document.cookie);
  }

  static keys() {
    var aKeys = document.cookie
      .replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "")
      .split(/\s*(?:\=[^;]*)?;\s*/);
    for (var nIdx = 0; nIdx < aKeys.length; nIdx++) {
      aKeys[nIdx] = unescape(aKeys[nIdx]);
    }
    return aKeys;
  }
}