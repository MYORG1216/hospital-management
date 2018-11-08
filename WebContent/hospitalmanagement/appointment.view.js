sap.ui.define([
        "hospital/hospitalmanagement/icon/icon"
    ],
    (oIcons) => {
        "use strict";
sap.ui.jsview("hospital.hospitalmanagement.appointment", {

    /** Specifies the Controller belonging to this View. 
     * In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
     * @memberOf hospitalmanagement.appointment
     */
    getControllerName: function() {
        return "hospital.hospitalmanagement.appointment";
    },

    /** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
     * Since the Controller is given to this method, its event handlers can be attached right away. 
     * @memberOf hospitalmanagement.appointment
     */
    createContent: function(oController) {
        debugger;
        let oView = this,
            oAppointmentsModel = oController.getOwnerComponent().getModel("oHospitalModel");

        let oCreatePatientModel = new sap.ui.model.json.JSONModel({
        ItAppointment:{
    		patientid : "",
    		patientname : "",
    		patientage : "",
    		patientgender : "",
    		patientproblem : "",
    		patientmobileno : "",
    		patientaddress : ""
    	}
        });
        let aProblems = [{
                value: "Fever"
            },
            {
                value: "Heart Pain"
            }
        ];
        oCreatePatientModel.setProperty("/problems", aProblems);
        this.setModel(oCreatePatientModel, "opModel");
        let oLogInModel = new sap.ui.model.json.JSONModel({
            logIn: {
                id: "",
                name: ""
            }
        });
        this.setModel(oLogInModel, "oLModel");
        let oForm = new sap.ui.layout.form.Form({
            layout: new sap.ui.layout.form.ResponsiveGridLayout({}),
            formContainers: [
                new sap.ui.layout.form.FormContainer({
                    formElements: [
                        new sap.ui.layout.form.FormElement({
                            label: new sap.m.Label({
                                text: oBundle.getText("std.patientId")
                            }),
                            fields: new sap.m.Input({
//                                width: "50%",
                                maxLength: 3,
                                value: "{oLModel>/logIn/id}"
                            })
                        }),
                        new sap.ui.layout.form.FormElement({
                            label: new sap.m.Label({
                                text: oBundle.getText("std.patientName")
                            }),
                            fields: new sap.m.Input({
//                                width: "50%",
                                value: "{oLModel>/logIn/name}"
                            })
                        })
                    ]
                })
            ]
        });
        let oForm1 = new sap.ui.layout.form.Form({
            layout: new sap.ui.layout.form.ResponsiveGridLayout({}),
            formContainers: [
                new sap.ui.layout.form.FormContainer({
                    formElements: [
                        new sap.ui.layout.form.FormElement({
                            label: new sap.m.Label({
                                text: oBundle.getText("std.patientId")
                            }),
                            fields: new sap.m.Input({
//                                width: "50%",
                                maxLength: 3,
                                value: "{opModel>/ItAppointment/patientid}"
                            })
                        }),
                        new sap.ui.layout.form.FormElement({
                            label: new sap.m.Label({
                                text: oBundle.getText("std.patientName")
                            }),
                            fields: new sap.m.Input({
//                                width: "50%",
                                value: "{opModel>/ItAppointment/patientname}"
                            })
                        }),
                        new sap.ui.layout.form.FormElement({
                            label: new sap.m.Label({
                                text: oBundle.getText("std.patientAge")
                            }),
                            fields: new sap.m.StepInput({
                                min: 1.0000,
                                max: 80.0000,
                                step: 1.0000,
//                                width: "50%",
                                value: "{opModel>/ItAppointment/patientage}"
                            })
                        }),
                        new sap.ui.layout.form.FormElement({
                            label: new sap.m.Label({
                                text: oBundle.getText("std.patientGender")
                            }),
                            fields: [
                                new sap.m.RadioButtonGroup("grp", {
                                    columns: 2,
//                                    width: "50%",
                                    selectedIndex: -1,
                                    buttons: [
                                        new sap.m.RadioButton("female", {
                                            text: oBundle.getText("std.female")
                                        }),
                                        new sap.m.RadioButton("male", {
                                            text: oBundle.getText("std.male")
                                        })
                                    ],
                                    select: (oEvt) => {
                                        debugger;
                                        let sIdx = oEvt.getParameters().selectedIndex;
                                        oController.radio(sIdx);
                                    }
                                })
                            ]
                        }),
                        new sap.ui.layout.form.FormElement({
                            label: new sap.m.Label({
                                text: oBundle.getText("std.patientProbelm")
                            }),
                            fields: new sap.m.ComboBox({
//                                width: "50%",
                                placeholder: oBundle.getText("std.chooseOne"),
                                selectedKey: "{opModel>/ItAppointment/patientproblem}",
                                showSecondaryValues: true

                            }).bindAggregation("items", "opModel>/problems", (sId, oCnt) => {
                                debugger;
                                return new sap.ui.core.ListItem({
                                    key: "{opModel>value}",
                                    text: "{opModel>value}"
                                    //	                            			additionalText: "{userCreateModel>key}"
                                })
                            })
                        }),
                        new sap.ui.layout.form.FormElement({
                            label: new sap.m.Label({
                                text: oBundle.getText("std.patientMobileNo")
                            }),
                            fields: new sap.m.Input({
//                                width: "50%",
                                maxLength: 10,
                                value: "{opModel>/ItAppointment/patientmobileno}",
                                liveChange: (oEvt) => {
                                    debugger;
                                    let oIpObj = oEvt.getSource();
                                    let sIpVal = oIpObj.getValue().replace(/[^0-9]/g, "");
                                    oIpObj.setValue(sIpVal.split(" ").join(""));
                                }
                            })
                        }),
                        new sap.ui.layout.form.FormElement({
                            label: new sap.m.Label({
                                text: oBundle.getText("std.patientAddress")
                            }),
                            fields: new sap.m.TextArea({
                                col: 10,
                                growing: true,
//                                width: "50%",
                                value: "{opModel>/ItAppointment/patientaddress}"
                            })
                        })
                    ]
                })
            ]
        });
        return new sap.m.Page({
        	customHeader:new sap.m.Bar({
        		contentMiddle:new sap.m.Text({
        			text:oBundle.getText("std.appointmentForm")
        		}),
        		contentRight:[
        			new sap.m.Button({
                        text: oBundle.getText("std.register"),
//                        width: "25%",
                        press: () => {
                            debugger;
                            oView.oDialogCreate = new sap.m.Dialog({
//                            	contentWidth: "60%",
                            	customHeader:[
                            		new sap.m.Bar({
                            			contentMiddle: [
                            				new sap.m.Title({
                            					text:oBundle.getText("std.register")
                            				})
                            				]
                            		})
                            			
                            		],
                            			content:[
                            				oForm1
                            			],
                            			beginButton : new sap.m.Button({
                            				text:oBundle.getText("std.register"),
                            				press:()=>{
                            						debugger;
                            						oController.validations();
                            					}
                            				
                            			}),
                            			 endButton: new sap.m.Button({
                                             text: oBundle.getText("std.cancel"),
                                             tooltip: oBundle.getText("std.cancel"),
                                             press: (oEvt) => {
                                                 debugger;
                                                 oView.oDialogCreate.close();
                                             }
                                         })
                            	
                            })
                            oView.oDialogCreate.setModel(oCreatePatientModel, "opModel");
                            oView.oDialogCreate.open();
                           
                        }
                    }).addStyleClass("button")
        			],
        			contentLeft:[
                    new sap.m.Button({
                        text: oBundle.getText("std.login"),
//                        width: "25%",
                        press: () => {
                            debugger;
                            oView.oCreateDialog = new sap.m.Dialog({
//                                contentWidth: "40%",
                                customHeader: [
                                    new sap.m.Bar({
                                        contentMiddle: [
                                            new sap.m.Title({
                                                text: oBundle.getText("std.login")
                                            })
                                        ]
                                    })
                                ],
                                content: [
                                    oForm
                                ],
                                beginButton: new sap.m.Button({
                                    text: oBundle.getText("std.login"),
                                    press: (oEvt) => {
                                        debugger;
                                        oController.dialog();
                                    }
                                }),
                                endButton: new sap.m.Button({
                                    text: oBundle.getText("std.cancel"),
                                    tooltip: oBundle.getText("std.cancel"),
                                    press: (oEvt) => {
                                        debugger;
                                        oView.oCreateDialog.close();
                                    }
                                })

                            });
                            oView.oCreateDialog.setModel(oLogInModel, "oLModel");
                            oView.oCreateDialog.open();
                        }
                    })
        		]
        	}),
        	content:[
        		new sap.m.FlexBox({
        			width:"95%",
        			items:[
        				new sap.m.Image({
        					src:"img/img3.jpg",
        					width:"95%",
        					height:"95%"
        				}),
        				new sap.m.List({
        					headerText:oBundle.getText("std.opList"),
        					mode: sap.m.ListMode.None,	
        					ListGrowingDirection:sap.m.ListGrowingDirection.Downwards,
        				}).bindAggregation("items", "oHospitalModel>/appointedPatients/patientsList", (sId,oCntx)=>{
        					debugger;
        					return new sap.m.ObjectListItem({
        						attributes:[
        							new sap.m.ObjectAttribute({
        								title:oBundle.getText("std.patientId"),
        								text:"{oHospitalModel>Patientid}"
        							}),
        							new sap.m.ObjectAttribute({
        								title:oBundle.getText("std.patientName"),
        								text:"{oHospitalModel>Patientname}"
        							})
        						]
        					})	
        				})
        			]
        		})
        	]
        });

    }
});
});