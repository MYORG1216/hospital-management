sap.ui.define([
        "hospital/hospitalmanagement/icon/icon"
    ],
    (oIcons, oUserConstants) => {
        "use strict";
sap.ui.controller("hospital.hospitalmanagement.bill", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf hospitalmanagement.bill
*/
//	onInit: function() {
//
//	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf hospitalmanagement.bill
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf hospitalmanagement.bill
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf hospitalmanagement.bill
*/
//	onExit: function() {
//
//	}
	Del(oEvt) {
	    debugger;
	    let oController = this,
	        oView = oController.getView();
	    let oModel = this.getOwnerComponent().getModel("oHospitalModel");
	    let aCartItems = oModel.getProperty("/cartItems");
	    let oSource = oEvt.getParameter("listItem").mProperties.title;
	    aCartItems.forEach((obj, sId) => {
	        debugger;
	        let oItem = aCartItems[sId].name;
	        if (oItem == oSource) {
	            debugger;
	            aCartItems.splice(sId, 1);
	            oModel.setProperty("/cartItems", aCartItems);
	        }
	    })
	    oController.totalCost(aCartItems);
	},
	totalCost(aData) {
        debugger;
        let oController = this,
            oAdd,
            oView = oController.getView(),
            oModel = this.getOwnerComponent().getModel("oHospitalModel");
        let tot = 0,
            totItems = aData.length;
        aData.forEach((obj, sId) => {
            debugger;
            let iPrice = obj.price,
                sCount = obj.count,
                amount = iPrice * sCount;
            tot = tot + amount;
        });
        oModel.getProperty("/totalItems/count");
        oModel.setProperty("/totalItems/count", totItems);
        oModel.getProperty("/total/amount");
        oModel.setProperty("/total/amount", tot);
  },
pay() {
	debugger;
	let oController = this,
	    oView = oController.getView(),
	    oModel = this.getOwnerComponent().getModel("oHospitalModel");
	sap.m.MessageToast.show("bill paid");
	oController.getOwnerComponent().getRouter().navTo("op");
	oModel.getProperty("/cartItems",[]);
}
});
});