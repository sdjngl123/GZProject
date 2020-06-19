HoteamUI.Control.OHtmlEdit = {
    Create: function (options) {
        optios = options || {};
        var parentId = this.id;
        var id = this.id + "_HtmlEdit";
        var CtrlOptions = (options.controlInfo || this.ControlInfo()).CtrlOptions;
        var o = $.extend({}, $.hoteamHtmlEdit.defaults, CtrlOptions);
        o.parentId = parentId;
        o.id = id;
        o.lang = HoteamUI.Language.CurLanguage;
        $.hoteamHtmlEdit.create(o);
    },
    ReInit: function (options) {
        var _options = {
            lang: HoteamUI.Language.CurLanguage,
            items: [],
            readOnly: false
        };
        _options = $.extend({}, _options, options);
        $.hoteamHtmlEdit.reinit(this.id, _options, 50);
    },
    Disable: function () {
        var jsEval = 'var KE=$("#' + this.id + '").data("KE"); KE.readonly(true);KE=null;';
        setTimeout(jsEval, 200);
    },
    Enable: function () {
        var jsEval = 'var KE=$("#' + this.id + '").data("KE"); KE.readonly(false);KE=null;';
        setTimeout(jsEval, 200);
    },
    Resize: function () {
        var id = this.id + "_HtmlEdit";
        $.hoteamHtmlEdit.resize(id);
    },
    Clear: function () {
        var id = this.id + "_HtmlEdit";
        var KE = $("#" + this.id).data("KE");
        KE.html('');
    },
    GetText: function () {
        var id = this.id + "_HtmlEdit";
        var KE = $("#" + this.id).data("KE");
        var html = KE.html();
        return html;

    },
    SetText: function (text) {
        if (text != null && text != undefined) {
            var id = this.id + "_HtmlEdit";
            var KE = $("#" + this.id).data("KE");
            KE.html(text);
        }
    }
};


{
    (function ($) {
        $.hoteamHtmlEdit = {
            defaults: {
                parentId: null,
                id: null,
                readOnly: false,
                menu: "default",
                items: [
                    'source', '|', 'emoticons', '|', 'undo', 'redo', '|', 'preview', 'print', 'code', 'cut', 'copy', 'paste',
                    'plainpaste', 'wordpaste', '|', 'justifyleft', 'justifycenter', 'justifyright',
                    'justifyfull', 'insertorderedlist', 'insertunorderedlist', 'indent', 'outdent', 'subscript',
                    'superscript', 'clearhtml', 'quickformat', 'selectall', '|', 'fullscreen',
                    'formatblock', 'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold',
                    'italic', 'underline', 'strikethrough', 'lineheight', 'removeformat', '|',
                    'table', 'hr', 'pagebreak',
                    'anchor', 'link', 'unlink', 'uploadimage']
            },
            create: function (options, reinit) {
                var o = $.extend(true, {}, $.hoteamHtmlEdit.defaults, options);
                var id = o.id;
                var container = $("#" + o.parentId);
                if (reinit != true) {
                    container.append('<textarea name="content" style="" id=' + o.id + '></textarea>');
                }
                KindEditor.plugin('uploadimage', function (K) {
                    var self = this, name = 'uploadimage';
                    self.clickToolbar(name, function () {
                        $.hoteamHtmlEdit.upload(self);
                    });
                });
                var htmlEdit = $("#" + o.id);
                var KE;
                if (o.menu == "none") {
                    KE = KindEditor.create("#" + id, {
                        langType: o.lang,
                        width: "99%",
                        height: "99%",
                        resizeType: 0,
                        items: [],
                        urlType: "relative",
                        allowImageUpload: false,
                        allowFileManager: false

                    });
                }
                else {
                    var items = o.items;
                    if (items && typeof items === 'string') {
                        items = eval("(" + items + ")")
                    }
                    KE = KindEditor.create("#" + id, {
                        langType: o.lang,
                        width: "99%",
                        height: "99%",
                        resizeType: 0,
                        items: items,
                        urlType: "relative",
                        allowImageUpload: false,
                        allowFileManager: false
                    });
                }
                if (o.readOnly == true) {
                    KE.readonly(true);
                }
                container.data("KE", KE);
                this.resize(id);
                this.resize(id, 200);
            },
            resize: function (id, time) {
                function _resize(id) {
                    return function () {
                        var pId = id.split("_")[0];
                        if ($("#" + pId + ":visible").length > 0) {
                            var textearea = $("#" + id);
                            var width = textearea.width() - 12;
                            var height = textearea.parent().height();
                            var keContainer = textearea.prev();
                            var keToolbarHeight = keContainer.find(">.ke-toolbar").height();
                            var keStatusbar = keContainer.find(">.ke-statusbar").height();
                            keContainer.find(">.ke-edit,.ke-edit-iframe,.ke-edit-textarea").height(height - keToolbarHeight - keStatusbar);
                        }
                    }
                }

                if (time == 0 || !time) {
                    _resize(id)();
                }
                else {
                    window.setTimeout(_resize(id), time);
                }
            },
            reinit: function (id, options, time) {
                function reinit(id, options) {
                    var KE = $("#" + id).data("KE");
                    KE.remove();
                    KE = KindEditor.create("#" + id, { langType: options.lang, resizeType: 0, items: options.items, urlType: "relative" });
                    $("#" + id).data("KE", KE);
                }

                function _reinit(id, options) {
                    return function () {
                        reinit(id, options);
                    }
                }

                if (time == 0 || !time) {
                    reinit(id, options);
                }
                else {
                    window.setTimeout(_reinit(id, options), time);
                }
            },
            upload: function (kindeditor) {

            }
        }
    })(jQuery);
}