window.billPayComponent = Vue.extend({

    template: `
            
           
            <div class="section">
                <div class="container">
                   <h4> {{ title }} </h4>
                   <div class="row">
                        <div class="col s6">
                            <div class="card z-depth-2 {{ status | statusClass }}" >
                                <div class="card-content white-text">
                                    <p class="card-title">
                                        <i class="material-icons">account_balance</i>
                                    </p>
                                    <b>{{ status | statusMessage }}</b>
                                </div>
                            </div>
                        </div>
                        <div class="col s6">
                            <div class="card z-depth-2" >
                                <div class="card-content">
                                    <p class="card-title">
                                        <i class="material-icons">payment</i>
                                    </p>
                                    <b>{{ total | numberFormat }}</b>
                                </div>
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
