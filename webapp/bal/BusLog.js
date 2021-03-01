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

        factoryLog: function( ){
            return this.oLog;
        },

        db_save: function( ){


         var oModel = this.getView().getModel("testBackend");


                var oNewEntry = {
                    "lognumber": '002',
                   // "Connid": '0017',
                   // "Cityfrom": 'New York',
                    "LogHeadToLogPos": []
                };

                var oPos1 = {
                    "guid": '12345',
                    "message": 'einen nachricht'
                };

                oNewEntry.LogHeadToLogPos.push(oPos1);

                var oPos2 = {
                    "guid": '2234432',
                    "message": 'zweit enchricht',
                    "type" : 'E'
                };
                oNewEntry.LogHeadToLogPos.push(oPos2);

                oModel.create("/LogHeadSet", oNewEntry, {
                    success: function (oResponse) {
                        MessageToast.show('erfolg');
                    }.bind(this),
                    error: function (oError) {
                        MessageToast.show('fehler');
                    }.bind(this)
                });


        },

        init: function (oView) {
            if (!this._oDialog) {
            this._oDialog = sap.ui.xmlfragment("wmppec.bal.Popup", new PopupController(this));
            }

            this.oView = oView;
            this.oView.addDependent(this._oDialog)

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

            display: function ( message, lognumber) {
                this.oParent.popup( message , lognumber );
            }
        },

        oLog: {

            aLog: [],

            add: function (message) {

                this.aLog.push({
                    "message": message,
                    "type": "E",
                    "id": "HUGEN",
                    "no": "334"
                }
                );

            }
        },

        popup: function (message, lognumber) {

            this.lognumber = lognumber;

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

        // windows.zoModel 
            this.aLog.items

         var la_filters = new Array();
                var lo_Filter = new sap.ui.model.Filter(
                    {
                     path: "lognumber",
                     operator: sap.ui.model.FilterOperator.EQ,
                     value1: this.lognumber
              }
              );

                la_filters.push(lo_Filter);
           var oModel = window.zoModel;
                oModel.read("/xZRGxCDS_PEC_BUS_APP_LOG" , { 
                    filters  : la_filters,
                    //	filters: la_filters,
                    //urlParameters: mParameters,
                    success: function (oResponse) {
                        this.popupLog2( oResponse );
                       // this.scanTestLoad( oResponse );
                        //sap.m.MessageBox.success('Erfolg');
                    }.bind(this),
                    error: function (oResponse) {
                        sap.m.MessageBox.error('Kein Auftrag zu Arbeitsplatz gefunden');
                    }
                });

            },

            popupLog2 : function( oResponse ){

            var aLog = {
                title: "Business Application Log",
                buttonText: "weiter",
                items: [ ]
            };

            for (var i = 0; i < oResponse.results.length ; i++) {
               var row = oResponse.results[i];
               this.aLog.items.push( 
                { "TYPE": "sap-icon://message-error", "MESSAGE": row.message , "COLOR": "Negative" } );
            }

          //  this.aLog.items = [{ "TYPE": "sap-icon://message-error", "MESSAGE": "Das ist die erste Nachricht", "COLOR": //"Negative" },
          //  { "TYPE": "sap-icon://message-success", "MESSAGE": "Dasdfdasf fsda asd  agfds sga sdfadsfasd", "COLOR": "Positive" },
          //  { "TYPE": "sap-icon://message-information", "MESSAGE": "Letzte Nachricht", "COLOR": "" }
           // ];
       

            var oModel = new sap.ui.model.json.JSONModel(this.aLog);
            this.oView.setModel(oModel, "list");
            this._oDialog.open();


            }

           
    });
});