import { CookieUtil } from "../../models/utils";
export let isLogin = {
  hasUuid: function() {
    CookieUtil.hasItem("uuid");
  }
};
