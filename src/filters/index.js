//时间戳转换为时间
export function dataFormat(val) {
  if (val == "" || val == 0) return "";
  let timeMinSeconds = parseInt(val);

  function fix(num) {
    return num >= 10 ? num : "0" + num;
  }
  var date = new Date(timeMinSeconds);
  var year = date.getFullYear();
  var month = fix(date.getMonth() + 1);
  var day = fix(date.getDate());
  var hour = fix(date.getHours());
  var minute = fix(date.getMinutes());
  return year + "-" + month + "-" + day + " " + hour + ":" + minute;
}
