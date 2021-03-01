sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "wmppec/model/formatter",
    "wmppec/model/MainViewModel",
    "wmppec/bal/BusLog"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
    function (Controller, formatter, ViewModel, AppLog) {
        "use strict";

        return Controller.extend("wmppec.controller.Main", {

           // oAppLogPopup: {},
            formatter: formatter,

            onInit: function () {

                var oModel = this.getView().getModel("testBackend");

                function fnSuccess(oResponse) {

                    var test = 1;
                    //MessageToast.show('Auftrag ' + oResponse.results[0].aufnr + ' ermittelt');
                    //view.byId("__orderid").setValue(oResponse.results[0].aufnr);
                    //that.goToDetail();

                }

                oModel.read("/WorkstationSet", {
                    //	filters: la_filters,
                    success: fnSuccess,
                    error: function (oResponse) {
                        sap.m.MessageBox.error('Kein Auftrag zu Arbeitsplatz gefunden');
                    }
                });

                var oModel = this.getView().getModel("Decanting");

                oModel.read("/DefaultParameterSet('LGNUM')", {
                    //	filters: la_filters,
                    success: fnSuccess,
                    error: function (oResponse) {
                        sap.m.MessageBox.error('Kein Auftrag zu Arbeitsplatz gefunden');
                    }
                });

                if (!this.oAppLogPopup){
                this.oAppLogPopup = new AppLog().factoryPopup(this.getView());
                }
                  ViewModel.refresh(this , this.getView( ).getModel("PecService") );

                setTimeout(function () {

                    $("#container-wmp_pec---Main--card-__clone0-contentSection").addClass("min").removeClass("sapFCardContent");
                    $("#container-wmp_pec---Main--card-__clone1-contentSection").addClass("min").removeClass("sapFCardContent");
                    $("#container-wmp_pec---Main--card-__clone2-contentSection").addClass("min").removeClass("sapFCardContent");
                  $("#container-wmp_pec---Main--card-__clone3-contentSection").addClass("min").removeClass("sapFCardContent");
                    $("#container-wmp_pec---Main--card-__clone4-contentSection").addClass("min").removeClass("sapFCardContent");
                    $("#container-wmp_pec---Main--card-__clone5-contentSection").addClass("min").removeClass("sapFCardContent");
                    if (ViewModel.oModel.oData.slots[0].highlighted === true) {
                        $("#container-wmp_pec---Main--card-__clone0-contentSection").addClass("slotHighlighted");
                    }

                    if (ViewModel.oModel.oData.slots[1].highlighted === true) {
                        $("#container-wmp_pec---Main--card-__clone4-contentSection").addClass("slotHighlighted");
                    }

                    if (ViewModel.oModel.oData.slots[2].highlighted === true) {
                        $("#container-wmp_pec---Main--card-__clone2-contentSection").addClass("slotHighlighted");
                    }

                }.bind(this), 500);


            },

            onFinishOrderToteButtonPressed: function () {


                var oModel = this.getView().getModel("testBackend");

                var mParameters = {
                    "delivery": "1236426",
                    "scanaction": "ScCAN_BOX",
                    "scanvalue": "2343543"
                };

               // sap.ui.core.BusyIndicator.show(0);
                //Aufruf der Confirm Funktion
                oModel.callFunction("/ScanAction", {
                    method: "GET",
                    urlParameters: mParameters,
                    success: function (oResponse) {
                        MessageToast.show('erfolg');
                    }.bind(this),
                    error: function (oError) {
                        MessageToast.show('fehler');
                    }.bind(this),
                    async: true
                }, true);




               





                this.oAppLogPopup.display('Handling Unit 123458 konnte nicht in Lieferung 234674213 verpackt werden. Bitte Status der Handling Unit prüfen.', '123354');

                var olog = new AppLog().factoryLog();
                olog.add('Es ist ein feehler passiert');
            },


            onAfterRendering: function () {

            },



            cardFactory: function (sId, oContext) {


                var oUIControl;

                oUIControl = this.byId("card").clone();

                return oUIControl;
            }

        });
    });
