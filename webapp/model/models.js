sap.ui.define([
	"sap/ui/model/json/JSONModel",
    "sap/ui/Device",
    "wmppec/model/MainViewModel"
], function (JSONModel, Device, MainViewModel) {
	"use strict";

	return {

		createDeviceModel: function () {
			var oModel = new JSONModel(Device);
			oModel.setDefaultBindingMode("OneWay");
			return oModel;
		},

        createMainViewModel: function () {
            var oModel = MainViewModel.getInit();
            return oModel;
        }

	};
});