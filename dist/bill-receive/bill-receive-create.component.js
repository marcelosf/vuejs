'use strict';

window.billReceiveCreateComponent = Vue.extend({

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

});