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


Vue.filter('statusClass', function (value) {
    return getStatus(value).class
});

Vue.filter('statusMessage', function (value) {
    return getStatus(value).message;
})


function getStatus(value){

  var  statusClass = '';
  var  statusMessage = '';

    if (value > 0 ) {
        statusClass = 'devendo';
        statusMessage = 'Existem ' + value + ' contas a serem pagas';
    }
    if (value == 0 ) {
        statusClass = 'em-dia';
        statusMessage = 'Todas as contas estão pagas';
    }
    if (value == 'false' ) {
        statusClass = 'sem-contas';
        statusMessage= 'Nenhuma conta cadastrada.';
    }


    return {class: statusClass, message: statusMessage};
}
