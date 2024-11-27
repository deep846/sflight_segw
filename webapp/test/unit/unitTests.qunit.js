/* global QUnit */
// https://api.qunitjs.com/config/autostart/
QUnit.config.autostart = false;

sap.ui.require([
	"nm/flight_segw_9267/test/unit/AllTests"
], function (Controller) {
	"use strict";
	QUnit.start();
});