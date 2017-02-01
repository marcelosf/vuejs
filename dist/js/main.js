'use strict';

require('./bootstrap');

var _bill = require('./bill.vue');

var _bill2 = _interopRequireDefault(_bill);

var _billPay = require('./bill-pay/bill-pay.component');

var _billPay2 = _interopRequireDefault(_billPay);

var _billPayList = require('./bill-pay/bill-pay-list.component');

var _billPayList2 = _interopRequireDefault(_billPayList);

var _billPayCreate = require('./bill-pay/bill-pay-create.component');

var _billPayCreate2 = _interopRequireDefault(_billPayCreate);

var _billReceive = require('./bill-receive/bill-receive.component');

var _billReceive2 = _interopRequireDefault(_billReceive);

var _billReceiveList = require('./bill-receive/bill-receive-list.component');

var _billReceiveList2 = _interopRequireDefault(_billReceiveList);

var _billReceiveCreate = require('./bill-receive/bill-receive-create.component');

var _billReceiveCreate2 = _interopRequireDefault(_billReceiveCreate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var VueRouter = require('vue-router');
var router = new VueRouter();

var mainComponent = Vue.extend({

    components: {
        'bill-component': _bill2.default
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
        component: _billPay2.default,
        subRoutes: {
            '/': {
                name: 'bill-pay.list',
                component: _billPayList2.default
            },

            '/create': {
                name: 'bill-pay.create',
                component: _billPayCreate2.default
            },
            '/:id/update': {
                name: 'bill-pay.update',
                component: _billPayCreate2.default
            }
        }
    },
    '/bill-receives': {
        component: _billReceive2.default,
        subRoutes: {
            '/': {
                name: 'bill-receive.list',
                component: _billReceiveList2.default
            },

            '/create': {
                name: 'bill-receive.create',
                component: _billReceiveCreate2.default
            },

            '/:id/update': {
                name: 'bill-receive.update',
                component: _billReceiveCreate2.default
            }
        }
    },
    '*': {
        component: _billPayList2.default
    }

});

router.start({

    components: {
        'bill-pay-component': _billPay2.default
    }

}, '#app');

router.redirect({

    '*': '/bills-pays'

});