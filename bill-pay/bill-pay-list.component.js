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
                       <td>{{ o.date_due }}</td>
                       <td>{{ o.name }}</td>
                       <td>{{ o.value | currency 'R$ ' 2}}</td>
                       <td :class="{'pago': o.done, 'nao-pago': !o.done}">
                           {{ o.done | doneLabel }}
                       </td>
                       <td>
                           <a v-link="{name: 'bill-pay.update', params: {index: index}}">Editar</a>
                           <a href="#" @click.prevent="$parent.removeBill(o)">Remover</a>
                           <a href="#" @click.prevent="$parent.baixa(o)">{{ o.done | paidLabel }}</a>
                       </td>
                   </tr>
                   </tbody>
               </table>
    
    `,

    data: function () {
        return {           
            bills: this.$root.$children[0].billsPay
        }       
    },
    
    methods: {

        removeBill: function(bill){
            var confirmed = confirm('Deseja remover a conta da lista?');
            if (confirmed){
                this.$root.$children[0].billsPay.$remove(bill);
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
