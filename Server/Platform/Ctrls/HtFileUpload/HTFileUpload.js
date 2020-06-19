HoteamUI.Control.OHTFileUpload = {
    Create: function (options) {
        options = options || {};
        var self = this;
        var id = this.id;
        $("#" + id).height("100%");
    },
    /*
     * param {object} options
     * 
     * options.data [{text:'',image:'',size:''}]
     * 
     * options.onUpload ，在点击上传按钮时执行，并自动传入两个函数类型的参数 onUploadSuccess onUploadError
     *  示例：调用平台上传控件成功上传后，调用onUploadSuccess方法，并传入返回的上传文件信息结果
     *  onUpload: function (onUploadSuccess, onUploadError) {
     *      onUploadSuccess([{
     *          text: "测试1",
     *          image: "./images/image.png",
     *          size: "100MB"
     *      },...]);
     *  }
     *  
     * options.convertItem 文件信息转换方法，把平台自定义的文件信息转换为此控件可使用的数据结构，
     * 必须包含text、image、size三个属性
     * 
     * options.onUploadSuccess 上传成功时触发
     * 
     * options.onUploadError   上传失败时触发
     * 
     * onDelete 文件列表删除时触发
     * 
     */
    Init: function (options) {
        $("#" + this.id).htFileUpload({
            onUpload: options.onUpload,
            onUploadSuccess: options.onUploadSuccess,
            onUploadError: options.onUploadError,
            onDelete: options.onDelete,
            convertItem: options.convertItem,
            convertImage: function (src) {
                src = src || "";
                return src.replace("~", PageInit.WebRootPath);
            },
            data: options.data,
            readOnly:options.readOnly
        });
    },
    GetData: function () {
        return $("#" + this.id).getHtFileUploadData();
    },
    Resize: function () {
    }
};

