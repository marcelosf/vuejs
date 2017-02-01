import './bootstrap';
    import BillComponent from './bill.vue';
    import BillPayComponent from './bill-pay/bill-pay.component';
    import BillPayListComponent from './bill-pay/bill-pay-list.component';
    import BillPayCreateComponent from './bill-pay/bill-pay-create.component';
    import BillReceiveComponent from './bill-receive/bill-receive.component';
    import BillReceiveListComponent from './bill-receive/bill-receive-list.component';
    import BillReceiveCreateComponent from './bill-receive/bill-receive-create.component';



    let VueRouter = require('vue-router');
    let router = new VueRouter();

    var mainComponent = Vue.extend({

        components: {
            'bill-component': BillComponent
        },

        template: '<bill-component></bill-component>',

        data: function() {

            return {

                billsReceive: [
                    {date_due: '20/08/2016', name: 'Conta de Luz', value: 22280.00, done: 1},
                    {date_due: '21/08/2016', name: 'Conta de água', value:480.00, done: 0},
                    {date_due: '22/08/2016', name: 'Conta de telefone', value: 80.00, done: 1},
                    {date_due: '23/08/2016', name: 'Gasolina', value: 80.00, done: 0},
                    {date_due: '24/08/2016', name: 'Supermercado', value: 80.00, done: 0},
                    {date_due: '25/08/2016', name: 'Empréstimo', value: 800.00, done: 0}
                ],


            };

        }

    });

    Vue.component('main-component', mainComponent);

    router.map({
        '/bill-pays': {
            component: BillPayComponent,
            subRoutes: {
                '/': {
                    name: 'bill-pay.list',
                    component: BillPayListComponent
                },

                '/create': {
                    name: 'bill-pay.create',
                    component: BillPayCreateComponent
                },
                '/:id/update': {
                    name: 'bill-pay.update',
                    component: BillPayCreateComponent
                }
            }
        },
        '/bill-receives': {
            component: BillReceiveComponent,
            subRoutes: {
                '/': {
                    name: 'bill-receive.list',
                    component: BillReceiveListComponent
                },

                '/create': {
                    name: 'bill-receive.create',
                    component: BillReceiveCreateComponent
                },

                '/:id/update': {
                    name: 'bill-receive.update',
                    component: BillReceiveCreateComponent
                }
            }
        },
        '*': {
            component: BillPayListComponent
        }

    });

    router.start({

        components: {
            'bill-pay-component': BillPayComponent
        }

    }, '#app');


    router.redirect({

        '*': '/bills-pays'

    });



