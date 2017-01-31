import {BillReceiveResource} from '../resources';

export default {

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
                   <label>Pago?</label>
                   <input type="checkbox" v-model="bill.done"/>
                   <br/><br/>
                   <input type="submit" value="Enviar" />
          </form>
    `,

    formType: 'insert',

    created: function (){
        if(this.$route.name == 'bill-receive.update'){
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
            let self = this;
            if(this.formType == "insert"){
                BillReceiveResource.save('bills-receive', this.bill).then(function (response) {
                    self.$router.go({name: 'bill-receive.list'});
                    self.$dispatch('change-info');
                })
            }else{
                BillReceiveResource.update({id: this.bill.id}, this.bill).then(function (response) {
                    self.$router.go({name: 'bill-receive.list'});
                    self.$dispatch('change-info');
                })
            }
        },

        getBill: function(id) {
            let self = this;
            console.log(id);
            BillReceiveResource.get({id: id}).then(function (response) {
                self.bill = response.data;
                console.log(response.data);
            });
        }
    }

};
