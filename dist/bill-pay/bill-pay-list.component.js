'use strict';

window.billPayListComponent = Vue.extend({

    template: '\n                    <div class="container">\n                    \n                        <div class="row">\n                        <div>\n                             <button class="btn btn-large waves-effect">Meu bot\xE3o</button>\n                             <h2>Minhas Contas a Pagar</h2>\n                             <table class="striped centered highlight z-depth-3" cellpadding="10">\n                                       <thead>\n                                       <tr>\n                                           <td>#</td>\n                                           <th>Vencimento</th>\n                                           <th>Nome</th>\n                                           <th>Valor</th>\n                                           <th>Paga?</th>\n                                           <th>A\xE7\xF5es</th>\n                                       </tr>\n                                       </thead>\n                    \n                                       <tbody>\n                                       <tr v-for="(index,o) in bills">\n                                           <td>{{ index + 1 }}</td>\n                                           <td>{{ o.date_due | dateFormat \'en-US\' }}</td>\n                                           <td>{{ o.name }}</td>\n                                           <td>{{ o.value | numberFormat \'en-US\' \'USD\' }}</td>\n                                           <td class="white-text" :class="{\'green lighten-2\': o.done, \'red lighten-2\': !o.done}">\n                                               {{ o.done | doneLabel }}\n                                           </td>\n                                           <td>\n                                               <a v-link="{name: \'bill-pay.update\', params: {id: o.id }}">Editar|</a>\n                                               <a href="#" @click.prevent="$parent.removeBill(o)">Remover</a>\n                                               <!--<a href="#" @click.prevent="$parent.baixa(o)">{{ o.done | paidLabel }}</a>-->\n                                           </td>\n                                       </tr>\n                                       </tbody>\n                                   </table>\n                        </div>\n                           \n                        </div>\n                        </div>\n                        \n                        <div>\n                            <a id="btn-modal" href="#my-modal" class="btn waves-effect">Abrir Modal</a>\n                            <div id="my-modal" class="modal">\n                                <div class="modal-content">\n                                    <h2>Modal Content</h2>\n                                    <p>Content text</p>\n                                </div>\n                                <div class="modal-footer">\n                                    <button class="btn btn-flat green">Ok</button>\n                                </div>\n                            \n                            </div>\n                        \n                        </div>\n                       \n    \n    ',

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
        $(document).ready(function () {
            $("#btn-modal").modal();
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