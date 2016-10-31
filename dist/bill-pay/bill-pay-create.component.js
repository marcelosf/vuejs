'use strict';

window.billPayCreateComponent = Vue.extend({

    template: '\n          <form name="form" @submit.prevent="submit">\n                   <label>Vencimento:</label>\n                   <input type="text" v-model="bill.date_due">\n                   <br><br>\n                   <label>Nome:</label>\n                   <select v-model="bill.name">\n                       <option v-for="o in names" :value="o">\n                           {{ o }}\n                       </option>\n                   </select>\n                   <br><br>\n                   <label>Valor:</label>\n                   <input type="text" v-model="bill.value"/>\n                   <br><br>\n                   <label>Pago?</label>\n                   <input type="checkbox" v-model="bill.done"/>\n                   <br/><br/>\n                   <input type="submit" value="Enviar" />\n          </form>\n    ',

    formType: 'insert',

    created: function created() {
        if (this.$route.name == 'bill-pay.update') {
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
            var _this = this;

            if (this.formType == "insert") {
                (function () {
                    var self = _this;
                    Bill.save('bills', _this.bill).then(function (response) {
                        self.$router.go({ name: 'bill-pay.list' });
                        self.$dispatch('change-info');
                    });
                })();
            } else {
                (function () {
                    var self = _this;
                    Bill.update({ id: _this.bill.id }, _this.bill).then(function (response) {
                        self.$router.go({ name: 'bill-pay.list' });
                        self.$dispatch('change-info');
                    });
                })();
            }
        },

        getBill: function getBill(id) {
            var self = this;
            Bill.get({ id: id }).then(function (response) {
                self.bill = response.data;
            });
        }
    }

});