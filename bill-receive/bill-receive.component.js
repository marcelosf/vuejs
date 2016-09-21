window.billReceiveComponent = Vue.extend({

    components: {
        'menu-component': billReceiveMenuComponent
    },

    template: `

         <style type="text/css">
                .sem-contas {
                    color: darkgray;
                }
          </style> 
        
        <h1>{{ title }}</h1>
        <h3 :class="paidCount | statusClass">{{ status }}</h3>
        
        <menu-component></menu-component>
        <router-view></router-view>
        
    `,


    data: function () {

        return {
            title: "Contas a receber",
            paidCount: 0,
        }
    },
    computed: {
        status: function(){
            var count = 0;
            var message = '';
            var bills = this.$root.$children[0].billsReceive;
            if (bills.length > 0) {

                for(var i in bills){
                    if(!bills[i].done){
                        count++;
                    }
                }

                this.paidCount = count;

                if (count) {
                    message = "Existem "  + count + " contas a serem recebidas.";
                } else {
                    message = "Nenhuma conta a receber."
                }

            } else {

                this.paidCount = 'false';

                message = "Nenhuma conta cadastrada."

            }

            return message;
        }
    },

    events: {

        'clear-bill': function () {
            this.$broadcast('clear-bill');
        }
    }

});
