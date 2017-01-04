'use strict';

var names = ['Conta de luz', 'Conta de água', 'Conta de telefone', 'Supermercado', 'Cartão de crédito', 'Empréstimo', 'Gasolina'];

window.billPayCreateComponent = Vue.extend({

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
            bill: new BillPay()

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
                _this2.bill = new BillPay(response.data);
            });
        }
    }

});