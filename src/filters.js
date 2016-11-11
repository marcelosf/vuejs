Vue.filter('doneLabel', (value) => value == 0 ? "Não Paga" : "Paga");

// Vue.filter('doneLabel', function(value){
//
//     if(value == 0){
//         return "Não paga";
//     }else{
//         return "Paga";
//     }
//
// });

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

    if (value >= 0 ) {
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

Vue.filter('numberFormat', {
    read(value, locale = 'pt-BR', currency = "BRL"){
        let number = 0;
        if(value && typeof value !== undefined){
            let numberRegex = value.toString().match(/\d+(\.{1}\d{1,2}){0,1}/g);
            number = numberRegex ? numberRegex[0] : numberRegex;
        }
        return new Intl.NumberFormat(locale, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            style: 'currency',
            currency: currency
        }).format(number);
    },

    write(value){
        let number = 0;
        if(value.length > 0) {
            number = value.replace(/[^\d\,]/g, '')
                .replace(/\,/g, '.')
            number = isNaN(number) ? 0 : parseFloat(number);
        }
        return number;
    }
});

Vue.filter('dateFormat', {
    read(value, locale = 'pt-BR'){
        if(value && typeof value !== undefined){
            if(!(value instanceof Date)){
                let dateRegex = value.match(/\d{4}\-\d{2}\-\d{2}/g) || null;
                let dateString = dateRegex ? dateRegex[0] : dateRegex;
                if(dateString){
                    value = new Date(dateString+"T03:00:00");
                }else{
                    return value;
                }
            }
            return Intl.DateTimeFormat(locale).format(value).split(' ')[0];
        }
        return value;
    },

    write(value, locale){
        if (value && typeof value !== undefined) {
            let date = value.replace(/[^\d]/g, '-');
            let dateParts = date.split('-');
            switch(locale) {
                case "pt-BR":
                    date = dateParts[2] + '-' + dateParts[1] + '-' + dateParts[0];
                    break;
                case "en-US":
                    date = dateParts[2] + '-' + dateParts[0] + '-' + dateParts[1];
                    break;
            }
            return date;
        }
    }
});
