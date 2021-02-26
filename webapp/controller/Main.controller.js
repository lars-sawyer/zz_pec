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

            oAppLogPopup: {},
            formatter: formatter,

            onInit: function () {

                if (this.oAppLogPopup === false) {
                    this.oAppLogPopup = new AppLog().factoryPopup(this.getView());
                }

                ViewModel.refresh(this);

                setTimeout(function () {

                    $("#container-wmp_pec---Main--card-__clone0-contentSection").addClass("min").removeClass("sapFCardContent");
                    $("#container-wmp_pec---Main--card-__clone1-contentSection").addClass("min").removeClass("sapFCardContent");
                    $("#container-wmp_pec---Main--card-__clone2-contentSection").addClass("min").removeClass("sapFCardContent");
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

                this.oAppLogPopup.display('Handling Unit 123458 konnte nicht in Lieferung 234674213 verpackt werden. Bitte Status der Handling Unit prüfen.', '123354');

                var olog = new AppLog().factoryLog();
                olog.push( 'Es ist ein feehler passiert');
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
