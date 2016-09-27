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
                   <br><br>
                   <label>Pago:</label>
                   <input type="checkbox" {{ checked }} v-model="bill.done"/>
                   <br/><br/>
                   <input type="submit" value="Enviar" />
          </form>
    `,

    http: {

        root: 'http://192.168.10.10:8000/api'

    },

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
                var resource = this.$resource('bills{/id}');
                resource.save({}, this.bill).then(function (response) {
                    console.log(this.bill);
                    this.$router.go({name: 'bill-pay.list'});
                    this.$dispatch('change-status');
                })
            }else{
                var resource = this.$resource('bills{/id}');
                resource.update({id: this.bill.id}, this.bill).then(function (response) {
                    this.$router.go({name: 'bill-pay.list'});
                    this.$dispatch('change-status');
                })
            }
        },
        
        getBill: function(id) {
            var resource = this.$resource('bills{/id}');
            resource.get({id: id}).then(function (response) {
                this.bill = response.data;
            });
        }
    }

});
