/*!
 * topology diagram v1.3.0 -  jQuery raphael plug
 *
 * Includes jquery.js
 * Includes raphael.js
 *
 * Copyright © 2017-2018 huangqing
 * Released under the MIT license
 *
 * Date: 2017-07-27
 */

;
(function ($, Raphael) {
    'use strict';

    function TopologyDiagram(elem, Raphael, options) {
        this.config = {
            rect: {
                width: 'auto',
                height: 22,
                stroke: {
                    'default': '#C1C5CA',
                    selected: '#B2C9E0'
                },
                'stroke-width': 1,
                fill: {
                    'default': '#F4F4F4',
                    selected: '#EBF4FD'
                },
                radius: 3
            },
            image: {
                width: 16,
                height: 16
            },
            text: {
                'text-anchorstring': 'start',
                'font-family': '微软雅黑',
                'font-size': 12,
                'maxLength': Infinity,
                fill: {
                    'default': '#5C5C5C',
                    selected: '#039AFF'
                }
            },
            path: {
                'arrow-end': 'opan-wide-long',
                stroke: '#8FA1AE',
                'stroke-width': 1
            },
            node: {
                'padding-left': 4,
                'padding-top': 3,
                'margin-left': 40,
                'margin-top': 22
            },
            paper: {
                width: 1000,
                height: 1000,
            },
            relateTypeEnum: {
                parent: 'parent',
                child: 'child'
            },
            virtualRootNode: {
                virtualRoot: true,
                id: 'virtualRoot',
                x: -40,
                y: 0,
                width: 0,
                height: 0,
                originalData: null,
                nodeElements: null,
                parentNodes: [],
                childrenNodes: [],
                prevNode: null,
                nextNode: null,
                line: {
                    start: false,
                    end: false
                }
            }

        };
        // left center right
        this.align = 'left';
        // top middle bottom
        this['vertical-align'] = 'top';
        this.container = elem;
        this.paper = {
            element: Raphael(this.container, this.config.paper.width, this.config.paper.height),
            height: 0,
            width: 0
        };
        this.viewBox = {};
        // forward reverse
        this.direction = {
            arrow: 'forward',
            node: 'forward'
        };

        this.data = [];
        // 通过创建node自动生成的id绑定节点相关信息
        this.nodesHash = {};
        this.nodes = [];
        this.nodeMergeKey = 'id';
        this.nodeMergeHash = {};

        // 虚拟的根节点
        this.virtualRootNode;

        this.ondblclick;
        this.onclick;
        this.onrightclick;
        this.ondblclickLoad;

        this.currentEventType;

        this.selected = {};

        // 调试代码时将此选项调整为true,用于节点位置移动的调试
        this.dev = options.dev || false;

        if (this.dev && options.virtualRootNode) {
            if (typeof options.virtualRootNode.x !== 'undefined') {
                this.config.virtualRootNode.x = options.virtualRootNode.x;
            }
            if (typeof options.virtualRootNode.y !== 'undefined') {
                this.config.virtualRootNode.y = options.virtualRootNode.y;
            }
        }

        this.setOptions(options);
    };

    TopologyDiagram.prototype.setOptions = function (options) {
        if (options) {
            //align:left center right
            this.align = options.align || this.align;
            //vertical-align: top middle bottom
            this['vertical-align'] = options['vertical-align'] || this['vertical-align'];
            //direction: forward reverse
            if (options.direction) {
                if (options.direction.arrow) {
                    this.direction.arrow = options.direction.arrow;
                }

                if (options.direction.node) {
                    this.direction.node = options.direction.node;
                }
            }
            //event
            this.ondblclick = options.ondblclick || this.ondblclick;
            this.onclick = options.onclick || this.onclick;
            this.onrightclick = options.onrightclick || this.onrightclick;
            this.ondblclickLoad = options.ondblclickLoad || this.ondblclickLoad;
            // data
            this.data = options.data || this.data;
            //paper size
            if (options.data && options.data instanceof Array && options.data.length < 1) {
                this.paper.element.setSize(this.config.paper.width, this.config.paper.height);
            }
            //text length
            if (options.text && options.text.maxLength) {
                this.config.text.maxLength = options.text.maxLength;
            }
        }
    };

    TopologyDiagram.prototype.createRect = function (x, y, width, id) {
        var config = this.config.rect,
            paper = this.paper.element,
            rect;

        rect = paper.rect(x, y, width, config.height, config.radius).attr({
            fill: config.fill['default'],
            'stroke-width': config['stroke-width'],
            stroke: config.stroke['default'],
            r: config.radius
        });

        $(rect[0]).attr({
            'data-nodeId': id,
            'id': id + '-rect'
        }).addClass('node node-rect');

        return rect;
    };

    TopologyDiagram.prototype.createImage = function (x, y, src, id, index) {
        var config = this.config.image,
            paper = this.paper.element,
            image;

        image = paper.image(src, x, y, config.width, config.height).attr({

        });

        $(image[0]).attr({
            'data-nodeId': id,
            'id': id + '-' + index + '-image'
        }).addClass('node node-image');

        return image;
    };

    TopologyDiagram.prototype.createText = function (x, y, text, id) {
        var config = this.config.text,
            maxLength = config.maxLength,
            paper = this.paper.element,
            title = text,
            textElem;

        if (text.length > maxLength) {
            text = text.slice(0, maxLength) + '...';
        }
        // 文字是以开始位置文字的水平中轴线为基线
        y = y + (config['font-size'] / 2) + 1;
        textElem = paper.text(x, y, text).attr({
            'font-size': config['font-size'],
            'text-anchor': 'start',
            'title': title,
            fill: config.fill['default'],
            id: id + '-text'
        });

        $(textElem[0]).attr({
            'data-nodeId': id,
            'id': id + '-text'
        }).addClass('node node-text');

        return textElem;
    };

    TopologyDiagram.prototype.createNode = function (x, y, src, text, id) {
        var config = this.config,
            paddingLeft = config.node['padding-left'],
            paddingTop = config.node['padding-top'],
            rectElem,
            rectWidth,
            imageElem,
            imageElems = [],
            textElem,
            startX = x,
            nextX,
            endX,
            startY = y,
            nextY,
            bBox,
            srcLength = 0,
            srcItem;


        //支持多图标
        if (typeof src === 'string') {
            src = [src];
            srcLength = 1;
        } else if (src instanceof Array) {
            srcLength = src.length;
        }

        nextX = startX + paddingLeft;
        nextY = startY + paddingTop;
        for (var i = 0, len = srcLength; i < len; i++) {
            srcItem = src[i];
            imageElem = this.createImage(nextX, nextY, srcItem, id, i);

            imageElems.push(imageElem);
            //计算下一个位置
            bBox = imageElem.getBBox();
            nextX = nextX + bBox.width + paddingLeft;
        }

        textElem = this.createText(nextX, nextY, text, id);

        bBox = textElem.getBBox();
        endX = nextX + bBox.width + paddingLeft;

        rectWidth = Math.abs(endX - startX);
        rectElem = this.createRect(startX, startY, rectWidth, id);

        textElem.toFront();

        //置顶
        for (i = 0, len = srcLength; i < len; i++) {
            imageElems[i].toFront();
        }

        return {
            image: imageElems,
            text: textElem,
            rect: rectElem,
            width: rectWidth,
            height: config.rect.height
        };
    };

    TopologyDiagram.prototype.bindNodeEvent = function (node) {
        var elems = node.nodeElements,
            rect = elems.rect,
            images = elems.image,
            image,
            imageItem,
            imageLength = images.length,
            text = elems.text,
            i,
            self = this;

        // 解决单击与双击直接的冲突
        function bindClick(handler, node) {
            var self = this,
                trigger = self.triggerNodeEvent;

            if (!this.onclick && !this.ondblclick && !this.ondblclickLoad) {
                this.currentEventType = 'ondblclick';
                trigger.call(self, handler, node, 'onclick');
                this.currentEventType = null;
            } else {
                // 首先选中节点，使点击选中的效果不延时
                this.selectNode(node);
                setTimeout(function () {
                    if (self.currentEventType === 'ondblclick') {
                        return false;
                    } else {
                        self.currentEventType = 'onclick';
                        trigger.call(self, handler, node, 'onclick');
                        self.currentEventType = null;
                    }
                }, 400);
            }
        }

        function bindDblClick(handler, node) {
            var self = this;
            this.currentEventType = 'ondblclick';
            this.triggerNodeEvent(handler, node, 'ondblclick');
            handler.stopPropagation();
            setTimeout(function () {
                self.currentEventType = null;
            }, 400);
        }

        function bindRightClick(handler, node) {
            this.currentEventType = 'onrightclick';
            this.triggerNodeEvent(handler, node, 'onrightclick');
            handler.stopPropagation();
        }

        function bindMousedown(handler) {
            if (handler.which === 1) {
                bindClick.call(this, handler, node);
            } else if (handler.which === 3) {
                bindRightClick.call(this, handler, node);
            }
            handler.stopPropagation();
        }

        // 单击事件

        rect.mousedown(function (handler) {
            bindMousedown.call(self, handler, node);
        });
        text.mousedown(function (handler) {
            bindMousedown.call(self, handler, node);
        });

        for (i = 0; i < imageLength; i++) {
            image = images[i];
            image.mousedown(function (handler) {
                bindMousedown.call(self, handler, node);
            });
        }


        // 双击事件

        rect.dblclick(function (handler) {
            bindDblClick.call(self, handler, node);
        });
        text.dblclick(function (handler) {
            bindDblClick.call(self, handler, node);
        });


        for (i = 0; i < imageLength; i++) {
            image = images[i];
            image.dblclick(function (handler) {
                bindDblClick.call(self, handler, node);
            });
        }
    };

    TopologyDiagram.prototype.triggerNodeEvent = function (event, node, type) {
        var fun = this[type],
            data = node.originalData,
            elem = this.container,
            loadFun = this[type + 'Load'],
            children;

        // console.log(type);
        // 设置选中节点
        this.selectNode(node);

        // 执行回调函数
        if (typeof fun === 'function' || typeof loadFun === 'function') {
            try {
                if (typeof fun === 'function') {
                    fun.call(elem, event, data, node.id, this.container);
                }
            } catch (e) {
                throw e;
            } finally {
                if (typeof loadFun === 'function') {
                    if (data.children.length < 1) {
                        children = loadFun.call(elem, data, node.id, this.container);
                        $(elem).topology('addNodes', this.selected.nodeId, children);
                    }
                }
            }
        }
    };

    TopologyDiagram.prototype.selectNode = function (node) {
        var rect,
            text,
            rectConfig = this.config.rect,
            textConfig = this.config.text,
            selected = this.selected,
            selectedNode;

        if (selected.nodeId) {
            selectedNode = this.nodesHash[selected.nodeId];
            if (selectedNode) {
                rect = selectedNode.nodeElements.rect;
                text = selectedNode.nodeElements.text;

                rect.attr({
                    fill: rectConfig.fill['default'],
                    stroke: rectConfig.stroke['default']
                });

                text.attr({
                    fill: textConfig.fill['default']
                });
            }
        }

        selected.nodeId = node.id;
        selected.itemId = node.originalData.id;
        selectedNode = node;
        rect = selectedNode.nodeElements.rect;
        text = selectedNode.nodeElements.text;

        rect.attr({
            fill: rectConfig.fill.selected,
            stroke: rectConfig.stroke.selected
        });

        text.attr({
            fill: textConfig.fill.selected
        });
    };

    TopologyDiagram.prototype.createPath = function (startX, startY, middleX, middleY, endX, endY, hasArrow) {
        var config = this.config.path,
            paper = this.paper.element;

        return paper.path('M' + startX + ' ' + startY +
            'L' + middleX + ' ' + middleY +
            'L' + endX + ' ' + endY
        ).attr({
            'stroke-width': config['stroke-width'],
            'stroke': config.stroke,
            'arrow-end': hasArrow === false ? 'none' : config['arrow-end']
        });
    };

    TopologyDiagram.prototype.createStraightLine = function (startX, startY, endX, endY, hasArrow) {
        return this.createPath(startX, startY, endX, endY, endX, endY, hasArrow);
    };

    TopologyDiagram.prototype.createBrokenLine = function (startX, startY, endX, endY) {
        var middleX = startX,
            middleY = endY;

        return this.createPath(startX, startY, middleX, middleY, endX, endY);
    };

    TopologyDiagram.prototype.createTopologyNode = function (data, parentNode, index) {
        var currentData = data,
            nodeElements,
            id = this.getId(),
            //src是字符串或数组[src]
            src = currentData.src || currentData.ico || currentData.img,
            text = currentData.text,
            position,
            nodes = this.nodes,
            nodesHash = this.nodesHash,
            nodeMergeHash = this.nodeMergeHash,
            currentNode,
            prevNode,
            parentNodes,
            lastParentNode,
            nodeMergeValue = currentData[this.nodeMergeKey] || null;

        currentData.children = currentData.children || [];

        currentNode = {
            id: id,
            x: 0,
            y: 0,
            text: text,
            src: src,
            width: 0,
            height: 0,
            originalData: currentData,
            parentNodes: [],
            childrenNodes: [],
            prevNode: null,
            nextNode: null,
            line: {
                start: false,
                end: false
            },
            offsetY: 0
        };

        // 关联需合并汇聚的节点
        if (nodeMergeValue !== null && nodeMergeHash[nodeMergeValue]) {
            currentNode = nodeMergeHash[nodeMergeValue];
            parentNodes = currentNode.parentNodes;
            lastParentNode = parentNodes[parentNodes.length - 1];

            // 存在相同的合并标识时（默认为id），且存在父节点，且父节点上一个兄弟节点存在并且其最后的子节点标识与当前节点的标识相同
            // 为同级相邻的兄弟节点，添加关联
            if (parentNode.prevNode && lastParentNode.id === parentNode.prevNode.id) {
                this.relateMergeTopologyNode(currentNode, parentNode);
            } else {
                //其他的情况为错误的节点结构
                console.warn('node id=' + currentNode.originalData.id + ' is exist! ');
                //修正由于错误数据造成的父节点偏移量错误
                parentNode.offsetY -= (parentNode.originalData.children.length - index) * (this.config.rect.height + this.config.node['margin-top']);
            }

            return null;
        }

        if (parentNode) {
            // 创建下级节点

            if (parentNode.childrenNodes.length > 0) {
                prevNode = parentNode.childrenNodes[parentNode.childrenNodes.length - 1];

                prevNode.nextNode = currentNode;
                currentNode.prevNode = prevNode;
            }
            currentNode.parentNodes = [parentNode];
            parentNode.childrenNodes.push(currentNode);
        }

        // 先创建出节点元素，获取其宽度和高度
        nodeElements = this.createNode(this.virtualRootNode.x, this.virtualRootNode.y, src, text, id);
        currentNode.width = nodeElements.width;
        currentNode.height = nodeElements.height;
        currentNode.nodeElements = nodeElements;

        position = this.calculateTopologyNodePosition(parentNode, currentNode);

        // $.extend(currentNode, {
        //     x: position.x,
        //     y: position.y,
        //     offsetY: position.offsetY
        // });

        // 移动节点元素位置 dev:moveNode
        this.dev ? this.moveTopologyNode(currentNode) : null;

        // 将根节点加入nodes保存
        nodesHash[id] = currentNode;
        nodeMergeHash[nodeMergeValue] = currentNode;

        // 记录根节点
        if (parentNode.virtualRoot === true) {
            nodes.push(currentNode);
        }

        // 设置选中项
        if (this.selected.itemId && this.selected.itemId === currentData.id) {
            this.selected.nodeId = currentNode.id;
            this.selectNode(currentNode);
        }

        // 绑定事件
        this.bindNodeEvent(currentNode);

        return currentNode;
    };

    TopologyDiagram.prototype.moveTopologyNode = function (node, offset, isRecursion) {
        var nodeElements = node.nodeElements,
            rect = nodeElements.rect,
            text = nodeElements.text,
            images = nodeElements.image,
            image,
            x = node.x,
            y = node.y,
            offsetX = x === null ? 0 : x - rect.attrs.x,
            offsetY = y === null ? 0 : y - rect.attrs.y;

        if (offset) {
            offsetX += (offset.x || 0);
            offsetY += (offset.y || 0);

            node.x = x + offsetX;
            node.y = y + offsetY;
        }
        if (offsetX === 0 && offsetY === 0) {
            return;
        }
        rect.attr({
            x: rect.attrs.x + offsetX,
            y: rect.attrs.y + offsetY
        });
        text.attr({
            x: text.attrs.x + offsetX,
            y: text.attrs.y + offsetY
        });

        for (var i = 0, len = images.length; i < len; i++) {
            image = images[i];
            image.attr({
                x: image.attrs.x + offsetX,
                y: image.attrs.y + offsetY
            });
        }

        this.setViewBox(node);

        if (isRecursion) {
            var children = node.childrenNodes;

            if (!node.mergeNode && children && children.length > 0) {
                for (var i = 0, len = children.length; i < len; i++) {
                    node = children[i];
                    // 递归
                    this.moveTopologyNode(node, offset, isRecursion);
                }
            }
        }
    };

    TopologyDiagram.prototype.setTopologyNodePosition = function (node, offset, isRecursion) {
        var x = node.x,
            y = node.y,
            offsetX = 0,
            offsetY = 0;

        if (offset) {
            offsetX += (offset.x || 0);
            offsetY += (offset.y || 0);

            node.x = x + offsetX;
            node.y = y + offsetY;
        }
        if (offsetX === 0 && offsetY === 0) {
            return;
        }

        if (isRecursion) {
            var children = node.childrenNodes;

            if (!node.mergeNode && children && children.length > 0) {
                for (var i = 0, len = children.length; i < len; i++) {
                    node = children[i];
                    this.setTopologyNodePosition(node, offset, isRecursion);
                }
            }
        }
    };

    TopologyDiagram.prototype.relateTopologyNode = function (parentNode, currentNode) {
        var childrenNodes = parentNode.childrenNodes,
            childrenCount = childrenNodes.length,
            childItem,
            isExist = false;

        for (var i = 0; i < childrenCount; i++) {
            childItem = childrenNodes[i];
            if (childItem.id === currentNode.id) {
                isExist = true;
                break;
            }
        }

        if (!isExist) {
            parentNode.childrenNodes.push(currentNode);
            currentNode.parentNodes.push(parentNode);
        }
    };

    TopologyDiagram.prototype.relateMergeTopologyNode = function (currentNode, parentNode) {
        var children,
            mergeNode,
            childItem;

        // 追加子节点
        mergeNode = currentNode.parentNodes[0];
        children = currentNode.parentNodes[0].childrenNodes;
        parentNode.childrenNodes = children;
        parentNode.mergeNode = mergeNode;
        // 追加父节点
        for (var i = 0, len = children.length; i < len; i++) {
            childItem = children[i];
            childItem.parentNodes.push(parentNode);
        }
    };

    TopologyDiagram.prototype.calculateTopologyNodePosition = function (parentNode, currentNode) {
        // relateType必须存在，没有传入则默认为虚拟根节点
        if (!parentNode) {
            parentNode = this.virtualRootNode;
        }

        var config = this.config,
            nodeWidth,
            x = parentNode.x,
            y = parentNode.y,
            nodeOffset = {
                x: config.node['margin-left'],
                y: config.node['margin-top']
            },
            nodeHeight = config.rect.height,
            positionOffsetY = 0,
            prevNode = currentNode.prevNode,
            // 计算标准偏移量相关参数
            currentItemChild = currentNode.originalData.children,
            currentItemChildCount = currentItemChild.length,
            // 计算offsetTop累计实际偏移量相关参数
            prevNodeChildren,
            prevNodeChildrenCount,
            prevNodeChildItem;

        // x轴正向向展示
        if (this.direction.node === 'forward') {
            nodeWidth = parentNode.width;
            x += nodeWidth + nodeOffset.x;
        } else {
            nodeWidth = currentNode.width;
            x -= nodeWidth + nodeOffset.x;
        }
        // 计算同辈节点中非首个节点的位置
        if (prevNode) {
            y = prevNode.y + nodeHeight + nodeOffset.y;
        }

        if (currentItemChildCount > 1) {
            positionOffsetY = (currentItemChildCount - 1) * (nodeHeight + nodeOffset.y);
        }

        if (prevNode) {
            if (!prevNode.mergeNode) {
                y += prevNode.offsetY;
            }
        }

        $.extend(currentNode, {
            x: x,
            y: y,
            offsetY: positionOffsetY
        });

        this.recursionTopologyNodePosition(parentNode, currentNode);
    };

    TopologyDiagram.prototype.recursionTopologyNodePosition = function (parentNode, currentNode) {

        var currentItemChild = currentNode.originalData.children,
            currentItemChildCount = currentItemChild.length,
            prevNode = currentNode.prevNode,
            singleNode,
            singleNodeParent,
            prevNodeChildItem;

        //查找此节点的父节点，如果父节点没有兄弟节点（即单节点）并且不是虚根节点，则将偏移量一直延父级向上传导
        singleNode = currentNode.parentNodes;
        do {
            if (singleNode && singleNode.length === 1 && !singleNode[0].virtualRoot) {
                singleNode = singleNode[0];
                //存在父级节点且只有一个
                if (singleNode.parentNodes && singleNode.parentNodes.length === 1) {
                    singleNodeParent = singleNode.parentNodes[0];
                    singleNode.offsetY += currentNode.offsetY;
                    singleNode = singleNode.parentNodes;
                }

            } else {
                singleNode = null;
            }
        } while (singleNode)

    }

    TopologyDiagram.prototype.init = function () {
        this.paper.element.clear();
        this.paper.width = 0;
        this.paper.height = 0;

        this.selected = {
            nodeId: null,
            itemId: null
        };

        this.viewBox = {
            width: 0,
            height: 0,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
        };
        // 通过创建node自动生成的id绑定节点相关信息
        this.nodesHash = {};
        this.nodes = [];
        this.nodeMergeKey = 'id';
        this.nodeMergeHash = {};
        this.virtualRootNode = $.extend(true, {}, this.config.virtualRootNode);
        this.virtualRootNode.originalData = {
            id: 'virtualRoot',
            text: '',
            children: this.data
        };

        this.currentEventType = null;
    };

    TopologyDiagram.prototype.loadTopologyNodes = function () {
        var nodes;
        this.init();
        this.AddTopologyNodes(this.data, this.virtualRootNode);
        //test：测试时可以注释暂时去除位置的重排
        this.fitTopologyNodesPosition(this.nodes);

        nodes = this.nodes;
        for (var i = 0, len = nodes.length; i < len; i++) {
            // 优化：调整完毕节点位置后，最后再统一移动节点
            this.moveTopologyNode(nodes[i], null, true);
        }

        this.createTopologyAllLine();
        this.resetTopologyPaper();
    };

    TopologyDiagram.prototype.AddTopologyNodes = function (data, parentNode) {
        var node;

        if (typeof data === 'object' && !(data instanceof Array)) {
            data = [data];
        }

        if (data && data instanceof Array) {
            for (var i = 0, len = data.length; i < len; i++) {
                var item = data[i],
                    children;

                if (!item) {
                    continue;
                }

                children = item.children;

                // 合并的节点返回null
                node = this.createTopologyNode(item, parentNode, i);

                if (node) {
                    if (children && children.length > 0) {
                        this.AddTopologyNodes(children, node);
                    }
                } else {
                    //合并的节点，忽略后续的兄弟节点
                    break;
                }
            }
        }
    };

    TopologyDiagram.prototype.fitTopologyNodesPosition = function (nodes) {
        var node,
            childrenNodes,
            childrenNodesCount,
            isMergedNode = false;

        for (var i = 0, len = nodes.length; i < len; i++) {
            node = nodes[i];
            childrenNodes = node.childrenNodes;
            childrenNodesCount = childrenNodes.length;

            // 递归遍历非汇聚类型的节点
            if (!node.mergeNode && childrenNodesCount > 0) {
                this.fitTopologyNodesPosition(childrenNodes);
            }

            // 使发散类型的父节点位置居中
            this.moveToMiddleByBranchTypeNode(node);

            // 调整合并类型节点的位置
            this.fitMergeTypeNode(node);

            // 使合并类型的合并节点位置居中
            this.moveToMiddleByMergeTypeNode(node);
        }
    };

    TopologyDiagram.prototype.moveToMiddleByBranchTypeNode = function (node) {
        var children = node.childrenNodes,
            count = children.length,
            first,
            last,
            y,
            offset;

        if (count < 1) {
            return;
        }
        //子节点数为1并排除汇聚类型的节点
        if (count === 1 && children[0].parentNodes.length === 1) {
            first = children[0];
            y = first.y;
            node.y = y;
        } else if (count > 1) {
            first = children[0];
            last = children[count - 1];
            offset = (last.y - first.y) / 2;
            y = first.y + offset;
            node.y = y;
        }

        // dev:moveNode
        this.dev ? this.moveTopologyNode(node) : null;
    };

    TopologyDiagram.prototype.fitXByMergeTypeNode = function (node) {
        var parents = node.parentNodes,
            parentsCount = parents.length,
            firstNode,
            firstNodeWidth,
            width,
            offsetX,
            maxWidth = 0,
            parentItem,
            direction = this.direction;

        if (parentsCount > 1) {
            firstNode = parents[0];
            firstNodeWidth = firstNode.width;

            for (var i = 1; i < parentsCount; i++) {
                parentItem = parents[i];
                width = parentItem.width;
                if (width > maxWidth) {
                    maxWidth = width;
                }
            }

            if (maxWidth > firstNodeWidth) {
                offsetX = maxWidth - firstNodeWidth;
                this.setTopologyNodePosition(node, {
                    x: (direction.node === 'forward') ? offsetX : -offsetX,
                    y: 0
                }, true);
            }

            // dev:moveNode
            this.dev ? this.moveTopologyNode(node, null, true) : null;
        }
    };

    TopologyDiagram.prototype.fitYByMergeTypeNode = function (node) {
        var parents = node.parentNodes,
            parentsCount = parents.length,
            offsetY,
            parentItem,
            nextItem,
            lastItem;

        if (parentsCount > 1) {
            // 重新调整汇聚类型的多个父节点位置
            for (var i = 0; i < parentsCount - 1; i++) {
                parentItem = parents[i];
                nextItem = parents[i + 1];
                offsetY = parentItem.offsetY;
                nextItem.offsetY += parentItem.offsetY;
                nextItem.y -= offsetY;
                parentItem.offsetY = 0;

                // dev:moveNode
                this.dev ? this.moveTopologyNode(nextItem) : null;

                if (i === parentsCount - 2) {
                    lastItem = nextItem;
                }
            }

            // 暂时注释：勿删

            // var nodeHeight = this.config.rect.height,
            //     nodeOffsetY = this.config.node['margin-top'];
            // // 上移汇聚类型节点之后的兄弟节点
            // while (lastItem.nextNode) {
            //     lastItem = lastItem.nextNode;
            //     offsetY = -(nodeHeight + nodeOffsetY);
            //     this.setTopologyNodePosition(lastItem, {
            //         x: 0,
            //         y: offsetY
            //     }, true);
            //     this.moveTopologyNode(lastItem, null, true);
            // }
        }
    };

    TopologyDiagram.prototype.moveToMiddleByMergeTypeNode = function (node) {
        var parents = node.parentNodes,
            parentsCount = parents.length,
            offsetY,
            parentItem,
            lastItem,
            firstItem,
            nodeHeight = this.config.rect.height,
            currentY = node.y + nodeHeight / 2;

        // 使合并类型的合并节点位置居中
        if (parentsCount > 1) {
            firstItem = parents[0];
            lastItem = parents[parentsCount - 1];
            offsetY = currentY - (firstItem.y + (lastItem.y - firstItem.y + nodeHeight) / 2);
            if (offsetY !== 0) {
                for (var i = 0; i < parentsCount; i++) {
                    parentItem = parents[i];
                    parentItem.y += offsetY;

                    // dev:moveNode
                    this.dev ? this.moveTopologyNode(parentItem) : null;
                }
            }
        }
    };

    TopologyDiagram.prototype.fitMergeTypeNode = function (node) {
        this.fitXByMergeTypeNode(node);
        this.fitYByMergeTypeNode(node);
    };

    TopologyDiagram.prototype.createTopologyAllLine = function () {
        var nodes = this.nodesHash,
            config = this.config,
            pathWidth = config.path['stroke-width'],
            offsetX = this.config.node['margin-left'] / 2,
            direction = this.direction;

        for (var k in nodes) {
            var current = nodes[k],
                parent = current.parentNodes,
                children = current.childrenNodes,
                currentX = direction.node === 'forward' ? (current.x + current.width) : current.x,
                currentY = current.y + current.height / 2,
                operator = direction.node === 'forward' ? 1 : -1,
                // 父节点
                parentLength = parent.length,
                parentItem,
                parentItemFirst,
                parentItemEnd,
                parentItemFirstY,
                parentItemEndY,
                parentX,
                parentY,
                // 子节点
                childrenLength = children.length,
                childItem,
                childItemFirst,
                childItemEnd,
                childItemFirstY,
                childItemEndY,
                childX,
                childY,
                startX,
                endX,
                startY,
                endY;

            // 父节点为一个节点，绘制父节点到当前节点(1:1)的连线
            if (parentLength === 1) {
                parentItem = parent[0];
                if (!parentItem.virtualRoot && parentItem.childrenNodes.length === 1) {
                    parentX = direction.node === 'forward' ? (parentItem.x + parentItem.width) : parentItem.x;
                    endX = direction.node === 'forward' ? current.x : (current.x + current.width);

                    startX = parentX;
                    //endX = currentX;
                    startY = currentY;
                    endY = currentY;

                    direction.arrow === 'forward' ?
                        this.createStraightLine(startX, startY, endX, endY, true) :
                        this.createStraightLine(endX, startY, startX, endY, true);
                    // this.createStraightLine(parentX, currentY, currentX, currentY, true);
                }
            }
            // 发散的节点：子节点大于1，绘制当前节点到子节点(1：n)的连线
            if (childrenLength > 1) {
                // 前横线
                startX = currentX;
                endX = currentX + (operator * offsetX);
                startY = currentY;
                endY = currentY;

                direction.arrow === 'forward' ?
                    this.createStraightLine(startX, startY, endX, endY, false) :
                    this.createStraightLine(endX, startY, startX, endY, true);

                // 竖线
                childItemFirst = children[0];
                childItemEnd = children[childrenLength - 1];
                childItemFirstY = childItemFirst.y + childItemFirst.height / 2 - pathWidth;
                childItemEndY = childItemEnd.y + childItemEnd.height / 2 + pathWidth;
                currentX += operator * offsetX;

                startX = currentX;
                endX = currentX;
                startY = childItemFirstY;
                endY = childItemEndY;
                this.createStraightLine(startX, startY, endX, endY, false);

                // 后横线
                for (var i = 0, len = childrenLength; i < len; i++) {
                    childItem = children[i];
                    childX = direction.node === 'forward' ? childItem.x : childItem.x + childItem.width;
                    childY = childItem.y + childItem.height / 2;
                    if (!childItem.line.start) {
                        childItem.line.start = true;
                        startX = currentX;
                        endX = childX;
                        startY = childY;
                        endY = childY;

                        direction.arrow === 'forward' ?
                            this.createStraightLine(startX, startY, endX, endY) :
                            this.createStraightLine(endX, startY, startX, endY, false);
                    }
                }
            }

            // 聚合的节点：父节点大于1，绘制多个父节点到当前节点(n:1)的连线
            if (parentLength > 1) {
                // 竖线
                parentItemFirst = parent[0];
                parentItemEnd = parent[parentLength - 1];
                parentItemFirstY = parentItemFirst.y + parentItemFirst.height / 2 - pathWidth;
                parentItemEndY = parentItemEnd.y + parentItemEnd.height / 2 + pathWidth;
                currentX = (direction.node === 'forward') ? current.x - offsetX : current.x + current.width + offsetX;
                this.createStraightLine(currentX, parentItemFirstY, currentX, parentItemEndY, false);
                // 后横线
                parentX = direction.node === 'forward' ? current.x : current.x + current.width;

                startX = currentX;
                endX = parentX;
                startY = currentY;
                endY = currentY;
                direction.arrow === 'forward' ?
                    this.createStraightLine(startX, startY, endX, endY, true) :
                    this.createStraightLine(endX, startY, startX, endY, false);
                // this.createStraightLine(currentX, currentY, parentX, currentY, true);
                // 前横线
                for (var j = 0; j < parentLength; j++) {
                    parentItem = parent[j];
                    parentX = direction.node === 'forward' ? parentItem.x + parentItem.width : parentItem.x;
                    parentY = parentItem.y + parentItem.height / 2;

                    startX = parentX;
                    endX = currentX;
                    startY = parentY;
                    endY = parentY;
                    direction.arrow === 'forward' ?
                        this.createStraightLine(startX, startY, endX, endY, false) :
                        this.createStraightLine(endX, startY, startX, endY, true);
                    // this.createStraightLine(parentX, parentY, currentX, parentY, false);
                }
            }
        }
    };

    TopologyDiagram.prototype.setViewBox = function (node) {
        var viewBox = this.viewBox,
            top = viewBox.top,
            bottom = viewBox.bottom,
            left = viewBox.left,
            right = viewBox.right,
            currentTop = node.y,
            currentBottom = node.y + node.height,
            currentLeft = node.x,
            currentRight = node.x + node.width;

        if (currentTop < top) {
            viewBox.top = currentTop;
        }

        if (bottom < currentBottom) {
            viewBox.bottom = currentBottom;
        }

        if (currentLeft < left) {
            viewBox.left = currentLeft;
        }

        if (right < currentRight) {
            viewBox.right = currentRight;
        }

        viewBox.width = viewBox.right - viewBox.left;
        viewBox.height = viewBox.bottom - viewBox.top;
    };

    TopologyDiagram.prototype.resetTopologyPaper = function () {
        var viewBox = this.viewBox,
            paper = this.paper.element,
            offset = 10,
            height = viewBox.height + 2 * offset,
            width = viewBox.width + 2 * offset,
            viewBoxX = viewBox.left < 0 ? viewBox.left - offset : -offset,
            viewBoxY = viewBox.top < 0 ? viewBox.top - offset : -offset,
            container = $(this.container),
            containerWidth = 0,
            containerHeight = 0,
            canvas;

        //没有加载节点，不对paper进行调整：
        //对没有绘图节点的空白paper下，对paper进行调整，IE8执行重新加载（loadNodes）节点方法会出现异常
        if (!this.data || this.data.length < 1) {
            return;
        }

        paper.setSize(width, height);
        paper.setViewBox(viewBoxX, viewBoxY, width, height, false);

        // 水平位置
        if (this.align === 'center' || this.align === 'right') {
            containerWidth = container.width();
            if (containerWidth > width) {
                //选取SVG（现代浏览器）或DIV（rvml IE8）
                canvas = container.find('>svg:first,>div:first');
                canvas.css({
                    left: this.align === 'center' ? '50%' : '90%',
                    'margin-left': this.align === 'center' ? '-' + width / 2 + 'px' : '-' + width + 'px'
                });
            }
        }

        // 垂直位置
        if (this['vertical-align'] === 'middle' || this['vertical-align'] === 'bottom') {
            containerHeight = container.height();

            if (containerHeight > height + 25) {
                //选取SVG（现代浏览器）或DIV（rvml IE8）
                canvas = container.find('>svg:first,>div:first');
                canvas.css({
                    top: this['vertical-align'] === 'middle' ? '50%' : '90%',
                    'margin-top': this['vertical-align'] === 'middle' ? '-' + height / 2 + 'px' : '-' + height + 'px'
                });
            }
        }
    };

    TopologyDiagram.prototype.getId = (function () {
        var id = 0;
        return function () {
            return ++id;
        };
    })();

    var methods = {
        init: function (options) {
            return this.each(function () {
                var $elem = $(this),
                    topology = $elem.data('topology-diagram');

                //methods.destroy.apply($elem);

                //初始化
                if (!topology) {
                    topology = new TopologyDiagram(this, Raphael, options);
                    $elem.addClass('topology-diagram').data('topology-diagram', topology);
                    // 取消默认的右键菜单
                    this.oncontextmenu = function () {
                        return false;
                    };

                } else { //调整配置项
                    topology.setOptions(options);
                }
                topology.loadTopologyNodes();

            });
        },
        loadNodes: function (data) {
            return this.each(function () {
                var $elem = $(this),
                    topology = $elem.data('topology-diagram');

                if (!data) {
                    console.warn('no load data');
                    return;
                }
                topology.data = data;
                topology.loadTopologyNodes();
            });
        },
        destroy: function () {
            return this.each(function () {
                var $elem = $(this),
                    topologyDiagram = $elem.data('topology-diagram'),
                    paper;

                if (topologyDiagram) {
                    paper = topologyDiagram.paper.element;
                    paper.remove();
                    $elem.removeClass('topology-diagram');
                    $elem.removeData('topology-diagram');
                }
            });
        },
        getSelected: function () {
            var $elem = $(this),
                topologyDiagram = $elem.data('topology-diagram'),
                selectedId = topologyDiagram.selected.nodeId,
                node = topologyDiagram.nodesHash[selectedId],
                selected = node ? node.originalData : null;

            if (node) {
                return {
                    nodeId: node.id,
                    data: selected
                };
            } else {
                return null;
            }
        },
        addNodes: function (parentId, data) {
            return this.each(function () {
                var $elem = $(this),
                    topology = $elem.data('topology-diagram'),
                    relateData,
                    children,
                    nodes;
                if (!parentId || !topology.nodesHash[parentId]) {
                    console.warn('parentId is not exist');
                    return;
                }

                relateData = topology.nodesHash[parentId].originalData;

                nodes = relateData.children;
                children = nodes.concat(data);

                relateData.children = children;

                topology.loadTopologyNodes();
            });
        },
        bindEvent: function (name, callback) {
            return this.each(function () {
                var $elem = $(this),
                    topology = $elem.data('topology-diagram');

                topology[name] = callback;
            });
        }
    };

    jQuery.fn.topology = function () {
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
})(jQuery, Raphael);