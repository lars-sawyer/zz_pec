sap.ui.define([
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/resource/ResourceModel",
    "sap/m/MessageBox"
], function (JSONModel, ResourceModel, MessageBox) {
    "use strict";

    return {

        sInitPath: "model/MainViewModel.json",
        oModel: {},
        ResourceModel: ResourceModel,
        oi18n: {},

        getInit: function () {

            jQuery.sap.require("jquery.sap.resources");
            var sLocale = sap.ui.getCore().getConfiguration().getLanguage();
            this.oi18n = jQuery.sap.resources({
                url: "i18n/i18n.properties",
                locale: sLocale
            });

            this.oModel = new JSONModel(this.sInitPath);
            this.oModel.setDefaultBindingMode("TwoWay");
            this.oModel.attachRequestCompleted(this.onAfterLoad.bind(this));
            return this.oModel;
        },

        onAfterLoad: function (oData) {

            var oData = this.oModel.getData();

            switch (oData.ACTION) {

                case 'INIT':
                    break;

                case 'SCAN_ORDER':
                   // this.oModel.setProperty('/inputDescr', this.oi18n.getText('scan.ordertote'));
                   // this.oModel.setProperty('/inputPlaceholder', 'order tote finden und scannen');
                    break;

                case 'SCAN_HU':
                    break;

                case 'SCAN_MATNR':

                default:

            }

            if ( oData.MessageText !== undefined ){
                sap.m.MessageToast.show(oData.MessageText);
                //sap.m.MessageBox.success('dudu');
            }

            //set static data
            this.oModel.setProperty('/appTitle', this.oi18n.getText('workstation.Title'));

            if (this.oController !== undefined) {
                jQuery.sap.delayedCall(200, this, function () {
                    let oData = this.oModel.getData();
                     this.oController.getView().byId(oData.focusId).focus();
                });
            }
            console.log(this.oModel.getData());
        },

        refresh: function (oController) {

            this.oController = oController;
            var oData = this.oModel.getData();

            switch (oData.ACTION) {

                case 'INIT':
                    this.oModel.loadData("model/mockdata/SCAN_ORDER.json");
                    break;

                case 'SCAN_ORDER':
                    this.oModel.loadData("model/mockdata/SCAN_ORDER2.json");
                    break;

                case 'SCAN_HU':
                    this.oModel.loadData("model/mockdata/SCAN_MATNR.json");
                    break;

                case 'SCAN_MATNR':
                    this.oModel.loadData("model/mockdata/SCAN_COOLING.json");
                    break;

                case 'SCAN_COOLING':
                    this.oModel.loadData("model/mockdata/SCAN_ORDER.json");
                    break;

            }
        }
    };
});