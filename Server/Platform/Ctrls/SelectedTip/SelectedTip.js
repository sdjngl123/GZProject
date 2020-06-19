HoteamUI.Control.OSelectedTip = {
    Css: {
        labName: "HoteamUI_SelectedTip_labName",
        content: "HoteamUI_SelectedTip_content"
    },
    Create: function (options) {
        var self = this;
        options = options || {};
        var pid = self.id;
        var labName = $("<div class='" + self.Css.labName + "'>");
        var content = $("<div class='" + self.Css.content + "'>");
        $("#" + pid).append(labName.add(content));
    },
    SetLableName: function (val) {
        $("#" + this.id + " div." + this.Css.labName).html(val);
    },
    SetContentVal: function (val) {
        $("#" + this.id + " div." + this.Css.content)
            .attr('title', val.text)
            .text(val.text)
            .data("selected", val.value);
    },
    GetContentVal: function () {
        var content = $("#" + this.id + " div." + this.Css.content);
        return {
            text: content.html(),
            value: content.data("selected")
        };
    }
}