'use strict';

window.billPayListComponent = Vue.extend({

    template: '\n                \n               <style type="text/css">\n                    .pago, .em-dia{\n                        color: green;\n                    }\n                    .nao-pago, .devendo{\n                        color: red;\n                    }\n                </style> \n               <table border="1" cellpadding="10">\n                   <thead>\n                   <tr>\n                       <td>#</td>\n                       <th>Vencimento</th>\n                       <th>Nome</th>\n                       <th>Valor</th>\n                       <th>Paga?</th>\n                       <th>A\xE7\xF5es</th>\n                   </tr>\n                   </thead>\n\n                   <tbody>\n                   <tr v-for="(index,o) in bills">\n                       <td>{{ index + 1 }}</td>\n                       <td>{{ o.date_due | dateFormat \'pt-BR\' }}</td>\n                       <td>{{ o.name }}</td>\n                       <td>{{ o.value | numberFormat \'pt-BR\' \'USD\' }}</td>\n                       <td :class="{\'pago\': o.done, \'nao-pago\': !o.done}">\n                           {{ o.done | doneLabel }}\n                       </td>\n                       <td>\n                           <a v-link="{name: \'bill-pay.update\', params: {id: o.id }}">Editar</a>\n                           <a href="#" @click.prevent="$parent.removeBill(o)">Remover</a>\n                           <a href="#" @click.prevent="$parent.baixa(o)">{{ o.done | paidLabel }}</a>\n                       </td>\n                   </tr>\n                   </tbody>\n               </table>\n    \n    ',

    data: function data() {
        return {
            bills: []
        };
    },
    created: function created() {
        var _this = this;

        Bill.query().then(function (response) {
            _this.bills = response.data;
        });
    },


    methods: {
        removeBill: function removeBill(bill) {
            var _this2 = this;

            var confirmed = confirm('Deseja remover a conta da lista?');
            if (confirmed) {
                //let self = this;
                Bill.delete({ id: bill.id }).then(function (response) {
                    _this2.bills.$remove(bill);
                    _this2.$dispatch('change-info');
                });
            }
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
        }
    }

});