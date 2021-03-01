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

        scanTestLoad: function( oResponse ){


            var oData = this.oModel.getData();
            var aRes = oResponse.results;
  
            this.oController.oAppLogPopup.display(
                     aRes[ 1 ].head_message,
                     aRes[ 1 ].head_lognumber );

            this.oModel.setData(oData);

        },

        scanTest: function( oBackend ){

             var oModel = oBackend;

                oModel.setUseBatch(false);

                var la_filters = new Array();
                var lo_Filter = new sap.ui.model.Filter(
                    {
                     path: "workstation",
                     operator: sap.ui.model.FilterOperator.EQ,
                     value1: 'ABCD'
              },
                {
                     path: "scan_action",
                     operator: sap.ui.model.FilterOperator.EQ,
                     value1: ''
              },
                {
                     path: "scan_value",
                     operator: sap.ui.model.FilterOperator.EQ,
                     value1: 'FIRST_SCAN'
              }
              );
                la_filters.push(lo_Filter);
          window.zoModel = oModel;
                oModel.read("/xZRGxCDS_PEC_SCAN_ACTION" , { 
                    filters  : la_filters,
                    //	filters: la_filters,
                    //urlParameters: mParameters,
                    success: function (oResponse) {
                        this.scanTestLoad( oResponse );
                        //sap.m.MessageBox.success('Erfolg');
                    }.bind(this),
                    error: function (oResponse) {
                        sap.m.MessageBox.error('Kein Auftrag zu Arbeitsplatz gefunden');
                    }
                });

        },

        onAfterLoad: function (oData , oBackend ) {

            this.oBackend = oBackend;
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

        refresh: function (oController , oBackend) {

            this.oController = oController;
            var oData = this.oModel.getData();

            switch (oData.ACTION) {

                case 'INIT':
                    this.oModel.loadData("model/mockdata/SCAN_ORDER.json");
                    break;

                case 'SCAN_ORDER':
                    //this.scanTest( oBackend );
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