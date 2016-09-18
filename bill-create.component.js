window.billCreateComponent = Vue.extend({

    template: `
          <form name="form" @submit.prevent="submit">
                   <label>Vencimento:</label>
                   <input type="text" v-model="bill.date_due">
                   <br><br>
                   <label>Nome:</label>
                   <select v-model="bill.name">
                       <option v-for="o in names" :value="o">
                           {{ o }}
                       </option>
                   </select>
                   <br><br>
                   <label>Valor:</label>
                   <input type="text" v-model="bill.value"/>
                   <br/><br/>
                   <input type="submit" value="Enviar" />
          </form>
    `,

    data: function() {
        return {
            formType: 'insert',
            names: [
                'Conta de Luz',
                'Conta de água',
                'Conta de telefone',
                'Supermercado',
                'Cartão de crédito',
                'Empréstimo',
                'Gasolina'
            ],

            bill: {
                date_due: '',
                name: '',
                value: 0,
                done: 0
            },

        };

    },

    methods: {

        submit: function(){
            if(this.formType == "insert"){
                this.$root.$children[0].bills.push(this.bill);
                console.log(this.$root.$children[0].bills);
            }
            this.clearBill('clear-bill');
            this.$router.go({name: 'bill.list'});
        },

        clearBill: function() {
            this.bill = {
                date_due: '',
                name: '',
                value: 0,
                done: 0
            }
        }
    },

    events: {

        'change-bill': function (bill) {
            this.bill = bill;
        },

        'clear-bill': function () {
            this.clearBill();
        }
    }

});
