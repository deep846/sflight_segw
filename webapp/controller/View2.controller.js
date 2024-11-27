sap.ui.define([
	"sap/ui/core/mvc/Controller",
    "sap/ui/core/format/NumberFormat"
], function(
	Controller,
    NumberFormat
) {
	"use strict";

	return Controller.extend("nm.controller.view1", {

        onPageNavButtonPress:function(){

            var oApp = this.getView().getParent();
                console.log(oApp);
                
            oApp.to("view")
        },
        CurrencyFormatter: function(amnt,curr){
            var oCurrencyFormat = NumberFormat.getCurrencyInstance({
                currencyCode: false
            });

             return oCurrencyFormat.format(amnt, curr);

           },

           onf4Help1:function(oevt){
                  this.id=oevt.getSource().getId()
                if(!this.oFragment){
                        this.oFragment=Fragment.load({
                            name:"nm.fragments.popup",
                            // type:"xml",
                            controller:this
                        }).then((result)=>{

                            this.oFragment = result;

                            this.getView().addDependent(this.oFragment)
                            this.oFragment.open()
                            
                        }).catch((err) => {
                            console.log('error occured');
                            
                        });

                }else{
                    this.oFragment.open()
                }

           },
                async onf4Help() {
                    // create dialog lazily
                    this.oDialog ??= await this.loadFragment({
                        name: "nm.fragments.popup",
                        
                    });
                
                    this.oDialog.open();
                },

                onConfrim: function(oEvent){

                    

                    var text=oEvent.getParameter("selectedItem").getValue()

                    // console.log(this.getView().getSource().getId());
                    // this.getVi.byId(this.id).setValue(text)
                    sap.ui.getCore().byId(this.id).setValue(text)

                    console.log(this.getView().byId("tool").getValue());


                }


	});
});