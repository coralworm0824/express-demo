/**
 * Created by fujunou on 2015/3/6.
 */
//时间变成两位数
function toTwo(n) {
    return +n < 10 ? "0" + n : n + "";
}
//判断数据类型的方法（对typeof的增强，7种常用类型的判断，返回小写字符串）
function Type(obj) {
    var arr = ["null", "nan", "function", "number", "string", "array", "object"];
    if (obj === null) {
      return "null";
    }
    if (obj !== obj) {
      return "nan";
    }
    if (typeof Array.isArray === "function") {
      if (Array.isArray(obj)) {
        //浏览器支持则使用isArray()方法
        return "array";
      }
    } else {
      //否则使用toString方法
      if (Object.prototype.toString.call(obj) === "[object Array]") {
        return "array";
      }
    }
    return (typeof obj).toLowerCase();
}
//正常化日期
function normalDate(oDate) {
    var oDate = oDate;
    var reg = /\-+/g;

    if (Type(oDate) == "string") {
        oDate = oDate.split(".")[0]; //解决ie浏览器对yyyy-MM-dd HH:mm:ss.S格式的不兼容
        oDate = oDate.replace(reg, "/"); //解决苹果浏览器对yyyy-MM-dd格式的不兼容性
    }

    oDate = new Date(oDate);
    return oDate;
}
module.exports = {
    extend: function(target, source, flag) {
        for(var key in source) {
            if(source.hasOwnProperty(key))
                flag ?
                    (target[key] = source[key]) :
                    (target[key] === void 0 && (target[key] = source[key]));
        }
        return target;
    },
    dateFormat0(oDate, fmt) {
        var fmt = fmt || "yyyy/MM/dd hh:mm:ss";
        var oDate = normalDate(oDate || new Date());
        var date = {
          "y+": oDate.getFullYear(), //年
          "M+": oDate.getMonth() + 1, //月
          "d+": oDate.getDate(), //日
          "h+": oDate.getHours(), //时
          "m+": oDate.getMinutes(), //分
          "s+": oDate.getSeconds(), //秒
          S: oDate.getMilliseconds(), //毫秒
          "q+": Math.ceil((oDate.getMonth() + 1) / 3) //季度，+3为了好取整
        };
        var result = "";
        var value = "";
      
        for (var attr in date) {
          if (new RegExp("(" + attr + ")").test(fmt)) {
            result = RegExp.$1;
            value = date[attr] + "";
            fmt = fmt.replace(
              result,
              result.length == 1
                ? value
                : attr == "y+"
                ? value.substring(4 - result.length)
                : toTwo(value)
            );
          }
        }
      
        return fmt;
      }
}