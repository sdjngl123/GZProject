InforCenter_Platform_HomePageSetting_OnCreate = function (pageCtrl) {
    var obj = MainFlatFlowScript[0];
    var data = obj.Data;
    var arr = [];
    var newArr = [];
    for (var i = 0; i < data.length; i++) {
        var robj = data[i];

        arr.push({
            id: robj.Name,
            name: robj.title,
            userHidden: false
        })
    }

    $("#homePage_colsNum").bsSuggest({ "data": [{ text: 1, value: 1 }, { text: 2, value: 2 }, { text: 3, value: 3, selected: true }] });
    //读取个人设置并赋值
    var setting = HoteamUI.Common.GetPersonalSetting(HoteamUI.Common.SystemSettingEnum.HomePage);
    if (setting) {
        setting = JSON.parse(setting);
        $("#homePage_colsNum").bsSuggest("setSelectedByValue", setting.cols);
        $.each(setting.data, function (i) {
            $.each(arr, function (j) {
                if (setting.data[i].id === arr[j].id) {
                    arr[j].userHidden = setting.data[i].hidden;
                    newArr.push(arr[j]);
                }
            });
        });
    }
    if (newArr.length == 0) {
        newArr = arr;
    }

    InforCenter_Platform_HomePageSetting_CreateSettingList(newArr);
}


InforCenter_Platform_HomePageSetting_CreateSettingList = function (arr) {
    var ul = $("#homePageSetting_con-tree");
    var setting = {
        view: {
            showIcon: true,
            showLine: false,
            addDiyDom: zTreeaddDiyDom
        }
    };

    var tree = $.fn.zTree.init(ul, setting);
    tree.addNodes(null, arr);
    initHanlder("homePageSetting_con-tree", ul);
    function zTreeaddDiyDom(treeID, treeNode) {
        var spaceWidth = 15;
        var switchObj = $("#" + treeNode.tId + "_switch"),
            checkObj = $("#" + treeNode.tId + "_check"),
            iconObj = $("#" + treeNode.tId + "_ico"),
            spanObj = $("#" + treeNode.tId + "_span");
        spanObj.addClass("hoteam-grid-node-text");
        switchObj.remove();
        checkObj.remove();
        iconObj.before(switchObj);
        iconObj.before(checkObj);
        //添加两个checkbox，是否冻结和是否隐藏
        var frozen = treeNode.frozen ? "checked" : "";
        var hidden = treeNode.userHidden ? "checked" : "";
        var hiddenInput = treeNode.level == 1 ? "" : '<input hiddencheck="hidden" type="checkbox" ' + hidden + '/><span>' + HoteamUI.Language.Lang("Grid", "Hidden") + '</span>';
        //定义上移下移图片元素
        var moveEle = "";
        if (treeNode.level == 0) {
            moveEle = '<span class="hoteam-grid-column-img hoteam-grid-tree-up"></span>' +
                      '<span class="hoteam-grid-column-img hoteam-grid-tree-down"></span>';
        }
        iconObj.parent().append(
            '<div class="hoteam-grid-tree-d">' +
                 moveEle +
                 hiddenInput +
                 '</span>' +
            '</div>'
        );
        if (treeNode.level > 0) {
            var spaceStr = "<span style='display:inline-block;width:" + spaceWidth * treeNode.level + "px'></span>";
            switchObj.before(spaceStr);
        }
    }
    //给当前弹框注册事件
    function initHanlder(id, tree) {
        //点击树列表中的checkbox事件
        var treeId = id;
        tree.on("click", "input", function (e) {
            var check = $(this);
            var ztree = $.fn.zTree.getZTreeObj(treeId);
            var nodeId = check.closest("li").attr("id");
            var node = ztree.getNodeByParam("tId", nodeId);
            if (check.attr("frozencheck")) {//冻结设置
                node.frozen = check.prop("checked");
                //将子节点所有设为和父节点相同
                var childNodes = node.children;
                if (childNodes) {
                    $.each(childNodes, function (i) {
                        childNodes[i].frozen = node.frozen;
                    });
                }
                //如果是取消冻结，则将后续的所有列均置为不冻结
                if (node.frozen == false) {
                    while (true) {
                        node = node.getNextNode();
                        if (node) {
                            node.frozen = false;
                            childNodes = node.children;
                            $("#" + node.tId).find("input[frozencheck='frozen']").prop("checked", false);
                            if (childNodes) {
                                $.each(childNodes, function (i) {
                                    childNodes[i].frozen = false;
                                });
                            }
                        } else {
                            break;
                        }
                    }
                }
            } else {//隐藏设置
                node.userHidden = check.prop("checked");
                if (node.level == 1) {//如果不是父节点
                    //获取所有同级节点
                    var friendNodes = node.getParentNode().children;
                    //遍历所有同级节点，如果全部隐藏，则父节点也为隐藏，如果不是全部隐藏，则父节点不为隐藏
                    var hiddenflag = true;
                    $.each(friendNodes, function (i) {
                        if (!friendNodes[i].userHidden) {
                            hiddenflag = false;
                        }
                    });
                    //将父元素隐藏checkbox置为hiddenflag
                    $("#" + node.getParentNode().tId).children("a").find("input[hiddencheck='hidden']").prop("checked", hiddenflag);
                } else { //如果是父节点
                    var hiddenflag = check.prop("checked");
                    node.userHidden = hiddenflag;
                    //将子节点所有设为和父节点相同
                    var childNodes = node.children;
                    if (childNodes) {
                        $.each(childNodes, function (i) {
                            childNodes[i].hidden = childNodes[i].userHidden = hiddenflag;
                            $("#" + childNodes[i].tId).find("input[hiddencheck='hidden']").prop("checked", hiddenflag);
                        });
                    }
                }
            }
            e.stopPropagation();
        })
            //上移下移事件
            .on("click", "span.hoteam-grid-column-img", function () {
                var ztree = $.fn.zTree.getZTreeObj(treeId);
                var nodeId = $(this).closest("li").attr("id");
                var node = ztree.getNodeByParam("tId", nodeId);
                var index = node.getIndex();
                //上移
                if ($(this).hasClass("hoteam-grid-tree-up")) {
                    if (index > 0) {//如果不是第一个
                        parNode = node.getParentNode();
                        ztree.removeNode(node);
                        ztree.addNodes(parNode, index - 1, node);
                    }
                } else {
                    nextNode = node.getNextNode();
                    if (nextNode) {//如果不是最后一个
                        var parNode = node.getParentNode();
                        ztree.removeNode(node);
                        ztree.addNodes(parNode, index + 1, node);
                    }
                }
                return false;
            }).on("mouseenter", "a", function () {
                $(this).find(".hoteam-grid-column-img").css("display", "inline-block");
            }).on("mouseleave", "a", function () {
                $(this).find(".hoteam-grid-column-img").css("display", "none");
            });
    }
}

InforCenter_Platform_HomePageSetting_OnOK = function (ctrlEvent) {

    var arr = [];

    var ztree = $.fn.zTree.getZTreeObj("homePageSetting_con-tree");

    var nodes = ztree.getNodes();
    $.each(nodes, function (i) {
        var node = nodes[i];

        arr.push({
            id: node.id,
            name: node.name,
            hidden: node.userHidden
        });
    });
    var obj = {
        cols: $("#homePage_colsNum").bsSuggest("getSelectedValue"),
        data: arr
    }
    HoteamUI.Common.SavePersonalSetting(null, HoteamUI.Common.SystemSettingEnum.HomePage, JSON.stringify(obj));
    var control = HoteamUI.Page.InstanceByName("MainFlatFlow");
    if ($("#" + control.pid).css("display") != "none") {
        control.GetControl("PageGridCtrl").ResetPageGrid(HoteamUI.Common.SystemSettingEnum.HomePage);
    }
    HoteamUI.UIManager.Return(ctrlEvent.o.ContainerID(), null);
}