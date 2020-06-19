$.formbuilder.menucontrol["add-image"] = {
    options: {
        name: "value",
        value: "image.png",
        text: "image",
        image: "imageupload.png",
        url:  PageInit.WebRootPath + "/Base/BaseHandler.ashx?type=uploadFileBase64&fileSupport=jpg,png,jpeg,bmp,gif"
    },
    type: "image",
    controlType:"",
    target: "cell",
    property: false,
    fn: function ($elem, grid) {
        var value = this.options.value,
            workspace = grid.workspace,
            position;

        if ($elem.length === 1) {
            position = JSON.parse($elem.attr("data-position"));
            workspace.addNewItem({
                type: this.config.controlType,
                label: "",
                value: value || "image.png"
            }, position);
        }
    }
};