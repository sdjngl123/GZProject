//IE 9 下 console 在未打开开发人员工具时，为undefind

if (typeof console === 'undefined') {
    var message = function () {
        //测试使用
        var text='ie9.shim:open the ie9 develop tool[F12] debugger'
        //alert(text);
        return text;
    };
    console = {
        log: message,
        dir: message,
        warn: message,
        error: message
    };
    
}