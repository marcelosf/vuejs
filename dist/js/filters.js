"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Vue.filter('doneLabel', function (value) {
    return value == 0 ? "Não Paga" : "Paga";
});

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

    if (value == 0) {
        return "Dar Baixa";
    } else {
        return "Alterar para não pago";
    }
});

Vue.filter('statusClass', function (value) {
    return getStatus(value).class;
});

Vue.filter('statusMessage', function (value) {
    return getStatus(value).message;
});

function getStatus(value) {

    var statusClass = '';
    var statusMessage = '';

    if (value >= 0) {
        statusClass = 'new';
        statusMessage = ' Conta(s) a serem pagas';
    }
    if (value == 0) {
        statusClass = 'blue';
        statusMessage = 'Contas estão pagas';
    }
    if (value == 'false') {
        statusClass = 'gray';
        statusMessage = 'Nenhuma conta cadastrada.';
    }

    return { class: statusClass, message: statusMessage };
}

Vue.filter('numberFormat', {
    read: function read(value) {
        var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'pt-BR';
        var currency = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "BRL";

        var number = 0;
        if (value && (typeof value === "undefined" ? "undefined" : _typeof(value)) !== undefined) {
            var numberRegex = value.toString().match(/\d+(\.{1}\d{1,2}){0,1}/g);
            number = numberRegex ? numberRegex[0] : numberRegex;
        }
        return new Intl.NumberFormat(locale, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            style: 'currency',
            currency: currency
        }).format(number);
    },
    write: function write(value) {
        var number = 0;
        if (value.length > 0) {
            number = value.replace(/[^\d\,]/g, '').replace(/\,/g, '.');
            number = isNaN(number) ? 0 : parseFloat(number);
        }
        return number;
    }
});

Vue.filter('dateFormat', {
    read: function read(value) {
        var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'pt-BR';

        if (value && (typeof value === "undefined" ? "undefined" : _typeof(value)) !== undefined) {
            if (!(value instanceof Date)) {
                var dateRegex = value.match(/\d{4}\-\d{2}\-\d{2}/g) || null;
                var dateString = dateRegex ? dateRegex[0] : dateRegex;
                if (dateString) {
                    value = new Date(dateString + "T03:00:00");
                } else {
                    return value;
                }
            }
            return Intl.DateTimeFormat(locale).format(value).split(' ')[0];
        }
        return value;
    },
    write: function write(value, locale) {
        if (value && (typeof value === "undefined" ? "undefined" : _typeof(value)) !== undefined) {
            var date = value.replace(/[^\d]/g, '-');
            var dateParts = date.split('-');
            switch (locale) {
                case "pt-BR":
                    console.log(locale);
                    date = dateParts[2] + '-' + dateParts[1] + '-' + dateParts[0];
                    break;
                case "en-US":
                    console.log(locale);
                    date = dateParts[2] + '-' + dateParts[0] + '-' + dateParts[1];
                    break;
            }
            console.log(date);
            return date;
        }
        return value;
    }
});