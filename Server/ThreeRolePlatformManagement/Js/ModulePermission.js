InforCenter_Platform_ModulePermission_LoadPermisssionTree = function (ctrlEvent) {
    var data = HoteamUI.CallAjax.Call(PlatformUI.WebServicePath, "GetModulePermissionTree", {});

    if (HoteamUI.Common.IsNullOrEmpty(data) == false) {
        if (AppSets.ModulePermissionDisableNav) {
            var disableList = AppSets.ModulePermissionDisableNav.split(';');
            InforCenter_Platform_ModulePermission_ThreeRoleDisableModulePermission(data, disableList);
        }
        ModulePermission.TreeNodeData = data;
        ctrlEvent.o.LoadNodes(null, data);
        ModulePermission.AllTreeNode = InforCenter_Platform_ModulePermission_SetNodePermissionModulePath(ctrlEvent.o);
    }

}

InforCenter_Platform_ModulePermission_ThreeRoleDisableModulePermission = function (data, disableList) {
    if (data && data.length > 0) {
        for (var i = 0; i < data.length; i++) {
            var node = data[i];
            for (var j = 0; j < disableList.length; j++) {
                if (node.Value1 == disableList[j]) {
                    node.ChkDisabled = true;
                    InforCenter_Platform_ModulePermission_ThreeRoleDisableModulePermissionDisable(node);
                } else {
                    InforCenter_Platform_ModulePermission_ThreeRoleDisableModulePermission(node.Children, disableList)
                }
            }
        }
    }
}

InforCenter_Platform_ModulePermission_ThreeRoleDisableModulePermissionDisable = function (node) {
    if (node && node.Children && node.Children.length > 0) {
        for (var i = 0; i < node.Children.length; i++) {
            node.Children[i].ChkDisabled = true;
            InforCenter_Platform_ModulePermission_ThreeRoleDisableModulePermissionDisable(node.Children[i]);
        }
    }
}