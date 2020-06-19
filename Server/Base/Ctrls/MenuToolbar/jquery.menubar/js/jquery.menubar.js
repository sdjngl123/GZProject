(function ($) {
    'use strict';

    // 创建工具栏项
    function createItem(item, type, index) {
        var html = '';

        html += createButtonItem(item, type, index) || '';

        html += createComboboxItem(item, type, index) || '';

        return html;
    };

    function createButtonItem(item, type, index) {
        var text = item.text,
            style = item._style,
            arrows = item.children && item.children.length > 0,
            // ie8 class为关键字
            icon = getItemIcon(item.icon, 'default', item.style),
            template;

        if (!item.type || item.type === 'button') {
            template = ['<a href="" class="menubar-item menubar-item-type-button ',
                'menubar-item-', style, (item.last ? ' menubar-item-' + style + '-last ' : ''),
                (arrows ? ' arrows ' : ''), '" data-index="', index, '">',
                '  <span class="menubar-item-content" >',
                '       ', (icon.type === 'url' ? '<img class="menubar-item-icon" src="' + icon.value + '"/>' : ''),
                '       ', (icon.type === 'sprite' ? '<span class="menubar-item-icon ' + icon.value + '"/>' : ''),
                '       <span class="menubar-item-text" >' + text + '</span>',
                '   </span>',
                '   ', (arrows ? '<span class="menubar-item-arrows ' + type + '" data-index="' + index + '" />' : ''),
                '</a>'
            ];

            return template.join('');
        }
    }

    function createComboboxItem(item, type, index) {
        var text = item.text,
            style = item._style,
            arrows = item.children && item.children.length > 0,
            template;

        if (item.type === 'combobox') {
            // 兼容ie，包裹在a标签下的input文本框类型不能正常使用
            template = ['<span class="menubar-item menubar-item-type-combobox ',
                'menubar-item-', style, (item.last ? ' menubar-item-' + style + '-last ' : ''),
                (arrows ? ' arrows ' : ''), '" data-index="', index, '">',
                '  <span class="menubar-item-content" >',
                '       <input class="menubar-item-combobox" type="text" value="', text, '"/>',
                '   </span>',
                '   ', (arrows ? '<span class="menubar-item-arrows ' + type + '" data-index="' + index + '" />' : ''),
                '</span>'
            ];

            return template.join('');
        }
    }

    function getItemIcon(icon, state, size) {
        var type = null,
            value;

        if (icon.url && icon.url[state]) {
            value = icon.url[state][size];
            type = 'url';
        } else if (icon.sprite && icon.sprite[state]) {
            value = icon.sprite[state][size];
            type = 'sprite';
        }

        return {
            type: type,
            value: value
        };
    }

    // 创建面板菜单项
    function createPanelItem(item, index) {
        var type = 'menubar-item-in-panel';

        return createItem(item, type, index);
    };

    // 创建弹出菜单项
    function createPopupItem(item, index) {
        var type = 'menubar-item-in-popup';
        return createItem(item, type, index);
    };

    // 创建面板分组标题
    function createPanelTitle(item, index) {
        var text = item.text,
            arrows = item.children && item.children.length > 0,
            icon = getItemIcon(item.icon, 'default', item.style),
            template;

        template = ['<p href="#" class="menubar-panel-title',
            (arrows ? ' arrows ' : ''), '" data-titleIndex="', index, '">',
            '  <span class="menubar-panel-title-content" >',
            '       ', (icon.type === 'url' ? '<img class="menubar-panel-title-icon" src="' + icon.value + '"/>' : ''),
            '       ', (icon.type === 'sprite' ? '<span class="menubar-panel-title-icon ' + icon.value + '"/>' : ''),
            '       <span class="menubar-panel-title-text" >' + text + '</span>',
            '   </span>',
            '   ', (arrows ? '<span class="menubar-panel-title-arrows" />' : ''),
            '</p>'
        ];

        return template.join('');
    };

    // 创建面板分组菜单项
    function createPanelContentItem(item, settings, isInline) {
        var itemsInPanel = settings.itemsInPanel,
            itemTemplate,
            className = isInline ? 'class="menubar-item-container-inline"' : '';

        itemTemplate = '<li ' + className + '>' + createPanelItem(item, itemsInPanel.length) + '</li>';
        itemsInPanel.push(item);

        return itemTemplate;
    };

    // 创建面板分组菜单
    function createPanelContent(items, settings) {
        var template = ['<div class="menubar-panel-content" >'];

        if (items && items instanceof Array && items.length > 0) {
            for (var i = 0, len = items.length; i < len; i++) {
                var item = $.extend(true, {}, defaultItem, items[i]),
                    nextItem,
                    nextCount = 1,
                    isInline = false,
                    itemTemplate = ['<ul class="menubar-panel-content-group" >'];

                item.last = i === len - 1;
                items[i] = item;

                if (item.style === 'big') {
                    item._style = 'panel-' + item.style || '';
                    // 大图标：放置一个
                    itemTemplate.push(createPanelContentItem(item, settings));
                } else {
                    // 小图标：默认每组竖向放置两个
                    item._style = 'panel-small';
                    itemTemplate.push(createPanelContentItem(item, settings));
                    // 根据跨行的实际情况放置
                    if (item.colspan && item.colspan > 1) {
                        nextCount = item.colspan;
                        isInline = true;
                    }
                    do {
                        nextItem = i + 1 < len ? $.extend(true, {}, defaultItem, items[i + 1]) : null;
                        if (nextItem && nextItem.style === 'small') {
                            ++i;
                            nextItem._style = 'panel-small';
                            nextItem.last = i === len - 1;
                            items[i] = nextItem;
                            itemTemplate.push(createPanelContentItem(nextItem, settings, isInline));
                        } else {
                            itemTemplate.push('<li class="menubar-item-small-empty"></li>');
                        }
                    } while (--nextCount);
                }

                itemTemplate.push('</ul>');
                template.push(itemTemplate.join(''));
            }
        }

        template.push('</div>');

        return template.join('');
    };

    // 创建菜单面板
    function createMenuPanel(items, settings) {
        var template = [];
        if (items && items instanceof Array && items.length > 0) {
            for (var i = 0, len = items.length; i < len; i++) {
                var item = items[i],
                    children = item.children;

                // 存储分组title信息
                settings.itemsInPanelTitle.push(item);

                item.style = 'big';
                template.push('<div class="menubar-panel-group ', (i + 1 !== len ? 'menubar-panel-line' : ''), '" >');
                template.push(createPanelTitle(item, i));
                template.push(createPanelContent(children, settings));
                template.push('</div>');
            }
        }

        return template.join('');
    };

    // 创建菜单工具栏
    function createMenu(elem, items, settings) {
        var html = createMenuPanel(items, settings),
            menubarPanel = $('<div class="menubar menubar-panel"></div>').attr('data-menuId', settings.id)
                .append(html);

        elem.addClass('menubar-container').append(menubarPanel).append('<div class="menubar-division"></div>');
    };

    // 创建弹出菜单
    function createSubPopupMenu(parentItem, items, id) {
        var template = ['<ul class="menubar menubar-popup menubar-popup-', parentItem.type, '" data-menuId="', id, '">'];

        if (items && items instanceof Array && items.length > 0) {
            for (var i = 0, len = items.length; i < len; i++) {
                var item = $.extend(true, {}, defaultItem, items[i]),
                    itemTemplate;

                item._style = 'popup-small';
                itemTemplate = '<li>' + createPopupItem(item, i) + '</li>';
                template.push(itemTemplate);
            }
        }

        template.push('</ul>');

        return template.join('');
    };

    // 创建面板分组项弹出菜单
    function displayPanelGroupPopupMenu(target, menuId, panelGroupElem, currentSettings) {
        var panelGroupElemOffset,
            panelPopup,
            itemsInPanelGroupPopup = currentSettings.itemsInPanelGroupPopup;

        target.addClass('menubar-panel-arrows-popup');
        panelPopup = $('<div class="menubar menubar-panel menubar-panel-popup" data-menuId="' + menuId + '" ></div>').append(panelGroupElem.closest('.menubar-panel-group').clone());

        panelPopup.find('.menubar-item-arrows').addClass('menubar-item-arrows-panel-group-popup');
        // 弹出显示
        panelGroupElemOffset = panelGroupElem.offset();
        panelPopup.find('.menubar-panel-group.menubar-panel-group-thumbnail').removeClass('menubar-panel-group-thumbnail');
        // 存储相关信息
        itemsInPanelGroupPopup.push({
            popup: panelPopup,
            parentArrows: target
        });

        panelPopup.appendTo('body').css({
            position: 'absolute',
            top: (panelGroupElemOffset.top + panelGroupElem.height()) + 'px',
            left: (panelGroupElemOffset.left - 2) + 'px'
        }).show();

        layoutForBombobox(panelPopup);
    }

    // 销毁面板分组项弹出菜单
    function destroyPanelGroupPopupMenu(settings) {
        var popup,
            parentArrows,
            popupList = settings.itemsInPanelGroupPopup;

        if (popupList && popupList.length > 0) {
            for (var len = popupList.length - 1, i = len; i >= 0; i--) {
                var popupSettings = popupList[i];
                parentArrows = popupSettings.parentArrows;
                parentArrows.removeClass('menubar-panel-arrows-popup');
                popup = popupSettings.popup;
                popup.hide().off().remove();
                popupList.pop();
            }
        }
    };

    // 显示弹出下级菜单
    function displaySubPopup(target, itemElem, item, isPanelItem, settings, container) {
        var popup,
            offset,
            position = {},
            relativeElem,
            itemIndex = parseInt(itemElem.attr('data-index')),
            itemsInSubPopup = settings.itemsInSubPopup;

        // 创建(获取)popup弹出菜单
        target.removeClass('menubar-item-arrows-hide').addClass('menubar-item-arrows-popup');
        popup = itemElem.find('>.menubar-popup');
        if (popup.length === 0) {
            popup = $((createSubPopupMenu(item, item.children, settings.id)));
            itemsInSubPopup.push({
                popup: popup,
                parentItem: item,
                parentIndex: itemIndex,
                parentArrows: target
            });
            popup.attr('data-parentIndex', itemIndex).appendTo(container);
        }
        if (isPanelItem) {
            // 计算弹出位置
            relativeElem = target.parent();
            if (relativeElem.hasClass('menubar-item-type-combobox')) {
                relativeElem = relativeElem.find('input.menubar-item-combobox');
                popup.width(relativeElem.outerWidth() - 2);
            }
            offset = relativeElem.offset();
            // 在面板菜单中弹出的位置：下方
            position = {
                top: (offset.top + relativeElem.height()) + 'px',
                left: (offset.left - 1) + 'px'
            };
        } else {
            // 在popup弹出菜单弹出的位置：右方
            position = {
                top: '-12px',
                left: '100%'
            };
        }
        popup.css(position).show();

        // 绑定弹出菜单over、out事件，显示、隐藏下级菜单
        popup.find('.menubar-item.menubar-item-popup-small.arrows').hover(function () {
            var elem = $(this),
                target = elem.find('>.menubar-item-arrows'),
                itemElem = target.closest('.menubar-item'),
                item = getSelectItem(settings, itemElem);

            displaySubPopup(target, itemElem, item, false, settings, elem);
        }, function () {
            var target = $(this).find('>.menubar-item-arrows'),
                itemIndex = parseInt(target.attr('data-index'));
            destroySubPopup(settings, itemIndex);
        });
    };

    // 销毁弹出的下级菜单
    function destroySubPopup(settings, currentActiveItemIndex) {
        var popup,
            popupList = settings.itemsInSubPopup;

        if (popupList && popupList.length > 0) {
            for (var len = popupList.length - 1, i = len; i >= 0; i--) {
                var popupSettings = popupList[i],
                    arrows = popupSettings.parentArrows,
                    popupIndex = popupSettings.parentIndex;

                popup = popupSettings.popup;
                arrows.removeClass('menubar-item-arrows-popup').addClass('menubar-item-arrows-hide');
                popup.hide().off().remove();
                popupList.pop();

                if (popupIndex === currentActiveItemIndex) {
                    break;
                }
            }
        }
    };

    // 销毁全部的弹出菜单
    function destroyAllPopup(settings) {
        for (var i in settings) {
            // 点击其他位置
            destroyCurrentAllPopup(settings[i]);
        }
    };

    // 销毁菜单
    function destroyCurrentAllPopup(settings) {
        //李金岳
        if (settings) {
            destroySubPopup(settings);
            destroyPanelGroupPopupMenu(settings);
        }  
    }

    // 获取选中项数据
    function getSelectItem(settings, itemElem) {
        var list,
            regPanelItem = /menubar-item-panel/,
            itemClassName = itemElem.attr('class'),
            parentIndex,
            itemIndex = parseInt(itemElem.attr('data-index')),
            item,
            itemsInPanel = settings.itemsInPanel,
            itemsInSubPopup = settings.itemsInSubPopup;

        if (regPanelItem.test(itemClassName)) {
            list = itemsInPanel;
        } else {
            // 查找弹出菜单对应的数据
            parentIndex = parseInt(itemElem.closest('.menubar-popup').attr('data-parentindex'));

            for (var i = 0, len = itemsInSubPopup.length; i < len; i++) {
                item = itemsInSubPopup[i];
                if (parentIndex === item.parentIndex) {
                    list = itemsInSubPopup[i].parentItem.children;
                    break;
                }
            }
        }

        if (list) {
            return list[itemIndex];
        } else {
            return null;
        }
    };

    // 创建menubar编号
    function createMenubarId() {
        return 'menubar-' + (new Date()).getTime();
    };

    // 计算菜单面板各分组项的宽度
    function calculatePanelGroupsWidth(menubarElem, setting) {
        setTimeout(function () {
            menubarElem.find('.menubar-panel-group ').each(function () {
                calculatePanelGroupWidth($(this), setting, 'normal', null);
            });

            layout(menubarElem, setting.panelGroups);
        }, 200);
    }

    // 计算菜单面板分组项的宽度
    function calculatePanelGroupWidth(elem, setting, state, index) {
        var panelGroup,
            width = elem.outerWidth();

        // 不指定序号，则创建一个新的记录
        if (!index) {
            panelGroup = {
                normal: null,
                thumbnail: null,
                state: 'normal'
            };

            setting.panelGroups.push(panelGroup);
        } else {
            panelGroup = setting[index];
        }
        panelGroup[state] = width;
    }

    // 计算总长度
    function calculateTotalWidth(panelGroups) {
        var total = 0,
            width = 0,
            panelGroup;

        for (var len = panelGroups.length - 1, i = len; i >= 0; i--) {
            panelGroup = panelGroups[i];
            width = panelGroup[panelGroup.state];

            total += width;
        }

        return total;
    }

    // 获取缩略图模式的宽度
    function getThumbnailWidth(menubarElem, index) {
        return menubarElem.find('.menubar-panel-group').eq(index).removeClass('normal').addClass('menubar-panel-group-thumbnail').outerWidth();
    }

    // 自适应布局
    function layout(menubarElem, panelGroups) {
        var width = menubarElem.width(),
            // index,
            panelGroup,
            total;

        destroyAllPopup(settings);

        // 重置panelGroup state 为 normal
        for (var len = panelGroups.length - 1, i = len; i >= 0; i--) {
            panelGroups[i].state = 'normal';
        }

        // 计算合理的布局
        for (len = panelGroups.length - 1, i = len; i >= 0; i--) {
            if (i === len) {
                total = calculateTotalWidth(panelGroups);
                if (total <= width) {
                    break;
                }
            }

            panelGroup = panelGroups[i];
            panelGroup.state = 'thumbnail';

            if (!panelGroup.thumbnail) {
                panelGroup.thumbnail = getThumbnailWidth(menubarElem, i);
            }

            total = calculateTotalWidth(panelGroups);
            if (total <= width) {
                break;
            }
        }

        // 调整panelGroup布局样式
        menubarElem.find('.menubar-panel-group').each(function (i) {
            var panelGroupElem = $(this),
                panelGroup = panelGroups[i],
                className = panelGroup.state === 'thumbnail' ? 'menubar-panel-group-thumbnail' : 'normal';

            if (!panelGroupElem.hasClass(className)) {
                panelGroupElem.removeClass('normal').removeClass('menubar-panel-group-thumbnail').addClass(className);
            }

            layoutForBombobox(panelGroupElem);
        });
    }

    function layoutForBombobox(panelGroupElem) {
        var width,
            combobox = panelGroupElem.find('.menubar-item-combobox').hide(),
            comboboxItem = combobox.closest('.menubar-item'),
            arrows = comboboxItem.find('.menubar-item-arrows'),
            btnItem = panelGroupElem.find('.menubar-item-type-button:first');

        if (combobox.length > 0) {
            if (_style['item-padding-left'] === null) {
                _style['item-padding-left'] = parseInt(btnItem.css('padding-left'));
                _style['item-padding-right'] = parseInt(btnItem.css('padding-right'));
            }
            width = combobox.closest('.menubar-panel-content-group').width() - (_style['item-padding-left'] * 2 + _style['item-padding-right']);
            combobox.width(width).show();
            arrows.show();
        }
    }

    // 点击事件相关方法
    function itemClickHandler(menuElem, item, onclickInMenu, settings) {
        var onclick = item.onclick || onclickInMenu;

        if (typeof onclick === 'function') {
            onclick.call(menuElem[0], item.text, item.value, item.other);
        } else {
            console.error('onclick event callback not a function!');
        }
    };

    // 点击事件相关方法
    function itemChangeHandler(menuElem, text, value, comboboxItem, comboboxElem, onclickInMenu, settings) {
        var onchange = comboboxItem.onchange || onclickInMenu;

        comboboxItem.text = text;
        comboboxItem.value = value;
        comboboxElem.val(text);

        if (typeof onchange === 'function') {
            onchange.call(menuElem[0], comboboxItem.text, comboboxElem.value, comboboxElem.other);
        } else {
            console.error('onchange event callback not a function!');
        }
    };

    // 默认参数
    var defaults = {
        // onclick: function (text, value) {
        //     console.log('menubar click:' + ' text:' + text + ' value:' + value + ' menuId:' + menuId);
        // },
        onclick: null,
        onchange: null,
        items: [],
        autoLayout: true
    },
        // 默认菜单项参数
        defaultItem = {
            text: '',
            value: '',
            icon: {
                url: '',
                'class': ''
            },
            other: {},
            // big small
            style: 'small',
            // defaultItem类型
            children: [],
            // onclick: function ( text, value) {
            //     console.log('menubar item click:' + 'text:' + text + 'value:' + value);
            // },
            onclick: null,
            onchange: null
        };

    // 全局参数
    var settings = {};
    // jQuery.menubar = {
    //     settings: {}
    // };

    var _style = {
        'item-padding-left': null,
        'item-padding-right': null
    }

    // 绑定点击事件：全局绑定一次
    $(document).on('click', function (event) {
        var target = $(event.target),
            targetClassName = target.attr('class'),
            regItem = /menubar-item-content|menubar-item-icon|menubar-item-text|menubar-item /,
            regArrows = /menubar-item-arrows/,
            regPopup = /menubar-item-arrows-popup/,
            regPanelPopup = /menubar-panel-arrows-popup/,
            regItemInPanel = /menubar-item-panel/,
            regItemArrows = /arrows/,
            regTitleInPanel = /menubar-panel-title/,
            regPanelGroupPopup = /menubar-item-arrows-panel-group-popup/,
            regComboboxPopup = /menubar-popup-combobox/,
            itemElem,
            itemClassName,
            isPopup,
            isComboboxPopup,
            isPanelItem,
            comboboxTopPopup,
            combobox,
            comboboxItem,
            comboboxElem,
            item,
            menuId,
            currentSettings,
            onclickInMenu,
            onchangeInMenu,
            menubarElem,
            panelGroupElem;

        // 点击菜单面板缩略图模式，弹出面板
        if (regTitleInPanel.test(targetClassName) && (panelGroupElem = target.closest('.menubar-panel-group-thumbnail')) && panelGroupElem.length === 1) {
            isPopup = regPanelPopup.test(targetClassName);
            destroyAllPopup(settings);
            if (!isPopup) {
                // 创建一个菜单面板当前所在分组的副本
                menubarElem = panelGroupElem.closest('.menubar');
                menuId = menubarElem.attr('data-menuId');
                currentSettings = settings[menuId];
                displayPanelGroupPopupMenu(target, menuId, panelGroupElem, currentSettings);
            }
        } else if (regItem.test(targetClassName) || regArrows.test(targetClassName)) {
            // 正常菜单项点击
            itemElem = target.closest('.menubar-item');
            itemClassName = itemElem.attr('class');
            menubarElem = itemElem.closest('.menubar');
            menuId = menubarElem.attr('data-menuId');
            currentSettings = settings[menuId];
            onclickInMenu = currentSettings._settings.onclick;
            onchangeInMenu = currentSettings._settings.onchange;
            isPanelItem = regItemInPanel.test(itemClassName);

            // 点击菜单项内容，执行函数
            item = getSelectItem(currentSettings, itemElem);
            // 点击菜单项内容，执行函数
            if (regItem.test(targetClassName)) {
                // 弹出菜单项,存在下级菜单，不执行
                if (!isPanelItem) {
                    if (regItemArrows.test(itemClassName)) {
                        return false;
                    }
                }

                comboboxTopPopup = itemElem.closest('.menubar-popup-combobox');
                isComboboxPopup = regComboboxPopup.test(comboboxTopPopup.attr('class'));
                if (isComboboxPopup) {
                    combobox = currentSettings.itemsInSubPopup[0];
                    if (combobox) {
                        comboboxItem = combobox.parentItem;
                        comboboxElem = combobox.parentArrows.parent().find('input.menubar-item-combobox');
                        itemChangeHandler(currentSettings.menubarElem, item.text, item.value, comboboxItem, comboboxElem, onchangeInMenu, currentSettings);
                    }
                } else {
                    itemClickHandler(currentSettings.menubarElem, item, onclickInMenu, currentSettings);
                }

                destroyAllPopup(settings);

                return false;
            } else if (regArrows.test(targetClassName)) {
                // 点击面板菜单下级菜单按钮
                isPopup = regPopup.test(targetClassName);
                if ((!isPopup && isPanelItem) || (isPanelItem && isPopup)) {
                    if (!regPanelGroupPopup.test(targetClassName)) {
                        destroyAllPopup(settings);
                    } else {
                        destroySubPopup(currentSettings);
                    }
                }

                if (!isPopup && isPanelItem) {
                    displaySubPopup(target, itemElem, item, true, currentSettings, $('body'));
                }

                return false;
            }
        } else {
            destroyAllPopup(settings);
            return true;
        }
    });

    $(document).on('change keyup', '.menubar input.menubar-item-combobox', function (event) {

        var target = $(event.target),
            eventType = event.type,
            keyCode = event.keyCode,
            itemElem = target.closest('.menubar-item'),
            menubarElem = itemElem.closest('.menubar'),
            menuId = menubarElem.attr('data-menuId'),
            currentSettings = settings[menuId],
            item = getSelectItem(currentSettings, itemElem),
            onchangeInMenu = currentSettings._settings.onchange,
            value;

        value = target.val();
        if (item.text !== value) {
            // 兼容Ie，需要监测键盘回车事件
            if (eventType === 'change' || (eventType === 'keyup' && keyCode === 13)) {
                itemChangeHandler(menubarElem, value, value, item, target, onchangeInMenu, currentSettings);
            }
        }
    });

    $(document).on('mouseover mouseout', '.menubar', function (event) {
        var target = $(event.target),
            targetClassName = target.attr('class'),
            regItem = /menubar-item-content|menubar-item-icon|menubar-item-text|menubar-item /,
            regTitle = /menubar-panel-title/,
            itemElem,
            menubarElem,
            menuId,
            currentSettings,
            item,
            icon;

        if (!regItem.test(targetClassName) && !regTitle.test(targetClassName)) {
            return;
        }

        if (regItem.test(targetClassName)) {
            itemElem = target.closest('.menubar-item');
            menubarElem = itemElem.closest('.menubar');
            menuId = menubarElem.attr('data-menuId');
            currentSettings = settings[menuId];
            item = getSelectItem(currentSettings, itemElem);
        } else {
            itemElem = target.closest('.menubar-panel-title');
            menubarElem = itemElem.closest('.menubar');
            menuId = menubarElem.attr('data-menuId');
            currentSettings = settings[menuId];
            item = currentSettings.itemsInPanelTitle[parseInt(itemElem.attr('data-titleindex'))];
        }

        if (event.type === 'mouseover') {
            icon = getItemIcon(item.icon, 'hover', item.style);
        } else if (event.type === 'mouseout' && item) {
            icon = getItemIcon(item.icon, 'default', item.style);
        }

        // 指定的图片url
        if (icon && icon.type === 'url' && icon.value) {
            itemElem.find('.menubar-item-icon,.menubar-panel-title-icon').attr('src', icon.value);
        } else if (icon && icon.type === 'sprite') {
            // 雪碧图
            icon = getItemIcon(item.icon, 'hover', item.style);
            if (event.type === 'mouseover' && icon.value) {
                itemElem.find('.menubar-item-icon,.menubar-panel-title-icon').addClass(icon.value);
            } else if (event.type === 'mouseout' && icon.value) {
                itemElem.find('.menubar-item-icon,.menubar-panel-title-icon').removeClass(icon.value);
            }
        }
    });

    $(window).resize(function () {
        var _settings = settings,
            _setting;

        for (var i in _settings) {
            _setting = _settings[i];
            if (_setting._settings.autoLayout) {
                layout(_setting.menubarElem, _setting.panelGroups);
            }
        }
    });

    // api
    var methods = {
        init: function (options) {
            return this.each(function () {
                // 合并参数
                var _settings = $.extend({}, defaults, options),
                    // 菜单数据
                    items = _settings.items,
                    // 当前元素
                    elem = $(this),
                    id = createMenubarId(),
                    newSettings;

                // 数据持久化
                newSettings = {
                    id: id,
                    menubarElem: elem,
                    _settings: _settings,
                    itemsInPanelTitle: [],
                    itemsInSubPopup: [],
                    itemsInPanelGroupPopup: [],
                    itemsInPanel: [],
                    panelGroups: []
                };
                settings[id] = newSettings;

                // init
                elem.empty();
                createMenu(elem, items, newSettings);

                calculatePanelGroupsWidth(elem, newSettings);
            });
        },
        destroy: function () {
            return this.each(function () {
                var elem = $(this),
                    id = elem.find('>.menubar').attr('data-menuid'),
                    _settings = settings[id];

                destroyCurrentAllPopup(_settings);
                elem.remove();
                delete settings[id];
            });
        },
        layout: function () {
            return this.each(function () {
                var elem = $(this),
                    id = elem.find('>.menubar').attr('data-menuid'),
                    currentSetting = settings[id];

                layout(currentSetting.menubarElem, currentSetting.panelGroups);
            });
        }
    };

    // 创建菜单
    jQuery.fn.menubar = function () {
        var method = arguments[0],
            arg = arguments;

        if (methods[method]) {
            method = methods[method];
            arg = Array.prototype.slice.call(arguments, 1);
        } else if (typeof (method) === 'object' || !method) {
            method = methods.init;
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.menubar');
            return this;
        }

        return method.apply(this, arg);
    };
}(jQuery));
