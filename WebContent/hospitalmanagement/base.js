sap.ui.define([
	"sap/ui/core/mvc/Controller"
],
(controller)=>{
	"use strict";
	let oBase = controller.extend("hospital.hospitalmanagement.base",{
		callServer(oData,sAPINAME,fnSCB,fnECB) {
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
		xhttp.open("POST", "http://gicomsap16.gicom.local:8000/gicom/jsonhandler/"+ sAPINAME + "?format=json&case=C&sap-client=100&sap-user=kommineni&sap-password=prasanna", true);
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
	}
	/*	callServer(oData) {
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
		debugger;
		//xhttp.open("POST", "http://gicomsap16.gicom.local:8000/gicom/jsonhandler/Z1136_API_CREATE_APPOINTMENTS?format=json&case=C&sap-client=100&sap-user=kommineni&sap-password=prasanna", true);
		xhttp.open(oData.method, oData.url, true);
		xhttp.timeout = 0; 
		xhttp.setRequestHeader("Accept-Language", "EN");
		xhttp.setRequestHeader("Authorization", "Basic QU1CSFU6anJ0QDE5OTI=");
		xhttp.setRequestHeader("Content-Type", "application/json");
		xhttp.setRequestHeader("X-Stateful", "stateful");
		xhttp.send(JSON.stringify(oData.data));
		let oDefObj = jQuery.Deferred();
		oDefObj.done(function(xhttp){
			oDefObj.resolve(JSON.parse(xhttp.response))
		});
		oDefObj.fail(function(xhttp){
			oDefObj.reject(JSON.parse(xhttp.response))
		});
		return oDefObj.promise();
	}*/
	});
	return oBase;
});