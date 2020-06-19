InforCenter_Platform_PageDesgin_GetInitData = function (pageEvent, objType) {
    var result = null;
    result = HoteamUI_PageEvent_FirstExampleOnCreate_before(pageEvent);
    if (result != undefined && result != null) {
        return result;
    }
    var para = pageEvent.o.GetPara();
    var data = {};
    if (para.hasOwnProperty('ObjectID') && para.ObjectID != '') {
        data = InforCenter_Platform_Object_GetForeignKeyObjectData(para.ObjectID, para);
        data.isNewObject = false;
    } else {
        data = InforCenter_Platform_Object_GetForeignKeyObjectInitData(objType, para);
        data.isNewObject = true;
    }

    if (data.isNewObject) {
        for (var i in data) {
            var tempData = JSON.parse(data[i]);
            if (Array.isArray(tempData)) {
                data[i] = JSON.parse(tempData[0]);
            } else {
                data[i] = tempData;
            }
        }
    } else {
        for (var i in data) {
            if (i != 'mainObjType') {
                if (data[i].length && data.mainObjType != i && i != 'multi') {
                    for (var j in data[i]) {
                        data[i] = JSON.parse(data[i]);
                    }
                }
                else {
                    data[i] = JSON.parse(data[i]);
                }
            }
        }
    }
    return data;
}