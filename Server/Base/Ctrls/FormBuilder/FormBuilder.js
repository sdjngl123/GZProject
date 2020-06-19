HoteamUI.Control.OFormBuilder = {
    Create: function (options) {
        options = options || {};
        var parentId = this.id;
        var id = this.GetId();
        var controlInfo = options.controlInfo || this.ControlInfo();
        var o = $.extend({}, $.hoteamFormBuilder.defaults, controlInfo.CtrlOptions);
        o.parentId = parentId;
        o.id = id;
        o.language = HoteamUI.Language.CurLanguage;
        if (o.language == "zhs") {
            o.language = "zh-CN";
        }
        o.handlers = {};
        o.ctrlEvent = {};
        o.ctrlEvent.o = this;
        var settings = controlInfo.Settings;
        if (settings) {
            for (var index in settings) {
                if (settings[index].Key == 'pattern') {
                    o.pattern = settings[index].Value;
                } else if (settings[index].Key == 'position') {
                    o.position = settings[index].Value;
                }
            }
        }
        //记录事件
        var handlers = (options.controlInfo || this.ControlInfo()).PageHandlers;
        for (var i = 0; i < handlers.length; i++) {
            var item = handlers[i];
            switch (item.HandlerName) {
                case "GetData":
                    o.handlers.GetData = this.GetEventFunctionName("GetData");
                    break;
                case "GetAddRowsDataId":
                    o.handlers.GetAddRowsDataId = this.GetEventFunctionName("GetAddRowsDataId");
                default: break;
            }
        }
        //存一下表单模式
        formBuliderFun.formBuliderPattern = o.pattern;
        formBuliderFun.singleControls = [];
        //设计模式
        if (o.pattern == "design") {
            $.hoteamFormBuilder.designcreate(o);
        }
            //填报和浏览模式
        else {
            var controls = [];
            var controlID = controlInfo.ControlID;
            $.each(options.pageconfig.PageControls, function (index, value) {
                if (value.ParentID == controlID) {
                    //解析成平台控件初始化所需格式
                    var CtrlOptions = {};
                    HoteamUI.Common.ConverSettings(value.Settings, CtrlOptions, CtrlOptions);
                    value.CtrlOptions = CtrlOptions;
                    value.containerid = options.containerid;
                    value.pagename = options.pagename;
                    controls.push(value);
                }
            });
            o.pageOptions = options;
            return $.hoteamFormBuilder[(options.pattern || o.pattern) + "create"](o, controls);
        }
    },
    //插入行之后回调函数
    setControlsValue: function (id, controlsData) {

    },
    //填报/编辑模式，保存时取值
    getControlsValue: function () {
        var saveCtrlsData = $("#" + this.GetId()).data("SaveData");
        return formBuliderFun.commonGetValue(saveCtrlsData);
    },
    GetDesignData: function () {
        var data = $.hoteamFormBuilder.savedesigndata(this.GetId());
        return data;
    },
    GetApplyingDataByCtrlId: function (id) {
        var ctrl;

        ctrl = $("#" + this.GetId).find("#" + id);
        if (ctrl.length) {
            return $("#" + opt.id).formbuilder("getDataByCell", ctrl.closest("td"));
        }

        return null;
    },
    GetId: function () {
        return this.id + "_FormBuilder";
    },
    //增加行接口,现在不用
    AddRow: function (options) {
        //$.hoteamFormBuilder.addRow(options);
    },
    Resize: function () {
        $.hoteamFormBuilder.resize(this.GetId());
    },
    SetData: function (data) {
        var toolbox = $.hoteamFormBuilder.initToolBox(data.TemplateData);

        if (data && data.TemporaryData) {
            position = JSON.parse(data.TemporaryData);
            desginData = $.hoteamFormBuilder.initDesginData(position, JSON.parse(data.DesignControlData), toolbox);
        }
        //增加扩展菜单按钮：权限设置
        //19797 李金岳
        //var menu = ["setpermission", "setflowtaskpermission", "selectFormUI"];
        var menu = ["setflowtaskpermission", "selectFormUI"];
        var menuorder = $.formbuilder.config.menu.order.concat(menu);
        $("#" + opt.id).formbuilder({
            control: { order: toolbox.order },
            menu: {
                order: menuorder,
                type: "replace"
            },
            toolbox: toolbox.tool,
            data: desginData,
            pattern: opt.pattern,
            url: { images: opt.url.images },
            language: opt.language,
            autoResize: false
        });
        this.resize(opt.id);
    },
    GetExportData: function () {
        return $("#" + this.GetId()).formbuilder("export");
    }
};


{
    (function ($) {
        $.hoteamFormBuilder = {
            defaults: {
                pattern: "design",
                url: {
                    images: "../Base/Ctrls/FormBuilder/formbuilder/images/"
                }
            },
            //主从表标记
            isOnlyMain: true,
            dawGeneratorData: {},
            //元组件配置格式转换
            getOption: function (item, option) {
                var settingItem = {};
                var settings = JSON.parse(item.Content.EDITCONTENT).Settings;
                if (settings) {
                    $.each(settings, function (i, value) {
                        if (value.Key == "type") {
                            return;
                        } else if (value.Key == "position") {
                            value.Key = "align";
                        } else if (value.Key == "src" && value.Value != "") {
                            value.Key = "value";
                        }
                        settingItem[value.Key] = value.Value;
                    });
                }
                option = $.extend(settingItem, option);
                return option;
            },
            //初始化元组件工具栏
            initToolBox: function (datalist) {
                var _this = this;
                //判断是不是主从表
                if (datalist.length > 3) {
                    _this.isOnlyMain = false;
                } else {
                    _this.isOnlyMain = true;
                }
                var key, type, tools = {}, orderlist = [], controls;
                $.each(datalist, function (i, data) {
                    var order = {};
                    controls = JSON.parse(data.PropertyControlData);
                    order.text = data.ObjTypeText;
                    order.children = [];
                    $.each(controls, function (index, item) {
                        type = item.DisposeType;
                        var newItem = $.extend(true, {}, InforCenter_Platform_FormBuilder_Generator[type]);
                        if (Object.keys(newItem).length > 0) {
                            newItem.title = item.Text;
                            newItem.icon = "../platform/Image/FormBuilder/" + type + ".png";
                            newItem.options.generatorType = type;
                            newItem.options.item = item;
                            newItem.options.objTypeName = data.ObjTypeName;
                            newItem.options.Master = data.Master;
                            newItem.options.MasterType = data.MasterType;
                            if (data.Master == true) {
                                //业务要求：主模型元组件不能自动复制
                                newItem.property.copyrownumber.hidden = true;
                            }
                            newItem.options.objTypeText = data.ObjTypeText;
                            if (type == "LabelValue" || type == "CustomLabel") {
                                newItem.options.value = item.Text;
                                //多语言设置
                                if (type === "LabelValue") {
                                    newItem.options.value = "";
                                    var i18n = {
                                        "en": item.Value,
                                        "zh-CN": item.Text
                                    };

                                    newItem.options.i18n = i18n;

                                }
                            }
                            if (type !== "ImageUploadValue") {
                                newItem.options = _this.getOption(item, newItem.options);
                            }
                            //元组件唯一标识
                            key = data.ObjTypeName + "|" + item.InfoType + "|" + type;
                            if (type == "ImageValue") {
                                $.formbuilder.menucontrol["add-image"].controlType = key;
                            }
                            tools[key] = newItem;
                            order.children.push(key);
                        }
                    });
                    orderlist.push(order);
                });
                var toolbox = {};
                toolbox.tool = tools;
                toolbox.order = orderlist;
                return toolbox;
            },
            //显示设计模式视图
            initDesginData: function (position, controls, tools) {
                var _this = this;
                if (controls && controls.length > 0) {
                    var controlList = position.controls;
                    var row, cell, option, settingItem = {}, newItem, controlItems, isExist;
                    for (var i = 0, len = controlList.length; i < len; i++) {
                        cell = controlList[i];
                        isExist = false;
                        if (Object.keys(cell).length > 0) {
                            $.each(tools.tool, function (key) {
                                //通过唯一标识判断单元格内的元组件是否在工具栏中存在
                                if (cell.type === key) {
                                    isExist = true;
                                    return false;
                                }
                            });
                            if (isExist) {
                                $.each(controls, function (t, value) {
                                    controlItems = JSON.parse(value.PropertyControlData);
                                    $.each(controlItems, function (m, e) {
                                        if (e.Gid == cell.gid) {
                                            option = cell;
                                            option.item = e;
                                            controlList[i] = _this.getOption(e, option);
                                            if (option.generatorType == "CustomLabel") {
                                                controlList[i].value = controlList[i].value;
                                            }
                                        }
                                    });
                                });
                            }
                                //不存在，单元格内元组件清空
                            else {
                                cell = {};
                                controlList[i] = {};
                            }
                        }
                    }
                    position.controls = controlList;
                }
                return position;
            },
            designcreate: function (opt) {
                var id = opt.id;
                var container = $("#" + opt.parentId);
                container.append("<div class='' id='" + opt.id + "'></div>");
                //获取加载数据
                var data, position, desginData = {};
                if (opt.handlers.GetData) {
                    var ctrlEvent = opt.ctrlEvent;
                    data = HoteamUI.Common.ExeFunction(opt.handlers.GetData, ctrlEvent);
                }
                var toolbox = this.initToolBox(data.TemplateData);
                this.dawGeneratorData = toolbox.tool;
                if (data && data.TemporaryData) {
                    position = JSON.parse(data.TemporaryData);
                    desginData = this.initDesginData(position, JSON.parse(data.DesignControlData), toolbox);
                }
                //增加扩展菜单按钮：权限设置
                //19797 李金岳
                var menu = ["setflowtaskpermission", "selectFormUI"];
                var menuorder = $.formbuilder.config.menu.order.concat(menu);

                //替换数据
                if (JSON.stringify(desginData) != "{}") {
                    for (var p = 0, lenp = desginData.controls.length; p < lenp; p++) {
                        var typeName = '';
                        if (desginData.controls[p].type) {
                            typeName = desginData.controls[p].type
                        }

                        for (bojName in toolbox.tool) {
                            if (typeName == bojName) {
                                desginData.controls[p].item.Content.VIEWSCRIPT = toolbox.tool[bojName].options.item.Content.VIEWSCRIPT;
                            }
                        }
                        //}
                    }
                }


                $("#" + opt.id).formbuilder({
                    control: { order: toolbox.order },
                    menu: {
                        order: menuorder,
                        type: "replace"
                    },
                    toolbox: toolbox.tool,
                    data: desginData,
                    pattern: opt.pattern,
                    url: { images: opt.url.images },
                    language: opt.language,
                    autoResize: false
                });
                this.resize(opt.id);
            },
            //替换 cell.item.Content
            replaceContent: function (cell) {
                var Content, _this = this;
                for (cellName in _this.dawGeneratorData) {
                    if (cell.type == cellName) {
                        Content = _this.dawGeneratorData[cellName].options.item.Content;
                    }
                }
                return Content;
            },
            //把平台控件格式替换为formbulider格式
            replaceWidthControlFormat: function (content, cell) {
                content.EDITCONTENT = JSON.parse(content.EDITCONTENT);
                if (content.EDITCONTENT instanceof Array) {
                    for (var q = 0, lenq = content.EDITCONTENT.length; q < lenq; q++) {
                        //循环替换settings里面的key
                        $.each(content.EDITCONTENT[q], function (k, e) {
                            if (e.Key == "type") {
                                return;
                            } else if (e.Key == "position") {
                                e.Value = cell.align;
                            }
                            else if (e.Key == "align") {
                                e.Value = cell["text-align"];
                            }
                            else {
                                e.Value = cell[e.Key];
                            }
                        });
                    }
                    content.EDITCONTENT = JSON.stringify(content.EDITCONTENT);
                    content.PageControls = content.EDITCONTENT;
                } else {//普通单个控件
                    if (content.EDITCONTENT.Settings) {
                        settings = content.EDITCONTENT.Settings;
                        //判断选择列表的时候，把设置列的值放进去
                        if (cell.ColNum) {
                            settings.push({ Key: "ColNum", Value: cell["ColNum"] })
                        }

                        $.each(settings, function (k, e) {
                            if (e.Key == "type") {
                                return;
                            } else if (e.Key == "position") {
                                e.Value = cell.align;
                            }
                            else if (e.Key == "align") {
                                e.Value = cell["text-align"];
                            } else if (e.Key == "regex" || e.Key == "regextipId" || e.Key == "textId") {
                                if ($.trim(cell[e.Key]) != "") {
                                    e.Value = $.trim(cell[e.Key]);
                                }
                            }
                            else {
                                e.Value = cell[e.Key];
                            }
                        });
                    }

                    content.EDITCONTENT.Settings = settings;
                    content.EDITCONTENT = JSON.stringify(content.EDITCONTENT);

                    content.SHOWCONTENT = JSON.parse(content.SHOWCONTENT);
                    content.SHOWCONTENT.Settings = settings;
                    content.SHOWCONTENT = JSON.stringify(content.SHOWCONTENT);

                    content.VIEWCONTENT = JSON.parse(content.VIEWCONTENT);
                    content.VIEWCONTENT.Settings = settings;
                    content.VIEWCONTENT = JSON.stringify(content.VIEWCONTENT);
                }
                return content;
            },
            //统计类型重复的元组件个数
            statisticalNumber: function (businessTools, type) {
                var number = 0, statisticalNumberObj = {};
                if (businessTools[type] == undefined) {
                    businessTools[type] = 0;
                } else {
                    businessTools[type] = businessTools[type] + 1;
                }
                statisticalNumberObj.number = businessTools[type];
                statisticalNumberObj.businessTools = businessTools;
                return statisticalNumberObj;
            },
            //把cell里面的gid 按照规则替换
            replaceCellGid: function (cell, content, mainTypeNameObj, typeNameObj) {
                var _this = this, cellAndData = {};
                cell.item.Gid = null;
                delete cell.gid;
                //给每个元组件添加生成页面所需控件标识，并替换到生成语句中
                if (cell.item.Gid == null) {
                    //根据typ计算控件个数
                    var typeName = cell.type;
                    if (cell.Master == true) {
                        if (mainTypeNameObj[typeName] == undefined) {
                            mainTypeNameObj[typeName] = [];
                            mainTypeNameObj[typeName].push(typeName);
                        } else {
                            mainTypeNameObj[typeName].push(typeName);
                        }
                    } else {
                        if (typeNameObj[typeName] == undefined) {
                            typeNameObj[typeName] = [];
                            typeNameObj[typeName].push(typeName);
                        } else {
                            typeNameObj[typeName].push(typeName);
                        }
                    }

                    //只有主模型的时候
                    if (_this.isOnlyMain == true) {
                        if (mainTypeNameObj[cell.type] && mainTypeNameObj[cell.type].length > 1) {
                            if (cell.item.DisposeType.indexOf("Label") > -1) {
                                cell.item.Gid = cell.item.InfoType + "_" + mainTypeNameObj[cell.type].length + "_Label";
                            } else {
                                cell.item.Gid = cell.item.InfoType + "_" + mainTypeNameObj[cell.type].length + "_Value";
                            }

                        } else if (typeNameObj[cell.type] && typeNameObj[cell.type].length > 1) {
                            if (cell.item.DisposeType.indexOf("Label") > -1) {
                                cell.item.Gid = cell.item.InfoType + "_" + typeNameObj[cell.type].length + "_Label";
                            } else {
                                cell.item.Gid = cell.item.InfoType + "_" + typeNameObj[cell.type].length + "_Value";
                            }
                        } else {
                            if (cell.item.DisposeType.indexOf("Label") > -1) {
                                cell.item.Gid = cell.item.InfoType + "_Label";
                            } else {
                                cell.item.Gid = cell.item.InfoType + "_Value";
                            }
                        }
                        //主从都有的时候
                    } else if (_this.isOnlyMain == false) {
                        if (cell.Master == true) {
                            if (mainTypeNameObj[cell.type] && mainTypeNameObj[cell.type].length > 1) {
                                if (cell.item.DisposeType.indexOf("Label") > -1) {
                                    cell.item.Gid = cell.item.InfoType + "_" + mainTypeNameObj[cell.type].length + "_Label";
                                } else {
                                    cell.item.Gid = cell.objTypeName + cell.item.InfoType + "_" + mainTypeNameObj[cell.type].length + "_Value";
                                }
                            } else {
                                if (cell.item.DisposeType.indexOf("Label") > -1) {
                                    cell.item.Gid = cell.item.InfoType + "_Label";
                                } else {
                                    cell.item.Gid = cell.objTypeName + cell.item.InfoType + "_Value";
                                }
                            }
                        } else {
                            $.each(content, function (key) {
                                var order = 0;
                                if (cell.item.Order != null) {
                                    order = cell.item.Order;
                                }
                            });
                            var order = 0;
                            if (cell.item.Order != null) {
                                order = cell.item.Order;
                            }
                            if (typeNameObj[cell.type] && typeNameObj[cell.type].length > 1) {
                                if (cell.item.DisposeType.indexOf("Label") > -1) {
                                    cell.item.Gid = cell.objTypeName + cell.item.InfoType + "_" + typeNameObj[cell.type].length + "_Label";
                                } else {
                                    cell.item.Gid = cell.objTypeName + order + cell.item.InfoType + "_" + typeNameObj[cell.type].length + "_Value";
                                }
                            } else {
                                if (cell.item.DisposeType.indexOf("Label") > -1) {
                                    cell.item.Gid = cell.objTypeName + cell.item.InfoType + "_Label";
                                } else {
                                    cell.item.Gid = cell.objTypeName + order + cell.item.InfoType + "_Value";
                                }
                            }

                        }
                    }
                }
                cell.gid = cell.item.Gid;
                cell.item.Content = content;
                cellAndData.cell = cell;
                cellAndData.mainTypeNameObj = mainTypeNameObj;
                cellAndData.typeNameObj = typeNameObj;
                return cellAndData;
            },
            //设置元组件权限
            setPermissionData: function (controlItem, isPermissionControl) {
                var allPermissionData = {};
                //业务：类型为LabelValue、CustomLabel的元组件不设置权限
                if (controlItem.generatorType == "LabelValue" || controlItem.generatorType == "CustomLabel") {
                    isPermissionControl = false;
                    allPermissionData.isPermissionControl = false;
                }
                //记录各元组件权限数据
                if (isPermissionControl) {
                    //记录各元组件流程权限数据
                    allPermissionData.permissionActorID = controlItem.permissionActorID;
                    allPermissionData.flowTaskPermissionActorID = controlItem.flowTaskPermissionActorID;
                }
                return allPermissionData;
            },
            //获取从表的每一行的第一个元件的gid，allControlsDatas是二维数组
            /*
            从template数据中取每个数据集的id
            */
            getAssistantGid: function (data) {
                var templateData = data.datasets.template;
                var starpositionId = [];
                var starpositionIdObj = {};
                if (templateData) {
                    for (var key in templateData) {
                        var keyName = templateData[key][0]["objTypeName"];
                        if (starpositionIdObj[keyName]) {
                            starpositionIdObj[keyName].push(templateData[key][0]["id"]);
                        } else {
                            starpositionIdObj[keyName] = [];
                            starpositionIdObj[keyName].push(templateData[key][0]["id"]);
                        }
                        //starpositionId.push(starpositionIdObj);
                    }
                }
                return JSON.stringify(starpositionIdObj);


                /*var arrayData = [], assistantGidObj = {};
                if (allControlsData && allControlsData.length > 0) {
                    for (var i = 0, leni = allControlsData.length; i < leni; i++) {
                        var allControlsDatai = allControlsData[i];
                        if (allControlsDatai.Master == false && allControlsDatai.generatorType != "LabelValue" && allControlsDatai.generatorType != "CustomLabel" && allControlsDatai.objTypeName != "CommonTool" && allControlsDatai.objTypeName != "ContainerTool") {
                            arrayData.push(allControlsDatai);
                        }
                    }
                };
                //根据从表名称进行分类
                var classifyData = formBuliderFun.classify(arrayData, "objTypeName");
                //把分完类的数据按照坐标进行排序,并取出对应数据
                if (classifyData && classifyData.length > 0) {
                    for (var i = 0, leni = classifyData.length; i < leni; i++) {
                        var sortArray = formBuliderFun.setSort(classifyData[i].data);
                        assistantGidObj[classifyData[i].objTypeName] = sortArray[0].gid;//objTypeName从表名称
                    }
                }
                return JSON.stringify(assistantGidObj);*/
            },
            //保存设计模式布局信息
            savedesigndata: function (id) {
                var _this = this;
                var propertyControlData = [], designControlData = [], group = [], groupname, content, settings, result = {}, permissionData = {}, flowTaskPermissionData = {}, businessTools = {}, typeNameObj = {}, mainTypeNameObj = {};
                //设计模式布局
                var data = $("#" + id).formbuilder("data");

                var controlList = data.controls;
                var controlItems = $.extend(true, [], controlList);
                //填报模式布局
                var temporaryData = $.extend(true, {}, data);
                var temporaryItems = [], rows = data.table.rows, columns = data.table.columns;
                temporaryItems = JSON.parse(JSON.stringify(controlItems));

                //把自定义表单元组件属性格式转换为平台控件setting项格式
                for (var i = 0, len = controlList.length; i < len; i++) {
                    var copyList = [], copyItem = {}, copyrownumber, isPermissionControl = true;
                    cell = controlList[i];
                    if (Object.keys(cell).length > 0) {
                        //替换 cell.item.Content
                        if (JSON.stringify(_this.dawGeneratorData) !== "{}") {
                            cell.item.Content = _this.replaceContent(cell);
                        }
                        content = $.extend(true, {}, cell.item.Content);

                        //平台控件格式为formbulider格式
                        content = _this.replaceWidthControlFormat(content, cell);
                        var statisticalNumberObj = _this.statisticalNumber(businessTools, cell.type);
                        cell.item.Order = statisticalNumberObj.number;
                        businessTools = statisticalNumberObj.businessTools;
                        copyrownumber = cell.copyrownumber;
                        //替换cell里面的唯一标示gid
                        cell = _this.replaceCellGid(cell, content, mainTypeNameObj, typeNameObj).cell;

                        controlItems[i] = { gid: cell.item.Gid };
                        var cellItem = $.extend(true, {}, cell);

                        cellItem.InfoType = cellItem.item.InfoType;
                        delete cellItem.item;

                        controlItems[i] = $.extend(true, controlItems[i], cellItem);

                        //记录各元组件权限数据
                        var allPermissionData = _this.setPermissionData(controlItems[i], isPermissionControl);
                        permissionData[controlItems[i].gid] = allPermissionData.permissionActorID;
                        flowTaskPermissionData[controlItems[i].gid] = allPermissionData.flowTaskPermissionActorID;

                        if (allPermissionData.isPermissionControl) {
                            isPermissionControl = allPermissionData.isPermissionControl;
                        }

                        //自动复制元组件，存到编辑模式布局信息中
                        temporaryItems[i] = $.extend(true, {}, controlItems[i]);
                        groupname = cell.objTypeName;
                        copyList.push(cell.item);
                        //拼成后台所需格式
                        toPlatformNeed();
                    }
                    else {
                        controlItems[i] = {};
                    }
                }


                $.each(designControlData, function (t, value) {
                    value.propertyControlData = JSON.stringify(value.propertyControlData);
                });

                result.DesignControlData = designControlData;//业务组件信息
                data.controls = controlItems;
                result.TemporaryData = JSON.stringify(data);//设计布局
                temporaryData.controls = temporaryItems;
                //增加每个从表第一个元件的gid
                result.AssistantGid = this.getAssistantGid(data);
                result.LayoutData = JSON.stringify(temporaryData);//填报布局
                result.PermissionData = permissionData;//权限数据
                result.FlowTaskPermissionData = flowTaskPermissionData;//流程权限数据
                return result;

                //复制控件
                function copyControls() {
                    if (copyrownumber > 1) {
                        controlItems[i].copyrownumber = copyrownumber;
                        var reg = new RegExp(cell.item.Gid, "g");
                        for (var k = 1, lenk = cell.copyrownumber - i; k < lenk; k++) {
                            copyItem = $.extend(true, {}, cell);
                            copyItem.copyrownumber = null;
                            copyItem.item.Order = k + copyItem.item.Order;
                            businessTools[cell.type] = copyItem.item.Order;
                            //复制出的元组件生成新的控件ID
                            var cgid = HoteamUI.UIManager.NewGUID();
                            copyItem.item.Gid = cgid;
                            temporaryItems[i + k] = $.extend(true, {}, controlItems[i]);
                            temporaryItems[i + k].gid = cgid;
                            temporaryItems[i + k].copyrownumber = null;
                            //把生成语句中的控件ID替换为新的控件ID
                            copyItem.item.Content = JSON.parse(JSON.stringify(copyItem.item.Content).replace(reg, cgid));
                            copyList.push(copyItem.item);
                            if (isPermissionControl) {
                                permissionData[cgid] = temporaryItems[i + k].permissionActorID;
                                flowTaskPermissionData[cgid] = temporaryItems[i + k].permissionActorID;
                            }
                        }
                    }
                };

                //拼成后台所需格式
                function toPlatformNeed() {
                    if (group.indexOf(groupname) < 0) {
                        designControlData.push({
                            ObjTypeName: cell.objTypeName,
                            ObjTypeText: cell.objTypeText,
                            Master: cell.Master,
                            propertyControlData: copyList
                        });
                        group.push(groupname);
                    } else {
                        for (var t = 0; t < designControlData.length; t++) {
                            if (designControlData[t].ObjTypeName == groupname) {
                                designControlData[t].propertyControlData = designControlData[t].propertyControlData.concat(copyList);
                                break;
                            }
                        }
                    }
                };

            },
            //初始化填报模式工具元件、格式化视图布局信息
            initApplyingData: function (builderInfo, platformCtrlInfo) {
                //清空缓存数据
                formBuliderFun.getNewIdByNum = {};
                formBuliderFun.objTypeAndEidObj = [];
                var result = {}, tools = {};
                if (platformCtrlInfo && platformCtrlInfo.length > 0) {
                    //表单控件信息，二维数组
                    var controlList = builderInfo.controls;
                    var row, cell, newItem, gid;
                    for (var i = 0, len = controlList.length; i < len; i++) {
                        cell = controlList[i];
                        if (Object.keys(cell).length > 0) {
                            //遍历元件原始配置信息
                            $.each(platformCtrlInfo, function (t, value) {
                                gid = value.ControlID;
                                //查找表单控件对应的平台控件配置信息
                                if (gid == (cell.gid)) {
                                    //创建元件
                                    newItem = $.extend(true, {}, InforCenter_Platform_FormBuilder_Generator[cell.generatorType]);
                                    //如果不是浏览模式则合并配置项
                                    if (formBuliderFun.formBuliderPattern !== 'view') {
                                        newItem.property = $.extend(newItem.property, newItem.applyingproperty);
                                    }
                                    tools[cell.type] = newItem;
                                    //设置元件默认配置信息
                                    var settings = value.CtrlOptions;
                                    $.each(settings, function (key) {
                                        if (key == "type") {
                                            return;
                                        } else if (key == "position") {
                                            cell.align = settings[key];
                                        }
                                        else {
                                            cell[key] = settings[key];
                                        }
                                    });
                                    cell.controlInfo = value;
                                    controlList[i] = cell;
                                }
                            });
                        }
                    }
                    builderInfo.controls = controlList;
                }
                result.tool = tools;
                result.applyingData = builderInfo;
                return result;
            },
            //插入行数据
            addRow: function (options, datasetsTemplate, saveCtrlsData) {
                var _this = this;
                var insertData = [];
                var formBuliderId = saveCtrlsData.formBuliderId;
                //筛选数据，组成数组调用黄庆接口
                var returnInsertControlData;
                if (options && options.length > 0) {
                    formBuliderFun.allData = options;
                    //把王超给的数据按照从表名称分组
                    var secondaryTableDataArr = formBuliderFun.getSecondaryTableDataArr(options);
                    //把王超给的数据按照页分组
                    var pageData = formBuliderFun.getPageDataGroup(secondaryTableDataArr);
                    //组织成传递的格式
                    var needData = formBuliderFun.getNeedDataArr(pageData, datasetsTemplate, saveCtrlsData);
                    insertData = insertData.concat(needData);
                } else if (options == undefined) {
                    //填写的时候，需要插入一行
                    insertData = _this.getInsertCtrlsId(saveCtrlsData);
                }
                return insertData;
            },
            //处理插入行没有数据时
            getInsertCtrlsId: function (saveCtrlsData) {
                var datasetTemplate = saveCtrlsData.datasetTemplate;
                var controlsIdArr = [];
                var newObj = {};
                if (datasetTemplate) {
                    for (var key in datasetTemplate) {
                        newObj.id = key
                        newObj.rows = [1];
                        controlsIdArr.push(newObj);
                    }
                }
                return controlsIdArr;
            },
            //用于存储数据
            //saveCtrlsData: {},
            getAddRowsDataid: function (id) {

            },
            getSaveData: function (id) {
                return $("#" + id).data("SaveData");
            },
            setSaveData: function (id, data) {
                $("#" + id).data("SaveData", data);
            },
            getOnlyMainFormData: function (data, newData) {
                var _value;
                for (var i = 0; i < newData.length; i++) {
                    var newDatai = newData[i];
                    for (var type in newDatai) {
                        if (typeof newDatai[type] != "object") {
                            for (var j = 0; j < data.length; j++) {
                                var dataj = data[j];
                                //排除静态lable原件
                                for (var oldType in dataj) {
                                    if (dataj[oldType] == type && dataj.generatorType != "LabelValue"
                                        && dataj.Master && dataj.generatorType != "CustomLabel") {
                                        if (formBuliderFun.formBuliderPattern == "view") {
                                            //单独处理Timevalue
                                            if (dataj.generatorType == 'TimeValue') {
                                                dataj.value = InforCenter_Platform_Object_IntToTimeFormat(newDatai[type]);
                                            } else {
                                                dataj.value = newDatai[type + '_DisplayValue'];
                                            }

                                        } else {
                                            if (dataj.Master) {
                                                dataj.value = newDatai[type];
                                            }
                                        }
                                        dataj.text = newDatai[type + '_DisplayValue'];

                                    }
                                    else {
                                        //根据name值，动态填充数据
                                        if (dataj.name) {
                                            _value = newDatai[dataj.name];
                                            dataj.value = _value;
                                            dataj.text = _value;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                return data;
            },
            //数组去重
            deleteRepeat: function (array) {
                var newArray = new Array();
                var newArrayData = new Array();
                if (array && array.length > 0) {
                    for (var i = 0, leni = array.length; i < leni; i++) {
                        if (newArray.indexOf(array[i].gid) == -1) {
                            newArray.push(array[i].gid);
                            newArrayData.push(array[i]);
                        }

                    }
                }
                return newArrayData;
            },
            applyingcreate: function (opt, platformCtrlInfo) {
                var id = opt.id;
                var container = $("#" + opt.parentId);
                container.append("<div class='' id='" + opt.id + "'></div>");

                var saveCtrlsData = {};
                var applyingData = this.converApplyingData(opt, platformCtrlInfo, id);
                var data = applyingData.data;
                var saveCtrlsData = applyingData.saveCtrlsData;
                var setControlsValue = opt.ctrlEvent.o.setControlsValue;
                this.setSaveData(id, saveCtrlsData);
                $("#" + opt.id).formbuilder({
                    control: { order: [] },
                    toolbox: data.tool,
                    data: data.applyingData,
                    pattern: opt.pattern,
                    //events: { updateDatasets: setControlsValue },回调事件
                    url: { images: opt.url.images },
                    language: opt.language,
                    autoResize: false,
                    paging: true
                });
                this.resize(opt.id);
            },
            viewcreate: function (opt, platformCtrlInfo) {
                this.applyingcreate(opt, platformCtrlInfo);
            },
            exportcreate: function (opt, platformCtrlInfo) {
                var id = opt.id;
                opt.ctrlEvent.isExport = true;
                var applyingData = this.converApplyingData(opt, platformCtrlInfo, id);
                var data = applyingData.data;
                return $.formbuilder.export(data.applyingData);
            },
            converApplyingData: function (opt, platformCtrlInfo, id) {
                var _this = this, AddRowsDataId, addRowsData, saveCtrlsData = {};

                var builderInfo = JSON.parse(opt.position);
                var data = _this.initApplyingData(builderInfo, platformCtrlInfo);
                if (opt.handlers.GetAddRowsDataId) {
                    var ctrlEvent = opt.ctrlEvent;
                    ctrlEvent = $.extend(opt.pageOptions, ctrlEvent);
                    AddRowsDataId = HoteamUI.Common.ExeFunction(opt.handlers.GetAddRowsDataId, ctrlEvent);
                }
                //清空存放已经对应的eid
                formBuliderFun.haveSetValueDataEid = [];
                formBuliderFun.allData = {};
                //存储数据集数据
                saveCtrlsData.datasetTemplate = data.applyingData.datasets.template;
                //把起始数据存储，用于根据startPosition查找控件id
                saveCtrlsData.ctrlsData = data.applyingData.controls;
                //存储formbulider的id,在插入行的时候使用
                saveCtrlsData.formBuliderId = id;
                //通过判断AddRowsDataId来判断
                if (AddRowsDataId) {
                    var ctrlEvent = opt.ctrlEvent;
                    ctrlEvent = $.extend(opt.pageOptions, ctrlEvent);
                    addRowsData = InforCenter_Platform_FormBuilder_GetChildData(AddRowsDataId, ctrlEvent);
                    saveCtrlsData.addRowsData = addRowsData;
                    //处理需要插入的数据，合并到首次渲染页面的data里面
                    //避免返回数组里面是null
                    if (addRowsData && addRowsData[0] != null) {
                        //把controls存储一下，用于对比从表里面单独的控件
                        formBuliderFun.dataApplyingDataControls = data.applyingData.controls;

                        data.applyingData.datasets.data = _this.addRow(addRowsData, saveCtrlsData.datasetTemplate, saveCtrlsData);
                        //处理只有主表时候主表的数据,只有主表的时候，可以不用合并
                        _this.getOnlyMainFormData(data.applyingData.controls, addRowsData);
                    }

                } else {
                    data.applyingData.datasets.data = data.applyingData.datasets.data.concat(_this.addRow(addRowsData, null, saveCtrlsData));
                }

                return {
                    data: data,
                    saveCtrlsData: saveCtrlsData
                };

            },
            resize: function (id) {
                var control = $("#" + id);
                var height = control.parent().parent().height();
                var width = control.parent().parent().width();
                control.formbuilder('resize', {
                    width: width - 2,
                    height: height
                });
            },
            export: function (options) {
                var result,
                    OFormbuilder,
                    data;

                options.pattern = "export";
                OFormbuilder = $.extend(true, {}, HoteamUI.Control.BaseControl, HoteamUI.Control.OFormBuilder, {
                    Options: options,
                    PageName: function () {
                        return this.Options.controlInfo.pagename;
                    },
                    CID: function () {
                        return this.Options.controlInfo.ControlID;
                    },
                    ContainerID: function () {
                        return this.Options.controlInfo.containerid;
                    },
                    ControlType: function () {
                        return this.Options.controlInfo.TypeName;
                    }
                });
                result = OFormbuilder.Create(options);
                return result;
            }
        }
    }(jQuery))
}



//实例化平台控件
$.formbuilder.toolbox.createControl = function (option, container) {
    var id = HoteamUI.UIManager.NewGUID();
    //从表控件替换gid
    if (option.Master == false && option.generatorType != "LabelValue" && option.generatorType != "CustomLabel" && option.objTypeName != "ContainerTool" && option.objTypeName != "CommonTool") {
        option = formBuliderFun.getNewGid(option);
    }
    option.selectGuid = id;
    var typeName = option.controlInfo.TypeName;
    var controltype = HoteamUI.Control.GetControlType(typeName);

    container.append("<div id = '" + id + "'></div>");
    var select = $("#" + id);
    select.attr("cid", option.controlInfo.ControlID);
    select.attr("containerid", option.controlInfo.containerid);
    select.attr("ctrlpagename", option.controlInfo.pagename);
    select.attr("parentid", option.controlInfo.ParentID);
    select.attr("controltype", typeName);
    select.addClass(typeName + " " + option.controlInfo.ControlID + " noMargin");
    var control = HoteamUI.Control.Instance(id);
    var ctrlEvent = {};
    ctrlEvent.o = control;
    option.pageconfig = option.pageconfig || {};
    control.Create(option);
    var handlers = option.controlInfo.PageHandlers;
    $.each(handlers, function (index, val) {
        if (val.HandlerName == "OnCreate") {
            var functionName = ["HoteamUI_PageEvent_", option.pagename, option.controlInfo.ControlID, "OnCreate"].join("").replace(/-/g, "");
            HoteamUI.Common.ExeFunction(functionName, ctrlEvent);
        }
    });
}


var formBuliderFun = {
    //存放全局数据
    allData: {},
    getNewIdByNum: {},
    objTypeAndEidObj: [],
    haveSetValueDataEid: [],
    //在实例化控件的时候，复制出来的行重新替换gid规则，对象名称objTypeName+对象属性InfoType+n数字
    getNewGid: function (option) {
        //记录元件个数
        if (option) {
            if (this.getNewIdByNum[option.objTypeName + option.InfoType]) {
                this.getNewIdByNum[option.objTypeName + option.InfoType].push(option.objTypeName + option.InfoType);
            } else {
                this.getNewIdByNum[option.objTypeName + option.InfoType] = [];
            }
        }
        var lenNum = this.getNewIdByNum[option.objTypeName + option.InfoType].length;
        option.gid = option.objTypeName + option.InfoType + "_" + (lenNum = 0 ? '' : lenNum);
        return option;
    },
    getNeedDataArr: function (data, datasetsTemplate, saveCtrlsData) {
        var returnData = [];
        var returnDataObj = {};
        var _this = this;
        var datasets;
        //var datasetsTemplateIds;
        if (data && data.length > 0) {
            //先根据从表分类获取id
            for (var i = 0, leni = data.length; i < leni; i++) {
                //datasetsTemplateIds代表数据集的标识id号
                var datasetsTemplateIds = data[i][0].option.StartPosition;
                var line = data[i][0].line;
                if (!datasetsTemplateIds) {
                    var controls = saveCtrlsData.ctrlsData;
                    objType = data[i][0].option.ChildObjType;
                    for (var j = 0, len = controls.length; j < len; j++) {
                        var item = controls[j];
                        var _line = line[0];
                        if (item.objTypeName === objType && item.Master === false && item.generatorType !== "LabelValue") {
                            if (_line[0] && (_line[0]).hasOwnProperty(item.InfoType)) {
                                if (formBuliderFun.formBuliderPattern == "view") {
                                    //单独处理Timevalue

                                    if (item.generatorType == 'TimeValue') {
                                        item.value = InforCenter_Platform_Object_IntToTimeFormat(_line[0][item.InfoType]);
                                    } else {
                                        item.value = _line[0][item.InfoType + '_DisplayValue'];
                                    }
                                }
                                else {
                                    item.value = _line[0][item.InfoType];
                                }
                            }
                        }
                    }
                    continue;
                }

                datasets = this.formatDatasets(datasetsTemplate, datasetsTemplateIds, line);

                if (datasets instanceof Array) {
                    returnData = returnData.concat(datasets);
                }
            }
        }
        return returnData;
    },
    formatDatasets: function (datasetsTemplate, datasetsTemplateIds, line) {
        var i,
            id,
            rows,
            fields,
            template,
            result = [];
        if (!datasetsTemplate) {
            return [];
        }
        if (!(datasetsTemplateIds instanceof Array)) {
            datasetsTemplateIds = [datasetsTemplateIds];
        }
        //填充数据集数据：支持一个从表拆分成多个数据集展示的情况
        for (var i = 0, len = datasetsTemplateIds.length; i < len; i++) {
            id = datasetsTemplateIds[i];
            template = datasetsTemplate[id];
            fields = this.getFieldsFromDatasetTemplate(template);
            rows = this.formatDatasetRows(line, fields, template);
            result.push({
                id: id,
                rows: rows
            });
        }

        return result;
    },
    getFieldsFromDatasetTemplate: function (template) {
        var result = [],
            item;
        for (var i = 0, len = template.length; i < len; i++) {
            item = template[i];
            result.push(item.InfoType);
        }

        return result;
    },
    formatDatasetRows: function (line, fields, template) {
        var result = [],
            item,
            page,
            rows,
            row,
            value,
            isAllEmpty,
            control,
            datasetRows,
            datasetRow;

        //转换为数据集：支持分页
        for (var i = 0, len = line.length; i < len; i++) {
            page = line[i];
            datasetRows = [];
            //遍历每一行数据
            for (var k = 0, lenk = page.length; k < lenk; k++) {
                row = page[k];
                isAllEmpty = true;
                //转换每行的数据
                datasetRow = [];
                for (var j = 0, lenj = fields.length; j < lenj; j++) {
                    if (formBuliderFun.formBuliderPattern === "view") {
                        value = row[fields[j] + '_DisplayValue'];
                    }
                    else {
                        value = row[fields[j]];
                    }

                    control = $.extend(true, {}, template[j]);
                    control.value = value;
                    if (row.EID) {
                        control.EID = row["EID"];
                    }

                    datasetRow.push(control);
                    if (value !== null && value !== "" && value !== undefined) {
                        isAllEmpty = false;
                    }
                }
                if (!isAllEmpty) {
                    datasetRows.push(datasetRow);
                }
            }

            result.push(datasetRows);
        }

        return result;
    },
    getPageDataGroup: function (data) {
        if (data && data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                var datai = data[i];
                if (datai && datai.length > 0) {
                    for (var j = 0, lenj = datai.length; j < lenj; j++) {
                        var dataijline = datai[j].line;
                        if (dataijline && dataijline.length > 0) {
                            var pageNumGroupArr = [];
                            var pageNumObj = {};
                            for (var q = 0, lenq = dataijline.length; q < lenq; q++) {
                                //处理从表单独的控件
                                formBuliderFun.dataApplyingDataControls = $.hoteamFormBuilder.getOnlyMainFormData(formBuliderFun.dataApplyingDataControls, dataijline);

                                var pageNumber = dataijline[q].PAGENUMBER || 1;
                                if (pageNumObj[pageNumber]) {
                                    pageNumObj[pageNumber].push(dataijline[q]);
                                } else {
                                    pageNumObj[pageNumber] = [];
                                    pageNumObj[pageNumber].push(dataijline[q]);
                                }
                            }
                            //把对象转为数组
                            for (key in pageNumObj) {
                                pageNumGroupArr.push(pageNumObj[key]);
                            }
                            datai[j].line = pageNumGroupArr;

                        }


                    }
                }
            }
        }
        return data;
    },
    //传进来的数据按照从表名称分类
    getSecondaryTableDataArr: function (data) {
        var tableTypeObj = {};
        var tableNameGroupArr = [];
        if (data && data.length > 0) {
            for (var i = 0, leni = data.length; i < leni; i++) {
                var dataichildren = data[i].children;
                if (dataichildren && dataichildren.length > 0) {
                    for (var j = 0, lenj = dataichildren.length; j < lenj; j++) {
                        var dataichildrenj = dataichildren[j];
                        var tableTyep = dataichildrenj.option.ChildObjType;
                        if (tableTypeObj[tableTyep]) {
                            tableTypeObj[tableTyep].push(dataichildrenj);
                        } else {
                            tableTypeObj[tableTyep] = [];
                            tableTypeObj[tableTyep].push(dataichildrenj);
                        }
                    }
                }
            }
        }
        for (key in tableTypeObj) {
            tableNameGroupArr.push(tableTypeObj[key]);
        }
        return tableNameGroupArr;
    },
    //处理黄庆返回的数据，根据objTypeText/objTypeName，来分类便于筛选数据
    classify: function (dataArray, typeName) {
        var map = {}, dest = [];
        for (var i = 0, leni = dataArray.length; i < leni; i++) {
            var datai = dataArray[i];
            if (!map[datai[typeName]]) {
                var obj = {};
                obj.data = [datai];
                obj[typeName] = datai[typeName];
                dest.push(obj);
                map[datai[typeName]] = datai;
                map[datai[typeName]] = datai;
            } else {
                for (var j = 0, lenj = dest.length; j < lenj; j++) {
                    var dj = dest[j];
                    if (dj[typeName] == datai[typeName]) {
                        dj.data.push(datai);
                        break;
                    }
                }
            }
        }
        return dest;
    },
    //取值
    commonGetValue: function (saveCtrlsData) {
        var allControlsData = this.setEidTtocontrols(saveCtrlsData);
        var valueData = this.getControlsValue(allControlsData);
        return {
            data: valueData,
            verified: allControlsData.verified
        }
    },
    //调用黄庆接口取得全部数据
    setEidTtocontrols: function (saveCtrlsData) {
        var _this = this;
        var formBuliderId = saveCtrlsData.formBuliderId;
        var allControls = $("#" + formBuliderId).formbuilder("data");
        return allControls;
    },
    //组织需要传递的数据
    getControlsValue: function (allControls) {
        var data = [];
        var _this = this;
        //处理数据集的数据
        if (allControls.datasets.data && allControls.datasets.data.length > 0) {
            for (var i = 0, leni = allControls.datasets.data.length; i < leni; i++) {
                var newArray = [];
                var rows = allControls.datasets.data[i].rows;
                if (rows && rows.length > 0) {
                    for (var j = 0, lenj = rows.length; j < lenj; j++) {
                        //var pageArr = [];
                        var pages = rows[j];
                        if (pages && pages.length > 0) {
                            for (var q = 0, lenq = pages.length; q < lenq; q++) {
                                var newObj = {};
                                if (pages[q] && pages[q][0] && pages[q][0].EID) {
                                    newObj.EID = pages[q][0].EID;
                                }
                                if (pages[q][0] && pages[q][0].objTypeName) {
                                    newObj.ObjType = pages[q][0].objTypeName;
                                    //增加在第几页属性
                                    newObj.PAGENUMBER = j + 1;
                                }
                                //取值
                                var rowData = pages[q];
                                if (rowData && rowData.length > 0) {
                                    for (var l = 0, lenl = rowData.length; l < lenl; l++) {
                                        if (typeof (rowData[l].value) === "object") {
                                            if (rowData[l].value == null) {
                                                rowData[l].value = { value: null };
                                            }
                                            newObj[rowData[l].InfoType] = rowData[l].value.value;
                                        } else {
                                            newObj[rowData[l].InfoType] = rowData[l].value;
                                        }

                                    }
                                    newArray.push(newObj);
                                }
                            }
                        }
                    }
                }
                data.push(newArray);
            }
        }
        //处理非数据集的数据
        var arry = new Array();
        var returnArray = new Array();
        var dataobj = {};
        if (allControls.controls && allControls.controls.length > 0) {
            //先按照表名称分类
            for (var t = 0, lent = allControls.controls.length; t < lent; t++) {
                if (dataobj[allControls.controls[t].objTypeName]) {
                    dataobj[allControls.controls[t].objTypeName].push(allControls.controls[t]);
                } else {
                    dataobj[allControls.controls[t].objTypeName] = [];
                    dataobj[allControls.controls[t].objTypeName].push(allControls.controls[t]);
                }
            }
            for (var o in dataobj) {
                arry.push(dataobj[o]);
            }
            //取值
            if (arry.length > 0) {
                for (v = 0, lenv = arry.length; v < lenv; v++) {
                    var arryv = arry[v];
                    var obj = new Object();
                    obj.ObjType = arryv[0].objTypeName;
                    for (var b = 0, lenb = arryv.length; b < lenb; b++) {
                        if (arryv[b].generatorType != "LabelValue" && arryv[b].generatorType != "CustomLabel") {
                            if (typeof (arryv[b].value) == "object") {
                                obj[arryv[b].InfoType] = arryv[b].value.value;
                            } else {
                                obj[arryv[b].InfoType] = arryv[b].value;
                            }

                        }
                    }
                    returnArray.push(obj);
                }
            }
        }
        //表集数据和非表集数据按表名称合并
        if (data.length > 0 && returnArray.length > 0) {
            for (var p = 0; p < data.length; p++) {
                if (data[p] && data[p].length > 0) {
                    for (var k = 0; k < data[p].length; k++) {
                        var datapk = data[p][k];
                        if (returnArray && returnArray.length > 0) {
                            for (var m = 0; m < returnArray.length; m++) {
                                if (datapk.ObjType == returnArray[m].ObjType) {
                                    datapk = $.extend(datapk, returnArray[m]);
                                    returnArray.splice(m, 1);
                                }
                            }
                        }
                    }
                }
            }
        }
        //去除数组里面的undefined
        var deleteUndefinedArr = new Array();
        for (var c = 0; c < returnArray.length; c++) {
            if (returnArray[c] != undefined) {
                deleteUndefinedArr.push(returnArray[c]);
            }
        }
        data.push(deleteUndefinedArr);



        return data;
    },
    //按照坐标排序
    setSort: function (array) {
        var len = array.length, _this = this;
        for (var i = 0; i < len - 1; i++) {
            for (var j = 0; j < len - 1 - i; j++) {
                if (_this.setSortRule(array[j], array[j + 1])) {
                    var tmp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = tmp;
                }
            }
        }
        return array;
    },
    //坐标排序规则
    setSortRule: function (p1, p2) {
        if (p1.x > p2.x) {
            return true;
        } else if (p1.x == p2.x) {
            return (p1.y > p2.y)
        } else {
            return false;
        }
    },

};


//formbuilder 通用接口调整
InforCenter_Platform_FormBuilder_Base = {
    checkValue: function () {
        var id = this.options.selectGuid;
        var control = HoteamUI.Control.Instance(id);
        return control.Check();
    }
};
