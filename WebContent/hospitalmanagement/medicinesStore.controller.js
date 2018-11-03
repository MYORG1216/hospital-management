sap.ui.define([
        "hospital/hospitalmanagement/icon/icon"
    ],
    (oIcons, oUserConstants) => {
        "use strict";
sap.ui.controller("hospital.hospitalmanagement.medicinesStore", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf hospitalmanagement.medcinesStore
*/
//	onInit: function() {
//
//	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf hospitalmanagement.medcinesStore
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf hospitalmanagement.medcinesStore
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf hospitalmanagement.medcinesStore
*/
//	onExit: function() {
//
//	}
select(oEvt,aData){
	debugger;
	let oSource = oEvt.getSource();
	let oSelectedType;
	if(oSource.getSelectedItem){
	 oSelectedType = oSource.getSelectedItem().getBindingContext("oHospitalModel").getObject();
	if(oSelectedType){
		let oController = this;
		let oView = oController.getView(),
		    oModel = oController.getOwnerComponent().getModel("oHospitalModel");
		    oModel.setProperty("/selectedType",oSelectedType);
		    oController.getOwnerComponent().getRouter().navTo("list");
		    oView.oList.removeSelections(true);
	}
	
	}
}
});
});