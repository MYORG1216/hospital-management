sap.ui.jsview("hospital.hospitalmanagement.hospital", {

    /** Specifies the Controller belonging to this View. 
     * In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
     * @memberOf hospitalmanagement.hospital
     */
    getControllerName: function() {
    	debugger;
        return "hospital.hospitalmanagement.hospital";
    },

    /** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
     * Since the Controller is given to this method, its event handlers can be attached right away. 
     * @memberOf hospitalmanagement.hospital
     */
    createContent: function(oController) {
    	debugger;
    	  /*return new sap.m.NavContainer("appContainer", {
    		  width:"1000px",
    		  height:"1000px"
    	  });*/
        return new sap.m.App("appContainer", {});
    }

});