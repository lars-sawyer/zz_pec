sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
    function (Controller) {
        "use strict";

        return Controller.extend("wmppec.bal.Popup", {

            constructor: function (oArg) {
                this.oFragment = oArg;
            },

            onInit: function () {

                ViewModel.refresh(this);

            },

            onFinishOrderToteButtonPressed: function () {

                this.onOpenDialog();

            },

            onOpenDialog: function () {
     

            },
            onCloseDialog: function (oEvent) {
                //   this._oDialog.close();
                this.oFragment._oDialog.close();
            }
        });
    });
