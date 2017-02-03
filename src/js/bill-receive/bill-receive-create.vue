<template>

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


</template>


<script type="text/javascript">

    import {BillReceiveResource} from '../resources';

    export default {

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

    }


</script>
