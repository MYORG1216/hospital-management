sap.ui.define([
        "hospital/hospitalmanagement/icon/icon"
    ],
    (oIcons, oUserConstants) => {
        "use strict";
sap.ui.controller("hospital.hospitalmanagement.medicinesList", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf hospitalmanagement.medicinesList
*/
//	onInit: function() {
//
//	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf hospitalmanagement.medicinesList
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf hospitalmanagement.medicinesList
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf hospitalmanagement.medicinesList
*/
//	onExit: function() {
//
//	}
	select(oEvt){
		debugger;
		let oSource = oEvt.getSource();
		let oSelectedItem;
		if(oSource.getSelectedItem()){
			oSelectedItem = oSource.getSelectedItem().getBindingContext("oHospitalModel").getObject();
			if(oSelectedItem){
				let oController = this,
				oView = oController.getView(),
				    oModel = oController.getOwnerComponent().getModel("oHospitalModel");
				oModel.setProperty("/selectedItem",oSelectedItem);
				oView.oSplitApp.toDetail(oView.oDetailPage2);
			}
			
		}
	},
addCart(oSelectedItem,aData){
          let oController = this,
              oView = oController.getView(),
              oModel = this.getOwnerComponent().getModel("oHospitalModel");
          let aCartItems = oModel.getProperty("/cartItems");
          if (oSelectedItem.status === "Out Of Stock") {
              sap.m.MessageToast.show("This product has been" + oSelectedItem.status + " and cannot be ordered anymore")
          } else {
              if (aCartItems.length) {
                  aCartItems.forEach((obj, sId) => {
                      debugger;
                      if (aCartItems[sId].name === oSelectedItem.name) {
                          debugger;
                          aCartItems[sId].count = parseInt(obj.count) + 1;
                          oModel.setProperty("/cartItems", aCartItems);
                      } else {
                          debugger;
                          if (aCartItems.find((oObj) => {
                                  return oObj.name === oSelectedItem.name;
                              })) {} else {
                              aCartItems.push(oSelectedItem);
                              oModel.setProperty("/cartItems", aCartItems);
                          }
                      }
                  });
              } else {
                  aCartItems.push(oSelectedItem);
                  oModel.setProperty("/cartItems", aCartItems);
              }
              sap.m.MessageToast.show("This product is added to the cart");
              oController.totalCost(aCartItems);
          }
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
        cartActions(oEvt,aData){
        	debugger;
        	 let oController = this,
             oView = oController.getView();
         let oModel = this.getOwnerComponent().getModel("oHospitalModel");
         let aSelectedItem = oModel.getProperty("/cartItems");
         oModel.setProperty("/cartItems", aSelectedItem);
         oView.oSplitApp.toMaster(oView.oMasterPage2);
        },
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
        proceed(oEvt) {
            debugger;
            let sType = oEvt.oSource.mProperties.text;
            let oController = this,
                oView = oController.getView();
            let oModel = this.getOwnerComponent().getModel("oHospitalModel");
          
            if (sType === oBundle.getText("std.proceed")) {
                debugger;
                let aCartItems = oModel.getProperty("/cartItems");
                if (aCartItems.length) {
                	this.getOwnerComponent().getRouter().navTo("bill");
                }
            } else {
                debugger;
                let sEdit = oModel.getProperty("/orderListEdit");
                if (sEdit === "X") {
                    debugger;
                    oModel.setProperty("/orderListEdit", "")
                } else {
                    oModel.setProperty("/orderListEdit", "X");
                }

            }
        },
        back() {
            debugger;
            let oController = this,
                oView = oController.getView();
            let oModel = this.getOwnerComponent().getModel("oHospitalModel");
            if (oModel) {
                oModel.setProperty("/orderListEdit", "");
            }
            let oSelectedItem = oModel.getProperty("/selectedItem");
            oView.oSplitApp.toMaster(oView.oMasterPage);
            oView.oList.removeSelections(true);
        }
});
});