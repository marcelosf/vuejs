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
                           <a v-link="{name: 'bill-pay.update', params: {id: o.id }}">Editar</a>
                           <a href="#" @click.prevent="$parent.removeBill(o)">Remover</a>
                           <a href="#" @click.prevent="$parent.updateBill(o)">{{ o.done | paidLabel }}</a>
                       </td>
                   </tr>
                   </tbody>
               </table>
    
    `,

    http: {

        root: 'http://192.168.10.10:8000/api'

    },

    data: function () {
        return {           
            bills: []
        }       
    },

    created: function () {
        this.$http.get('bills').then(function (response) {
            this.bills = response.data;
            console.log(response.data);
        });

    } ,


    methods: {

        removeBill: function(bill){
            var confirmed = confirm('Deseja remover a conta da lista?');
            if (confirmed){
                this.$http.delete('bills/' + bill.id).then(function (response) {
                    this.bills.$remove(bill);
                    this.$dispatch('change-status');
                });
            }
        },

        updateBill: function (bill) {
            if (bill.done == false){
                bill.done = true
            } else {
                bill.done = false;
            }
            this.$http.put('bills/' + bill, bill).then(function (response) {
                this.$dispatch('change-status');
            })
        },

        baixa: function(bill) {

        },

    },

});
