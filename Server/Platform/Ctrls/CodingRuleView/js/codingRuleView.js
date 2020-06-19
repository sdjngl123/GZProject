/*!
 * codeing-rule-view v1.2.0 -  jQuery  plug
 *
 * Includes jquery.js
 *
 * Copyright © 2017-2018 huangqing
 * Released under the MIT license
 *
 * Date: 2017-10-25
 */

(function ($) {

    'use strict';
    $.fn.extend({
        codingRuleView: function (opt) {

            var container = this,
                htmlTemplate,
                html = "",
                iconType,
                htmlCodeingRuleGroup = "",
                htmlCodingRuleIcon = "",
                htmlCodeingRuleGroupArray = [];

            iconType = {
                "01": "number",
                "02": "char",
                "03": "num-char",
                "04": "watercode",
                "05": "date",
                "00": "more"
            };

            htmlTemplate = {
                codeingRule: '<div class="codingRule">[codingRule-group]</div>',
                codeingRuleGroup: ['<div class="codingRule-group codingRule-group-[codingRule-group-odd|even]">',
                    '<div class="codeingRule-text-container codeingRule-text-container-top">',
                    '<span class="codeingRule-line">',
                    '<span class="codeingRule-text" title="[codeingRule-text]" >',
                    '[codeingRule-text]',
                    '</span>',
                    '</span>',
                    '</div>',
                    '<div class="codingRule-icons">',
                    '[codingRule-icons]',
                    '</div>',
                    '<div class="codeingRule-text-container codeingRule-text-container-bottom">',
                    '<span class="codeingRule-line">',
                    '<span class="codeingRule-text" title="[codeingRule-text]" >',
                    '[codeingRule-text]',
                    '</span>',
                    '</span>',
                    '</div>',
                    '</div>'
                ].join(""),
                codingRuleIcon: '<span class="codingRule-icon codingRule-icon-[codingRule-icon-type]"></span>'
            };

            if (opt && opt instanceof Array) {
                var item,
                    name,
                    type,
                    codingLength;

                html = htmlTemplate.codeingRule;

                for (var i = 0, len = opt.length; i < len; i++) {
                    item = opt[i];
                    name = item.name;
                    type = iconType[item.type];
                    codingLength = item.length;

                    htmlCodeingRuleGroup = htmlTemplate.codeingRuleGroup.replace(/\[codeingRule-text\]/g, name).
                    replace(/\[codingRule-group-odd\|even\]/g, i % 2 === 0 ? "even" : "odd");

                    htmlCodingRuleIcon = "";

                    if (codingLength === 0) {
                        htmlCodingRuleIcon += htmlTemplate.codingRuleIcon.replace(/\[codingRule-icon-type\]/g, type);
                        htmlCodingRuleIcon += htmlTemplate.codingRuleIcon.replace(/\[codingRule-icon-type\]/g, iconType["00"]);
                    } else {
                        for (var j = 0; j < codingLength; j++) {
                            htmlCodingRuleIcon += htmlTemplate.codingRuleIcon.replace(/\[codingRule-icon-type\]/g, type);
                        }
                    }

                    htmlCodeingRuleGroup = htmlCodeingRuleGroup.replace(/\[codingRule-icons\]/g, htmlCodingRuleIcon);
                    htmlCodeingRuleGroupArray.push(htmlCodeingRuleGroup);
                }

                html = html.replace(/\[codingRule-group\]/g, htmlCodeingRuleGroupArray.join(""));
            }

            container.append(html);

            //设定总体及文字宽度
            var group = container.find('.codingRule-group'),
                width = 100,
                current,
                next,
                currentWidth,
                nextWidth,
                currentText,
                offset = 0,
                filter;

            for (var i = 0, len = group.length; i < len; i++) {
                //计算每个分组的宽度
                current = $(group[i]);
                next = $(group[i + 1]);
                filter = i % 2 === 0 ? 'codeingRule-text-container-bottom' : 'codeingRule-text-container-top';

                currentWidth = current.width();
                if (next.length === 0) {
                    nextWidth = 100;
                } else {
                    nextWidth = next.width();
                }

                //计算总宽度
                width += currentWidth;

                currentText = current.find('.' + filter + ' .codeingRule-text');
                //使用偏移量为基数计算文字宽度减值
                if (i === 0) {
                    offset = parseInt(currentText.css('margin-left'));
                    if (isNaN(offset)) {
                        offset = 0;
                    } else {
                        offset = -offset * 3;
                    }

                }
                var widthNew = currentWidth + nextWidth + offset;
                if (widthNew <= 0) {
                    widthNew = 14;
                }
                //计算文字显示宽度
                currentText.width(widthNew);
            }

            container.find('>.codingRule').width(width);

            return container;
        }
    });
})(jQuery);