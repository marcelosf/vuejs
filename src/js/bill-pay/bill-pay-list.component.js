import {BillResource} from '../resources';
import ModalComponent from '../modal.component';


export default {

    components: {
        'modal': ModalComponent
    },

    template: `
                    <div class="container">
                    
                        <div class="row">
                            <div>
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
                                               <td>{{ o.date_due | dateFormat 'pt-BR' }}</td>
                                               <td>{{ o.name }}</td>
                                               <td>{{ o.value | numberFormat 'pt-BR' 'BRL' }}</td>
                                               <td class="white-text" :class="{'blue lighten-3': o.done, 'red lighten-2': !o.done}">
                                                   {{ o.done | doneLabel }}
                                               </td>
                                               <td>
                                                   <a v-link="{name: 'bill-pay.update', params: {id: o.id }}" class="btn btn-flat">Editar</a>
                                                   <a href="#" @click.prevent="openModalDelete(o)" class="btn btn-flat">Remover</a>
                                                   <!--<a href="#" @click.prevent="$parent.baixa(o)">{{ o.done | paidLabel }}</a>-->
                                               </td>
                                           </tr>
                                      </tbody>
                                 </table>
                            </div>
                        </div>
                    </div>
                       
                    <modal :modal="modal">
                        <div slot="content" v-if="billToDelete">
                            <h4>Mensagem de confirmação</h4>
                            <p><strong>Deseja remover esta conta?</strong></p>
                            <div class="divider"></div>
                            <p>Nome: <strong>{{ billToDelete.name }}</strong></p>
                            <p>Valor: <strong>{{ billToDelete.value | numberFormat }}</strong></p>
                            <p>Data: <strong>{{ billToDelete.date_due | dateFormat }}</strong></p>
                            
                        </div>
                        <div slot="footer">
                            <button class="btn btn-flat waves-effect green lighten-2 modal-close modal-action" @click="removeBill()">Ok</button>
                            <button class="btn btn-flat waves-red modal-close modal-action white">Cancelar</button>
                        </div>
                    </modal>
    `,

    data() {
        return {           
            bills: [],
            billToDelete: null,
            modal: {
                id: 'modal-delete'
            }
        }       
    },

    created() {

        BillResource.query().then((response) => {
            this.bills = response.data;
        });

    } ,


    methods: {

        removeBill(){
            //let self = this;
            BillResource.delete({id: this.billToDelete.id}).then((response) => {
                this.bills.$remove(this.billToDelete);
                this.billToDelete = null;
                Materialize.toast('Conta excluida com sucesso!', 4000);
                this.$dispatch('change-info');

            });
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
        },

        openModalDelete(bill) {

            this.billToDelete = bill;

            $('#modal-delete').modal();

            $('#modal-delete').modal('open');

        }

    }

};
