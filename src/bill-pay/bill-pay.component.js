window.billPayComponent = Vue.extend({

    components: {
        'menu-component': billPayMenuComponent,
    },

    template: `
            
            <style type="text/css">
                
                .sem-contas {
                    color: darkgray;
                }
            </style> 
            
           <h1> {{ title }} </h1>
           <h3 :class="status | statusClass">{{ status | statusMessage }}</h3>
           <h3>{{ total | currency 'R$ ' }}</h3>
           
           <menu-component></menu-component>
           <router-view></router-view> 
          
    
    `,

    data: function () {

        return {
            title: "Contas a pagar",
            status: false,
            total: 0,
        }
    },

    created: function(){
        this.updateStatus();
        this.updateTotal();
    },

    methods: {

        calculateStatus: function (bills) {

            if (!bills.length) {
                return this.status = false;
            }

            let count = 0;

            for (let i in bills) {
                if(!bills[i].done){
                    count ++;
                }
            }
            this.status = count;
        },

        updateStatus: function () {
            let self = this;
            Bill.query('bills').then(function (response) {
                self.calculateStatus(response.data);
            })
        },

        updateTotal: function () {
            let self = this;
            Bill.total('bills').then(function (response) {
                self.total = response.data.total;
            })
        }

    },

    events: {
        'change-info' : function () {
            this.updateStatus();
            this.updateTotal();
        }
    }
    
});
