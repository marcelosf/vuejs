window.billDashboardComponent = Vue.extend({
    
    
    template:
        
    `
        <h1>Dashboard<h1>
        <hr>
        <div class="dashboard-item">
            <p><b>Total de contas a receber</b></p>
            <p>{{ receiveBillSum | currency 'R$ ', 2}}</p>
        </div><div class="dashboard-item">
            <p><b>Total de contas a pagar</b></p>
            <p>{{ payBillSum | currency 'R$ ', 2}}</p>
        </div>
        <div class="dashboard-item">
            <p><b>Saldo</b></p>
            <p>{{ balance | currency 'R$ ', 2}}</p>
        </div>
        
    `,
    
    data: function(){
        return {
            payBillSum: 0,
            receiveBillSum:0,
            balance: 0
        };
    },
    
    
    created: function (){
        this.resetDashboard();
        this.setDashboard();
    },
    
    methods: {
        
        resetDashboard: function(){
            this.payBillSum = 0;
            this.receiveBillSum = 0;
            this.balance = 0;
        },
        
        setDashboard: function(){
            var billsList = this.$root.$children[0];
            var billsPay = billsList.billsPay;
            var billsReceive = billsList.billsReceive;

            this.payBillSum = billsList.getListSum(billsPay);
            this.receiveBillSum = billsList.getListSum(billsReceive);
            this.balance = this.receiveBillSum - this.payBillSum;
        }
        
        
    }
    
});