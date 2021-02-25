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

            oAppLogPopup : { },
            formatter: formatter,

            onInit: function () {

                this.oAppLogPopup = new AppLog( ).factoryPopup( this.getView( ) );
                ViewModel.refresh(this);

            },

            onFinishOrderToteButtonPressed: function () {
            
                this.oAppLogPopup.display( 'Handling Unit 123458 konnte nicht in Lieferung 234674213 verpackt werden. Bitte Status der Handling Unit prüfen.' , '123354' );
            }
  
        });
    });
