HoteamUI.Control.OTree = {
    Create: function (options) {
        $("#" + this.id).data("autofit", options.autofit);
        var ctrlOptions = (options.controlInfo || this.ControlInfo()).CtrlOptions;
        $("#" + this.id).data("rightClickSelect", ctrlOptions.rightClickSelect);
    },
    ReInitTree: function (reInitOptions) {
        ///	<summary>
        ///		重新初始化树控件属性参数
        ///	</summary>
        ///	<param name="options" type="json">
        ///     1.isThirdState：是否三态显示
        ///     2.isRelevance：是否级联
        ///     3.showCheck：是否显示checkbox
        ///     4.showIcon：是否显示图标
        ///     5.showLine：是否显示连线
        ///     6.defaultState：checkbox默认显示状态-0取消/1选中/2不确定
        ///     7.setRightMenuPara：指定加载右键菜单使用对象类型/节点类型加载
        ///	</param> 

        //设置参数
        var self = this;
        var parentId = this.id;
        var id = this.id + "_Tree";
        var options = this.ControlInfo().CtrlOptions;
        $.extend(true, options, reInitOptions);
        var o = $.extend(true, {}, $.hoteamTree.defaults, options);
        o = (reInitOptions != null && reInitOptions != undefined) ? $.extend(true, o, reInitOptions) : o;
        o.parentId = parentId;
        o.id = id;
        if (o.chkboxType != null) {
            o.setting.check.chkboxType = { "Y": o.chkboxType, "N": o.chkboxType };
        }
        //是否显示checkbox
        if (o.showCheck != null && o.showCheck != undefined) {
            o.setting.check.enable = o.showCheck;
        }

        function zTreeaddDiyDom(treeID, treeNode) {
            var spaceWidth = 15;
            var switchObj = $("#" + treeNode.tId + "_switch"),
                checkObj = $("#" + treeNode.tId + "_check"),
                iconObj = $("#" + treeNode.tId + "_ico");
            switchObj.remove();
            checkObj.remove();
            iconObj.before(switchObj);
            iconObj.before(checkObj);
            if (treeNode.icons && treeNode.icons.length > 0) {
                setTreeNodeIcons(treeNode);
            }
            if (treeNode.level > 0) {
                var spaceStr = "<span style='display:inline-block;width:" + spaceWidth * treeNode.level + "px'></span>";
                switchObj.before(spaceStr);
            }
            if (treeNode.backgroundColor) {
                $("#" + treeNode.tId + "_span").css("background-color", treeNode.backgroundColor);
            }
            if (treeNode.lineThroughColor) {
                $("#" + treeNode.tId + "_a").addClass("tree-lineThrough").css("color", treeNode.lineThroughColor);
            }
        }
        function getFont(treeid, node) {
            return node.font ? node.font : {};
        }
        function getBackground(treeid, node) {
            return node.backgroundColor ? { "background-color": node.backgroundColor } : { "background-color": "" };
        }
        //23843 李金岳
        function isIE() {
            return (!!window.ActiveXObject || "ActiveXObject" in window) ? true : false;
        }
        o.setting.view = {
            showIcon: options.showIcon == false ? false : true,
            addDiyDom: zTreeaddDiyDom,
            showLine: false,
            selectedMulti: false,
            fontCss: getFont,
            //23634 李金岳
            txtSelectedEnable: options.txtSelectedEnable ? options.txtSelectedEnable : false,
            //24670 李金岳
            backgroundCss: getBackground,
            //23843 李金岳
            expandSpeed: isIE() ? "" : "fast"
        }
        //事件参数
        var handlers = this.ControlInfo().PageHandlers;
        o.event = {};
        o.event.callback = {};
        o.event.hoteamCtrl = HoteamUI.Control.Instance(parentId);
        $.each(handlers, function (index, val) {
            switch (val.HandlerName) {
                case "OnClick":
                    o.event.callback.onclick = self.GetEventFunctionName("OnClick");
                    break;
                case "OnBeforeExpand":
                    o.event.callback.onbeforeexpand = self.GetEventFunctionName("OnBeforeExpand");
                    break;
                case "OnExpand":
                    o.event.callback.onexpand = self.GetEventFunctionName("OnExpand");
                    break;
                case "OnExpandLoad":
                    o.event.callback.onexpandload = self.GetEventFunctionName("OnExpandLoad");
                    break;
                case "OnNodeDblClick":
                    o.event.callback.onnodedblclick = self.GetEventFunctionName("OnNodeDblClick");
                    break;
                case "OnBeforeCheckClick":
                    o.event.callback.onbeforecheckclick = self.GetEventFunctionName("OnBeforeCheckClick");
                    break;
                case "OnCheckClick":
                    o.event.callback.oncheckclick = self.GetEventFunctionName("OnCheckClick");
                    break;
                default: break;

            }

        });
        $.hoteamTree.create(o);
    },
    //读取下级子节点数据
    LoadNodes: function (parentNode, data) {
        var id = this.id + "_Tree";
        var treeObj = $.fn.zTree.getZTreeObj(id);
        //根节点
        if (parentNode == null || parentNode == undefined) {
            if (treeObj == null || treeObj == undefined) {
                this.ReInitTree();
                treeObj = $.fn.zTree.getZTreeObj(id);
            }
            else {
                this.ClearTreeNodes();
            }
        }
        var tree = $("#" + id);
        var is3state = tree.data("is3state");
        var state = tree.data("state");
        var parentState;
        if (parentNode) {
            parentState = parentNode.checkstate;
        }
        var isRelevance = tree.data("isRelevance");
        if (isRelevance == false) {
            parentState = -1;
        }
        //清空子节点
        treeObj.removeChildNodes(parentNode);
        //设定及转换数据
        if (data != null && data.length > 0) {
            var newNodes = [];
            $.hoteamTree.analyseTreeNodeData(newNodes, data, is3state, state, parentState);
            treeObj.addNodes(parentNode, newNodes);
            //节点控制
            treeObj.expandNode(parentNode, true);
            //展开设定open属性子节点的父级节点
            var nodes = treeObj.getNodesByParam("open", true, parentNode);
            //for (var n in nodes) {
            for (var n = 0; n < nodes.length; n++) {
                var node = nodes[n];
                var parentNode = node.getParentNode();
                while (parentNode != null) {
                    if (parentNode.open == false) {
                        treeObj.expandNode(parentNode);
                    }
                    parentNode = parentNode.getParentNode();
                }
            }
        }
        else {
            if (parentNode) {
                parentNode.isParent = false;
                treeObj.updateNode(parentNode);
            }
        }
        //ie7字符显示兼容性
        if ($.browser.msie && $.browser.version) {
            tree.find("li>a[title*='  ']").each(function () {
                var a = $(this);
                var text = a.attr("title");
                a.find(">span:last").text(text);
            });
        }
    },
    ClearTreeNodes: function () {
        var rootNodes = this.GetTreeRootNodes();
        if (rootNodes) {
            var length = rootNodes.length;
            for (var i = 0; i < length; i++) {
                this.RemoveNode(rootNodes[0]);
            }
        }
    },
    //服务器端更新子节点
    UpdateChildrenNodes: function (parentNode, data) {
        var zTreeObj = $.fn.zTree.getZTreeObj(this.id + "_Tree");
        this.RemoveChildNodes(parentNode);
        this.LoadNodes(parentNode, data);
    },
    //服务器端更新节点
    UpdateNode: function (treeNode, data) {
        var id = this.id + "_Tree"
        var zTreeObj = $.fn.zTree.getZTreeObj(id);
        var tree = $("#" + id);
        var is3state = tree.data("is3state");
        //设定及转换数据
        if (data) {
            $.hoteamTree.converServerTreeNode(treeNode, data, is3state);
        }
        zTreeObj.updateNode(treeNode);
        return treeNode;
    },
    UpdateNodeName: function (node, name) {
        var id = this.id + "_Tree"
        var zTreeObj = $.fn.zTree.getZTreeObj(id);
        node.name = name;
        zTreeObj.updateNode(node);
    },
    ReplaceChildrenNodes: function (parentNode, data) {
        ///	<summary>
        ///		替换下级子节点：依次比较替换不同的节点，更新为新的节点
        ///	</summary>
        ///	<param name="parentNode" type="json">
        ///         父级节点
        ///	</param>
        ///	<param name="data" type="Array">
        ///         树节点数组（格式与服务器端treeObject类对应）
        ///	</param>
        var id = this.id + "_Tree"
        var zTreeObj = $.fn.zTree.getZTreeObj(id);
        if (data == null || data == undefined || data.length == 0) {
            this.RemoveChildNodes(parentNode);
            return;
        }
        var oldChildren = parentNode.children;
        var newChildren = data;
        if (oldChildren instanceof Array == false) {
            if (oldChildren) {
                oldChildren = [oldChildren];
            }
            else {
                oldChildren = [];
            }
        }
        if (newChildren instanceof Array == false) {
            if (newChildren) {
                newChildren = [newChildren];
            }
            else {
                newChildren = [];
            }
        }
        var oldChildrenLength = oldChildren.length;
        var newChildrenLength = newChildren.length;
        var length = (oldChildrenLength > newChildrenLength) ? newChildrenLength : oldChildrenLength;
        for (var i = 0; i < length; i++) {
            var oldNode = oldChildren[i];
            var newNode = newChildren[i];
            var text = oldNode.Text != newNode.Text ? true : false;
            var contentPermission = oldNode.ContentPermission != newNode.ContentPermission ? true : false;
            var value1 = oldNode.Value1 != newNode.Value1 ? true : false;
            var value2 = oldNode.Value2 != newNode.Value2 ? true : false;
            var value3 = oldNode.Value3 != newNode.Value3 ? true : false;
            var value4 = oldNode.Value4 != newNode.Value4 ? true : false;
            var value5 = oldNode.Value5 != newNode.Value5 ? true : false;
            var value6 = oldNode.Value6 != newNode.Value6 ? true : false;
            var tag = oldNode.Tag != newNode.Tag ? true : false;
            //添加比较图片，如果传入的图片不一致也需要重新加载
            var iconOpen = oldNode.IconOpen != newNode.IconOpen;
            var iconClose = oldNode.IconClose != newNode.IconClose;
            var _node = null;
            var bgColor = oldNode.BackgroundColor != newNode.BackgroundColor ? true : false;
            var changeIcons = false;
            if (oldNode.Icons.length !== newNode.Icons.length) {
                changeIcons = true;
            }
            else if (newNode.Icons && newNode.Icons.length > 0) {
                for (var j = 0, jlen = newNode.Icons.length; j < jlen; j++) {
                    if (newNode.Icons[j] !== oldNode.Icons[j]) {
                        changeIcons = true;
                        break;
                    }
                }
            }

            if (text || value1 || value2 || value3 || value4 || value5 || value6 || tag || iconClose || iconOpen || changeIcons || bgColor) {
                this.RemoveChildNodes(oldNode);
                this.RemoveNodeFontColor(oldNode)
                _node = this.UpdateNode(oldNode, newNode);
                setTreeNodeIcons(_node);
            }
            else {
                this.RemoveChildNodes(oldNode);
                oldNode.isParent = oldNode.IsShowExpandIcon;
                oldNode.open = oldNode.IsOpenTreeNode;
                this.RemoveNodeFontColor(oldNode)
                zTreeObj.updateNode(oldNode);
            }
        }
        if (newChildrenLength < oldChildrenLength) {
            for (var i = oldChildrenLength; i > newChildrenLength; i--) {
                var length = oldChildren.length;
                this.RemoveNode(oldChildren[length - 1]);
            }
        }
        else if (newChildrenLength > oldChildrenLength) {
            for (var i = oldChildrenLength; i < newChildrenLength; i++) {
                this.AddNode(parentNode, newChildren[i], true);
            }
        }
    },
    //获取父级节点 
    GetParentNode: function (treeNode) {
        if (treeNode) {
            return treeNode.getParentNode();
        }
    },
    //获取下级子节点
    GetChildrenNodes: function (parentNode) {
        if (parentNode) {
            var children = parentNode.children;
            return children;
        }
    },
    //获取节点在同级节点中的序号
    GetNodeIndex: function (treeNode) {
        var zTreeObj = $.fn.zTree.getZTreeObj(this.id + "_Tree");
        var index = zTreeObj.getNodeIndex(treeNode);
        if (index || index == 0) {
            return index;
        }
        return -1;
    },
    //客户端增加节点  index为 -1时，插入到最后
    AddNode: function (parentNode, data, isSilent, index) {
        if (index == null || index == undefined) {
            index = -1;
        }
        isSilent = isSilent && true;
        var id = this.id + "_Tree"
        var zTreeObj = $.fn.zTree.getZTreeObj(id);
        var tree = $("#" + id);
        var is3state = tree.data("is3state");
        //设定及转换数据
        if (data) {
            var treeNode = {};
            $.hoteamTree.converServerTreeNode(treeNode, data, is3state);
            zTreeObj.addNodes(parentNode, index,treeNode, isSilent);
            //展开节点显示处理
            parentNode.isParent = true;
            zTreeObj.updateNode(parentNode);
        }
        $("#" + parentNode.tId).children("ul").css("overflow", "");
    },
    AddNodes: function (parentNode, data, isSilent) {
        isSilent = isSilent && true;
        var id = this.id + "_Tree"
        var zTreeObj = $.fn.zTree.getZTreeObj(id);
        var tree = $("#" + id);
        var is3state = tree.data("is3state");
        var children = [];
        //设定及转换数据
        if (data && data.length > 0) {
            for (var i = 0, len = data.length; i < len; i++) {
                var obj = {};
                var child = data[i];
                $.hoteamTree.converServerTreeNode(obj, child, is3state);
                children.push(obj);
            }
        }
        zTreeObj.addNodes(parentNode, children, isSilent);
    },
    //同级树节点位置交换  treeNode当前移动的节点
    MoveTreeNode: function (treeNode, direction) {
        var parentNode = this.GetParentNode(treeNode), isSilent = false,treeNodeIndex;
        if (!this.GetPreNode(treeNode) && direction=="pre") {
            return false
        } else if (!this.GetNextNode(treeNode) && direction == "next") {
            return false
        } else {
            if (direction == "pre") {
                treeNodeIndex = this.GetNodeIndex(treeNode) - 1;
            } else if (direction == "next") {
                treeNodeIndex = this.GetNodeIndex(treeNode) + 1;
            }
            this.RemoveNode(treeNode);
            this.AddNode(parentNode, treeNode, isSilent, treeNodeIndex);    

        }
        
    },
    //获取上一个节点
    GetPreNode: function (treeNode) {
        var preNode = null;
        if (treeNode != null && treeNode != undefined) {
            if (typeof treeNode.getPreNode == "function") {
                preNode = treeNode.getPreNode();
            }
        }
        return preNode;
    },
    //获取下一个节点
    GetNextNode: function (treeNode) {
        var nextNode = null;
        if (treeNode != null && treeNode != undefined) {
            if (typeof treeNode.getNextNode == "function") {
                nextNode = treeNode.getNextNode();
            }
        }
        return nextNode;
    },
    //客户端移除节点
    RemoveNode: function (treeNode) {
        if (treeNode) {
            var zTreeObj = $.fn.zTree.getZTreeObj(this.id + "_Tree");
            zTreeObj.removeNode(treeNode);
        }
    },
    //客户端移除子节点 
    RemoveChildNodes: function (parentNode) {
        if (parentNode) {
            var zTreeObj = $.fn.zTree.getZTreeObj(this.id + "_Tree");
            zTreeObj.removeChildNodes(parentNode);
        }
    },
    //展开、关闭全部节点
    ExpandAll: function (expandFlag) {
        var zTreeObj = $.fn.zTree.getZTreeObj(this.id + "_Tree");
        zTreeObj.expandAll(expandFlag);
    },
    //展开、关闭节点
    ExpandNode: function (treeNode, expandFlag) {
        if (treeNode) {
            var zTreeObj = $.fn.zTree.getZTreeObj(this.id + "_Tree");
            zTreeObj.expandNode(treeNode, expandFlag, false, false, false);
        }
    },
    //选择节点
    SelectNode: function (treeNode, autoVisual) {
        var zTreeObj = $.fn.zTree.getZTreeObj(this.id + "_Tree");
        zTreeObj.selectNode(treeNode, false);

        $("#" + treeNode.tId).find("ul").css("overflow", "");
        $("#" + treeNode.tId).parent("ul").css("overflow", "");

    },
    //取消节点的选中状态
    CancelSelectedNode: function (node) {
        var zTreeObj = $.fn.zTree.getZTreeObj(this.id + "_Tree");
        zTreeObj.cancelSelectedNode(node);
    },
    //获取选择所有的节点
    GetSelectedNodes: function () {
        var zTreeObj = $.fn.zTree.getZTreeObj(this.id + "_Tree");
        return zTreeObj.getSelectedNodes();
    },
    //获取选择的节点
    GetSelectedNode: function () {
        var zTreeObj = $.fn.zTree.getZTreeObj(this.id + "_Tree");
        return zTreeObj.getSelectedNodes()[0];
    },
    GetNodesByParam: function (key, value) {
        var treeObj = $.fn.zTree.getZTreeObj(this.id + "_Tree");
        var nodes = treeObj.getNodesByParam(key, value, null);
        return nodes;
    },
    GetLikeNodesByParam: function (key, value) {
        var treeObj = $.fn.zTree.getZTreeObj(this.id + "_Tree");
        var nodes = treeObj.getNodesByFilter(filter);
        function filter(node) {
            if (node[key] == null) {
                return false;
            }
            return node[key].indexOf(value) > -1;
        }
        return nodes;
    },
    GetTreeRootNodes: function () {
        var treeObj = $.fn.zTree.getZTreeObj(this.id + "_Tree");
        if (!treeObj) {
            return;
        }
        var nodes = treeObj.getNodes();
        return nodes;
    },
    //设置全部check节点状态
    SetAllCheckState: function (checkState) {
        var treeId = this.id + "_Tree";
        var zTreeObj = $.fn.zTree.getZTreeObj(treeId);
        var tree = $("#" + treeId);
        var isThirdState = tree.data("is3state");
        $.hoteamTree.setAllCheckState(zTreeObj, checkState, isThirdState);
    },
    //设置check节点状态
    SetCheckState: function (treeNode, checkState) {
        var treeId = this.id + "_Tree";
        $.hoteamTree.setCheckState(treeId, treeNode, checkState);
    },
    //获取指定状态的check节点
    GetCheckNodes: function (checkState, hasIndeterminateState) {
        var zTreeObj = $.fn.zTree.getZTreeObj(this.id + "_Tree");
        var nodes = $.hoteamTree.getCheckNodes(zTreeObj, checkState, hasIndeterminateState);
        return nodes;
    },

    SetTreeRightMenu: function (menuid) {
        var id = this.id + "_Tree";
        var rightClickSelect = $("#" + this.id).data("rightClickSelect");
        rightClickSelect = rightClickSelect == undefined ? true : rightClickSelect;
        var setRightMenuPara = this.ControlInfo().CtrlOptions.setRightMenuPara;
        var tree = $("#" + id);
        var rightmenu = $("#" + menuid);
        var self = this;
        tree.on({
            contextmenu: function (e) {
                var treenode = self.GetNodesByParam("tId", $(this).parent().attr("id"))[0];
                var objectType;
                if (HoteamUI.Common.IsNullOrEmpty(setRightMenuPara)) {
                    if (treenode.Value5) {
                        objectType = treenode.Value5;
                    }
                    else {
                        objectType = treenode.Value3;
                    }
                } else {
                    objectType = treenode[setRightMenuPara];
                }
                if (rightClickSelect) {
                    $(this).click();
                } else {
                    rightmenu.data("node", treenode);
                }
                HoteamUI.Control.Instance(menuid.replace('_RightMenu', '')).Show(e.pageX, e.pageY, objectType);
                return false;
            }
        }, "a");

        tree.on('contextmenu', function (e) {
            return false;
        })
    },
    SetNodeBackgroundColor: function (treeNode, color) {
        var ele = $("#" + treeNode.tId + "_span");
        ele.css("background-color", color);
    },
    //设置节点字体颜色
    SetNodeFontColor: function (treeNode, color) {
        var ele = $("#" + treeNode.tId + "_a");
        ele.css("color", color);
    },
    SetNodeIcons: function (treeNode) {
        setTreeNodeIcons(treeNode);
    },
    RemoveNodeFontColor: function (treeNode) {
        var ele = $("#" + treeNode.tId + "_a");
        ele.css("color", 'inherit');
    },
    SetNodeLineThrough: function (treeNode, color) {
        var ele = $("#" + treeNode.tId + "_a");
        ele.addClass("tree-lineThrough");
        color = color.indexOf("#") == 0 ? color : "#" + color;
        ele.css("color", color);
    },
    Dispose: function () {
        var id = this.id + "_Grid_dragline";
        $("#" + id).remove();
    }
};


{
    (function ($) {
        $.hoteamTree = {
            //创建树
            create: function (options) {
                var o = $.extend(true, {}, $.hoteamTree.defaults, options);
                if (o.defaultState == null) {
                    if (o.isThirdState == true) {
                        o.defaultState = 2;
                    }
                    else {
                        o.defaultState = 0;
                    }
                }
                else {
                    o.defaultState = parseInt(o.defaultState);
                }
                var setting = $.extend({}, $.hoteamTree.defaults.setting, options.setting);
                var divContainer = $("#" + o.parentId).empty2().append('<ul id="' + o.id + '" class="ztree hoteam-tree"></ul>');
                var tree = $("#" + o.id);

                var state = tree.data("state", o.defaultState);

                if (o.isThirdState) {
                    setting.check.chkboxType = { "Y": "s", "N": "s" };
                    tree.data("is3state", true);
                }

                if (o.isRelevance == false) {
                    setting.check.chkboxType = { "Y": "", "N": "" };
                    tree.data("isRelevance", false);
                }
                else {
                    tree.data("isRelevance", true);
                }

                if (o.async) {
                    tree.data("async", true);
                }

                $.extend(setting.callback, {
                    onCheck: $.hoteamTree.setThirdState,
                    onDblClick: $.hoteamTree.nodeDbClick
                });
                var treeObj = $.fn.zTree.init(tree, setting);
                //记录信息
                treeObj.OTree = {};
                treeObj.OTree.Object = o.event.hoteamCtrl;
                treeObj.OTree.ocallback = o.event.callback;

                //节点双击事件
                //this.nodeDbClick(o.id, o.event);
                this.creatDrag(o);
            },
            //设置树信息
            setEventInfo: function (event, treeId, treeNode) {
                var treeObj = $.fn.zTree.getZTreeObj(treeId);
                var ctrlEvent = {};
                ctrlEvent.o = treeObj.OTree.Object;
                ctrlEvent.o.event = event;
                //树节点信息
                ctrlEvent.treeId = treeId;
                ctrlEvent.treeNode = treeNode;
                ctrlEvent.call = treeObj.OTree.ocallback;
                return ctrlEvent;
            },
            nodeDbClick: function (event, treeId, treeNode) {
                var treeObj = $.fn.zTree.getZTreeObj(treeId);
                if (treeObj.OTree.ocallback.onnodedblclick) {
                    HoteamUI.Common.ExeFunction(treeObj.OTree.ocallback.onnodedblclick, treeObj.OTree.Object);
                }
            },
            analyseTreeNodeData: function (treeNodes, data, is3state, defaultState, parentState) {
                //for (var index in data) {
                for (var index = 0; index < data.length; index++) {
                    var item = data[index];
                    var treeNode = {};
                    //设定值
                    $.hoteamTree.converServerTreeNode(treeNode, item, is3state, defaultState, parentState);
                    treeNodes.push(treeNode);
                    if (item.Children != null && item.Children.length > 0) {
                        treeNodes[index].children = [];
                        this.analyseTreeNodeData(treeNodes[index].children, item.Children, is3state, defaultState, parentState)
                    }
                }
                return treeNodes;
            },
            converServerTreeNode: function (clientNode, serverNode, is3state, defaultState, parentState) {
                $.extend(clientNode, $.hoteamTree.nodeDefaults, serverNode);
                clientNode.name = serverNode.Text;
                clientNode.text = serverNode.Text;
                clientNode.chkDisabled = serverNode.ChkDisabled;
                clientNode.isParent = serverNode.IsShowExpandIcon;
                clientNode.open = serverNode.IsOpenTreeNode;
                clientNode.backgroundColor = serverNode.BackgroundColor;
                clientNode.lineThroughColor = serverNode.LineThroughColor;
                //扩展背景色设置
                if (serverNode.backgroundColor) {
                    clientNode.font = { "background-color": serverNode.backgroundColor };
                }
                //下面的icontype：1代表雪碧图，0代表单个图片路径，3代表没有设置图片
                //先判断当前的关闭和打开图片是否都设置，如果只设置了一种，则默认打开关闭都使用此图片
                if (!serverNode.IconClose) {
                    serverNode.IconClose = serverNode.IconOpen;
                }
                if (serverNode.IconOpen) {
                    serverNode.IconOpen = serverNode.IconClose;
                }
                if (serverNode.IconClose) {
                    if (serverNode.IconClose.indexOf("~") < 0) {//传递过来得是雪碧图
                        clientNode.iconClose = HoteamUI.Common.GetImage(serverNode.IconClose, 16);
                        clientNode.iconCloseType = "1";
                    } else {
                        clientNode.iconCloseType = "0";
                        clientNode.iconClose = serverNode.IconClose.replace("~", PageInit.WebRootPath);
                    }
                } else {//如果没有传递任何值，则默认为下面
                    clientNode.iconCloseType = "3";
                    clientNode.iconClose = "background:url(base/css/cupertino/images/baseCtrl.png) no-repeat;background-position:-128px -96px;";
                }
                if (serverNode.IconOpen) {
                    if (serverNode.IconOpen.indexOf("~") < 0) {//传递过来得是雪碧图
                        clientNode.iconOpen = HoteamUI.Common.GetImage(serverNode.IconOpen, 16);
                        clientNode.iconOpenType = "1";
                    } else {
                        clientNode.iconOpenType = "0";
                        clientNode.iconOpen = serverNode.IconOpen.replace("~", PageInit.WebRootPath);
                    }
                } else {//如果没有传递任何值，则默认为下面
                    clientNode.iconOpenType = "3";
                    clientNode.iconOpen = "background:url(base/css/cupertino/images/baseCtrl.png) no-repeat;background-position:-128px -112px;";
                }
                if (clientNode.iconClose != null) {
                    clientNode.icon = clientNode.iconClose;
                }
                else if (clientNode.iconOpen != null) {
                    clientNode.icon = clientNode.iconOpen;
                }
                clientNode.contentPermission = serverNode.ContentPermission;
                clientNode.value1 = serverNode.Value1;
                clientNode.value2 = serverNode.Value2;
                clientNode.value3 = serverNode.Value3;
                clientNode.value4 = serverNode.Value4;
                clientNode.value5 = serverNode.Value5;
                clientNode.value6 = serverNode.Value6;
                if (serverNode.Tag && serverNode.Tag instanceof Array) {
                    clientNode.tag = {};
                    for (var i in serverNode.Tag) {
                        if (!serverNode.Tag.hasOwnProperty(i)) {
                            continue;
                        }
                        clientNode.tag[serverNode.Tag[i].Key] = serverNode.Tag[i].Value;
                    }
                }
                clientNode.icons = serverNode.Icons;
                if (parentState && parentState != -1) {
                    clientNode.CheckState = parentState;
                    clientNode.checkstate = parentState;
                }
                else if (serverNode.CheckState === undefined || serverNode.CheckState == -1) {
                    clientNode.CheckState = defaultState;
                    clientNode.checkstate = defaultState;
                }
                else {
                    clientNode.checkstate = serverNode.CheckState;
                }

                if (clientNode.checkstate == 0) {
                    clientNode.checked = false;
                    clientNode.halfCheck = false;
                }
                else if (clientNode.checkstate == 1) {
                    clientNode.checked = true;
                    clientNode.halfCheck = false;
                }
                else if (clientNode.checkstate == 2) {
                    clientNode.checked = true;
                    clientNode.halfCheck = true;
                }

                if (clientNode.chkDisabled && clientNode.checkstate != 1) {
                    clientNode.halfCheck = true;
                }
            },
            changeChkDisplay: function (tId, checkstate) {
                if (checkstate == 1) {
                    $("#" + tId + " >.chk").css("background-position", "-14px 0")
                        .hover(function () { $(this).css("background-position", "-14px -14px"); }, function () { $(this).css("background-position", "-14px 0"); });
                }
                else if (checkstate == 2) {
                    $("#" + tId + " >.chk").css("background-position", "-14px -28px")
                        .hover(function () { $(this).css("background-position", "-14px -42px"); }, function () { $(this).css("background-position", "-14px -28px"); });
                }
                else if (checkstate == 0) {
                    $("#" + tId + " >.chk").css("background-position", "0 0")
                        .hover(function () { $(this).css("background-position", "0 -14px"); }, function () { $(this).css("background-position", "0 0"); });
                }
            },
            setThirdState: function (event, treeId, treeNode) {
                var treeObj = $.fn.zTree.getZTreeObj(treeId);
                var tree = $("#" + treeId);
                var ischecked = treeNode.checked;
                var ishalfCheck = treeNode.halfCheck;
                var children = treeNode.children;
                var isThirdState = tree.data("is3state");
                var isRelevance = tree.data("isRelevance");
                var tId = treeNode.tId;
                var checkState;
                if (isThirdState == true) {
                    if (ischecked == false && ishalfCheck == true) {
                        treeNode.halfCheck = false;
                        treeNode.checked = true;
                        checkState = 1;
                        treeObj.checkNode(treeNode, true);
                        if (isRelevance == false) {
                            $.hoteamTree.changeChkDisplay(tId, 1);
                        }
                        //强制调整
                        $('#' + tId + "_check").removeAttr('third-state-checkbox_true_part').attr('third-state-checkbox_true_full', true);
                    }
                    else if (ischecked == true && ishalfCheck == false) {
                        treeNode.checked = true;
                        treeNode.halfCheck = true;
                        checkState = 2;
                        if (isRelevance == false) {
                            $.hoteamTree.changeChkDisplay(tId, 2);
                        }
                        $('#' + tId + "_check").removeAttr('third-state-checkbox_flase_full').attr('third-state-checkbox_true_part', true);
                    }
                    else if (ischecked == false && ishalfCheck == false) {
                        treeNode.checked = false;
                        treeNode.halfCheck = false;
                        checkState = 0;
                        if (isRelevance == false) {
                            $.hoteamTree.changeChkDisplay(tId, 0);
                        }
                        $('#' + tId + "_check").removeAttr('third-state-checkbox_true_full').attr('third-state-checkbox_false_full', true);
                    }
                }
                else {
                    if (ischecked == true) {
                        treeNode.halfCheck = false;
                        treeNode.checked = true;
                        checkState = 1;
                        if (isRelevance == false) {
                            $.hoteamTree.changeChkDisplay(tId, 1);
                        }
                    }
                    else if (ischecked == false) {
                        treeNode.halfCheck = false;
                        treeNode.checked = false;
                        checkState = 0;
                        if (isRelevance == false) {
                            $.hoteamTree.changeChkDisplay(tId, 0);
                        }
                    }
                }
                treeNode.checkstate = checkState;
                treeNode.CheckState = checkState;
                if (isRelevance == true) {
                    $.hoteamTree.changeChildState(treeObj, children, checkState, isThirdState);
                }
                treeObj.updateNode(treeNode, false);

                if (isRelevance == true) {
                    $.hoteamTree.changeParentState(treeObj, treeNode, isThirdState);
                }
                return false;
            },
            changeChildState: function (treeObj, treeNodes, checkState, isThirdState) {
                if (!treeNodes) { return; }
                for (var i = 0; i < treeNodes.length; i++) {
                    var child = treeNodes[i];
                    if (child.children) {
                        this.changeChildState(treeObj, child.children, checkState, isThirdState);
                    }
                    this.changeNodeState(treeObj, child, checkState, isThirdState);
                }
            },
            changeNodeState: function (treeObj, treeNode, checkState, isThirdState) {
                var tId = treeNode.tId;
                if (checkState == 2) {
                    treeNode.checked = true;
                    treeNode.halfCheck = true;
                }
                else if (checkState == 1) {
                    treeNode.checked = true;
                    treeNode.halfCheck = false;
                }
                else if (checkState == 0) {
                    treeNode.checked = false;
                    treeNode.halfCheck = false;
                }
                treeNode.checkstate = checkState;
                treeNode.CheckState = checkState;
                treeObj.updateNode(treeNode, false);
                //if (checkState == 1) {
                //    treeObj.checkNode(treeNode, true, true);
                //}
                //else if (checkState == 0) {
                //    treeObj.checkNode(treeNode, false, true);
                //}

                if (isThirdState) {
                    //强制调整
                    $('#' + tId + "_check").removeAttr('hird-state-checkbox_flase_full third-state-checkbox_true_part third-state-checkbox_true_full');
                    if (checkState == 2) {
                        $('#' + tId + "_check").attr('third-state-checkbox_true_part', true);
                    }
                    else if (checkState == 1) {
                        $('#' + tId + "_check").attr('third-state-checkbox_true_full', true);
                    }
                    else if (checkState == 0) {
                        $('#' + tId + "_check").attr('third-state-checkbox_false_full', true);
                    }
                }
            },
            changeParentState: function (treeObject, treeNode, isThirdState) {
                var parentNode = treeNode.getParentNode();
                if (!parentNode) { return; }
                var checkChildState = parentNode.check_Child_State;
                //计算节点的状态
                if (isThirdState == true) {
                    var children = parentNode.children;
                    var length = children.length;
                    var checkedNum = 0;
                    var nocheckNum = 0;
                    var halfcheckNum = 0;
                    //子节点状态
                    //for (var i in children) {
                    for (var i = 0; i < children.length; i++) {
                        var checkState = children[i].checkstate;
                        if (checkState == 0 || checkState == "0") {
                            ++nocheckNum;
                        }
                        else if (checkState == 1 || checkState == "1") {
                            ++checkedNum;
                        }
                        else if (checkState == 2 || checkState == "2") {
                            ++halfcheckNum;
                        }
                    }
                    //设置状态
                    if (checkedNum == length) {
                        checkChildState = 2;
                    }
                    else if (nocheckNum == length) {
                        checkChildState = 0;
                    }
                    else {
                        checkChildState = 1;
                    }
                }
                //更新节点
                if (checkChildState == 1) {
                    if (isThirdState == true) {
                        parentNode.halfCheck = true;
                        parentNode.checked = true;
                    }
                    parentNode.checkstate = 2;
                    parentNode.CheckState = 2;
                }
                else if (checkChildState == 2) {
                    if (isThirdState == true) {
                        parentNode.halfCheck = false;
                        parentNode.checked = true;
                    }
                    parentNode.checkstate = 1;
                    parentNode.CheckState = 1;
                }
                else if (checkChildState == 0) {
                    if (isThirdState == true) {
                        parentNode.halfCheck = false;
                        parentNode.checked = false;
                    }
                    parentNode.checkstate = 0;
                    parentNode.CheckState = 0;
                }
                treeObject.updateNode(parentNode, false);
                $.hoteamTree.changeParentState(treeObject, parentNode, isThirdState);
            },
            setAllCheckState: function (treeObject, checkState, isThirdState) {
                var allNodes = treeObject.getNodes();
                allNodes = treeObject.transformToArray(allNodes);
                if (allNodes) {
                    for (var i = 0; i < allNodes.length; i++) {
                        var node = allNodes[i];
                        if (!node.chkDisabled) {
                            this.changeNodeState(treeObject, node, checkState, isThirdState);
                        }
                    }
                }
            },
            setCheckState: function (treeId, treeNode, checkState) {

                var tree = $("#" + treeId);
                var isRelevance = tree.data("isRelevance");
                var treeObj = $.fn.zTree.getZTreeObj(treeId);
                var isThirdState = tree.data("is3state");
                var nodes;
                if (treeNode instanceof Array) {
                    nodes = treeNode;
                }
                else {
                    nodes = [treeNode];
                }

                for (var i = 0, len = nodes.length; i < len; i++) {
                    treeNode = nodes[i];
                    var tId = treeNode.tId;
                    if (isRelevance == true) {
                        this.changeChildState(treeObj, treeNode.children, checkState, isThirdState);
                        this.changeNodeState(treeObj, treeNode, checkState, isThirdState);
                        this.changeParentState(treeObj, treeNode, isThirdState);
                    }
                    else {
                        this.changeNodeState(treeObj, treeNode, checkState, isThirdState);
                        this.changeChkDisplay(tId, checkState);
                    }
                }

            },
            getCheckNodes: function (treeObject, checkState, hasIndeterminateState) {
                function getState0(node) {
                    return (node.checkstate == 0);
                }
                function getState02(node) {
                    return (node.checkstate == 0 || node.checkstate == 2);
                }
                function getState1(node) {
                    return (node.checkstate == 1);
                }
                function getState12(node) {
                    return (node.checkstate == 1 || node.checkstate == 2);
                }
                function getState2(node) {
                    return (node.checkstate == 2);
                }
                var nodes;
                if (checkState == 0) {
                    if (hasIndeterminateState == true) {
                        nodes = treeObject.getNodesByFilter(getState02);
                    }
                    else {
                        nodes = treeObject.getNodesByFilter(getState0);
                    }
                }
                else if (checkState == 1) {
                    if (hasIndeterminateState == true) {
                        nodes = treeObject.getNodesByFilter(getState12);
                    }
                    else {
                        nodes = treeObject.getNodesByFilter(getState1);
                    }
                }
                else if (checkState == 2) {
                    nodes = treeObject.getNodesByFilter(getState2);
                }
                return nodes;
            },
            nodeDefaults: {
                name: null,
                text: null,
                Text: null,
                isParent: true,
                open: false,
                icon: null,
                iconOpen: null,
                iconClose: null,
                checked: false,
                halfCheck: false,
                Name: null,
                IsShowExpandIcon: null,
                IsOpenTreeNode: null,
                IconOpen: null,
                IconClose: null,
                value1: null,
                value2: null,
                value3: null,
                value4: null,
                value5: null,
                value6: null,
                Value1: null,
                Value2: null,
                Value3: null,
                Value4: null,
                Value5: null,
                Value6: null,
                tag: null,
                Tag: null,
                checkstate: null,
                CheckState: null
            },
            creatDrag: function (o) {
                var divContainer = $("#" + o.parentId),
                    autofit = divContainer.data("autofit");
                if (autofit) {
                    divContainer.append('<div class="hoteam-tree-dragline"></div>');
                    $("body").append('<div class="hoteam-tree-drag-moveline" id="' + o.id + "_dragline" + '"></div>');
                    //拖动条注册事件
                    divContainer.children(".hoteam-tree-dragline").draggable({
                        axis: "y",
                        helper: "clone",
                        revert: true,
                        drag: function (e, ui) {
                            var drag = $("#" + o.id + "_dragline").show(),
                                target = $(e.target),
                                top = target.offset().top,
                                height = target[0].offsetTop,
                                left = target.offset().left,
                                width = target.width();
                            if (ui.position.top < 0) {
                                drag.css({
                                    top: top - height,
                                    left: left,
                                    width: width
                                });
                            } else {
                                drag.css({
                                    top: top + ui.position.top - height,
                                    left: left,
                                    width: width
                                });
                            }
                        },
                        stop: function (e, ui) {
                            var drag = $("#" + o.id + "_dragline").hide(),
                                target = $(e.target),
                                dragtop = parseInt(drag.css("top")),
                                top = target.offset().top,
                                containter = $("#" + o.parentId),
                                tree = containter.children(".hoteam-tree"),
                                treeHeight = tree.height();
                            tree.css("height", treeHeight + dragtop - top);
                        }
                    });
                }
            },
            defaults: {
                parentId: null,
                id: null,
                isThirdState: false,
                defaultState: null,
                isRelevance: true,
                setting: {
                    check: {
                        enable: false,
                        chkboxType: { "Y": "ps", "N": "ps" }
                    },
                    view: {
                        selectedMulti: false
                    },
                    callback: {
                        onExpand: zTreeOnExpand,
                        onClick: zTreeOnClick,
                        beforeExpand: zTreeBeforeExpand,
                        beforeCheck: zTreeBeforeCheck,
                        onCheck: zTreeOnCheck
                    }
                }
            }

        }
    })(jQuery);
}

function setTreeNodeIcons(treeNode) {

    var textspan = $("#" + treeNode.tId + "_span");
    textspan.prevAll(".nodeimg").remove();
    if (treeNode.icons && treeNode.icons.length) {
        for (var i = 0; i < treeNode.icons.length; i++) {
            var img = treeNode.icons[i];
            var iconClass = '', iconStyle = '';
            if (img.Icon.indexOf("~") < 0) {
                iconClass = HoteamUI.Common.GetImage(img.Icon, 16);
            } else {
                iconStyle = "style='background:url(" + img.Icon.replace("~", PageInit.WebRootPath) + ") center no-repeat;background-size: 100% 100%;'";
            }
            var imgspan = '<span title="' + img.Title + '" class="button nodeimg ' + iconClass + '" ' + iconStyle + '></span>';
            textspan.before(imgspan);
        }
    }
}



//单击节点内容触发事件
function zTreeOnClick(event, treeId, treeNode) {
    //传入信息
    var ctrlEvent = $.hoteamTree.setEventInfo(event, treeId, treeNode);
    //绑定用户指定方法
    HoteamUI.Common.ExeFunction(ctrlEvent.call.onclick, ctrlEvent);
};
function zTreeBeforeExpand(treeId, treeNode) {
    //处理ztree下面的所有的ul，修改ul的overflow样式
    $("#" + treeNode.tId).children("ul").css("overflow", "hidden");
    var ctrlEvent = $.hoteamTree.setEventInfo(null, treeId, treeNode);
    //绑定用户指定方法
    return HoteamUI.Common.ExeFunction(ctrlEvent.call.onbeforeexpand, ctrlEvent);
};
//节点展开时触发事件
function zTreeOnExpand(event, treeId, treeNode) {
    var tree = $('#' + treeId);
    var zTree = $.fn.zTree.getZTreeObj(treeId);
    treeNode.__icon = treeNode.icon;
    treeNode.__iconOpen = treeNode.iconOpen;
    //处理ztree下面的所有的ul，修改ul的overflow样式
    $("#" + treeNode.tId).children("ul").css("overflow", "");
    //传入信息
    var ctrlEvent = $.hoteamTree.setEventInfo(event, treeId, treeNode);
    ctrlEvent.zTree = zTree;
    //动态加载节点
    if (treeNode.children == null || treeNode.children == undefined) {
        var _async = tree.data("async");
        if (_async) {
            //异步动态加载节点
            ctrlEvent.treeNode = treeNode;
            ctrlEvent.callback = function (ctrlEvent, data) {
                var treeNode = ctrlEvent.treeNode,
                    zTree = ctrlEvent.zTree,
                    count;

                ctrlEvent.o.AddNodes(treeNode, data);
                //下级节点的数量
                var count = treeNode.async_count;
                if (treeNode.children && count > treeNode.children.length) {

                    setTimeout(function () {
                        ctrlEvent.lastIndex = ctrlEvent.index;
                        ctrlEvent.index = treeNode.children.length + 1;
                        if (ctrlEvent.lastIndex === ctrlEvent.index) {
                            treeNode.icon = treeNode.__icon;
                            treeNode.iconOpen = treeNode.__iconOpen;
                            zTree.updateNode(treeNode);
                            return;
                        }
                        HoteamUI.Common.ExeFunction(ctrlEvent.call.onexpandload, ctrlEvent);
                    }, 28);
                }
                else {
                    treeNode.icon = treeNode.__icon;
                    treeNode.iconOpen = treeNode.__iconOpen;
                    zTree.updateNode(treeNode);
                }
            };
            ctrlEvent.index = 1;
            treeNode.icon = "/base/ctrls/tree/img/loading.gif";
            treeNode.iconOpen = "/base/ctrls/tree/img/loading.gif";
            zTree.updateNode(treeNode);
            HoteamUI.Common.ExeFunction(ctrlEvent.call.onexpandload, ctrlEvent);
        }
        else {
            //动态加载节点
            HoteamUI.Common.ExeFunction(ctrlEvent.call.onexpandload, ctrlEvent);
        }

    } else if (treeNode.children && treeNode.children.length < 1) {
        HoteamUI.Common.ExeFunction(ctrlEvent.call.onexpandload, ctrlEvent);
    }

    //绑定用户指定方法
    HoteamUI.Common.ExeFunction(ctrlEvent.call.onexpand, ctrlEvent);

    //强制调整节点
    var isThirdState = tree.data("is3state");
    if (isThirdState && treeNode.children && treeNode.children.length > 0) {
        for (var i = 0, len = treeNode.children.length; i < len; i++) {
            var child = treeNode.children[i],
                tId = child.tId,
                checkState = parseInt(child.checkstate);
            //强制调整
            $('#' + tId + "_check").removeAttr('hird-state-checkbox_flase_full third-state-checkbox_true_part third-state-checkbox_true_full');
            if (checkState == 2) {
                $('#' + tId + "_check").attr('third-state-checkbox_true_part', true);
            }
            else if (checkState == 1) {
                $('#' + tId + "_check").attr('third-state-checkbox_true_full', true);
            }
            else if (checkState == 0) {
                $('#' + tId + "_check").attr('third-state-checkbox_false_full', true);
            }
        }
    }

};

function zTreeBeforeCheck(treeId, treeNode) {
    var ctrlEvent = $.hoteamTree.setEventInfo(null, treeId, treeNode);
    return HoteamUI.Common.ExeFunction(ctrlEvent.call.onbeforecheckclick, ctrlEvent);
};

function zTreeOnCheck(event, treeId, treeNode) {
    var ctrlEvent = $.hoteamTree.setEventInfo(event, treeId, treeNode);
    return HoteamUI.Common.ExeFunction(ctrlEvent.call.oncheckclick, ctrlEvent);
};



//此方法覆盖ztree的方法，使此支持传递进来的雪碧图的class，又支持单个图片路径
$.fn.zTree._z.view.replaceIcoClass = function (node, obj, newName) {
    if (!obj || node.isAjaxing) return;
    var tmpName = obj.attr("class");
    if (tmpName == undefined) return;
    var tmpList = tmpName.split("_");
    var constbak = $.fn.zTree.consts;
    switch (newName) {
        case constbak.folder.OPEN:
        case constbak.folder.CLOSE:
        case constbak.folder.DOCU:
            tmpList[tmpList.length - 1] = newName;
            break;
    }
    //如果传递过来的是雪碧图
    var iconclass = "";
    if (node.open && node.iconOpenType && node.iconOpenType == 1) {
        iconclass = node.iconOpen;
    } else if (!node.open && node.iconCloseType && node.iconCloseType == 1) {
        iconclass = node.iconClose;
    }
    obj.attr("class", tmpList.join("_"));
    obj.addClass(iconclass);
}
//此方法覆盖ztree的方法，使此支持传递进来的雪碧图的class，又支持单个图片路径
$.fn.zTree._z.view.makeNodeIcoClass = function (setting, node) {
    var icoCss = ["ico"];
    var constbak = $.fn.zTree.consts;
    if (!node.isAjaxing) {
        icoCss[0] = (node.iconSkin ? node.iconSkin + "_" : "") + icoCss[0];
        if (node.isParent) {
            icoCss.push(node.open ? constbak.folder.OPEN : constbak.folder.CLOSE);
        } else {
            icoCss.push(constbak.folder.DOCU);
        }
    }
    //如果传递过来的是雪碧图
    var iconclass = "";
    if (node.open && node.iconOpenType && node.iconOpenType == 1) {
        iconclass = node.iconOpen;
    } else if (!node.open && node.iconCloseType && node.iconCloseType == 1) {
        iconclass = node.iconClose;
    }
    return constbak.className.BUTTON + " " + icoCss.join('_') + " " + iconclass;
}
//此方法覆盖ztree的方法，使此支持传递进来的雪碧图的class，又支持单个图片路径
$.fn.zTree._z.view.makeNodeIcoStyle = function (setting, node) {
    if (node.open && node.iconOpenType == "1") {
        return "";
    }
    if (!node.open && node.iconCloseType == "1") {
        return "";
    }
    if (node.open && node.iconOpenType == "3") {//如果没有传递进来图片，则采用默认值
        return node.iconOpen;
    }
    if (!node.open && node.iconCloseType == "3") {
        return node.iconClose;
    }
    var icoStyle = [];
    if (!node.isAjaxing) {
        var icon = (node.isParent && node.iconOpen && node.iconClose) ? (node.open ? node.iconOpen : node.iconClose) : node[setting.data.key.icon];
        if (icon) icoStyle.push("background:url(", icon, ") center center no-repeat;background-size: 100% 100%;");
        if (setting.view.showIcon == false || !$.fn.zTree._z.tools.apply(setting.view.showIcon, [setting.treeId, node], true)) {
            icoStyle.push("width:0px;height:0px;");
        }
    }

    return icoStyle.join('');
}