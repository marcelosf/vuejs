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

            <div class="container">
                <div class="row">
                
                    <h2>Nova Conta</h2>
                
                    <form name="form" @submit.prevent="submit">
                       
                       <div class="row">
                            <div class="input-field col s6">
                                <label class="active">Vencimento:</label>
                                <input type="text" v-model="bill.date_due | dateFormat 'en-US'" placeholder="Informe a data"> 
                            </div>    
                            <div class="input-field col s6">
                                <label class="active">Valor:</label>
                                <input type="text" v-model="bill.value | numberFormat"/>
                            </div>
                       </div>
                       
                       <div class="row">
                            <div class="iput-field col s6">
                               <label>Nome:</label>
                               <select v-model="bill.name" id="name" class="browser-default">
                                   <option v-for="o in names" :value="o">
                                       {{ o }}
                                   </option>
                               </select>
                            </div>     
                            <div class="input-field col s6">
                                <input type="checkbox" v-model="bill.done" id="pago"/>
                                <label for="pago">Pago?</label>
                            </div>
                       </div>
                       <div class="row">
                            <input type="submit" value="Enviar" class="btn btn-large right" />
                       </div>
                    </form>
                </div>
            </div>
          
    `,

    formType: 'insert',
    
    created(){
        if(this.$route.name == 'bill-pay.update'){
            this.formType = 'update';
            this.getBill(this.$route.params.id);
        }
        $(document).ready(function(){

            $("#name").material_select();

        });
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
