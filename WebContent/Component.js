sap.ui.define([
	"sap/ui/core/UIComponent"
],function(UIComponent){
return UIComponent.extend("hospital.Component", {
    metadata: {
        rootView: {
            viewName: "hospital.hospitalmanagement.hospital",
            type: "JS"
        },
        routing: {
            config: {
                routerClass: "sap.m.routing.Router",
                viewPath: "hospital.hospitalmanagement",
                viewType: "JS",
                controlId: "appContainer",
                controlAggregation: ["pages", "masterPages", "detailPages"],
                targetClear: false,
                async: true
            },
            routes: [{
                pattern: "",
                name: "op",
                target: "appointment"
            }, {
                pattern: "symptoms",
                name: "symptoms",
                target: "symptoms"
            }, {
                pattern: "medicines",
                name: "medicines",
                target: "medicines"
            }, {
            	pattern: "list",
            	name: "list",
            	target: "list"
            }, {
            	pattern: "bill",
            	name: "bill",
            	target: "bill"
            }],
            targets: {
                appointment: {
                    viewName: "appointment",
                    controlAggregation: "pages"
                },
                symptoms: {
                    viewName: "symptoms",
                    controlAggregation: "pages"
                },
                medicines: {
                    viewName: "medicinesStore",
                    controlAggregation: "pages"
                },
                list: {
                	viewName: "medicinesList",
                	controlAggregation: "pages"
                },
                bill: {
                	viewName: "bill",
                	controlAggregation: "pages"
                }


            }
        }
    },
    init: function() {
    	debugger;
        let oData = new sap.ui.model.json.JSONModel({
            appointedPatients: {
                patientsList: []
            },
            presentPatient: {
                Patientid: "",
                Patientname: "",
                Patientage: "",
                Patientgender: "",
                Patientproblem: "",
                Patientmobileno: "",
                Patientaddress: ""
            },
            docotorDetails: { 
            	doctorsList:[]
            },
            presentDoctor:{
            	DocSpecification:"",
            	DoctorNames:"",
            	DoctorMobno:"",
            	DoctorMailid:"",
            	DoctorFromtime:"",
            	DoctorTotime:"",
            	DoctorFromtime1:"",
            	DoctorTotime1:""
            },
            aTablets: [{
            	title:"fever",
            	no:"6",
                items: [{
                    name: "Aspirin",
                    brandName: "Dispirin",
                    Manufacturer: "Reckitt Benckiser (India) Ltd.",
                    drug: "Aspirin ",
                    power: "500 MG ",
                    price: 9,
                    currencyCode:"Rs",
                    status: "Available",
                    count:"1"
                },{
                	 name: "Paracetamol",
                	 brandName: "Panadol",
                     Manufacturer: "Cadila Pharmaceuticals Ltd",
                     drug: "Paracetamol ",
                     power: "500 MG ",
                     price: 10,
                     currencyCode:"Rs",
                     status: "Available",
                     count:"1"
                },{
               	 name: "Propinal",
               	 brandName: "Advil",
                 Manufacturer: "Cadila Pharmaceuticals Ltd",
                 drug: "Ibuprofen ",
                 power: "400 MG ",
                 price: 10,
                 currencyCode:"Rs",
                 status: "Out Of Stock",
                 count:"1"
                },{
                  	 name: "Proprinal",
                  	 brandName: "Advil",
                     Manufacturer: "Jagsonpal Pharmaceuticals Ltd",
                     drug: "Ibuprofen ",
                     power: "200 MG ",
                     price: 10,
                     currencyCode:"Rs",
                     status: "Available",
                     count:"1"
                    },{
                        name: "Ecosprin",
                        brandName: "Ecosprin",
                        Manufacturer: "US Vitamins Limited",
                        drug: "Aspirin ",
                        power: "150 MG ",
                        price: 6,
                        currencyCode:"Rs",
                        status: "Available",
                        count:"1"
                    },{
                    	 name: "Ecosprin",
                         brandName: "Zosprin",
                         Manufacturer: "Medley Pharmaceuticals Ltd.",
                         drug: "Aspirin ",
                         power: "75 MG ",
                         price: 6,
                         currencyCode:"Rs",
                         status: "Out Of Stock",
                         count:"1"
                    }]
            },{
            	title:"heartPain",
            	no:"6",
                items: [{
                	name: "Aspirin",
                    brandName: "Dispirin",
                    Manufacturer: "Reckitt Benckiser (India) Ltd.",
                    drug: "Aspirin ",
                    power: "500 MG ",
                    price: 9,
                    currencyCode:"Rs",
                    status: "Available",
                    count:"1"
                },{
                	 name: "Paracetamol",
                	 brandName: "Panadol",
                     Manufacturer: "Cadila Pharmaceuticals Ltd",
                     drug: "Paracetamol ",
                     power: "500 MG ",
                     price: 10,
                     currencyCode:"Rs",
                     status: "Available",
                     count:"1"
                },{
               	 name: "Propinal",
               	 brandName: "Advil",
                 Manufacturer: "Cadila Pharmaceuticals Ltd",
                 drug: "Ibuprofen ",
                 power: "400 MG ",
                 price: 10,
                 currencyCode:"Rs",
                 status: "Out Of Stock",
                 count:"1"
                },{
                  	 name: "Proprinal",
                  	 brandName: "Advil",
                     Manufacturer: "Jagsonpal Pharmaceuticals Ltd",
                     drug: "Ibuprofen ",
                     power: "200 MG ",
                     price: 10,
                     currencyCode:"Rs",
                     status: "Available",
                     count:"1"
                    },{
                        name: "Ecosprin",
                        brandName: "Ecosprin",
                        Manufacturer: "US Vitamins Limited",
                        drug: "Aspirin ",
                        power: "150 MG ",
                        price: 6,
                        currencyCode:"Rs",
                        status: "Available",
                        count:"1"
                    },{
                    	 name: "Ecosprin",
                         brandName: "Zosprin",
                         Manufacturer: "Medley Pharmaceuticals Ltd.",
                         drug: "Aspirin ",
                         power: "75 MG ",
                         price: 6,
                         currencyCode:"Rs",
                         status: "Out Of Stock",
                         count:"1"
                }]
                }
            ],
            selectedType:{},
            selectedItem:{},
            cartItems: [],
            total: {
                "amount": 0
            },
            count: 0,
            totalItems: {
                "count": null
            },
            orderListEdit: ""
        });
        this.setModel(oData, "oHospitalModel");
        window.oBundle= jQuery.sap.resources({
        	url:"hospitalmanagement/i18/i18n.properties",
        })
        UIComponent.prototype.init.apply(this, arguments);
        this.getRouter().initialize();
    }
});
});