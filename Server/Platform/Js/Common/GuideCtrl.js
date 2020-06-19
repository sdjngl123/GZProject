//向导生成及首页初始化
var InforCenter_Platform_GuideCtrl_PageOnCreate = function (pageEvent) {
    var data = pageEvent.o.GetPara();
    var page = pageEvent.o;
    if (data && data.data && data.data.length > 0) {
        var guideItems = data.data;
        var stepCount = guideItems.length;
        //加载向导栏
        var ul = '<ul class="hoteam-navigation-step"></ul>';
        var $ul = $(ul);
        for (var i = 0; i < guideItems.length; i++) {
            var text = HoteamUI.Language.Lang(guideItems[i].pagename, "Title"),
                width;
            if (guideItems.length == 1) {
                width = "style='width:0;'";
            } else {
                width = i == 0 ? "style='width:50%;'" : (i == guideItems.length - 1 ? "style='width:50%;left:0;'" : "");
            }
            var li =
                '<li>' +
                    '<div class="hoteam-navigation-step-c">' +
                        '<div class="hoteam-navigation-step-line" ' + width + '></div>' +
                        '<div class="hoteam-navigation-step-img"></div>'+
                        '<span class="hoteam-navigation-step-num">' + (i + 1) + '</span>' +
                    '</div>'+
                    '<div class="hoteam-navigation-step-text">' + text + '</div>' +
            '</li>';
            $ul.append($(li));
        }
        var navid = page.GetControl("GuideCtrl_Nav").id;
        $("#" + navid).append($ul);
        //加载及初始化向导首页
        InforCenter_Platform_GuideCtrl_ChangeGuide(page, 0, -1, stepCount, data);
        $("#" + page.pid).data("stepInformation", { currentStep: 0, stepCount: stepCount, alreadyStep: -1, stepData: data });
    }
    else {
        var page = pageEvent.o;
        var preButton = page.GetControl("GuideCtrl_Button_Pre");
        var nextButton = page.GetControl("GuideCtrl_Button_Next");
        var finishButton = page.GetControl("GuideCtrl_Button_Finish");
        preButton.Disable();
        nextButton.Disable();
        finishButton.Disable();
    }
}

//向导界面展示控制
var InforCenter_Platform_GuideCtrl_ChangeGuide = function (guideCtrlPage, currentStep, alreadyStep, stepCount, stepData) {
    var navid = guideCtrlPage.GetControl("GuideCtrl_Nav").id;
    //向导提示栏
    $("#" + navid).find(">ul>li").each(function (index, val) {
        if (index == currentStep) {
            $(this).addClass("hoteam-navigation-step-active").removeClass("hoteam-navigation-step-finish");
        } else if (index < currentStep) {
            $(this).addClass("hoteam-navigation-step-finish").removeClass("hoteam-navigation-step-active");
        }else {
            $(this).removeClass("hoteam-navigation-step-active").removeClass("hoteam-navigation-step-finish");
        }
    });
    //加载当前向导页面
    var guidePage = guideCtrlPage.GetControl("GuideCtrl_Page");
    var initStepCount = guidePage.GetTabInfoList().length;
    if (currentStep < initStepCount) {
        guidePage.SelectTab(currentStep);
    }
    else {
        var pagename = stepData.data[currentStep].pagename;
        guidePage.AddTab({ pageName: pagename, isSelected: true });
        //初始化页面
        InforCenter_Platform_GuideCtrl_ExeInit(stepData.data, guideCtrlPage, currentStep);

    }
    //功能按钮控制
    var preButton = guideCtrlPage.GetControl("GuideCtrl_Button_Pre");
    var nextButton = guideCtrlPage.GetControl("GuideCtrl_Button_Next");
    var finishButton = guideCtrlPage.GetControl("GuideCtrl_Button_Finish");
    if (currentStep <= 0) {
        preButton.Disable();
        nextButton.Enable();
        finishButton.Disable();
    }
    else if (currentStep > 0) {
        preButton.Enable();
        nextButton.Enable();
    }
    if (currentStep == stepCount - 1) {
        nextButton.Disable();
        finishButton.Enable();
    }
    if (stepData.data[currentStep].allowFinish == true) {
        finishButton.Enable();
    }
}

//向导流程节点信息控制
var InforCenter_Platform_GuideCtrl_SetpChange = function (guideCtrlPage, stepInformation, stepType) {
    var canNext = false;
    var guideCtrlID = guideCtrlPage.pid;
    //获取向导流程节点信息
    if (stepInformation) {
        var returnStepInformation = null;
        //设置流程节点信息
        var currentStep = stepInformation.currentStep;
        var stepCount = stepInformation.stepCount;
        var alreadyStep = stepInformation.alreadyStep;
        var data = stepInformation.stepData;
        if (stepType == "next") {
            //执行nextStep方法,并判断是否允许执行下一个节点
            canNext = InforCenter_Platform_GuideCtrl_ExeNextStep(data.data, guideCtrlPage, currentStep);
            if (canNext != false) {
                if (alreadyStep < currentStep) {
                    alreadyStep = ++alreadyStep;
                }
                currentStep = ++currentStep;
            }
        }
        else if (stepType == "pre") {
            currentStep = --currentStep;
            alreadyStep = alreadyStep;
        }
        else if (stepType == "finish") {
            //执行nextStep方法,并判断是否允许执行下一个节点
            var canNext = InforCenter_Platform_GuideCtrl_ExeNextStep(data.data, guideCtrlPage, currentStep);
            if (canNext != false) {
                alreadyStep = stepCount - 1;
            }
        }
        InforCenter_Platform_GuideCtrl_ChangeGuide(guideCtrlPage, currentStep, alreadyStep, stepCount, data);
        returnStepInformation = { currentStep: currentStep, stepCount: stepCount, alreadyStep: alreadyStep, stepData: data };
        $("#" + guideCtrlID).data("stepInformation", returnStepInformation);
        return canNext;
    }
}


//加载页面后执行页面自定义Init方法
var InforCenter_Platform_GuideCtrl_ExeInit = function (guideItems, guideCtrl, currentStep) {
    if (guideItems[currentStep] && guideItems[currentStep].init) {
        var fun = guideItems[currentStep].init;
        var tab = guideCtrl.GetControl("GuideCtrl_Page");
        pid = $("#" + tab.id + "_Tabs>.content").eq(currentStep).attr("id");
        var page = HoteamUI.Page.Instance(pid);
        return window[fun](page);
    }
}

//执行页面自定义nextStep方法
var InforCenter_Platform_GuideCtrl_ExeNextStep = function (guideItems, guideCtrl, currentStep) {
    if (guideItems[currentStep] && guideItems[currentStep].nextStep) {
        var fun = guideItems[currentStep].nextStep;
        var pages = [];
        var tab = guideCtrl.GetControl("GuideCtrl_Page")
        pid = $("#" + tab.id + "_Tabs>.content").each(function (index, val) {
            if (index <= currentStep) {
                var pid = val.id;
                var page = HoteamUI.Page.Instance(pid);
                pages.push(page);
            }
        });
        return window[fun](pages);
    }

}

//执行全部完成
var InforCenter_Platform_GuideCtrl_Finish = function (finishFuntion, guideCtrl) {
    if (finishFuntion) {
        var tab = guideCtrl.GetControl("GuideCtrl_Page");
        var pages = [];
        pid = $("#" + tab.id + "_Tabs>.content").each(function (index, val) {
            var pid = val.id;
            var page = HoteamUI.Page.Instance(pid);
            pages.push(page);
        });
        return window[finishFuntion](pages);
    }
}

//上一步
var InforCenter_Platform_GuideCtrlButton_Pre = function (ctrlEvent) {
    var containerid = ctrlEvent.o.ContainerID();
    var guideCtrlPage = HoteamUI.Page.Instance(containerid);
    var stepInformation = $("#" + containerid).data("stepInformation");
    InforCenter_Platform_GuideCtrl_SetpChange(guideCtrlPage, stepInformation, "pre");
    InforCenter_Platform_GuideCtrlButton_Resize(ctrlEvent,"pre");
}

//下一步
var InforCenter_Platform_GuideCtrlButton_Next = function (ctrlEvent) {
    var containerid = ctrlEvent.o.ContainerID();
    var guideCtrlPage = HoteamUI.Page.Instance(containerid);
    var stepInformation = $("#" + containerid).data("stepInformation");
    InforCenter_Platform_GuideCtrl_SetpChange(guideCtrlPage, stepInformation, "next");
    InforCenter_Platform_GuideCtrlButton_Resize(ctrlEvent,"next");
}

//完成
var InforCenter_Platform_GuideCtrlButton_Finish = function (ctrlEvent) {
    var containerid = ctrlEvent.o.ContainerID();
    var guideCtrlPage = HoteamUI.Page.Instance(containerid);
    var stepInformation = $("#" + containerid).data("stepInformation");
    var issuccess = InforCenter_Platform_GuideCtrl_SetpChange(guideCtrlPage, stepInformation, "finish");
    if (issuccess != false) {
        var ret = InforCenter_Platform_GuideCtrl_Finish(stepInformation.stepData.finish, guideCtrlPage);
        HoteamUI.UIManager.Return(containerid, ret);
    }
}

//重新对导航布局，防止导航太多，部分隐藏
var InforCenter_Platform_GuideCtrlButton_Resize = function (ctrlEvent,step) {
    var containerid = ctrlEvent.o.ContainerID();
    var guidEle = $("#" + containerid).find(".hoteam-navigation-step");
    var selLi = guidEle.children(".hoteam-navigation-step-active");
    var showLi;
    if (step == "next") {
        //获取当前步骤是否有下一步骤
        if (selLi.next().length == 0) {
            showLi = selLi;
        } else {
            showLi = selLi.next();
        }
        //计算showLi在父元素中的位置，并判断是否超出
        var index = showLi.index();
        var width = showLi.outerWidth();
        if ((index+1)*width > guidEle.innerWidth()) {//如果超出
            guidEle.scrollLeft((index+1)*width - guidEle.innerWidth());
        }
    } else {
        //获取当前步骤是否有上一步骤
        if (selLi.prev().length == 0) {
            showLi = selLi;
        } else {
            showLi = selLi.prev();
        }
        //计算showLi在父元素中的位置，并判断是否超出
        var index = showLi.index();
        var width = showLi.outerWidth();
        if (index * width < guidEle.scrollLeft()) {
            guidEle.scrollLeft(index * width);
        }
    }
}

//取消
var InforCenter_Platform_GuideCtrlButton_Cancel = function (ctrlEvent) {
    var containerid = ctrlEvent.o.ContainerID();
    HoteamUI.UIManager.Return(containerid, null);
}