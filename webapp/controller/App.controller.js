sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/core/mvc/XMLView"
], (Controller,XMLView) => {
  "use strict";

  return Controller.extend("nm.flightsegw9267.controller.App", {
      onInit() {
        var oApp = this.getView().byId('app')

        var oPage = new XMLView({
          id:"view1",
          viewName:"nm.flightsegw9267.view.View1"
      })

      var oPage2 = new XMLView({
        id:"view2",
        viewName:"nm.flightsegw9267.view.View2"
    })

      var empty = new XMLView({
        viewName:"nm.flightsegw9267.view.empty"
    })

      oApp.addMasterPage(oPage)
      oApp.addDetailPage(empty)
      oApp.addDetailPage(oPage2)
      }
  });
});