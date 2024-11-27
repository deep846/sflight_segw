sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/Sorter",
    "sap/ui/model/json/JSONModel"
], (Controller,Filter,FilterOperator,Sorter,JSONModel) => {
    "use strict";

    var flag=false;

    return Controller.extend("nm.flightsegw9267.controller.View1", {
        onInit() {

            // var model =this.getOwnerComponent().getModel();
                // var path = this.getOwnerComponent().getModel().sServiceUrl;
                // 'http://in-blr-srv1.corp.capgemini.com:8000'y
                // BusinessPartnerSet('0100000000')/ToSalesOrders
                // var url = path + '/zsflightSet?$format=json&$expand=zsbookSet'
                // var that = this
                // var entity = '/zsflightSet?$format=json&$expand=zsbookSet'
                // model.read(entity,{
                //         success: function(odata,res){
                //             if(res.statusCode==="200" || res.statusText==="OK"){
                //                 var oMod = new JSONModel(odata)
                //                 console.log(odata);
                                
                //                 that.getView().setModel(oMod,"dc")
                //             }
                //         }
                // })



                var model =this.getOwnerComponent().getModel();
                var path = this.getOwnerComponent().getModel().sServiceUrl;
                var url = path + '/zsflightSet?$format=json&$expand=zsbookSet'
                var that = this


                

                $.ajax({
                    url: url,
                    type: "get",
                    dataType: "json",
                    success: function (odata, response) {
                        console.log(odata);
                        console.log(response);

                        if (response === 'success') {
                            var oModel = new JSONModel(odata)
                            // var oDateArray = oModel['oData']['d']['results'];

                            // dateFormetter(oDateArray)

                            // function dateFormetter(oDateArray){
                            //     oDateArray.forEach(element => {
                            //         let timestamp = parseInt(element['Fldate'].replace("/Date(", "").replace(")/", ""));

                            //         let date = new Date(timestamp);

                            //         let formattedDate = date.toLocaleDateString('en-GB', {
                            //             weekday: 'short', // "Mon"
                            //             day: '2-digit',   // "01"
                            //             month: 'short',   // "Jan"
                            //             year: 'numeric'   // "'23"
                            //         });

                            //         console.log(formattedDate); 

                            //         element['Fldate'] = formattedDate
                            //     });

                            // }

                            that.getView().setModel(oModel, "dc")
                            // var view = that.getView().getModel("dc")

                        }
                    },
                    error: function () {
                        console.log("error");
                    }


                })

        },
        onSortPress:function(){
           
            var oList = this.byId("idToolsList");
            var oBinding = oList.getBinding("items");
            if(flag===false){
            var oSorter = new Sorter("Carrid", false);
             flag=true;
            }
            else{
                var oSorter = new Sorter("Carrid", true);
                flag=false;
            }
            oBinding.sort(oSorter);
        },

        onSearchFieldSearch: function(oEvent){
            var search = oEvent.getParameter("query")
            var search = oEvent.getParameter("newValue")
            var oList = this.byId('idToolsList')
            var oBinding = oList.getBinding("items");


            var oFilter = new Filter("Carrid", FilterOperator.Contains, search);

            var FilterProperties = [oFilter]

            oBinding.filter(FilterProperties);


            console.log(oBinding.filter(oFilter));
            

       },

        formatDate: function(oDate){

    //         if (!sDate) return "";
      
    //   // Assuming the date format is in ISO format or similar
    //   var oDateFormat = sap.ui.core.format.DateFormat.getDateInstance({ pattern: "dd/MM/yyyy" });
    //   return oDateFormat.format(new Date(sDate));
    if(!oDate){
        return "N/A";
    }else{
        let timestamp = parseInt(oDate.replace("/Date(", "").replace(")/", ""));

        let date = new Date(timestamp);

        let formattedDate = date.toLocaleDateString('en-GB', {
            weekday: 'short', // "Mon"
            day: '2-digit',   // "01"
            month: 'short',   // "Jan"
            year: 'numeric'   // "'23"
        });

        return formattedDate;
    }
    

        },

        onToolsListSelectionChange:function(OEvent){

            var oItem = OEvent.getParameter("listItem");
            var path = oItem.getBindingContextPath()

            var oList = oItem.getParent();

            var iSelectedIndex = oList.indexOfItem(oItem);
            // console.log(iSelectedIndex);
            
            
            var rpath = "dc>/d/results/"+iSelectedIndex;

            var oApp = this.getView().getParent().getParent()
            var oview1 = oApp.getDetailPage("view2")
            oview1.bindElement(rpath)
            oApp.toDetail("view2")


        // var sToPageId = OEvent.getParameter("listItem").getCustomData()[0].getValue();

        // this.getSplitAppObj().toDetail(this.createId(sToPageId));
            
            
       },

       



    });
});