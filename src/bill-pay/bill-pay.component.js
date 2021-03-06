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
           <h3>{{ total | numberFormat }}</h3>
           
           <menu-component></menu-component>
           <router-view></router-view> 
          
    
    `,

    data() {

        return {
            title: "Contas a pagar",
            status: false,
            total: 0,
        }
    },

    created(){
        this.updateStatus();
        this.updateTotal();
    },

    methods: {

        calculateStatus(bills) {

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

        updateStatus() {
            Bill.query('bills').then((response) => {
                this.calculateStatus(response.data);
            })
        },

        updateTotal() {
            Bill.total('bills').then((response) => {
                this.total = response.data.total;
            })
        }

    },

    events: {
        'change-info'() {
            this.updateStatus();
            this.updateTotal();
        }
    }
    
});
