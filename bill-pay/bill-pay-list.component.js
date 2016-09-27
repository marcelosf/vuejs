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
        var resource = this.$resource('bills{/id}');
        resource.query().then(function (response) {
            this.bills = response.data;
            console.log(response.data.id);
        });

    } ,


    methods: {

        removeBill: function(bill){
            var resource = this.$resource('bills{/id}');
            var confirmed = confirm('Deseja remover a conta da lista?');
            if (confirmed){
                resource.delete({id: bill.id}).then(function (response) {
                    this.bills.$remove(bill);
                    this.$dispatch('change-status');
                });
            }
        },

        updateBill: function (bill) {
            if (!bill.done){
                bill.done = true
            } else {
                bill.done = false;
            }
            this.$http.put('bills/' + bill.id, bill).then(function (response) {
                this.$dispatch('change-status');
            })
        },

        baixa: function(bill) {

        },

    },

});
