HoteamUI.Control.OAccordionToggle = {
    Create: function (options) {

        options = options || {};
        var self = this;
        var id = this.id;
        var handlers = (options.controlInfo || this.ControlInfo()).PageHandlers;
        var o = {};
        var ctrlEvent = {};
        ctrlEvent.o = HoteamUI.Control.Instance(id);


        var ctrl = $("#" + this.id);
        ctrl.append("<span class='accordion-toggle-text'>" + HoteamUI.Language.Lang("Accordion.NavigationMenu") + "</span><span class='basesprite  accordion-toggle-icon  accordion-toggle-icon-open' />");
        
        ctrl.find('.accordion-toggle-icon').toggle(function () {
            $(this).parent().removeClass("hoteam-navigation-toggle-standard").addClass("hoteam-navigation-toggle-slide");
            $(this).removeClass("accordion-toggle-icon-open").addClass("accordion-toggle-icon-close");
            var guid = $("[cid='ClassicHomePage_HLayout']").attr("id");
            var layoutContainer = HoteamUI.Control.Instance(guid);
            layoutContainer.ResetPanelSize({ item1: 33 });
        },
        function () {
            $(this).parent().removeClass("hoteam-navigation-toggle-slide").addClass("hoteam-navigation-toggle-standard");         
            $(this).removeClass("accordion-toggle-icon-close").addClass("accordion-toggle-icon-open");
            var guid = $("[cid='ClassicHomePage_HLayout']").attr("id");
            var layoutContainer = HoteamUI.Control.Instance(guid);
            layoutContainer.ResetPanelSize({ item1: 150 });
        });;
    },
    Resize: function () {

    }
}
