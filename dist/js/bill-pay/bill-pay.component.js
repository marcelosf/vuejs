'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _resources = require('../resources');

exports.default = {

    template: '\n            \n           \n            <div class="section">\n                <div class="container">\n                   <h4> {{ title }} </h4>\n                   <div class="row">\n                        <div class="col s6">\n                            <div class="collection">\n                                <a href="#!" class="collection-item"><span class="badge">{{ status }}</span><i class="material-icons left">account_balance</i>{{ status | statusMessage }}</a>\n                            </div>                             \n                        </div>\n                        \n                        <div class="col s6">\n                            <div class="collection">\n                                <a href="#!" class="collection-item"><span class="badge">{{ total | numberFormat }}</span><i class="material-icons left">payment</i>Total</a>\n                            </div>  \n                            \n                        </div>\n                   </div>\n                </div>\n            </div>\n           \n           <div class="divider"></div>\n           \n           <router-view></router-view> \n          \n    \n    ',

    data: function data() {

        return {
            title: "Contas a pagar",
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
            var _this = this;

            _resources.BillResource.query('bills').then(function (response) {
                _this.calculateStatus(response.data);
            });
        },
        updateTotal: function updateTotal() {
            var _this2 = this;

            _resources.BillResource.total('bills').then(function (response) {
                _this2.total = response.data.total;
            });
        }
    },

    events: {
        'change-info': function changeInfo() {
            this.updateStatus();
            this.updateTotal();
        }
    }

};