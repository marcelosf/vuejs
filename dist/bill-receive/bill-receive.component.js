'use strict';

window.billReceiveComponent = Vue.extend({

    components: {
        'menu-component': billReceiveMenuComponent
    },

    template: '\n            \n            <style type="text/css">\n                \n                .sem-contas {\n                    color: darkgray;\n                }\n            </style> \n            \n           <h1> {{ title }} </h1>\n           <h3 :class="status | statusClass">{{ status | statusMessage }}</h3>\n           <h3>{{ total | currency \'R$ \' }}</h3>\n           \n           <menu-component></menu-component>\n           <router-view></router-view> \n          \n    \n    ',

    data: function data() {

        return {
            title: "Contas a receber",
            status: false,
            total: 0
        };
    },

    created: function created() {
        this.updateStatus();
        this.updateTotal();
    },

    methods: {

        calculateStatus: function calculateStatus(bills) {

            if (!bills.length) {
                return this.status = false;
            }

            var count = 0;

            for (var i in bills) {
                if (!bills[i].done) {
                    count++;
                }
            }
            this.status = count;
        },

        updateStatus: function updateStatus() {
            var self = this;
            BillReceive.query('bills').then(function (response) {
                self.calculateStatus(response.data);
            });
        },

        updateTotal: function updateTotal() {
            var self = this;
            BillReceive.total('bills').then(function (response) {
                self.total = response.data.total;
            });
        }

    },

    events: {
        'change-info': function changeInfo() {
            this.updateStatus();
            this.updateTotal();
        }
    }

});