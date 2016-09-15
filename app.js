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
                this.$dispatch('change-activedview', id);
                if(id == 1){
                    this.$dispatch('change-formtype', 'insert');
                    this.$dispatch('clear-bill');
                }

        },
        
    }
    
});

var billCreateComponent = Vue.extend({

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
                this.$dispatch('new-bill', this.bill);
            }
            this.$dispatch('clear-bill');
            this.$dispatch('change-activedview', 0);
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
        'change-formtype': function (formType) {
            this.formType = formType;
        },

        'change-bill': function (bill) {
            this.bill = bill;
        },

        'clear-bill': function () {
            this.clearBill();
        }
    }

});

var billListComponent = Vue.extend({

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
                           <a href="#" @click.prevent="$parent.loadBill(o)">Editar</a>
                           <a href="#" @click.prevent="$parent.removeBill(index)">Remover</a>
                           <a href="#" @click.prevent="$parent.baixa(o)">{{ o.done | paidLabel }}</a>
                       </td>
                   </tr>
                   </tbody>
               </table>
    
    `,


    data: function() {

        return {

            bills: [
                {date_due: '20/08/2016', name: 'Conta de Luz', value: 22280.00, done: 1},
                {date_due: '20/08/2016', name: 'Conta de água', value:480.00, done: 0},
                {date_due: '20/08/2016', name: 'Conta de telefone', value: 80.00, done: 1},
                {date_due: '20/08/2016', name: 'Gasolina', value: 80.00, done: 0},
                {date_due: '20/08/2016', name: 'Supermercado', value: 80.00, done: 0},
                {date_due: '20/08/2016', name: 'Empréstimo', value: 800.00, done: 0}
            ]

        };

    },

    methods: {

        loadBill: function(bill){
            this.$dispatch('change-bill', bill);
            this.$dispatch('change-activedview', 1);
            this.$dispatch('change-formtype', 'update');
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

    },

    events: {
        'new-bill': function(bill){
            this.bills.push(bill);
        }
    }

});

var appComponent = Vue.extend({

    components: {

        'menu-component': menuComponent,
        'bill-list-component': billListComponent,
        'bill-create-component': billCreateComponent

    },

    template: `
            
            <style type="text/css">
                
                .sem-contas {
                    color: darkgray;
                }
            </style> 
            
           <h1> {{ title }} </h1>
           <h3 :class="paidCount | statusClass">{{ status }}</h3>
           
           <menu-component></menu-component>
            
           <div v-show="activedView == 0">

                <bill-list-component v-ref:bill-list-component></bill-list-component>
               
           </div>
           <div v-show="activedView == 1">
               <bill-create-component :bill.sync="bill"></bill-create-component>
           </div>
    
    `,
    data: function () {

        return {
            title: "Contas a pagar",
            activedView: 0,
            paidCount: 0,
        }
    },
    computed: {
        status: function(){
            var count = 0;
            var message = '';
            var billListComponent = this.$refs.billListComponent;
            if (billListComponent.bills.length > 0) {

                for(var i in billListComponent.bills){
                    if(!billListComponent.bills[i].done){
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
    methods: {},

    events: {
        'change-activedview': function (activedView) {
            this.activedView = activedView;
        },

        'change-formtype': function (formType) {
            this.$broadcast('change-formtype', formType);
        },

        'new-bill' : function(bill){
            this.$broadcast('new-bill', bill);
        },

        'change-bill': function (bill) {
            this.$broadcast('change-bill', bill);
        },

        'clear-bill': function () {
            this.$broadcast('clear-bill');
        }
    }
    
});

Vue.component('app-component', appComponent);

var app = new Vue({

    el: "#app"

});