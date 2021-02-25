sap.ui.define([
    "sap/ui/base/Object",
    "sap/ui/model/json/JSONModel",
    "wmppec/bal/Popup.controller",
    "sap/ui/core/ValueState",
], function (Object, JSONModel, PopupController, ValueState) {
    "use strict";
    return Object.extend("wmppec.bal.BusLog", {

        aRequest: [],
        oReturn: {},
        oAttributes: {
            sService: '/zls_sui',
            sServer: window.location.href.split('/')[0] + '//' + window.location.href.split('/')[2],
            requestFunction: this.requestMockData
        },

        factoryPopup: function (oView) {

            //this.oView = oView;
            // this.oView.addDependent(this._oDialog);
            this.init(oView);
            this.oPopup.init(this);
            return this.oPopup;

        },

        init: function (oView) {
            //  if (!this._oDialog) {
            this._oDialog = sap.ui.xmlfragment("wmppec.bal.Popup", new PopupController(this));

            this.oView = oView;
            this.oView.addDependent(this._oDialog);
            //   }

            this.aLog = {
                title: "Business Application Log",
                buttonText: "OK",
                items: []
            };
        },

        oPopup: {
            init: function (oParent) {
                this.oParent = oParent;
            },

            display : function ( ){
                this.oParent.popup( );
            }
        },

        popup: function (message, lognumber) {

            this.oDialog = new sap.m.Dialog({
                type: sap.m.DialogType.Message,
                title: "Fehlermeldung",
                state: ValueState.Error,
                content: new sap.m.Text({ text: message }),
                beginButton: new sap.m.Button({
                    type: sap.m.ButtonType.Accept,
                    text: 'OK',
                    press: function () {
                        this.oDialog.close();
                    }.bind(this)
                }),
                endButton: new sap.m.Button({
                    type: sap.m.ButtonType.Reject,
                    text: "details",
                    press: function () {
                        // this.oDialog.close();
                        this.popupLog();
                    }.bind(this)
                })
            });

            this.oView.addDependent(this.oDialog);
            this.oDialog.open();

        },

        popupLog: function () {

            var aLog = {
                title: "Business Application Log",
                buttonText: "weiter",
                items: [
                    { "TYPE": "sap-icon://message-error", "MESSAGE": "Das ist die erste Nachricht", "COLOR": "Negative" },
                    { "TYPE": "sap-icon://message-success", "MESSAGE": "Dasdfdasf fsda asd  agfds sga sdfadsfasd", "COLOR": "Positive" },
                    { "TYPE": "sap-icon://message-information", "MESSAGE": "Letzte Nachricht", "COLOR": "" },
                ]
            };
            this.aLog.items = [{ "TYPE": "sap-icon://message-error", "MESSAGE": "Das ist die erste Nachricht", "COLOR": "Negative" },
            { "TYPE": "sap-icon://message-success", "MESSAGE": "Dasdfdasf fsda asd  agfds sga sdfadsfasd", "COLOR": "Positive" },
            { "TYPE": "sap-icon://message-information", "MESSAGE": "Letzte Nachricht", "COLOR": "" }
            ];

            var oModel = new sap.ui.model.json.JSONModel(this.aLog);
            this.oView.setModel(oModel, "list");
            this._oDialog.open();

        }
    });
});