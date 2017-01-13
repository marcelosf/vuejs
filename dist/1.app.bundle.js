webpackJsonp([1],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {

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

	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var modalComponent = __webpack_require__(6);

	module.exports = {

	    components: {
	        'modal': modalComponent
	    },

	    template: '\n                    <div class="container">\n                    \n                        <div class="row">\n                            <div>\n                                 <h2>Minhas Contas a Pagar</h2>\n                                 <table class="striped centered highlight z-depth-3" cellpadding="10">\n                                       <thead>\n                                           <tr>\n                                               <td>#</td>\n                                               <th>Vencimento</th>\n                                               <th>Nome</th>\n                                               <th>Valor</th>\n                                               <th>Paga?</th>\n                                               <th>A\xE7\xF5es</th>\n                                           </tr>\n                                           </thead>\n                        \n                                           <tbody>\n                                           <tr v-for="(index,o) in bills">\n                                               <td>{{ index + 1 }}</td>\n                                               <td>{{ o.date_due | dateFormat \'pt-BR\' }}</td>\n                                               <td>{{ o.name }}</td>\n                                               <td>{{ o.value | numberFormat \'pt-BR\' \'BRL\' }}</td>\n                                               <td class="white-text" :class="{\'blue lighten-3\': o.done, \'red lighten-2\': !o.done}">\n                                                   {{ o.done | doneLabel }}\n                                               </td>\n                                               <td>\n                                                   <a v-link="{name: \'bill-pay.update\', params: {id: o.id }}" class="btn btn-flat">Editar</a>\n                                                   <a href="#" @click.prevent="openModalDelete(o)" class="btn btn-flat">Remover</a>\n                                                   <!--<a href="#" @click.prevent="$parent.baixa(o)">{{ o.done | paidLabel }}</a>-->\n                                               </td>\n                                           </tr>\n                                      </tbody>\n                                 </table>\n                            </div>\n                        </div>\n                    </div>\n                       \n                    <modal :modal="modal">\n                        <div slot="content">\n                            <h4>Mensagem de confirma\xE7\xE3o</h4>\n                            <p><strong>Deseja remover esta conta?</strong></p>\n                            <div class="divider"></div>\n                            <p>Nome: <strong>{{ billToDelete.name }}</strong></p>\n                            <p>Valor: <strong>{{ billToDelete.value | numberFormat }}</strong></p>\n                            <p>Data: <strong>{{ billToDelete.date_due | dateFormat }}</strong></p>\n                            \n                        </div>\n                        <div slot="footer">\n                            <button class="btn btn-flat waves-effect green lighten-2 modal-close modal-action" @click="removeBill()">Ok</button>\n                            <button class="btn btn-flat waves-red modal-close modal-action white">Cancelar</button>\n                        </div>\n                    </modal>\n    ',

	    data: function data() {
	        return {
	            bills: [],
	            billToDelete: null,
	            modal: {
	                id: 'modal-delete'
	            }
	        };
	    },
	    created: function created() {
	        var _this = this;

	        Bill.query().then(function (response) {
	            _this.bills = response.data;
	        });
	    },


	    methods: {
	        removeBill: function removeBill() {
	            var _this2 = this;

	            //let self = this;
	            Bill.delete({ id: this.billToDelete.id }).then(function (response) {
	                _this2.bills.$remove(_this2.billToDelete);
	                _this2.billToDelete = null;
	                Materialize.toast('Conta excluida com sucesso!', 4000);
	                _this2.$dispatch('change-info');
	            });
	        },
	        baixa: function baixa(bill) {
	            if (bill.done == 0) {
	                bill.done = 1;
	            } else {
	                bill.done = 0;
	            }
	            var self = this;
	            Bill.update({ id: bill.id }, bill).then(function (response) {
	                self.$dispatch('change-info');
	            });
	        },
	        openModalDelete: function openModalDelete(bill) {

	            this.billToDelete = bill;

	            $('#modal-delete').modal();

	            $('#modal-delete').modal('open');
	        }
	    }

	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {

	    template: '\n        \n       <div :id="modal.id" class="modal">\n            <div class="modal-content">\n                <slot name="content"></slot>\n            </div>\n            <div class="modal-footer">\n                <slot name="footer"></slot>\n            </div>\n       </div>\n\n    ',

	    props: ['modal'],

	    data: function data() {

	        return {
	            modal: {
	                id: ''
	            }
	        };
	    }
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _bill = __webpack_require__(1);

	var _bill2 = _interopRequireDefault(_bill);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var names = ['Conta de luz', 'Conta de água', 'Conta de telefone', 'Supermercado', 'Cartão de crédito', 'Empréstimo', 'Gasolina'];

	module.exports = {

	    template: '\n\n            <div class="container">\n                <div class="row">\n                \n                    <h2>Nova Conta</h2>\n                \n                    <form name="form" @submit.prevent="submit">\n                       \n                       <div class="row">\n                            <div class="input-field col s6">\n                                <label class="active">Vencimento:</label>\n                                <input type="text" v-model="bill.date_due | dateFormat \'en-US\'" placeholder="Informe a data"> \n                            </div>    \n                            <div class="input-field col s6">\n                                <label class="active">Valor:</label>\n                                <input type="text" v-model="bill.value | numberFormat"/>\n                            </div>\n                       </div>\n                       \n                       <div class="row">\n                            <div class="iput-field col s6">\n                               <label>Nome:</label>\n                               <select v-model="bill.name" id="name" class="browser-default">\n                                   <option v-for="o in names" :value="o">\n                                       {{ o }}\n                                   </option>\n                               </select>\n                            </div>     \n                            <div class="input-field col s6">\n                                <input type="checkbox" v-model="bill.done" id="pago"/>\n                                <label for="pago">Pago?</label>\n                            </div>\n                       </div>\n                       <div class="row">\n                            <input type="submit" value="Enviar" class="btn btn-large right" />\n                       </div>\n                    </form>\n                </div>\n            </div>\n          \n    ',

	    formType: 'insert',

	    created: function created() {
	        if (this.$route.name == 'bill-pay.update') {
	            this.formType = 'update';
	            this.getBill(this.$route.params.id);
	        }
	        $(document).ready(function () {

	            $("#name").material_select();
	        });
	    },
	    data: function data() {
	        return {
	            formType: 'insert',
	            names: names,
	            bill: new _bill2.default()

	        };
	    },


	    methods: {
	        submit: function submit() {
	            var _this = this;

	            var data = this.bill.toJSON();
	            if (this.formType == "insert") {
	                Bill.save({}, data).then(function (response) {
	                    Materialize.toast('Conta criada com sucesso!', 4000);
	                    _this.$router.go({ name: 'bill-pay.list' });
	                    _this.$dispatch('change-info');
	                });
	            } else {
	                var self = this;
	                Bill.update({ id: this.bill.id }, this.bill).then(function (response) {
	                    Materialize.toast('Conta atualizada com sucesso!', 4000);
	                    _this.$router.go({ name: 'bill-pay.list' });
	                    _this.$dispatch('change-info');
	                });
	            }
	        },
	        getBill: function getBill(id) {
	            var _this2 = this;

	            Bill.get({ id: id }).then(function (response) {
	                _this2.bill = new _bill2.default(response.data);
	            });
	        }
	    }

	};

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	    template: '\n        <ul v-bind:id="o.id" class="dropdown-content" v-for="o in menusDropdown">\n            <li v-for="item in o.items">\n                <a v-link="{name: item.routeName}">{{ item.name }}</a>\n            </li>\n        </ul>\n        <div class="navbar-fixed">\n            <nav >\n                    <div class="nav-wrapper container">\n                       <a href="#" class="brand-logo right">Code Contas</a>\n                        \n                       <a href="#" data-activates="nav-mobile" class="button-collapse">\n                            <i class="material-icons">menu</i>\n                       </a>\n                       \n                       <ul id="nav-mobile" class="side-nav">\n                           <li v-for="o in menus">\n                               <a v-link="{name: o.routeName }">{{ o.name }}</a>\n                           </li>\n                       </ul>\n                       \n                       <ul class="left hide-on-med-and-down">\n                           <li v-for="o in menus">\n                               <a v-if ="o.dropdownId" class="dropdown-button" href="!#" v-bind:data-activates="o.dropdownId">\n                                    {{ o.name }} <i class="material-icons right">arrow_drop_down</i>\n                               </a>\n                               <a v-else v-link="{name: o.routeName}">{{ o.name }}</a>\n                           </li>\n                       </ul>\n                       \n                       \n                       \n                    </div>\n            </nav>\n        </div>\n        \n            <router-view></router-view>\n    ',

	    created: function created() {

	        $(document).ready(function () {
	            $('.button-collapse').sideNav();
	            $('.dropdown-button').dropdown();
	        });
	    },
	    data: function data() {

	        return {

	            menus: [{ name: "Contas a pagar", routeName: 'bill-pay.list', dropdownId: 'bill-pay' }, { name: "Contas a receber", routeName: 'bill-receive.list', dropdownId: 'bill-receive' }],

	            menusDropdown: [{

	                id: 'bill-pay', items: [{ id: 0, name: "Listar contas", routeName: 'bill-pay.list' }, { id: 1, name: "Criar conta", routeName: 'bill-pay.create' }]

	            }, {

	                id: 'bill-receive', items: [{ id: 0, name: "Listar contas", routeName: 'bill-receive.list' }, { id: 1, name: "Criar conta", routeName: 'bill-receive.create' }]

	            }]

	        };
	    }
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _billReceiveMenu = __webpack_require__(10);

	var _billReceiveMenu2 = _interopRequireDefault(_billReceiveMenu);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = {

	    components: {
	        'menu-component': _billReceiveMenu2.default
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

	};

/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";

	window.billReceiveMenuComponent = Vue.extend({

	    template: "\n    \n           <nav>\n               <ul>\n                   <li v-for=\"o in menus\">\n                       <a v-link=\"{name: o.routeName }\">{{ o.name }}</a>\n                   </li>\n               </ul>\n           </nav>\n    \n    ",

	    data: function data() {

	        return {

	            menus: [{ id: 0, name: "Listar contas", routeName: 'bill-receive.list' }, { id: 1, name: "Criar conta", routeName: 'bill-receive.create' }]

	        };
	    }

	});

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {

	    template: '\n                \n               <style type="text/css">\n                    .pago, .em-dia{\n                        color: green;\n                    }\n                    .nao-pago, .devendo{\n                        color: red;\n                    }\n                </style> \n               <table border="1" cellpadding="10">\n                   <thead>\n                   <tr>\n                       <td>#</td>\n                       <th>Vencimento</th>\n                       <th>Nome</th>\n                       <th>Valor</th>\n                       <th>Paga?</th>\n                       <th>A\xE7\xF5es</th>\n                   </tr>\n                   </thead>\n\n                   <tbody>\n                   <tr v-for="(index,o) in bills">\n                       <td>{{ index + 1 }}</td>\n                       <td>{{ o.date_due }}</td>\n                       <td>{{ o.name }}</td>\n                       <td>{{ o.value | currency \'R$ \' 2}}</td>\n                       <td :class="{\'pago\': o.done, \'nao-pago\': !o.done}">\n                           {{ o.done | doneLabel }}\n                       </td>\n                       <td>\n                           <a v-link="{name: \'bill-receive.update\', params: {id: o.id }}">Editar</a>\n                           <a href="#" @click.prevent="$parent.removeBill(o)">Remover</a>\n                           <a href="#" @click.prevent="$parent.baixa(o)">{{ o.done | paidLabel }}</a>\n                       </td>\n                   </tr>\n                   </tbody>\n               </table>\n    \n    ',

	    data: function data() {
	        return {
	            bills: []
	        };
	    },

	    created: function created() {
	        var self = this;
	        BillReceive.query('bills').then(function (response) {
	            self.bills = response.data;
	        });
	    },

	    methods: {

	        removeBill: function removeBill(bill) {
	            var _this = this;

	            var confirmed = confirm('Deseja remover a conta da lista?');
	            if (confirmed) {
	                (function () {
	                    var self = _this;
	                    BillReceive.delete({ id: bill.id }).then(function (response) {
	                        self.bills.$remove(bill);
	                        self.$dispatch('change-info');
	                    });
	                })();
	            }
	        },

	        baixa: function baixa(bill) {
	            if (bill.done == 0) {
	                bill.done = 1;
	            } else {
	                bill.done = 0;
	            }
	            var self = this;
	            BillReceive.update({ id: bill.id }, bill).then(function (response) {
	                self.$dispatch('change-info');
	            });
	        }

	    }

	};

/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {

	    template: '\n          <form name="form" @submit.prevent="submit">\n                   <label>Vencimento:</label>\n                   <input type="text" v-model="bill.date_due">\n                   <br><br>\n                   <label>Nome:</label>\n                   <select v-model="bill.name">\n                       <option v-for="o in names" :value="o">\n                           {{ o }}\n                       </option>\n                   </select>\n                   <br><br>\n                   <label>Valor:</label>\n                   <input type="text" v-model="bill.value"/>\n                   <br><br>\n                   <label>Pago?</label>\n                   <input type="checkbox" v-model="bill.done"/>\n                   <br/><br/>\n                   <input type="submit" value="Enviar" />\n          </form>\n    ',

	    formType: 'insert',

	    created: function created() {
	        if (this.$route.name == 'bill-receive.update') {
	            this.formType = 'update';
	            this.getBill(this.$route.params.id);
	        }
	    },

	    data: function data() {
	        return {
	            formType: 'insert',
	            names: ['Conta de luz', 'Conta de água', 'Conta de telefone', 'Supermercado', 'Cartão de crédito', 'Empréstimo', 'Gasolina'],

	            bill: {
	                date_due: '',
	                name: '',
	                value: 0,
	                done: 0
	            }

	        };
	    },

	    methods: {

	        submit: function submit() {
	            var self = this;
	            if (this.formType == "insert") {
	                BillReceive.save('bills-receive', this.bill).then(function (response) {
	                    self.$router.go({ name: 'bill-receive.list' });
	                    self.$dispatch('change-info');
	                });
	            } else {
	                BillReceive.update({ id: this.bill.id }, this.bill).then(function (response) {
	                    self.$router.go({ name: 'bill-receive.list' });
	                    self.$dispatch('change-info');
	                });
	            }
	        },

	        getBill: function getBill(id) {
	            var self = this;
	            console.log(id);
	            BillReceive.get({ id: id }).then(function (response) {
	                self.bill = response.data;
	                console.log(response.data);
	            });
	        }
	    }

	};

/***/ }
]);