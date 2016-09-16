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
