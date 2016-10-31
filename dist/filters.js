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
            number = value.toString().match(/\d+(\.{1}\d{1,2}){0,1}/g)[0] || 0;
        }
        return new Intl.NumberFormat('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            style: 'currency',
            currency: 'BRL'
        }).format(number);
    }
});