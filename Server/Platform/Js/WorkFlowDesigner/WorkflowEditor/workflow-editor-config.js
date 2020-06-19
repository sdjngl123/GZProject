﻿$(function () {
    var workflow = $.workflow,
        href = window.location.href,
        states = workflow.config.tools.states,
        i,
        len,
        node;

    workflow.config.basePath = '.Platform/Js/WorkFlowDesigner/WorkflowEditor';


    $.extend(true, workflow.config.rect, {
        attr: {
            r: 8,
            fill: "270-#fff-#d7d7d7",
            stroke: '#ccc',
            "stroke-width": 1,
            "stroke-width-active": 2,
            "stroke-active": '#0099cc'
        }
    });

    $.extend(true, workflow.config.path, {
        attr: {
            stroke: '#0099ff',
            "stroke-width": 2,
            "stroke-width-active": 3,
            "arrow-end": 'block'
        },
        rect: {
            attr: {
                width: 4,
                height: 4,
                fill: "#0066cc",
                stroke: "#0066cc",
                "stroke-width": 1,
                cursor: "opinter"
            }
        }
    });

});