sap.ui.define([], function () {
  "use strict";

  return {

    // formatter method contains the formatting logic
    // parameter iValue gets passed from the view ...
    // ... that uses the formatter
    fooBar: function(iValue) {


      // return sReturn to the view
      return iValue+'1';    

    },

    		numberUnit : function (sValue) {
			if (!sValue) {
				return "";
			}
			return parseFloat(sValue).toFixed(2);
        },
        
        textVisible: function(sText) {
            if(sText) {
                return true;
            }
            return false;
        }
	
  };

});