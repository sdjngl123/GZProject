//向导生成及首页初始化
var InforCenter_Platform_GuideManagement_PageOnCreate = function (pageEvent) {
    var pagePara = pageEvent.o.GetPara();
    var page = pageEvent.o;
    var guidedata = null;
    var itemName = pagePara.ItemName;
    $.each(GuideManagementListScript, function (index, val) {
        if (val.Name == itemName)
            guidedata = JSON.parse(JSON.stringify(val));
    });
    if (guidedata == null) {

        guidedata = HoteamUI.CallAjax.Call(PlatformUI.WebServicePath, "GetGuideManagement", { para: { Name: itemName } });
        if (guidedata != null)
            GuideManagementListScript.push(guidedata);
    }
    if (guidedata.LoadingJS && typeof window[guidedata.LoadingJS] == "function") {
        try {
            window[guidedata.LoadingJS](page);
        } catch (e) {
            if (window.console) {
                console.error(e.message);
            }
        }
    }

    pagePara = pageEvent.o.GetPara();

    //判断是否隐藏向导中的某些步骤
    if (pagePara.HiddenStep && pagePara.HiddenStep.length > 0 && guidedata.PageList) {
        var steps = pagePara.HiddenStep.split(';').sort();
        var pageList = [];
        for (var i = 0; i < guidedata.PageList.length; i++) {
            var add = true;
            for (var s = 0; s < steps.length; s++) {
                var hs = parseInt(steps[s]);
                if (hs <= guidedata.PageList.length && hs - 1 == i) {
                    //该步骤隐藏
                    add = false;
                    break;
                }
            }
            if (add) {
                pageList.push(guidedata.PageList[i]);
            }
        }

        guidedata.PageList = pageList;
    }
    $.extend(true, guidedata, pagePara);
    if (guidedata != null && guidedata.PageList && guidedata.PageList.length > 0) {
        var guideItems = guidedata.PageList;
        var stepCount = guideItems.length;

        //加载向导栏
        var tab = page.GetControl("GuideManagement_Page");
        var ul = '<ul class="hoteam-navigation-step"></ul>';
        var $ul = $(ul);

        for (var i = 0, l = guideItems.length; i < l; i++) {
            var text = HoteamUI.Language.Lang(guideItems[i].PageTitleDic);
            var width = i == 0 ? "style='width:50%;'" : (i == guideItems.length - 1 ? "style='width:50%;left:0;'" : "");
            if (i === 0 && l === 1) {
                width = "style='width:0;'";
            }
            var li =
                '<li>' +
                '<div class="hoteam-navigation-step-c">' +
                '<div class="hoteam-navigation-step-line" ' + width + '></div>' +
                '<div class="hoteam-navigation-step-img"></div>' +
                '<span class="hoteam-navigation-step-num">' + (i + 1) + '</span>' +
                '</div>' +
                '<div class="hoteam-navigation-step-text">' + text + '</div>' +
                '</li>';
            $ul.append($(li));
            var pagename = guideItems[i].Name;
            var para = {};
            //for (var j in guideItems[i].ParaList) {
            for (var j = 0; j < guideItems[i].ParaList.length; j++) {
                var obj = guideItems[i].ParaList[j];
                para[obj.Name] = obj.Value;
            }
            $.extend(true, pagePara, para);
            tab.AddTab({ pageName: pagename, isSelected: false, delayLoadPage: true, pageParas: pagePara });
        }
        var navid = page.GetControl("GuideManagement_Nav").id;

        $("#" + navid).append($ul);
        if (!guidedata.ShowNav) {
            page.GetControl("GuideManagement_Layout_Main").HiddenPanel(["item1"]);
        }
        //加载及初始化向导首页
        InforCenter_Platform_GuideManagement_ChangeGuide(page, 0, stepCount, guidedata);
        var pageContainer = page.GetControl('GuideManagement_Layout_Button');
        guidedata.PageID = page.pid;
        HoteamUI.Page.SetContainerParas(pageContainer.id, "GuideManagement", guidedata);
    } else {
        var page = pageEvent.o;
        var preButton = page.GetControl("GuideManagement_Button_Pre");
        var nextButton = page.GetControl("GuideManagement_Button_Next");
        var finishButton = page.GetControl("GuideManagement_Button_Finish");
        preButton.Disable();
        nextButton.Disable();
        finishButton.Disable();
    }

}

//向导界面展示控制
var InforCenter_Platform_GuideManagement_ChangeGuide = function (guideCtrlPage, currentStep, stepCount, stepData, steptype, nextPageReload) {
    var navid = guideCtrlPage.GetControl("GuideManagement_Nav").id;
    //向导提示栏
    $("#" + navid).find(">ul>li").each(function (index, val) {
        if (index == currentStep) {
            $(this).addClass("hoteam-navigation-step-active").removeClass("hoteam-navigation-step-finish");
        } else if (index < currentStep) {
            $(this).addClass("hoteam-navigation-step-finish").removeClass("hoteam-navigation-step-active");
        } else {
            $(this).removeClass("hoteam-navigation-step-active").removeClass("hoteam-navigation-step-finish");
        }
    });

    //功能按钮控制
    var preButton = guideCtrlPage.GetControl("GuideManagement_Button_Pre");
    var nextButton = guideCtrlPage.GetControl("GuideManagement_Button_Next");
    var finishButton = guideCtrlPage.GetControl("GuideManagement_Button_Finish");
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
    if (stepData.PageList[currentStep].AllowFinish == true) {
        finishButton.Enable();
    } else {
        if (currentStep != stepCount - 1) {
            finishButton.Disable();
        }
    }

    //加载当前向导页面
    var guidePage = guideCtrlPage.GetControl("GuideManagement_Page");
    var initStepCount = guidePage.GetTabInfoList().length;
    if (currentStep < initStepCount) {
        //页面加载之前的Init方法
        if (steptype != "pre" && steptype != "finish") {
            //未加载或者ReLoad==true时才执行BeforeInit和InitJS方法
            //当上一页强制下一页加载时，也应当执行BeforeInit和InitJS方法
            if (stepData.PageList[currentStep].Reload == true || stepData.PageList[currentStep].HasLoaded != true || nextPageReload == true) {
                var ret = InforCenter_Platform_GuideManagement_ExeBeforeInit(stepData, guideCtrlPage, currentStep);
                var tabInfo = guidePage.GetTabInfoList()[currentStep];
                if (tabInfo) {
                    if (!tabInfo.pageParas) {
                        tabInfo.pageParas = {};
                    }
                    tabInfo.pageParas = $.extend(tabInfo.pageParas, ret);
                    guidePage.UpdateTab(currentStep, tabInfo);

                }
            }

        }
        guidePage.SelectTab(currentStep);
        if (steptype != "pre" && steptype != "finish") {
            if (stepData.PageList[currentStep].Reload == true || stepData.PageList[currentStep].HasLoaded != true || nextPageReload == true) {
                InforCenter_Platform_GuideManagement_ExeInit(stepData, guideCtrlPage, currentStep);
                //设置页面已经加载
                stepData.PageList[currentStep].HasLoaded = true;
            }
        }
        //else {
        //    var pagename = stepData.PageList[currentStep].Name;
        //    guidePage.AddTab({ pageName: pagename, isSelected: true });
        //    //初始化页面
        //    InforCenter_Platform_GuideManagement_ExeInit(stepData, guideCtrlPage, currentStep);

        //}

        stepStack = stepData.stepStack;
        if (!stepStack) {
            stepStack = [];
            stepData.stepStack = stepStack;
        }
        //需要判断是否已经在栈顶
        var length = stepStack.length;
        if (length > 0) {
            if (stepStack[length - 1] != currentStep) {
                stepStack.push(currentStep);
            }
        } else {
            stepStack.push(currentStep);
        }
        $("#" + guideCtrlPage.pid).data("stepInformation", { currentStep: currentStep, stepCount: stepCount, stepData: stepData });
    }
}

//向导流程节点信息控制
var InforCenter_Platform_GuideManagement_SetpChange = function (guideCtrlPage, stepInformation, stepType) {
    var canNext = false;
    var guideCtrlID = guideCtrlPage.pid;
    //获取向导流程节点信息
    if (stepInformation) {
        var returnStepInformation = null;
        //设置流程节点信息
        var currentStep = stepInformation.currentStep;
        var stepCount = stepInformation.stepCount;
        var data = stepInformation.stepData;
        var stack = stepInformation.stepData.stepStack;
        if (stepType == "next") {
            //执行nextStep方法,并判断是否允许执行下一个节点
            canNext = InforCenter_Platform_GuideManagement_ExeNextStep(data.PageList, guideCtrlPage, currentStep);
            if (canNext != false) {
                //可以在SaveJS时判断下一步是否需要强制重新加载
                if (canNext && canNext.NextPageReload == true) {
                    var nextPageReload = true;
                }
                currentStep++;
            } else {
                return canNext;
            }
        }
        else if (stepType == "pre") {
            //去掉当前页
            stack.pop();
            //取上一页为当前页
            var currentStep = stack.pop();

            InforCenter_Platform_GuideManagement_ExePreStep(data, guideCtrlPage, currentStep);
        }
        else if (stepType == "finish") {
            //执行nextStep方法,并判断是否允许执行下一个节点
            var canNext = InforCenter_Platform_GuideManagement_ExeNextStep(data.PageList, guideCtrlPage, currentStep);
            if (canNext == false) {
                return canNext;
            }
        }
        InforCenter_Platform_GuideManagement_ChangeGuide(guideCtrlPage, currentStep, stepCount, data, stepType, nextPageReload);
        return canNext;
    }
}


//加载页面后执行页面自定义Init方法
var InforCenter_Platform_GuideManagement_ExeInit = function (guideItems, guideCtrl, currentStep) {
    if (guideItems.PageList[currentStep] && guideItems.PageList[currentStep].InitJS) {
        var fun = guideItems.PageList[currentStep].InitJS;
        var tab = guideCtrl.GetControl("GuideManagement_Page");
        var pid = $("#" + tab.id + "_Tabs>.content").eq(currentStep).attr("id");
        var prePid = $("#" + tab.id + "_Tabs>.content").eq(currentStep - 1).attr("id");
        if (prePid) {
            var prePage = HoteamUI.Page.Instance(prePid);
        }

        var pages = [];
        $("#" + tab.id + "_Tabs>.content").each(function (index, val) {
            if (index <= currentStep) {
                var pid = val.id;
                var page = HoteamUI.Page.Instance(pid);
                if (page.pid) {
                    var para = page.GetPara();
                    if (!para) {
                        para = {};
                    }
                    para.GuidePagePID = guideCtrl.pid;
                    HoteamUI.Page.SetContainerParas(pid, page.PageName(), para);
                    pages.push(page);
                }
            }
        });

        var page = HoteamUI.Page.Instance(pid);
        try {
            return window[fun](/*当前页*/page, /*上一页*/prePage, /*所有页*/pages);
        } catch (e) {
            if (window.console) {
                console.error(e.message);
            }
        }
    }
}

var InforCenter_Platform_GuideManagement_ExeBeforeInit = function (guideItems, guideCtrl, currentStep) {
    if (guideItems.PageList[currentStep] && guideItems.PageList[currentStep].BeforeInitJS) {
        var fun = guideItems.PageList[currentStep].BeforeInitJS;
        var tab = guideCtrl.GetControl("GuideManagement_Page");
        var prePid = $("#" + tab.id + "_Tabs>.content").eq(currentStep - 1).attr("id");
        if (prePid) {
            var prePage = HoteamUI.Page.Instance(prePid);
        }

        var pages = [];
        $("#" + tab.id + "_Tabs>.content").each(function (index, val) {
            if (index <= currentStep) {
                var pid = val.id;
                var page = HoteamUI.Page.Instance(pid);
                if (page.pid) {
                    var para = page.GetPara();
                    if (!para) {
                        para = {};
                    }
                    para.GuidePagePID = guideCtrl.pid;
                    HoteamUI.Page.SetContainerParas(pid, page.PageName(), para);
                    pages.push(page);
                }
            }
        });
        try {
            return window[fun](/*上一页*/prePage, /*所有页*/pages);
        } catch (e) {
            if (window.console) {
                console.error(e.message);
            }
        }
    }
}

//执行页面自定义nextStep方法
var InforCenter_Platform_GuideManagement_ExeNextStep = function (guideItems, guideCtrl, currentStep) {
    if (guideItems[currentStep] && guideItems[currentStep].SaveJS) {
        var fun = guideItems[currentStep].SaveJS;
        var pages = [];
        var tab = guideCtrl.GetControl("GuideManagement_Page");
        pid = $("#" + tab.id + "_Tabs>.content").each(function (index, val) {
            if (index <= currentStep) {
                var pid = val.id;
                var page = HoteamUI.Page.Instance(pid);
                if (page.pid) {
                    var para = page.GetPara();
                    if (!para) {
                        para = {};
                    }
                    para.GuidePagePID = guideCtrl.pid;
                    HoteamUI.Page.SetContainerParas(pid, para);
                    pages.push(page);
                }
            }
        });
        var currentpid = $("#" + tab.id + "_Tabs>.content").eq(currentStep).attr("id");
        var currentPage = HoteamUI.Page.Instance(currentpid);
        try {
            return window[fun](pages, currentPage);
        } catch (e) {
            if (window.console) {
                console.error(e.message);
            }
        }
    }
}

var InforCenter_Platform_GuideManagement_ExeNextStepByStepNum = function (page, stepNum) {
    var para = page.GetPara();
    if (para) {
        var stepInformation = $("#" + para.GuidePagePID).data("stepInformation");
        var gridePage = HoteamUI.Page.Instance(para.GuidePagePID);
        InforCenter_Platform_GuideManagement_ChangeGuide(gridePage, stepNum, stepInformation.stepData.PageList.length, stepInformation.stepData)
    }
}

//当点击上一步时执行
var InforCenter_Platform_GuideManagement_ExePreStep = function (guideInfo, guideCtrl, currentStep) {
    if (guideInfo && guideInfo.PreJS) {
        var tab = guideCtrl.GetControl("GuideManagement_Page")
        var currentpid = $("#" + tab.id + "_Tabs>.content").eq(currentStep).attr("id");
        var currentPage = HoteamUI.Page.Instance(currentpid);
        try {
            return window[guideInfo.PreJS](currentPage, guideCtrl);
        } catch (e) {
            if (window.console) {
                console.error(e.message);
            }
        }
    }
}

//执行全部完成
var InforCenter_Platform_GuideManagement_Finish = function (finishFuntion, guideCtrl) {
    if (finishFuntion) {
        var tab = guideCtrl.GetControl("GuideManagement_Page");
        var pages = [];
        pid = $("#" + tab.id + "_Tabs>.content").each(function (index, val) {
            var pid = val.id;
            var page = HoteamUI.Page.Instance(pid);
            pages.push(page);
        });
        try {
            return window[finishFuntion](pages, guideCtrl);
        } catch (e) {
            if (window.console) {
                console.error(e.message);
            }
        }
    }
}

var InforCenter_Platform_GuideManagement_Cancel = function (cancelFuntion, guideCtrl) {
    if (cancelFuntion) {
        var tab = guideCtrl.GetControl("GuideManagement_Page");
        var pages = [];
        pid = $("#" + tab.id + "_Tabs>.content").each(function (index, val) {
            var pid = val.id;
            var page = HoteamUI.Page.Instance(pid);
            pages.push(page);
        });
        try {
            return window[cancelFuntion](pages, guideCtrl);
        } catch (e) {
            if (window.console) {
                console.error(e.message);
            }
        }
    }
}

//上一步
var InforCenter_Platform_GuideManagementButton_Pre = function (ctrlEvent) {
    var containerid = ctrlEvent.o.ContainerID();
    var guideCtrlPage = HoteamUI.Page.Instance(containerid);
    var stepInformation = $("#" + containerid).data("stepInformation");
    InforCenter_Platform_GuideManagement_SetpChange(guideCtrlPage, stepInformation, "pre");
    InforCenter_Platform_GuideManagementButton_Resize(ctrlEvent, "pre");
}

//下一步
var InforCenter_Platform_GuideManagementButton_Next = function (ctrlEvent) {
    var containerid = ctrlEvent.o.ContainerID();
    var guideCtrlPage = HoteamUI.Page.Instance(containerid);
    var stepInformation = $("#" + containerid).data("stepInformation");
    InforCenter_Platform_GuideManagement_SetpChange(guideCtrlPage, stepInformation, "next");
    InforCenter_Platform_GuideManagementButton_Resize(ctrlEvent, "next");
}
//重新对导航布局，防止导航太多，部分隐藏
var InforCenter_Platform_GuideManagementButton_Resize = function (ctrlEvent, step) {
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
        if ((index + 1) * width > guidEle.innerWidth()) {//如果超出
            guidEle.scrollLeft((index + 1) * width - guidEle.innerWidth());
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

//完成
var InforCenter_Platform_GuideManagementButton_Finish = function (ctrlEvent) {
    var containerid = ctrlEvent.o.ContainerID();
    var pageContainer = ctrlEvent.o.OtherControl('GuideManagement_Layout_Button');
    para = HoteamUI.Page.GetContainerPara(pageContainer.id);
    var guideCtrlPage = HoteamUI.Page.Instance(containerid);
    var stepInformation = $("#" + containerid).data("stepInformation");
    var issuccess = InforCenter_Platform_GuideManagement_SetpChange(guideCtrlPage, stepInformation, "finish");
    if (issuccess != false) {
        var ret = InforCenter_Platform_GuideManagement_Finish(stepInformation.stepData.SaveJS, guideCtrlPage);
        //内部阻止关闭页面，页面不再执行
        if (ret && ret.CancelClosed == true) {
            return;
        }
        if (para.IsLoopExec)
            ret.IsClose = !para.IsLoopExec;
        HoteamUI.UIManager.Return(containerid, ret);
    } else {
        return;
    }
    if (para.IsLoopExec) {
        var guideItems = para.PageList;
        var stepCount = guideItems.length;
        //加载及初始化向导首页
        //去掉所有页面中是否加载的选项
        if (para.PageList) {
            for (var i = 0; i < para.PageList.length; i++) {
                if (para.PageList[i].HasLoaded) {
                    para.PageList[i].HasLoaded = false;
                }
            }
        }
        InforCenter_Platform_GuideManagement_ChangeGuide(guideCtrlPage, 0, stepCount, para);
    }
}

//取消
var InforCenter_Platform_GuideManagementButton_Cancel = function (ctrlEvent) {
    var containerid = ctrlEvent.o.ContainerID();
    var guideCtrlPage = HoteamUI.Page.Instance(containerid);
    var stepInformation = $("#" + containerid).data("stepInformation");
    if (stepInformation && stepInformation.stepData) {
        var ret = InforCenter_Platform_GuideManagement_Cancel(stepInformation.stepData.CancelJS, guideCtrlPage);
        if (ret && ret.CancelClosed == true) {//取消关闭
            return;
        } else {
            HoteamUI.UIManager.Return(containerid, ret);
        }
    } else {
        HoteamUI.UIManager.Return(containerid, null);
    }
}

InforCenter_Platform_GuideManagement_PageOnClose = function (pageEvent) {
    var containerid = pageEvent.o.pid;
    var guideCtrlPage = pageEvent.o;
    var stepInformation = $("#" + containerid).data("stepInformation");
    if (stepInformation && stepInformation.stepData) {
        var ret = InforCenter_Platform_GuideManagement_Cancel(stepInformation.stepData.CancelJS, guideCtrlPage);
        var closeRet = {};
        closeRet.result = ret;
        if (ret && ret.CancelClosed == true) {
            closeRet.close = false;
        }
    }
    return closeRet;
    //HoteamUI.UIManager.Return(containerid, ret);
}