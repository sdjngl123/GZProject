HoteamUI.Control.OCustomerContainer = {
    Create: function (options) {
        options = options || {};
        var id = this.id;
        var customerContainer = $("#" + id);
        var CtrlOptions = (options.controlInfo || this.ControlInfo()).CtrlOptions;
        var o = $.extend(true, {}, CtrlOptions);
        customerContainer.addClass("hoteam-container-customer");
        if (o.templateName) {
            var html = HoteamUI.UIManager.GetTemplate(o.templateName);
            if (html) {
                customerContainer.html(html);
            }
        }
    },
    LoadTemplate: function (templateName, replaces) {
        if (templateName) {
            var id = this.id;
            var customerContainer = $("#" + id);
            var html = HoteamUI.UIManager.GetTemplate(templateName);
            if (html) {
                if (replaces) {
                    for (var i = 0; i < replaces.length; i++) {
                        var item = replaces[i];
                        var reg = new RegExp("\\[" + item.key + "\\]", 'g');
                        html = html.replace(reg, item.value);
                    }
                }
                customerContainer.html(html);
            }
        }
    },
    AppendHtml: function () {
        var count = arguments.length;
        var id = this.id;
        var customerContainer = $("#" + id);
        for (var i = 0; i < count; i++) {
            customerContainer.append(arguments[i]);
        }
    },
    Clear: function () {
        var id = this.id;
        var customerContainer = $("#" + id);
        customerContainer.empty2();
    },
    Resize: function () {
        var id = this.id;
        $("#" + id).children().resize();
    },
    Dispose: function () {
    },
    Check: function () {
        var id = this.id;
        var childrenID = $("div[parentid='" + id + "']").attr("id");
        var ctrlObject;
        if (childrenID) {
            ctrlObject = HoteamUI.Control.Instance(childrenID);
            ctrlObject.Check();
        }
    } //
};



