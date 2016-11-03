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
                   <input type="text" v-model="bill.value | numberFormat"/>
                   <br><br>
                   <label>Pago?</label>
                   <input type="checkbox" v-model="bill.done"/>
                   <br/><br/>
                   <input type="submit" value="Enviar" />
          </form>
    `,

    formType: 'insert',
    
    created: function (){
        if(this.$route.name == 'bill-pay.update'){
            this.formType = 'update';
            this.getBill(this.$route.params.id);
        }
    },
    
    
    data: function() {
        return {
            formType: 'insert',
            names: [
                'Conta de luz',
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
                let self = this;
                Bill.save('bills', this.bill).then(function (response) {
                    self.$router.go({name: 'bill-pay.list'});
                    self.$dispatch('change-info');
                })
            }else{
                let self = this;
                Bill.update({id: this.bill.id}, this.bill).then(function (response) {
                    self.$router.go({name: 'bill-pay.list'});
                    self.$dispatch('change-info');
                })
            }
        },
        
        getBill: function(id) {
            let self = this;
            Bill.get({id: id}).then(function (response) {
                self.bill = response.data;
            });
        }
    }

});
