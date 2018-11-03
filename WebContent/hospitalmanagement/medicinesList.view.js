sap.ui.define([
        "hospital/hospitalmanagement/icon/icon"
    ],
    (oIcons, oUserConstants) => {
        "use strict";
sap.ui.jsview("hospital.hospitalmanagement.medicinesList", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf hospitalmanagement.medicinesList
	*/ 
	getControllerName : function() {
		return "hospital.hospitalmanagement.medicinesList";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf hospitalmanagement.medicinesList
	*/ 
	createContent : function(oController) {
		debugger;
		let oView  = this,
		    oModel = oController.getOwnerComponent().getModel("oHospitalModel"),
		    oSelectedType = oModel.getProperty("/selectedType"),
		    oSelectedItem = oModel.getProperty("/selectedItem");
		oView.oItems = new sap.m.List({
			mode: sap.m.ListMode.SingleSelectMaster,
			select:(oEvt)=>{
				debugger;
				oController.select(oEvt)
			}
		}).bindAggregation("items","oHospitalModel>/selectedType/items", (sIndx,oContext) => {
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
		 oView.oCartItems = new sap.m.List({
             mode: {
                 path: "oHospitalModel>/orderListEdit",
                 formatter: (sOrderListEdit) => {
                     debugger;
                     return sOrderListEdit === "X" ? sap.m.ListMode.Delete :
                         sap.m.ListMode.SingleSelectMaster;
                 }
             },
             delete: [oController.Del, oController],
             select: (oEvt)=>{
            	 debugger;
            	 oController.select(oEvt)
             }
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
		oView.oMasterPage = new sap.m.Page({
			customHeader: new sap.m.Bar({
					contentMiddle: new sap.m.Text({
						text:"{oHospitalModel>/selectedType/title}"
					}),
					contentRight: new sap.m.Button({
						icon: oIcons.actions.Cart,
                        text: "{oHospitalModel>/totalItems/count}",
                        press: [oController.cartActions, oController]
                    }).addStyleClass("iconSize")
                    
				}),
			
		    
		    
		    content:[
		    	oView.oItems
		    ]
		});
		oView.oMasterPage2 = new sap.m.Page({
			customHeader: new sap.m.Bar({
				contentLeft: new sap.m.Button({
					icon: oIcons.actions.navBack,
					press:()=>{
						oController.back()
					}
				}),
				contentMiddle: new sap.m.Text({
					text:oBundle.getText("std.yourCart")
				}),
				contentRight: new sap.m.Button({
					icon: oIcons.actions.Edit,
                visible: {
                    path: "oHospitalModel>/orderListEdit",
                    formatter: (sOrderListEdit) => {
                        return !sOrderListEdit;
                    }
                },
                enabled: {
                    path: "oHospitalModel>/total/amount",
                    formatter: (sProceed) => {
                        debugger;
                        return sProceed > 0 ? true : false
                    }
                },
                press: () => {
                    if (oModel) {
                    	oModel.setProperty("/orderListEdit", "X");
                    }
                }
				})
			}),
			content:[
				oView.oCartItems
			],
			  footer: [
                  new sap.m.Bar({
                      contentLeft: new sap.m.Text({
                          text: oBundle.getText("std.totalPrice") + " " + "{oHospitalModel>/total/amount}"
                      }),
                      contentRight: new sap.m.Button({
                          text: {
                              path: "oHospitalModel>/orderListEdit",
                              formatter: (sEdit) => {
                                  debugger;
                                  if (sEdit === "X") {
                                      return oBundle.getText("std.saveChanges")
                                  } else {
                                      return oBundle.getText("std.proceed")
                                  }
                              }
                          },
                          enabled: {
                              path: "oHospitalModel>/total/amount",
                              formatter: (sProceed) => {
                                  debugger;
                                  return sProceed > 0 ? true : false
                              }
                          },
                          press: (oEvt) => {
                              debugger;
                              oController.proceed(oEvt);
                          }
                      })
                  })
              ]
		
		});
		oView.oDetailPage2 = new sap.m.Page({
			title:oBundle.getText("std.detailsOf") + "{oHospitalModel>/selectedItem/name}",
			content:[
				new sap.m.ObjectHeader({
					title: "{oHospitalModel>/selectedItem/name}",
		            number: "{oHospitalModel>/selectedItem/price}",
		            attributes: [
		                new sap.m.ObjectAttribute({
		                    title: oBundle.getText("std.manufacturer"),
		                    text: "{oHospitalModel>/selectedItem/Manufacturer}"
		                }),
		                new sap.m.ObjectAttribute({
		                    title: oBundle.getText("std.power"),
		                    text: "{oHospitalModel>/selectedItem/power}"
		                }),
		                new sap.m.ObjectAttribute({
		                    title: oBundle.getText("std.drug"),
		                    text: "{oHospitalModel>/selectedItem/drug}"
		                })
		            ],
		            statuses: [
		                new sap.m.ObjectStatus({
		                    text: "{oHospitalModel>/selectedItem/currencyCode}"
		                }),
		                new sap.m.ObjectStatus({
		                    text: "{oHospitalModel>/selectedItem/status}",
		                    state: {
		                        path: "oHospitalModel>/selectedItem/status",
		                        formatter: (sStatus) => {
		                            debugger;
		                            if (sStatus === oBundle.getText("std.available")) {
		                                return sap.ui.core.ValueState.Success;
		                            } else {
		                                return sap.ui.core.ValueState.Error;
		                            }
		                        }
		                    }
		                })
		            ]
				})
			],
			footer:[
				new sap.m.Bar({
					contentRight:new sap.m.Button({
						icon: oIcons.actions.cart,
						press:()=>{
							debugger;
							let oCartItem = oModel.getProperty("/selectedItem");
							oController.addCart(oCartItem);
						}
					})
				})
			]
		})
		oView.oSplitApp = new sap.m.SplitContainer({
			masterPages:[
				oView.oMasterPage,
				oView.oMasterPage2
			],
			detailPages:[
				new sap.m.MessagePage({
					showHeader:false,
					text:oBundle.getText("std.welcomeToStore")
				}),
				oView.oDetailPage2
			]
		});
 		return new sap.m.Page({
           showHeader: false,
			content: [
			   oView.oSplitApp
			]
		});
	}
});
});