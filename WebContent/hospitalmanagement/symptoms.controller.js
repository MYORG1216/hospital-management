sap.ui.define([
        "hospital/hospitalmanagement/icon/icon",
        "hospital/hospitalmanagement/base"
    ],
    (oIcons, oBase) => {
        "use strict";
        let oMaster = oBase.extend("hospital.hospitalmanagement.symptoms", {	
//sap.ui.controller("hospital.hospitalmanagement.symptoms", {

    /**
     * Called when a controller is instantiated and its View controls (if available) are already created.
     * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
     * @memberOf hospitalmanagement.symptoms
     */
    	onInit: function() {
    		debugger;
    		let oController = this,
            oView = oController.getView(),
            oHospitalModel = this.getOwnerComponent().getModel("oHospitalModel");
    		let oRouter = this.getOwnerComponent().getRouter();
    		if(oRouter){
    			debugger;
    			oRouter.attachRoutePatternMatched("hospital.hospitalmanagement.symptoms",(oEvent)=>{
    				debugger;
    				this.callServer( { }, "Z1136_API_READ_DOCTORSLIST", (oResponse)=> {
        		    	debugger;
        		    	let sDoctorSpecification;
        		    	let sProblem = oHospitalModel.getProperty("/presentPatient/Patientproblem");
        		    	if( sProblem == "Fever"){
        		    		sDoctorSpecification = "PEDIATRITION"
        		    	} else{
        		    		sDoctorSpecification = "HEART SPECIALIST"
        		    	}
        		    	oHospitalModel.setProperty("/docotorDetails/doctorsList",[ ] );
        		    			oHospitalModel.setProperty("/docotorDetails/doctorsList",oResponse.EtDoctors);
        		    			  let aDoctors = oHospitalModel.getProperty("/docotorDetails/doctorsList");
        		    	        if(aDoctors){
        		    	        	debugger;
        		    	        	aDoctors.forEach((oObject)=>{
        		    	        		debugger;
        		    	        		if(oObject.DocSpecification == sDoctorSpecification){
        		    	        			oHospitalModel.setProperty("/presentDoctor",oObject)
        		    	        		}
        		    	        	})
        		    	        }
        		    	        
        		    	
        		    },(oResponse)=> {
        		    	debugger;
        		    	
        		    });
    			})
    		}
    		
    
    	},

    /**
     * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
     * (NOT before the first rendering! onInit() is used for that one!).
     * @memberOf hospitalmanagement.symptoms
     */
    //	onBeforeRendering: function() {
    //
    //	},

    /**
     * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
     * This hook is the same one that SAPUI5 controls get after being rendered.
     * @memberOf hospitalmanagement.symptoms
     */
    //	onAfterRendering: function() {
    //
    //	},

    /**
     * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
     * @memberOf hospitalmanagement.symptoms
     */
    //	onExit: function() {
    //
    //	}

    completedHandler() {
        debugger;
        let oController = this,
            oView = oController.getView();
        this.getOwnerComponent().getRouter().navTo("medicines");
    },
    checkSymptomsStep() {
        debugger;
        let oController = this;
        let oView = oController.getView();
        let oModel = oController.getOwnerComponent().getModel("oHospitalModel");
        let sProblem = oModel.getProperty("/presentPatient/problem");
        let oSymptomsModel,oSymptomsData, symptomsStep = sap.ui.getCore().byId("symptomsStep");
        if(sProblem == oBundle.getText("std.fever")){
        	 oSymptomsModel = oView.getModel("oFeverModel");
             oSymptomsData = oSymptomsModel.getProperty("/fever");
            let iDays = oSymptomsData.days,
                iTemp = oSymptomsData.temp,
                sCold = oSymptomsData.cold,
                sHeadache = oSymptomsData.headache;
            if (iDays && iTemp && sCold && sHeadache) {
                oView.oWizard.validateStep(symptomsStep);
            } else {
                oView.oWizard.invalidateStep(symptomsStep);
            }
        }
        if(sProblem == oBundle.getText("std.heartPain")){
        	oSymptomsModel = oView.getModel("oHeartPainModel");
            oSymptomsData = oSymptomsModel.getProperty("/pain");
           let sAreaOfPain = oSymptomsData.areaOfPain,
           iHeartBeat = oSymptomsData.heartBeat,
           sCholestrolLevels = oSymptomsData.cholestrolLevels,
           iBp = oSymptomsData.bp,
           iSugar = oSymptomsData.sugar;
           
           if (sAreaOfPain && iHeartBeat && sCholestrolLevels && iBp && iSugar ) {
               oView.oWizard.validateStep(symptomsStep);
           } else {
               oView.oWizard.invalidateStep(symptomsStep);
           }
        }
        

    }

});
});