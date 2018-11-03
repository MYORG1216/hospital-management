sap.ui.define([
        "hospital/hospitalmanagement/icon/icon"
    ],
    (oIcons, oUserConstants) => {
        "use strict";
sap.ui.jsview("hospital.hospitalmanagement.medicinesStore", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf hospitalmanagement.medcinesStore
	*/ 
	getControllerName : function() {
		return "hospital.hospitalmanagement.medicinesStore";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf hospitalmanagement.medcinesStore
	*/ 
	createContent : function(oController) {
		let oView = this;
		oView.oList = new sap.m.List({	
			mode: sap.m.ListMode.SingleSelectMaster,
			select:[oController.select,oController]
		}).bindAggregation("items",{
			path:"oHospitalModel>/aTablets",
			factory:((sId,oCnt)=>{
				debugger;
				return new sap.m.ObjectListItem({
					title:"{oHospitalModel>title}",
					firstStatus: new sap.m.ObjectStatus({
						text:"{oHospitalModel>no}"
					})
				})
			})
		});
		
		let oMasterPage = new sap.m.Page({
			title:oBundle.getText("std.medicines"),
//			showHeader: false,
			content:[
				oView.oList
				
			]
		});
		let oDetailPage = new sap.m.Page({
			showHeader: false,
			content:[
				new sap.m.Image({
					src:"img/shop.jpg"
				})
				
			]
		});
		let oSplitApp = new sap.m.SplitContainer({
				masterPages:[
					oMasterPage
				],
				detailPages:[
					oDetailPage
				]
		})
 		return new sap.m.Page({
			title: oBundle.getText("std.medicalShop"),
			content: [
			     oSplitApp
			]
		});
	}
});
});