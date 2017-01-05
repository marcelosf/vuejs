'use strict';

window.billPayComponent = Vue.extend({

    template: '\n            \n           \n            <div class="section">\n                <div class="container">\n                   <h4> {{ title }} </h4>\n                   <div class="row">\n                        <div class="col s6">\n                            <div class="card z-depth-2 {{ status | statusClass }}" >\n                                <div class="card-content white-text">\n                                    <p class="card-title">\n                                        <i class="material-icons">account_balance</i>\n                                    </p>\n                                    <b>{{ status | statusMessage }}</b>\n                                </div>\n                            </div>\n                        </div>\n                        <div class="col s6">\n                            <div class="card z-depth-2" >\n                                <div class="card-content">\n                                    <p class="card-title">\n                                        <i class="material-icons">payment</i>\n                                    </p>\n                                    <b>{{ total | numberFormat }}</b>\n                                </div>\n                            </div>\n                        </div>\n                   </div>\n                </div>\n            </div>\n           \n           <div class="divider"></div>\n           \n           <router-view></router-view> \n          \n    \n    ',

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

            Bill.query('bills').then(function (response) {
                _this.calculateStatus(response.data);
            });
        },
        updateTotal: function updateTotal() {
            var _this2 = this;

            Bill.total('bills').then(function (response) {
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

});