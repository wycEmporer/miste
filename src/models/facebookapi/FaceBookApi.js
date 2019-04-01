const appID = '1857375564479941'
const appVersion = 'v2.9'

export class FaceBookApi {

    /**
     * init facebook obj 
     * @param {Window} windowObj
     */
    constructor() {
       
        window.fbAsyncInit = () => {
            window.FB.init({
                appId: appID,
                xfbml: true,
                version: appVersion
            });
            window.FB.AppEvents.logPageView();
        }

        // (function (d, s, id) {
        //     var js, fjs = d.getElementsByTagName(s)[0];
        //     if (d.getElementById(id)) { return; }
        //     js = d.createElement(s); js.id = id;
        //     js.src = "//connect.facebook.net/en_US/sdk.js";
        //     fjs.parentNode.insertBefore(js, fjs);
        // }(window.document, 'script', 'facebook-jssdk'))
    }

    /**
     *
     * @param {[string]} authorities
     * @param {function(response)} callback
     */
    login(authorities, callback) {
        let authoritiesStr = ''
        let isFirst = true
        for (let a of authorities) {
            if (isFirst) {
                isFirst = false
                authoritiesStr += a
            } else {
                authoritiesStr += ',' + a
            }
            
        }

        window.FB.login(callback, { scope: authoritiesStr, return_scopes: true })
    }

    /**
     * 
     * @param {function(statusCode)} callback
     */
    getLoginStatus(callback) {
        window.FB.getLoginStatus(callback)
    }

    /**
     *
     * @param {function({first_name:string, last_name:string, id: string, email:string})} callback
     */
    getUserInfo(callback) {
        window.FB.api('/me', {fields:'first_name,last_name,email'}, res => {
            callback(res)
        })
    }

    logout(callback) {
        window.FB.logout(callback)
    }

}