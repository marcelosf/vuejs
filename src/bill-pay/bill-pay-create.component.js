const names = [
    'Conta de luz',
    'Conta de água',
    'Conta de telefone',
    'Supermercado',
    'Cartão de crédito',
    'Empréstimo',
    'Gasolina'
];

window.billPayCreateComponent = Vue.extend({

    template: `
          <form name="form" @submit.prevent="submit">
                   <label>Vencimento:</label>
                   <input type="text" v-model="bill.date_due | dateFormat 'pt-BR'">
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
    
    created(){
        if(this.$route.name == 'bill-pay.update'){
            this.formType = 'update';
            this.getBill(this.$route.params.id);
        }
    },
    
    
    data() {
        return {
            formType: 'insert',
            names: names,
            bill: new BillPay()

        };

    },

    methods: {

        submit(){
            var data = this.bill.toJSON();
            if(this.formType == "insert"){
                Bill.save({}, data).then((response) => {
                    this.$router.go({name: 'bill-pay.list'});
                    this.$dispatch('change-info');
                })
            }else{
                let self = this;
                Bill.update({id: this.bill.id}, this.bill).then((response) => {
                    this.$router.go({name: 'bill-pay.list'});
                    this.$dispatch('change-info');
                })
            }
        },
        
        getBill(id) {
            Bill.get({id: id}).then((response) => {
                this.bill = new BillPay(response.data);
            });
        }
    }

});
