window.billPayListComponent = Vue.extend({

    template: `
                
               <style type="text/css">
                    .pago, .em-dia{
                        color: green;
                    }
                    .nao-pago, .devendo{
                        color: red;
                    }
                </style> 
               <table border="1" cellpadding="10">
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
                       <td>{{ o.value | numberFormat 'pt-BR' 'USD' }}</td>
                       <td :class="{'pago': o.done, 'nao-pago': !o.done}">
                           {{ o.done | doneLabel }}
                       </td>
                       <td>
                           <a v-link="{name: 'bill-pay.update', params: {id: o.id }}">Editar</a>
                           <a href="#" @click.prevent="$parent.removeBill(o)">Remover</a>
                           <a href="#" @click.prevent="$parent.baixa(o)">{{ o.done | paidLabel }}</a>
                       </td>
                   </tr>
                   </tbody>
               </table>
    
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
