sap.ui.define([
        "hospital/hospitalmanagement/icon/icon",
        "hospital/hospitalmanagement/base"
    ],
    (oIcons,oBase) => {
        "use strict";
        let oMaster = oBase.extend("hospital.hospitalmanagement.appointment", {	
//sap.ui.controller("hospital.hospitalmanagement.appointment", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf hospitalmanagement.appointment
*/
	onInit: function() {
      debugger;
      let oController = this,
          oView = oController.getView(),
          oHospitalModel = this.getOwnerComponent().getModel("oHospitalModel");
      this.callServer( { }, "Z1136_API_READ_APPOINTMENTS", (oResponse)=> {
	    	debugger;
	    	oHospitalModel.setProperty("/appointedPatients/patientsList",oResponse.EtAppointment);
	    	
	    },(oResponse)=> {
	    	debugger;
	    	
	    });
      /*let oConfig = { 
    		  url: "http://gicomsap16.gicom.local:8000/gicom/jsonhandler/Z1136_API_READ_APPOINTMENTS?format=json&case=C&sap-client=100&sap-user=kommineni&sap-password=prasanna",
    		  method: "POST",
    		  oData: {}
      }
      this.callServer(oConfig).then((response)=>{
    	  debugger;
    	  oHospitalModel.setProperty("/appointedPatients/patientsList",oResponse.EtAppointment); 
      },
      (response)=>{
    	  
      });
      this.callServer( {}, "Z1136_API_READ_APPOINTMENTS", (oResponse)=> {
	    	debugger;
	    	oHospitalModel.setProperty("/appointedPatients/patientsList",oResponse.EtAppointment);
	    },(oResponse)=> {
	    	debugger;
	    	
	    });*/
	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf hospitalmanagement.appointment
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf hospitalmanagement.appointment
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf hospitalmanagement.appointment
*/
//	onExit: function() {
//
//	},
	dialog(){
		debugger;
		let oController = this;
		let oView = oController.getView();
		let oHospitalModel = oController.getOwnerComponent().getModel("oHospitalModel");
		  let sExist;
          let aAppointedData = oHospitalModel.getProperty("/appointedPatients/patientsList");
          let ologInModel = oView.oCreateDialog.getModel("oLModel");
          let oLogInDetails = ologInModel.getProperty("/logIn");
          if (!oLogInDetails["id"]) {
              aMsgs.push({
                  msgTy: "E",
                  message: oBundle.getText("std.pleaseGiveYourId")
              })
              showMessages(aMsgs);
              return false
          }
          if (!oLogInDetails["name"]) {
              aMsgs.push({
                  msgTy: "E",
                  message: oBundle.getText("std.pleaseGiveYourName")
              })
              showMessages(aMsgs);
              return false
          }
          if (aAppointedData) {
              aAppointedData.forEach((sId, oCnt) => {
                  debugger;
                  if (parseInt(sId.Patientid) == oLogInDetails.id) {
                      debugger;
                      oHospitalModel.setProperty("/presentPatient",sId)
                      sExist = oBundle.getText("std.yes");

                  }

              })
          }

          if (sExist == oBundle.getText("std.yes")) {
              oController.getOwnerComponent().getRouter().navTo("symptoms");
               
				ologInModel.setProperty("/logIn",{ });
          } else {
              alert(oBundle.getText("std.pleaseRegisterFirst"));
              oView.oCreateDialog.close();
				
          }
	},
validations(){
	debugger;
	let oController = this;
	let oView = oController.getView();
	let oHospitalModel = oController.getOwnerComponent().getModel("oHospitalModel");
	let aPatientsData = oHospitalModel.getProperty("/appointedPatients/patientsList");
	let oAppointmentsModel = oView.getModel("opModel");
	let oAppointmentsData = oAppointmentsModel.getProperty("/ItAppointment");
	let aAppointments = [];
	aAppointments.push(oAppointmentsData);
	let oData = {
			"ItAppointment" : aAppointments
	};
	/*this.callServer(oData, "Z1136_API_CREATE_APPOINTMENTS", (oResponse)=> {
    	debugger;
    	    	
    },(oResponse)=> {
    	debugger;
    	
    });*/
/*	 $.ajax({
            method:'POST',
            url:'http://gicomsap16.gicom.local:8000/gicom/jsonhandler/Z1136_API_CREATE_APPOINTMENTS?format=json&case=C&sap-client=100&sap-user=kommineni&sap-password=prasanna',
            data: JSON.stringify(oData),
	     success:function(results){
                debugger;
            }
        });*/
	let  bError = false, aMsgs = [];
	if ( !oAppointmentsData["patientid"] ) {
		aMsgs.push({
			msgty: "E",
			message: oBundle.getText("std.idIsMissing")
		});
		oController.showMessages(aMsgs);
		return false;
	  }
	 if ( oAppointmentsData["patientid"] ) {
			let bExist = false;
			for(let i = 0; i< aPatientsData.length; i++) {
					if(parseInt(aPatientsData[i].Patientid) === oAppointmentsData.patientid) {
						bExist = true;
						break;
					}
			}
			
			if(bExist){
				aMsgs.push({
					msgty: "E",
					message: oBundle.getText("std.idIsAlreadyAssignedToOtherUser")
				});
				oController.showMessages(aMsgs);
				return false;
			}
		}
	 if ( !oAppointmentsData["patientname"] ) {
			aMsgs.push({
				msgty: "E",
				message: oBundle.getText("std.nameIsMissing")
			});
			oController.showMessages(aMsgs);
			return false;
		  }
	 if ( !oAppointmentsData["patientage"] ) {
			aMsgs.push({
				msgty: "E",
				message: oBundle.getText("std.ageIsMissing")
			});
			oController.showMessages(aMsgs);
			return false;
		  }
	 if ( !oAppointmentsData["patientgender"] ) {
			aMsgs.push({
				msgty: "E",
				message: oBundle.getText("std.genderIsMissing")
			});
			oController.showMessages(aMsgs);
			return false;
		  }
	 if ( !oAppointmentsData["patientproblem"] ) {
			aMsgs.push({
				msgty: "E",
				message: oBundle.getText("std.problemIsMissing")
			});
			oController.showMessages(aMsgs);
			return false;
		  }
	 
	if (!jQuery.isEmptyObject(oAppointmentsData)) {
		debugger;
		  let oConfig = { 
	    		  url: "http://gicomsap16.gicom.local:8000/gicom/jsonhandler/Z1136_API_CREATE_APPOINTMENTS?format=json&case=C&sap-client=100&sap-user=kommineni&sap-password=prasanna",
	    		  method: "POST",
	    		  data: {
	    			  itAppointment: aAppointments
	    		  }
	      };
	      /*this.callServer(oConfig).then((response)=>{
	    	  debugger;
	    	  oHospitalModel.setProperty("/appointedPatients/patientsList",oResponse.EtAppointment);
		    	oHospitalModel.setProperty("/presentPatient",oAppointmentsData);
		    	aMsgs.push({
					msgty: "I",
					message: oBundle.getText("std.registeredSuccessfully")
				});
				oController.showMessages(aMsgs);
	      },
	      (response)=>{
	    	  
	      });*/
		this.callServer(oData, "Z1136_API_CREATE_APPOINTMENTS", (oResponse)=> {
	    	debugger;
	    	oHospitalModel.setProperty("/appointedPatients/patientsList",oResponse.EtAppointment);
	    	oHospitalModel.setProperty("/presentPatient",oAppointmentsData);
	    	aMsgs.push({
				msgty: "I",
				message: oBundle.getText("std.registeredSuccessfully")
			});
			oController.showMessages(aMsgs);
	    },(oResponse)=> {
	    	debugger;
	    	
	    });
		let oModel = oView.getModel("opModel");
		oView.oDialogCreate.close();
		let oRegisterData = oModel.getProperty("/ItAppointment");
		oModel.setProperty("/ItAppointment",{ });
		let radioButton= sap.ui.getCore().byId("grp");
		radioButton.setSelectedIndex(-1);
	}
},
	radio(sId){
		debugger;
		let sIndex = sId;
		let sTxt;
		let oController = this;
		let oView = oController.getView();
		let oAppointmentsModel = oView.getModel("opModel");
		let oAppointmentsData = oAppointmentsModel.getProperty("/createPatient");
		if( sIndex == 0){
			sTxt = sap.ui.getCore().byId("female").getText();
		}
		if( sIndex == 1 ){
		   sTxt = sap.ui.getCore().byId("male").getText();
		} 
		oAppointmentsModel.setProperty("/ItAppointment/patientgender",sTxt);
	},
	showMessages(aMsgs) {
		aMsgs = Array.isArray(aMsgs) ? aMsgs : [];
		if (aMsgs.length > 0) {
			let oMsgsData = [];
			aMsgs.forEach((oObj, sIdx, oList) => {
				let oMsgObj = {};
				if (oObj["type"]) {
					oMsgObj["msgty"] = oObj["type"];
				}
				else if (oObj["msgty"]) {
					oMsgObj["msgty"] = oObj["msgty"];
				}
				oMsgObj["msgli"] = oObj["message"];
				oMsgsData.push(oMsgObj);
			});
			let oMsgsModel = new sap.ui.model.json.JSONModel({
				msgsList: oMsgsData
			});
			let oMsgDialog = new sap.m.Dialog({
				title: oBundle.getText("std.messages"),
				customHeader: [
					new sap.m.Bar({
						contentMiddle: [
							new sap.m.Title({
								text: oBundle.getText("std.messages"),
								tooltip:oBundle.getText("std.messages")
							})
						]
					})
				],
				content: [
					new sap.ui.layout.VerticalLayout({
						width: "100%"
					}).bindAggregation("content", "msgsModel>/msgsList", (sIdx, oCtx) => {
						let sPath = oCtx.getPath();
						return new sap.m.MessageStrip({
							showIcon: true,
							type: {
								parts: ["msgsModel>" + sPath + "/msgty"],
								formatter: (sMsgty) => {
									let sType = sap.ui.core.MessageType.None;
									switch (sMsgty) {
										case "E":
											sType = sap.ui.core.MessageType.Error;
											break;
										case "W":
											sType = sap.ui.core.MessageType.Warning;
											break;
										case "I":
											sType = sap.ui.core.MessageType.Information;
											break;
										case "S":
											sType = sap.ui.core.MessageType.Success;
											break;
										default:
									}
									return sType;
								}
							},
							text: "{msgsModel>" + sPath + "/msgli}"
						}).addStyleClass("sapUiTinyMarginBottom");
					})
				],
				beginButton: new sap.m.Button({
					text:oBundle.getText("std.ok"),
					press: () => {
						oMsgDialog.destroy();
					}
				})
			});
			oMsgDialog.setModel(oMsgsModel, "msgsModel");
			oMsgDialog.open();
		}
	}
	/*callServer(oData,sAPINAME,fnSCB,fnECB) {
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
		    if (this.readyState == 4 ) {
		    	if (this.status == 200) {
		    		oDefObj.resolve(xhttp);
		        } else {
		        	oDefObj.reject(xhttp);
		        }
		   }
		};
		xhttp.open("POST", "http://gicomsap16.gicom.local:8000/gicom/jsonhandler/Z1136_API_CREATE_APPOINTMENTS?format=json&case=C&sap-client=100&sap-user=kommineni&sap-password=prasanna", true);
		xhttp.timeout = 0; 
		xhttp.setRequestHeader("Accept-Language", "EN");
		xhttp.setRequestHeader("Authorization", "Basic QU1CSFU6anJ0QDE5OTI=");
		xhttp.setRequestHeader("Content-Type", "application/json");
		xhttp.setRequestHeader("X-Stateful", "stateful");
		xhttp.send(JSON.stringify(oData));
		let oDefObj = jQuery.Deferred();
		oDefObj.done(function(xhttp){
			fnSCB(JSON.parse(xhttp.response))
		});
		oDefObj.fail(function(xhttp){
			fnECB(JSON.parse(xhttp.response))
		})
	}*/
	
});	

});