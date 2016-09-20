window.billPayCreateComponent = Vue.extend({

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

    formType: 'insert',
    
    created: function (){
        if(this.$route.name == 'bill.update'){
            this.formType = 'update';
            this.getBill(this.$route.params.index);
        }
    },
    
    
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
                this.$root.$children[0].billsPay.push(this.bill);
                console.log(this.$root.$children[0].billsPay);
            }
            this.$router.go({name: 'bill.list'});
        },
        
        getBill: function(index) {
            var bills = this.$root.$children[0].billsPay;
            this.bill = bills[index];
        }
    }

});
