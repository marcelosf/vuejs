'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
Vue.http.options.root = 'http://192.168.10.10:8000/api';

var BillResource = Vue.resource('bills{/id}', {}, {
    total: { method: 'GET', url: 'bills/total' }
});

var BillReceiveResource = Vue.resource('bills-receive{/id}', {}, {
    total: { method: 'GET', url: 'bills-receive/total' }
});

exports.BillResource = BillResource;
exports.BillReceiveResource = BillReceiveResource;