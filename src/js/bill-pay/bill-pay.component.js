window.billPayComponent = Vue.extend({

    template: `
            
           
            <div class="section">
                <div class="container">
                   <h4> {{ title }} </h4>
                   <div class="row">
                        <div class="col s6">
                            <div class="collection">
                                <a href="#!" class="collection-item"><span class="badge">{{ status }}</span><i class="material-icons left">account_balance</i>{{ status | statusMessage }}</a>
                            </div>                             
                        </div>
                        
                        <div class="col s6">
                            <div class="collection">
                                <a href="#!" class="collection-item"><span class="badge">{{ total | numberFormat }}</span><i class="material-icons left">payment</i>Total</a>
                            </div>  
                            
                        </div>
                   </div>
                </div>
            </div>
           
           <div class="divider"></div>
           
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
