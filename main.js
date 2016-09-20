var router = new VueRouter();

var mainComponent = Vue.extend({
    
    components: {
        'bill-component': billComponent
    },
    
    template: '<bill-component></bill-component>',
    
    data: function() {

        return {

            billsPay: [
                {date_due: '20/08/2016', name: 'Conta de Luz', value: 22280.00, done: 1},
                {date_due: '20/08/2016', name: 'Conta de água', value:480.00, done: 0},
                {date_due: '20/08/2016', name: 'Conta de telefone', value: 80.00, done: 1},
                {date_due: '20/08/2016', name: 'Gasolina', value: 80.00, done: 0},
                {date_due: '20/08/2016', name: 'Supermercado', value: 80.00, done: 0},
                {date_due: '20/08/2016', name: 'Empréstimo', value: 800.00, done: 0}
            ]

        };

    }
    
});

Vue.component('main-component', mainComponent);

router.map({
    '/bill-pays': {
        component: billPayComponent,
        subRoutes: {
            '/': {
                name: 'bill.list',
                component: billPayListComponent
            },

            '/create': {
                name: 'bill.create',
                component: billPayCreateComponent
            },
            '/:index/update': {
                name: 'bill.update',
                component: billPayCreateComponent
            }
        }
    }

});

router.start({
    
    components: {
        'bill-pay-component': billPayComponent
    }
    
}, '#app');


router.redirect({
    
    '*': '/bills'
    
});