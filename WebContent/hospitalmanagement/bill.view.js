sap.ui.define([
        "hospital/hospitalmanagement/icon/icon"
    ],
    (oIcons, oUserConstants) => {
        "use strict";
sap.ui.jsview("hospital.hospitalmanagement.bill", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf hospitalmanagement.bill
	*/ 
	getControllerName : function() {
		debugger;
		return "hospital.hospitalmanagement.bill"
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf hospitalmanagement.bill
	*/ 
	createContent : function(oController) {
		debugger;
		let oView = this,
		oModel = oController.getOwnerComponent().getModel("oHospitalModel");
		oModel.setProperty("/orderListEdit", "X");
		oView.oList = new sap.m.List({
			mode: {
                path: "oHospitalModel>/orderListEdit",
                formatter: (sOrderListEdit) => {
                    debugger;
                    return sOrderListEdit === "X" ? sap.m.ListMode.Delete :
                        sap.m.ListMode.SingleSelectMaster;
                }
			},
        delete: [oController.Del, oController]
		}).bindAggregation("items", "oHospitalModel>/cartItems", (sId, oCnt) => {
            debugger;
            return new sap.m.ObjectListItem({
           	 title:"{oHospitalModel>name}",
					number:"{oHospitalModel>price}",
					
					firstStatus: new sap.m.ObjectStatus({
						text: "{oHospitalModel>currencyCode}"
					}),
					secondStatus:new sap.m.ObjectStatus({
						text: "{oHospitalModel>status}",
						state:{
							path: "oHospitalModel>status",
							formatter: (sStatus) =>{
								debugger;
								if(sStatus == oBundle.getText("std.available")) {
								return sap.ui.core.ValueState.Success;
								} else {
									return sap.ui.core.ValueState.Error;
								}
							}
						}
					}),
					attributes:[
						new sap.m.ObjectAttribute({
							text:"{oHospitalModel>drug}"
						})
					]
            })
        });
 		return new sap.m.Page({
			title: oBundle.getText("std.yourCart"),
			content: [
				new sap.m.ObjectHeader({
                    title: oBundle.getText("std.total"),
                    number: "{oHospitalModel>/total/amount}",
                    attributes: new sap.m.ObjectAttribute({
                        text: oBundle.getText("std.Thisisthelistofitemsinyourshoppingcart")
                    })
                }),
			oView.oList
			],
			footer: new sap.m.Bar({
				contentRight: new sap.m.Button({
					text:"Pay",
					press:()=>{
						oController.pay();
						
						
					}
				})
			})
		});
	}
});
});