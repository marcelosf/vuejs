var router = new VueRouter();

var mainComponent = Vue.extend({
    
    components: {
        'app-component': appComponent
    },
    
    template: '<app-component></app-component>',
    
    data: function() {

        return {

            bills: [
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
    
    '/bills': {
        name: 'bill.list',
        component: billListComponent
    },
    
    '/bill/create': {
        name: 'bill.create',
        component: billCreateComponent
    },
    '/bill/:index/update': {
        name: 'bill.update',
        component: billCreateComponent
    },
    
    '*': {
        
        component: billListComponent
    }
    
});

router.start({
    
    components: {
        'app-component': appComponent
    }
    
}, '#app');


router.redirect({
    
    '*': '/bills'
    
});