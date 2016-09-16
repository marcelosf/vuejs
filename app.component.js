window.appComponent = Vue.extend({

    components: {

        'menu-component': menuComponent,
        'bill-list-component': billListComponent,
        'bill-create-component': billCreateComponent

    },

    template: `
            
            <style type="text/css">
                
                .sem-contas {
                    color: darkgray;
                }
            </style> 
            
           <h1> {{ title }} </h1>
           <h3 :class="paidCount | statusClass">{{ status }}</h3>
           
           <menu-component></menu-component>
           <router-view></router-view> 
          
    
    `,
    data: function () {

        return {
            title: "Contas a pagar",
            activedView: 0,
            paidCount: 0,
        }
    },
    computed: {
        status: function(){
            var count = 0;
            var message = '';
            var billListComponent = this.$refs.billListComponent;
            if (billListComponent.bills.length > 0) {

                for(var i in billListComponent.bills){
                    if(!billListComponent.bills[i].done){
                        count++;
                    }
                }

                this.paidCount = count;

                if (count) {
                    message = "Existem "  + count + " contas a serem pagas.";
                } else {
                    message = "Nenhuma conta a pagar."
                }

            } else {

                this.paidCount = 'false';

                message = "Nenhuma conta cadastrada."

            }

            return message;
        }
    },
    methods: {},

    events: {
        'change-activedview': function (activedView) {
            this.activedView = activedView;
        },

        'change-formtype': function (formType) {
            this.$broadcast('change-formtype', formType);
        },

        'new-bill' : function(bill){
            this.$broadcast('new-bill', bill);
        },

        'change-bill': function (bill) {
            this.$broadcast('change-bill', bill);
        },

        'clear-bill': function () {
            this.$broadcast('clear-bill');
        }
    }
    
});
