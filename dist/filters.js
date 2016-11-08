"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Vue.filter('doneLabel', function (value) {

    if (value == 0) {
        return "Não paga";
    } else {
        return "Paga";
    }
});

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
        statusClass = 'devendo';
        statusMessage = 'Existem ' + value + ' contas a serem pagas';
    }
    if (value == 0) {
        statusClass = 'em-dia';
        statusMessage = 'Todas as contas estão pagas';
    }
    if (value == 'false') {
        statusClass = 'sem-contas';
        statusMessage = 'Nenhuma conta cadastrada.';
    }

    return { class: statusClass, message: statusMessage };
}

Vue.filter('numberFormat', {
    read: function read(value) {
        var number = 0;
        if (value && (typeof value === "undefined" ? "undefined" : _typeof(value)) !== undefined) {
            var numberRegex = value.toString().match(/\d+(\.{1}\d{1,2}){0,1}/g);
            number = numberRegex ? numberRegex[0] : numberRegex;
        }
        return new Intl.NumberFormat('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            style: 'currency',
            currency: 'BRL'
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
            return Intl.DateTimeFormat('pt-BR').format(value).split(' ')[0];
        }
        return value;
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