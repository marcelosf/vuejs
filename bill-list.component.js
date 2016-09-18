window.billListComponent = Vue.extend({

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
                       <td>{{ o.date_due }}</td>
                       <td>{{ o.name }}</td>
                       <td>{{ o.value | currency 'R$ ' 2}}</td>
                       <td :class="{'pago': o.done, 'nao-pago': !o.done}">
                           {{ o.done | doneLabel }}
                       </td>
                       <td>
                           <a href="#" @click.prevent="$parent.loadBill(o)">Editar</a>
                           <a href="#" @click.prevent="$parent.removeBill(index)">Remover</a>
                           <a href="#" @click.prevent="$parent.baixa(o)">{{ o.done | paidLabel }}</a>
                       </td>
                   </tr>
                   </tbody>
               </table>
    
    `,

    data: function () {
        
        return {
            
            bills: this.$root.$children[0].bills
            
        }
        
    },
    
    methods: {

        loadBill: function(bill){
            this.$dispatch('change-bill', bill);
        },

        removeBill: function(id){
            var index = id + 1;
            var confirmed = confirm('Deseja remover a conta ' + index  + ' da lista?');
            if (confirmed){
                this.bills.splice(id, 1);
            }
        },

        baixa: function(bill) {
            if (bill.done == 0){
                bill.done = 1

            } else {
                bill.done = 0;
            }
        },

    },

});
