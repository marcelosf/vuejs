var router = new VueRouter();

var mainComponent = Vue.extend({
    
    components: {
        'bill-component': billComponent
    },
    
    template: '<bill-component></bill-component>',
    
    data: function() {

        return {

            billsPay: [
                {date_due: '20/08/2016', name: 'Conta de Luz', value: 80, done: 1},
                {date_due: '20/08/2016', name: 'Conta de água', value:48, done: 0},
                {date_due: '20/08/2016', name: 'Conta de telefone', value: 80.00, done: 1},
                {date_due: '20/08/2016', name: 'Gasolina', value: 80.00, done: 0},
                {date_due: '20/08/2016', name: 'Supermercado', value: 90.00, done: 0},
                {date_due: '20/08/2016', name: 'Empréstimo', value: 800.00, done: 0}
            ],

            billsReceive: [
                {date_due: '20/08/2016', name: 'Conta de Luz', value: 200, done: 1},
                {date_due: '21/08/2016', name: 'Conta de água', value:100, done: 0},
                {date_due: '22/08/2016', name: 'Conta de telefone', value: 250, done: 1},
                {date_due: '23/08/2016', name: 'Gasolina', value: 20, done: 0},
                {date_due: '24/08/2016', name: 'Supermercado', value: 600, done: 0},
                {date_due: '25/08/2016', name: 'Empréstimo', value: 100, done: 0}
            ],


        };

    },
    
    methods: {
        
        getListSum: function (billList){
            var bills = billList;
            var sum = 0;
            for (i in bills){
                sum = parseFloat(bills[i].value) + parseFloat(sum);
            }
            return sum;
        }
        
    },
    
});

Vue.component('main-component', mainComponent);

router.map({
    '/bill-pays': {
        component: billPayComponent,
        subRoutes: {
            '/': {
                name: 'bill-pay.list',
                component: billPayListComponent
            },

            '/create': {
                name: 'bill-pay.create',
                component: billPayCreateComponent
            },
            '/:index/update': {
                name: 'bill-pay.update',
                component: billPayCreateComponent
            }
        }
    },
    '/bill-receives': {
        component: billReceiveComponent,
        subRoutes: {
            '/': {
                name: 'bill-receive.list',
                component: billReceiveListComponent
            },

            '/create': {
                name: 'bill-receive.create',
                component: billReceiveCreateComponent
            },

            '/:index/update': {
                name: 'bill-receive.update',
                component: billReceiveCreateComponent
            }
        }
    },
    '/dashboard': {
        name: 'bill-dashboard',
        component: billDashboardComponent
    },
    '*': {
        component: billDashboardComponent
    }

});

router.start({
    
    components: {
        'bill-dashboard-component': billDashboardComponent
    }
    
}, '#app');


router.redirect({
    
    '*': '/dashboard'
    
});