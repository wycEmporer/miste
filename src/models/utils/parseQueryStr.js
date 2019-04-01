export  function parseQueryStr (){
  const queryStr = location.search.replace(/^\?/, '');
  if(queryStr == '') return {};
  var parameters = queryStr.split(/\&/g);
  var result = {};
  for(var i = 0;i < parameters.length; i ++){
    var array = parameters[i].split(/=/);
    var key = decodeURIComponent(array[0]);
    var value = decodeURIComponent(array[1]).replace(/\+/g, '');
    result[key] = value;
  }
  return result;
}