/******************************************************************************
*    Copyright (c) 2012,山东山大华天软件有限公司
*    All rights reserved.
*
*    文件名称：WorkFlow.View.js
*
*    创 建 人： 张传辉
*    创建日期： 2013-04-01
*    初始版本： 1.0
******************************************************************************/
$.fn.WorkFlowView = function (FlowTemplateName, data) {

    $(this).each(function () {
        var obj = $(this),
            i = 0;
        $(this).html("");
        var id = obj.attr("id");
        var Content = Raphael(id);
        $(this).find("svg").attr("width", "1000");
        $(this).closest(".hoteam-layout-vertical-item").parent().closest(".hoteam-layout-vertical-item").width(1000);
        for (; i < data.length; i++) {
            Content.CreatNode(id, FlowTemplateName, data[i].NodeType, data[i].NodeID, data[i].Img, data[i].StarX, data[i].StarY, data[i].Name, data[i].Action, data[i].NodeTask, data[i].AuditResultList);

            for (var j = 0; j < data[i].LinkList.length; j++) {
                Content.CreatLine(id, data[i], SearchNode(data, data[i].LinkList[j].NextNode), data[i].LinkList[j].LineType, data[i].LinkList[j].FirstLink, data[i].LinkList[j].Condition);
            }
        }
        $("#" + id + " .flowviewtooltip,#" + id + " path").attr("data-html", "true").tooltip({
            placement: "right"
        });
        Content.CreateTip();
    });
}

function SearchNode(arr, NodeID) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].NodeID == NodeID)
            return arr[i];
    }
}

Raphael.fn.CreateTip = function () {
    return;
    this.rect(10, 10, 20, 20, 3).attr({ stroke: "#edd770", "stroke-width": "1px", fill: "270-#fffce1-#ffff99" });
    this.text(65, 20, HoteamUI.Language.Lang("FlowTemplateView", "Run"));

    this.rect(10, 40, 20, 20, 3).attr({ stroke: "#aed47d", "stroke-width": "1px", fill: "270-#f0ffe2-#d0ffc5" });
    this.text(62, 50, HoteamUI.Language.Lang("FlowTemplateView", "Complete"));

    this.rect(10, 70, 20, 20, 3).attr({ stroke: "#ccc", "stroke-width": "1px", fill: "270-#fff-#d7d7d7" });
    this.text(62, 80, HoteamUI.Language.Lang("FlowTemplateView", "NotExecute"));

    this.path(["M", 10, 110, "L", 30, 110]).attr({ stroke: "#428aba", "stroke-width": "2px" });
    this.path(getArr(10, 110, 30, 110, 6)).attr({ stroke: "#428aba", "stroke-width": "2px" });
    this.text(62, 110, HoteamUI.Language.Lang("FlowTemplateView", "NotConditions"));

    this.path(["M", 10, 140, "L", 30, 140]).attr({ stroke: "#273E74", "stroke-width": "2px" });
    this.path(getArr(10, 140, 30, 140, 6)).attr({ stroke: "#273E74", "stroke-width": "2px" });
    this.text(62, 140, HoteamUI.Language.Lang("FlowTemplateView", "HaveConditions"));
}

//创建节点
Raphael.fn.CreatNode = function (id, FlowTemplateName, NodeType, NodeID, img, StarX, StarY, NodeName, Action, NodeTask, AuditResultList) {

    var Content = this;
    if (NodeTask) {
        switch (NodeTask.NodeState) {

            case "RUN":
                this.rect(StarX, StarY, 100, 40, 5).attr({ stroke: "#edd770", "stroke-width": "1px", fill: "270-#fffce1-#ffff99" });
                break;
            case "COMPLETE":
                this.rect(StarX, StarY, 100, 40, 5).attr({ stroke: "#aed47d", "stroke-width": "1px", fill: "270-#f0ffe2-#d0ffc5" });
                break;
            default:
                this.rect(StarX, StarY, 100, 40, 5).attr({ stroke: "#ccc", "stroke-width": "1px", fill: "270-#fff-#d7d7d7" });
                break;
        }
    }
    else {
        this.rect(StarX, StarY, 100, 40, 5).attr({ stroke: "#428aba", "stroke-width": "2px", fill: "#eee" });
    }
    img = img.replace("~\\", "");
    if (NodeName.length > 4) {
        NodeName = NodeName.substr(0, 8);
        NodeName = NodeName.substr(0, 4) + "\n" + NodeName.substr(4, 8);
    }
    this.text(StarX + 55, StarY + 20, NodeName);
    Content.image(img, StarX + 10, StarY + 12, 16, 16);

    var tooltipdata = [HoteamUI.Language.Lang("FlowTemplateView", "FlowNode") + NodeName + "<br/>",
     HoteamUI.Language.Lang("FlowTemplateView", "FlowTemplate") + FlowTemplateName + "<br/>"];
    if (NodeTask.NodeTaskauditActor) {
        tooltipdata.push(NodeTask.NodeTaskauditActor + "<br/>");
    }
    if (AuditResultList && AuditResultList.length > 0) {
        tooltipdata.push(HoteamUI.Language.Lang("FlowTemplateView", "AuditResultList"));
        for (var i = 0; i < AuditResultList.length; i++) {
            tooltipdata.push("&nbsp;&nbsp;&nbsp;" + AuditResultList[i].Name + "、");
        }
        var auditStr = tooltipdata[tooltipdata.length - 1];
        tooltipdata[tooltipdata.length - 1] = auditStr.substr(0, auditStr.length - 1);
    }

    var tooltipdiv = $("<div></div>")
    .css({
        position: "absolute",
        left: StarX,
        top: StarY,
        width: 100,
        height: 40,
        "background-color": "#fff",
        opacity: 0
    })
    .attr("title", tooltipdata.join(''))
    .addClass("flowviewtooltip");

    $("#" + id).append(tooltipdiv);

}
Raphael.fn.CreatLine = function (id, StarNode, EndNode, LineType, FirstLine, Condition) {
    var StarX = StarNode.StarX,
        StarY = StarNode.StarY,
        EndX = EndNode.StarX,
        EndY = EndNode.StarY - 2,
        NodeTask = EndNode.NodeTask,
        lineColor = "#428aba";

    if (FirstLine > 30)
        FirstLine = FirstLine - 20;
    var p, centerX, centerY;
    switch (LineType) {
        case 0: //直线
            if (StarY + 40 < EndY) {
                StarX = StarX + 50;
                StarY = StarY + 40;
                EndX = EndX + 50;
                EndY = EndY;
            }
            else if (StarY > EndY + 40) {
                StarX = StarX + 50;
                StarY = StarY;
                EndX = EndX + 50;
                EndY = EndY + 40;
            }
            else {
                if (StarX > EndX) {
                    StarX = StarX;
                    StarY = StarY + 20;
                    EndX = EndX + 100;
                    EndY = EndY + 20;
                }
                else {
                    StarX = StarX + 100;
                    StarY = StarY + 20;
                    EndX = EndX;
                    EndY = EndY + 20;
                }
            }
            p = this.path([
                "M",
                StarX,
                " ",
                StarY,
                "L",
                EndX,
                " ",
                EndY
            ].join(''));
            centerX = (StarX + EndX) / 2;
            centerY = (StarY + EndY) / 2;
            break;
        case 1: //折线，先Y
            StarX = StarX + 50;
            EndX = EndX + 50;
            if (FirstLine > 0) {

                StarY = StarY + 40;
                EndY = EndY;

                p = this.path([
                    "M",
                    StarX,
                    " ",
                    StarY,
                    "L",
                    StarX,
                    " ",
                    StarY + FirstLine,
                    "L",
                    EndX,
                    " ",
                    StarY + FirstLine,
                    "L",
                    EndX,
                    " ",
                    EndY
                ].join(''));
            }
            else {
                StarY = StarY;
                EndY = EndY + 40;
                p = this.path([
                  "M",
                  StarX,
                  " ",
                  StarY,
                  "L",
                  StarX,
                  " ",
                  StarY + FirstLine,
                  "L",
                  EndX,
                  " ",
                  StarY + FirstLine,
                  "L",
                  EndX,
                  " ",
                  EndY
                ].join(''));
            }
            centerX = (StarX + EndX) / 2;
            centerY = (StarY + EndY + 2 * FirstLine) / 2;
            break;
        case 2: //折线，先X
            StarY = StarY + 20;
            EndY = EndY + 20;
            if (FirstLine > 0) {
                StarX = StarX + 100;
                EndX = EndX + 100;
                p = this.path([
                   "M",
                   StarX,
                   " ",
                   StarY,
                   "L",
                   StarX + FirstLine,
                   " ",
                   StarY,
                   "L",
                   StarX + FirstLine,
                   " ",
                   EndY,
                   "L",
                   EndX,
                   " ",
                   EndY
                ].join(''));
            }
            else {

                p = this.path([
                  "M",
                  StarX,
                  " ",
                  StarY,
                  "L",
                  StarX + FirstLine,
                  " ",
                  StarY,
                  "L",
                  StarX + FirstLine,
                  " ",
                  EndY,
                  "L",
                  EndX,
                  " ",
                  EndY
                ].join(''));
            }
            centerX = (StarX + EndX + 2 * FirstLine) / 2;
            centerY = (StarY + EndY) / 2;
            break;
    }
    if (NodeTask) {
        switch (NodeTask.NodeState) {

            case "RUN":
                break;
            case "COMPLETE":
                lineColor = "#02d317";
                break;
            default:
                break;
        }
    }

    p.attr({ stroke: lineColor, fill: "none", "stroke-width": "2px", "z-index": 999, "arrow-end": "classic" });
    

    if (Condition) {
        this.CreateText(centerX, centerY, Condition, lineColor);
    }
}

Raphael.fn.CreateText = function (x, y, text) {
    this.text(x, y, text).attr({
        "font-size": 12,
        fill: '#333333'
    });
}

var getArr = function (x1, y1, x2, y2, size) {
    var angle = Raphael.angle(x1, y1, x2, y2); //得到两点之间的角度
    var a45 = Raphael.rad(angle - 45); //角度转换成弧度
    var a45m = Raphael.rad(angle + 45);
    var x2a = x2 + Math.cos(a45) * size;
    var y2a = y2 + Math.sin(a45) * size;
    var x2b = x2 + Math.cos(a45m) * size;
    var y2b = y2 + Math.sin(a45m) * size;
    var result = ["M", x2, y2, "L", x2a, y2a, "M", x2, y2, "L", x2b, y2b];
    return result;
}