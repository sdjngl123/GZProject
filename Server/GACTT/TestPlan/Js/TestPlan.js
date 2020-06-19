HoteamUI_PageEvent_TESTPLANTASKCREATEOnCreate_after = function (pageEvent) {
    var page = pageEvent.o;
    var para = page.GetPara();
    var projectObj = InforCenter_Platform_Object_GetObjectData(para.ProjectID, para);
    var stageObj = InforCenter_Platform_Object_GetObjectData(para.StageID, para);
    var projectCtrl = page.GetControl('PROJECT_Value');
    var stageCtrl = page.GetControl('STAGE_Value');
    projectCtrl.SetValue(projectObj.EID);
    projectCtrl.SetText(projectObj.ENAME);
    projectCtrl.Disable();
    stageCtrl.SetValue(stageObj.EID);
    stageCtrl.SetText(stageObj.ENAME);
    stageCtrl.Disable();
}

HoteamUI_PageEvent_TESTPLANTASKEDITOnCreate_after = function (pageEvent) {
    var page = pageEvent.o;
    var projectCtrl = page.GetControl('PROJECT_Value');
    var stageCtrl = page.GetControl('STAGE_Value');
    projectCtrl.Disable();
    stageCtrl.Disable();
}