HoteamUI.Control.OViewPdf = {
    Create: function (options) {
        options = options || {};
        var self = this;
        var id = this.id;
        var handlers = (options.controlInfo || this.ControlInfo()).PageHandlers;
        var o = {};
        var ctrlEvent = {};
        ctrlEvent.o = HoteamUI.Control.Instance(id);
        var ctrl = $("#" + this.id);
        ctrl.append("      <div class='pdf_" + this.id + "' >  "
            + " <iframe  id = 'pdf_page_" + this.id + "'  name = 'pdf_page' style = 'width:100%;height:620px;' ></iframe>  "
            + "  </div >   ");
        $.each(handlers, function (index, val) {
            if (val.HandlerName == "OnCreateComplete") {
                HoteamUI.Common.ExeFunction(self.GetEventFunctionName("OnCreateComplete"), ctrlEvent);
            }
        });
    },
    SetFile: function (url) {
        var destUrl = "/Platform/Ctrls/ViewPdf/pdfjs/web/viewer.html?file=" + url;
        $("#pdf_page_" + this.id).attr("src", destUrl);
    },
    Resize: function () {
    }
}

