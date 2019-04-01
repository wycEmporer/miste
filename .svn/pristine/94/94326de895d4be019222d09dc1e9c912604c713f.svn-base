function setupWebViewJavascriptBridge(callback) {
  if (window.WebViewJavascriptBridge) {
    return callback(window.WebViewJavascriptBridge)
  }
  if (window.WVJBCallbacks) {
    return window.WVJBCallbacks.push(callback)
  }
  window.WVJBCallbacks = [callback]
  let WVJBIframe = document.createElement('iframe');
  WVJBIframe.style.display = 'none'
  WVJBIframe.src = 'https://__bridge_loaded__'
  document.documentElement.appendChild(WVJBIframe);
  setTimeout(() => {
    document.documentElement.removeChild(WVJBIframe)
  }, 0)
}
var WebViewBridge = [];
setupWebViewJavascriptBridge(function(bridge){
  isNeedUpDateApp(bridge);
});
function isNeedUpDateApp(bridge){
  // bridge.registerHandler("bridgeFuncExist_send",function(data, responseCallback) {
  //   responseCallback(name)
  // });
  bridge.registerHandler("bridgeFuncExist_check",function(data) {
    data.forEach(e=>{
      WebViewBridge.push(e);
    });
  });
}
export default {
  WebViewBridge,
  callhandler(name, data, callback) {
    setupWebViewJavascriptBridge(function (bridge) {
      bridge.callHandler(name, data, callback)
    })
  },
  // registerhandler(name, callback) {
  //   setupWebViewJavascriptBridge(function (bridge) {
  //     bridge.registerHandler(name, function (data, responseCallback) {
  //       callback(data, responseCallback)
  //     })
  //   })
  // }
}