sap.ui.define([
        "hospital/hospitalmanagement/icon/icon"
    ],
    (oIcons, oUserConstants) => {
        "use strict";
sap.ui.jsview("hospital.hospitalmanagement.symptoms", {

    /** Specifies the Controller belonging to this View. 
     * In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
     * @memberOf hospitalmanagement.symptoms
     */
    getControllerName: function() {
        return "hospital.hospitalmanagement.symptoms";
    },

    /** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
     * Since the Controller is given to this method, its event handlers can be attached right away. 
     * @memberOf hospitalmanagement.symptoms
     */
    createContent: function(oController) {
        debugger;
        let oView = this;
        let oImg;
        let oModel = oController.getOwnerComponent().getModel("oHospitalModel");
        let sProblem = oModel.getProperty("/presentPatient/Patientproblem");
        let sId = oModel.getProperty("/presentPatient/Patientid");
        if (sProblem == oBundle.getText("std.fever")) {
            let oFeverSymptomsModel = new sap.ui.model.json.JSONModel({
                fever: {
                    days: "",
                    temp: "",
                    cold: "",
                    headache: ""
                }
            });
            this.setModel(oFeverSymptomsModel, "oFeverModel");
            oView.oForm = new sap.ui.layout.form.Form({
                layout: new sap.ui.layout.form.ResponsiveGridLayout({}),
                formContainers: [
                    new sap.ui.layout.form.FormContainer({
                        formElements: [
                            new sap.ui.layout.form.FormElement({
                                label: new sap.m.Label({
                                    text: oBundle.getText("std.noOfDays")
                                }),
                                fields: new sap.m.Input({
                                    width: "50%",
                                    maxLength: 3,
                                    value: "{oFeverModel>/fever/days}"
                                })
                            }),
                            new sap.ui.layout.form.FormElement({
                                label: new sap.m.Label({
                                    text: oBundle.getText("std.temparature")
                                }),
                                fields: new sap.m.Input({
                                    width: "50%",
                                    value: "{oFeverModel>/fever/temp}"
                                })

                            }),
                            new sap.ui.layout.form.FormElement({
                                label: new sap.m.Label({
                                    text: oBundle.getText("std.areYouHaveCold")
                                }),
                                fields: new sap.m.Input({
                                    width: "50%",
                                    value: "{oFeverModel>/fever/cold}"
                                })
                            }), new sap.ui.layout.form.FormElement({
                                label: new sap.m.Label({
                                    text: oBundle.getText("std.areYouHaveHeadache")
                                }),
                                fields: [new sap.m.Input({
                                    width: "50%",
                                    value: "{oFeverModel>/fever/headache}",
                                    change: () => {
                                        debugger;
                                        oController.checkSymptomsStep()
                                    }
                                })]
                            })
                        ]
                    })
                ]
            });
            oView.oDetails = new sap.uxap.ObjectPageLayout({
                showTitleInHeaderContent: true,
                showHeaderContent: true,
                enableLazyLoading: false,
                headerTitle: [
                    new sap.uxap.ObjectPageHeader({
                        objectImageURI: "img/img1.jpg",
                        objectImageShape: sap.uxap.ObjectPageHeaderPictureShape.Circle,
                        objectTitle: oBundle.getText("std.ABC"),
                        objectSubtitle: oBundle.getText("std.pediatrician"),
                        isObjectIconAlwaysVisible: false,
                        isObjectTitleAlwaysVisible: false,
                        showPlaceholder: true,
                        isObjectSubtitleAlwaysVisible: false

                    })
                ],
                headerContent: [
                    new sap.ui.layout.VerticalLayout({
                        content: [
                            new sap.m.ObjectStatus({
                                title: oBundle.getText("std.mobileNo"),
                                text: oBundle.getText("std.2187897897")
                            }),
                            new sap.m.ObjectStatus({
                                title: oBundle.getText("std.mailId"),
                                text: oBundle.getText("std.ABC@gmail.com")
                            })
                        ]
                    }),
                    new sap.m.ToolbarSpacer({
                        width: '300px'
                    }),
                    new sap.ui.layout.VerticalLayout({
                        content: [
                            new sap.m.ObjectHeader({
                                title: oBundle.getText("std.availableTimings")
                            }),
                            new sap.m.ObjectStatus({
                                title: oBundle.getText("std.Morning"),
                                text: "9.00 AM" + "-" + "11.00 AM"
                            }),
                            new sap.m.ObjectStatus({
                                title: oBundle.getText("std.Afternoon"),
                                text: "2.00 PM" + "-" + "4.00 PM"
                            }),
                            new sap.m.ObjectStatus({
                                title: oBundle.getText("std.Evening"),
                                text: "7.00 PM" + "-" + "9.00 PM"
                            })
                        ]
                    })
                ]
            });


        }
        if (sProblem == oBundle.getText("std.heartPain")) {
        	let oHeartPainSymptomsModel = new sap.ui.model.json.JSONModel({
                pain: {
                	areaOfPain:"",
                    heartBeat:"",
                    cholestrolLevels: "",
                    bp: "",
                    sugar: ""  
                }
            });
            this.setModel(oHeartPainSymptomsModel, "oHeartPainModel");
            oView.oForm = new sap.ui.layout.form.Form({
                layout: new sap.ui.layout.form.ResponsiveGridLayout({}),
                formContainers: [
                    new sap.ui.layout.form.FormContainer({
                        formElements: [
                            new sap.ui.layout.form.FormElement({
                                label: new sap.m.Label({
                                    text: oBundle.getText("std.areaofpain")
                                }),
                                fields: new sap.m.Input({
                                    width: "50%",
                                    maxLength: 3,
                                    value: "{oHeartPainModel>/pain/areaOfPain}"
                                })
                            }),
                            new sap.ui.layout.form.FormElement({
                                label: new sap.m.Label({
                                    text: oBundle.getText("std.heartBeat")
                                }),
                                fields: new sap.m.Input({
                                    width: "50%",
                                    value: "{oHeartPainModel>/pain/heartBeat}"
                                })

                            }),
                            new sap.ui.layout.form.FormElement({
                                label: new sap.m.Label({
                                    text: oBundle.getText("std.cholestrolLevels")
                                }),
                                fields: new sap.m.Input({
                                    width: "50%",
                                    value: "{oHeartPainModel>/pain/cholestrolLevels}"
                                })
                            }),
                            new sap.ui.layout.form.FormElement({
                                label: new sap.m.Label({
                                    text: oBundle.getText("std.bp")
                                }),
                                fields: new sap.m.Input({
                                    width: "50%",
                                    value: "{oHeartPainModel>/pain/bp}"
                                })
                            }),new sap.ui.layout.form.FormElement({
                                label: new sap.m.Label({
                                    text: oBundle.getText("std.sugar")
                                }),
                                fields: [new sap.m.Input({
                                    width: "50%",
                                    value: "{oHeartPainModel>/pain/sugar}",
                                    change: () => {
                                        debugger;
                                        oController.checkSymptomsStep()
                                    }
                                })]
                            })
                        ]
                    })
                ]
            });
            oView.oDetails = new sap.uxap.ObjectPageLayout({
                showTitleInHeaderContent: true,
                showHeaderContent: true,
                enableLazyLoading: false,
                headerTitle: [
                    new sap.uxap.ObjectPageHeader({
                        objectImageURI: "img/img1.jpg",
                        objectImageShape: sap.uxap.ObjectPageHeaderPictureShape.Circle,
                        objectTitle: oBundle.getText("std.xyz"),
                        objectSubtitle: oBundle.getText("std.heartSpecialist"),
                        isObjectIconAlwaysVisible: false,
                        isObjectTitleAlwaysVisible: false,
                        showPlaceholder: true,
                        isObjectSubtitleAlwaysVisible: false

                    })
                ],
                headerContent: [
                    new sap.ui.layout.VerticalLayout({
                        content: [
                            new sap.m.ObjectStatus({
                                title: oBundle.getText("std.mobileNo"),
                                text: oBundle.getText("std.7567565675")
                            }),
                            new sap.m.ObjectStatus({
                                title: oBundle.getText("std.mailId"),
                                text: oBundle.getText("std.xyz@gmail.com")
                            })
                        ]
                    }),
                    new sap.ui.layout.HorizontalLayout({
                        content: [
                            new sap.m.Image({
                                src: "img/linkedin.jpg",
                                width: "50px",
                                height: "50px"
                            }),
                            new sap.m.Image({
                                src: "img/twitter.jpg",
                                width: "50px",
                                height: "50px"
                            })
                        ]
                    }),
                    new sap.ui.layout.VerticalLayout({
                        content: [
                            new sap.m.RatingIndicator({
                                maxValue: 5,
                                value: 4.00000
                            })
                        ]
                    }),
                    new sap.ui.layout.VerticalLayout({
                        content: [
                            new sap.m.ObjectHeader({
                                title: oBundle.getText("std.availableTimings")
                            }),
                            new sap.m.ObjectStatus({
                                title: oBundle.getText("std.Morning"),
                                text: "9.00 AM" + "-" + "11.00 AM"
                            }),
                            new sap.m.ObjectStatus({
                                title: oBundle.getText("std.Afternoon"),
                                text: "2.00 PM" + "-" + "4.00 PM"
                            }),
                            new sap.m.ObjectStatus({
                                title: oBundle.getText("std.Evening"),
                                text: "7.00 PM" + "-" + "9.00 PM"
                            })
                        ]
                    })
                ]
            });
        }
        oView.oHeaderPanel = oView.createHeaderPanel();

        let oMasterPage = new sap.m.Page({
            showHeader: false,
            content: [
                oView.oHeaderPanel
            ]
        });
        let oDetailPage = new sap.m.Page({
            showHeader: false,
            content: [
                new sap.m.NavContainer(oBundle.getText("std.wizardNavContainer"), {
                    pages: [
                        new sap.m.Page(oBundle.getText("std.wizardContentPage"), {
                            showHeader: false,
                            content: [
                                oView.oWizard = new sap.m.Wizard({
                                    complete: () => {
                                        debugger;
                                        oController.completedHandler();
                                    },
                                    id: oBundle.getText("std.hospitalWizard"),
                                    height: "100%",
                                    width: "100%",
                                    finishButtonText: oBundle.getText("std.medicines"),
                                    showNextButton: true,
                                    enableBranching: true,
                                    steps: [
                                        new sap.m.WizardStep({
                                            id: oBundle.getText("std.doctorDetailsStep"),
                                            title: oBundle.getText("std.DoctorDetails"),
                                            nextStep: oBundle.getText("std.symptomsStep"),
                                            content: [
                                                oView.oDetails
                                            ]
                                        }),
                                        new sap.m.WizardStep({
                                            id: oBundle.getText("std.symptomsStep"),
                                            title: oBundle.getText("std.patientSymptomsInfo"),
                                            nextStep: oBundle.getText("std.doctorReportStep"),
                                            activate: () => {
                                                debugger;
                                                oController.checkSymptomsStep();
                                            },
                                            //                                            activate: [oController.checkSymptomsStep, oController],
                                            //                                            icon: oIcons.actions.creditCard,
                                            content: [
                                                oView.oForm
                                            ]
                                        }),
                                        new sap.m.WizardStep({
                                            id: oBundle.getText("std.doctorReportStep"),
                                            title: oBundle.getText("std.doctorReport"),
                                            content: [
                                                new sap.m.Text({
                                                    text: "It was just a viral fever don't worry.I will write some medicines those medicines available at medical shop "
                                                }),
                                                new sap.m.Text({
                                                    text: "Take 2 medicines per day at morning after breakfast and at night after dinner continue same course for 5 days the medicines which i prescribed"
                                                }),
                                                new sap.m.Text({
                                                    text: "dont eat outside food,drink fluids and get plenty of rest"
                                                })
                                            ]
                                        })

                                    ]
                                })
                            ]
                        })
                    ]
                })
                //				
            ]
        })
        let oSplitApp = new sap.m.SplitContainer({
            masterPages: [
                oMasterPage
            ],
            detailPages: [
                oDetailPage

            ]

        })
        return new sap.m.Page({
            title: oBundle.getText("std.doctorRoom"),
            content: [
                oSplitApp
            ]
        })
    },
    createHeaderPanel() {
        let oView = this;
        oView.oHeader = new sap.m.ObjectHeader({
            title: "{oHospitalModel>/presentPatient/Patientname}",
            number: "{oHospitalModel>/presentPatient/Patientid}",
            attributes: [
                new sap.m.ObjectAttribute({
                    title: oBundle.getText("std.problem"),
                    text: "{oHospitalModel>/presentPatient/Patientproblem}"
                }),
                new sap.m.ObjectAttribute({
                    title: oBundle.getText("std.gender"),
                    text: "{oHospitalModel>/presentPatient/Patientgender}"
                }),
                new sap.m.ObjectAttribute({
                    title: oBundle.getText("std.mobileNo"),
                    text: "{oHospitalModel>/presentPatient/Patientmobileno}"
                }),
                new sap.m.ObjectAttribute({
                    title: oBundle.getText("std.age"),
                    text: "{oHospitalModel>/presentPatient/Patientage}"
                }),
                new sap.m.ObjectAttribute({
                    title: oBundle.getText("std.address"),
                    text: "{oHospitalModel>/presentPatient/Patientaddress}"
                })
            ]
        });
        oView.oHeaderPanel = new sap.m.Panel({
            expandable: true,
            expanded: true,
            headerToolbar: new sap.m.Toolbar({
                content: [
                    new sap.m.Title({
                        text: oBundle.getText("std.patientInfo")
                    }),
                    new sap.m.Title({
                        text: "{oHospitalModel>/presentPatient/Patientname}"
                    })
                ]
            }),
            content: [
                oView.oHeader
            ]
        });
        return oView.oHeaderPanel;
    }
});
});