window.billPayListComponent = Vue.extend({

    template: `
                    <div class="container">
                    
                        <div class="row">
                        <div>
                             <button class="btn btn-large waves-effect">Meu botão</button>
                             <h2>Minhas Contas a Pagar</h2>
                             <table class="striped centered highlight z-depth-3" cellpadding="10">
                                       <thead>
                                       <tr>
                                           <td>#</td>
                                           <th>Vencimento</th>
                                           <th>Nome</th>
                                           <th>Valor</th>
                                           <th>Paga?</th>
                                           <th>Ações</th>
                                       </tr>
                                       </thead>
                    
                                       <tbody>
                                       <tr v-for="(index,o) in bills">
                                           <td>{{ index + 1 }}</td>
                                           <td>{{ o.date_due | dateFormat 'en-US' }}</td>
                                           <td>{{ o.name }}</td>
                                           <td>{{ o.value | numberFormat 'en-US' 'USD' }}</td>
                                           <td class="white-text" :class="{'green lighten-2': o.done, 'red lighten-2': !o.done}">
                                               {{ o.done | doneLabel }}
                                           </td>
                                           <td>
                                               <a v-link="{name: 'bill-pay.update', params: {id: o.id }}">Editar|</a>
                                               <a href="#" @click.prevent="$parent.removeBill(o)">Remover</a>
                                               <!--<a href="#" @click.prevent="$parent.baixa(o)">{{ o.done | paidLabel }}</a>-->
                                           </td>
                                       </tr>
                                       </tbody>
                                   </table>
                        </div>
                           
                        </div>
                        </div>
                        
                        <div>
                            <a id="btn-modal" href="#my-modal" class="btn waves-effect">Abrir Modal</a>
                            <div id="my-modal" class="modal">
                                <div class="modal-content">
                                    <h2>Modal Content</h2>
                                    <p>Content text</p>
                                </div>
                                <div class="modal-footer">
                                    <button class="btn btn-flat green">Ok</button>
                                </div>
                            
                            </div>
                        
                        </div>
                       
    
    `,

    data() {
        return {           
            bills: []
        }       
    },

    created() {

        Bill.query().then((response) => {
            this.bills = response.data;
        });
        $(document).ready(function () {
            $("#btn-modal").modal();
        });
    } ,


    methods: {

        removeBill(bill){
            let confirmed = confirm('Deseja remover a conta da lista?');
            if (confirmed){
                //let self = this;
                Bill.delete({id: bill.id}).then((response) => {
                    this.bills.$remove(bill);
                    this.$dispatch('change-info');
                });
            }
        },
        
        baixa(bill){
            if (bill.done == 0){
                bill.done = 1
                } else {
                    bill.done = 0;
                }
            let self = this;
            Bill.update({id: bill.id}, bill).then(function (response){
                self.$dispatch('change-info');
            });
        }

    },

});
