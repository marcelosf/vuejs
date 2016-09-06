var app = new Vue({

    el: "#app",

    data: {

        title: "Contas a pagar",
        menus: [
            {id:0, name: "Listar contas"},
            {id:1, name: "Criar conta"}
        ],

        activedView: 1,
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
            {date_due: '20/08/2016', name: 'Conta de luz', value: 22280.00, done: 1},
            {date_due: '20/08/2016', name: 'Conta de sabão', value:480.00, done: 0},
            {date_due: '20/08/2016', name: 'Conta de água', value: 80.00, done: 1},
            {date_due: '20/08/2016', name: 'Viagem', value: 80.00, done: 0},
            {date_due: '20/08/2016', name: 'Transporte', value: 80.00, done: 0},
            {date_due: '20/08/2016', name: 'Conta de feijão', value: 800.00, done: 0}
        ]

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
        showView: function(id){
                this.activedView = id;
                if(id == 1){
                    this.formType = "insert";
                }

        },
        submit: function(){
            if(this.formType == "insert"){
                this.bills.push(this.bill);
            }
            this.bill = {
                date_due: '',
                    name: '',
                    value: 0,
                    done: 0
            };

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
        }
    }

});

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