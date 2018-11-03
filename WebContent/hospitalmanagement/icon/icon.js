sap.ui.define(["sap/ui/core/IconPool"],function(IconPool){
	"use strict";
	
	const Actions = {
			
	    	"Edit": IconPool.getIconURI("edit"),
			"navBack": IconPool.getIconURI("navigation-left-arrow"),
			"Cart":IconPool.getIconURI("cart"),
			"cart":IconPool.getIconURI("cart-3"),
	};
	const oIcons = {
		"actions": Actions
	};
	return oIcons;
})