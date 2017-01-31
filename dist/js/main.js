'use strict';

require('style!css!../css/test.css');

window.$ = window.jQuery = require('jquery');

require('materialize-css');

require(['./bill.component', './bill-pay/bill-pay.component', './bill-pay/bill-pay-list.component', './bill-pay/bill-pay-create.component', './bill-receive/bill-receive.component', './bill-receive/bill-receive-list.component', './bill-receive/bill-receive-create.component'], function (billComponent, billPayComponent, billPayListComponent, billPayCreateComponent, billReceiveComponent, billReceiveListComponent, billReceiveCreateComponent) {

    var router = new VueRouter();

    var mainComponent = Vue.extend({

        components: {
            'bill-component': billComponent
        },

        template: '<bill-component></bill-component>',

        data: function data() {

            return {

                billsReceive: [{ date_due: '20/08/2016', name: 'Conta de Luz', value: 22280.00, done: 1 }, { date_due: '21/08/2016', name: 'Conta de água', value: 480.00, done: 0 }, { date_due: '22/08/2016', name: 'Conta de telefone', value: 80.00, done: 1 }, { date_due: '23/08/2016', name: 'Gasolina', value: 80.00, done: 0 }, { date_due: '24/08/2016', name: 'Supermercado', value: 80.00, done: 0 }, { date_due: '25/08/2016', name: 'Empréstimo', value: 800.00, done: 0 }]

            };
        }

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
                '/:id/update': {
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

                '/:id/update': {
                    name: 'bill-receive.update',
                    component: billReceiveCreateComponent
                }
            }
        },
        '*': {
            component: billPayListComponent
        }

    });

    router.start({

        components: {
            'bill-pay-component': billPayComponent
        }

    }, '#app');

    router.redirect({

        '*': '/bills-pays'

    });
});