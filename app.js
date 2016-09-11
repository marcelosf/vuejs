Vue.filter('doneLabel', function(value){

    if(value == 0){
        return "Não paga";
    }else{
        return "Paga";
    }

});

Vue.filter('paidLabel', function (value) {

    if(value == 0){
        return "Dar Baixa"
    } else {
        return "Alterar para não pago";
    }

});


Vue.filter('statusClass', function(value){

    console.log(value);

    statusClass = '';


    if (value >= 0 ) statusClass = 'devendo';
    if (value == 0 ) statusClass = 'em-dia';
    if (value == 'false' ) statusClass = 'sem-contas';


    return statusClass
});

var menuComponent = Vue.extend({
    
    template: `
    
           <nav>
               <ul>
                   <li v-for="o in menus">
                       <a href="#" @click.prevent="showView(o.id)">{{ o.name }}</a>
                   </li>
               </ul>
           </nav>
    
    `,
    
    data: function () {
        
        return {
            
            menus: [
                {id:0, name: "Listar contas"},
                {id:1, name: "Criar conta"}
            ],
            
        };
        
    },
    
    methods: {
        
        showView: function(id){
                this.$parent.activedView = id;
                if(id == 1){
                    this.$parent.formType = "insert";
                    this.$parent.clearBill();
                }

        },
        
    }
    
});
Vue.component('menu-component', menuComponent);

var appComponent = Vue.extend({
    template: `
            
            <style type="text/css">
                .pago, .em-dia{
                    color: green;
                }
                .nao-pago, .devendo{
                    color: red;
                }
                .sem-contas {
                    color: darkgray;
                }
            </style> 
            
           <h1> {{ title }} </h1>
           <h3 :class="paidCount | statusClass">{{ status }}</h3>
           
           <menu-component></menu-component>
            
           <div v-if="activedView == 0">

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
                           <a href="#" @click.prevent="loadBill(o)">Editar</a>
                           <a href="#" @click.prevent="removeBill(index)">Remover</a>
                           <a href="#" @click.prevent="baixa(o)">{{ o.done | paidLabel }}</a>
                       </td>
                   </tr>
                   </tbody>
               </table>
           </div>
           <div v-if="activedView == 1">
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
           </div>
    
    `,
    data: function () {

        return {
            title: "Contas a pagar",
            

            activedView: 0,
            formType: 'insert',
            bill: {
                date_due: '',
                name: '',
                value: 0,
                done: 0
            },
            names: [
                'Conta de Luz',
                'Conta de água',
                'Conta de telefone',
                'Supermercado',
                'Cartão de crédito',
                'Empréstimo',
                'Gasolina'
            ],
            paidCount: 0,
            bills: [
                {date_due: '20/08/2016', name: 'Conta de Luz', value: 22280.00, done: 1},
                {date_due: '20/08/2016', name: 'Conta de água', value:480.00, done: 0},
                {date_due: '20/08/2016', name: 'Conta de telefone', value: 80.00, done: 1},
                {date_due: '20/08/2016', name: 'Gasolina', value: 80.00, done: 0},
                {date_due: '20/08/2016', name: 'Supermercado', value: 80.00, done: 0},
                {date_due: '20/08/2016', name: 'Empréstimo', value: 800.00, done: 0}
            ]
        }
    },
    computed: {
        status: function(){
            var count = 0;
            var message = '';
            if (this.bills.length > 0) {

                for(var i in this.bills){
                    if(!this.bills[i].done){
                        count++;
                    }
                }

                this.paidCount = count;

                if (count) {
                    message = "Existem "  + count + " contas a serem pagas.";
                } else {
                    message = "Nenhuma conta a pagar."
                }

            } else {

                this.paidCount = 'false';

                message = "Nenhuma conta cadastrada."

            }

            return message;
        }
    },
    methods: {
        
        submit: function(){
            if(this.formType == "insert"){
                this.bills.push(this.bill);
            }
            
            this.clearBill();

            this.activedView = 0;
        },

        loadBill: function(bill){
            this.bill = bill;
            this.activedView = 1;
            this.formType = "update";
        },

        removeBill: function(id){
            var index = id + 1;
            var confirmed = confirm('Deseja remover a conta ' + index  + ' da lista?');
            if (confirmed){
                this.bills.splice(id, 1);
            }
        },

        baixa: function(bill) {
            if (bill.done == 0){
                bill.done = 1

            } else {
                bill.done = 0;
            }
        },
        
        clearBill: function() {
            this.bill = {
                date_due: '',
                    name: '',
                    value: 0,
                    done: 0
            }
        }
    }
    
});

Vue.component('app-component', appComponent);

var app = new Vue({

    el: "#app"

});