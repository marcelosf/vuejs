/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	var parentJsonpFunction = window["webpackJsonp"];
/******/ 	window["webpackJsonp"] = function webpackJsonpCallback(chunkIds, moreModules) {
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, callbacks = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId])
/******/ 				callbacks.push.apply(callbacks, installedChunks[chunkId]);
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			modules[moduleId] = moreModules[moduleId];
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules);
/******/ 		while(callbacks.length)
/******/ 			callbacks.shift().call(null, __webpack_require__);

/******/ 	};

/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// object to store loaded and loading chunks
/******/ 	// "0" means "already loaded"
/******/ 	// Array means "loading", array contains callbacks
/******/ 	var installedChunks = {
/******/ 		0:0
/******/ 	};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}

/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId, callback) {
/******/ 		// "0" is the signal for "already loaded"
/******/ 		if(installedChunks[chunkId] === 0)
/******/ 			return callback.call(null, __webpack_require__);

/******/ 		// an array means "currently loading".
/******/ 		if(installedChunks[chunkId] !== undefined) {
/******/ 			installedChunks[chunkId].push(callback);
/******/ 		} else {
/******/ 			// start chunk loading
/******/ 			installedChunks[chunkId] = [callback];
/******/ 			var head = document.getElementsByTagName('head')[0];
/******/ 			var script = document.createElement('script');
/******/ 			script.type = 'text/javascript';
/******/ 			script.charset = 'utf-8';
/******/ 			script.async = true;

/******/ 			script.src = __webpack_require__.p + "" + chunkId + ".app.bundle.js";
/******/ 			head.appendChild(script);
/******/ 		}
/******/ 	};

/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(1);
	__webpack_require__(2);
	__webpack_require__(3);

	__webpack_require__.e/* require */(1, function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(4), __webpack_require__(5), __webpack_require__(7), __webpack_require__(8), __webpack_require__(9), __webpack_require__(11), __webpack_require__(12)]; (function (billPayComponent, billPayListComponent, billPayCreateComponent, billComponent, billReceiveComponent, billReceiveListComponent, billReceiveCreateComponent) {

	    var router = new VueRouter();

	    var mainComponent = Vue.extend({

	        components: {
	            'bill-component': billComponent
	        },

	        template: '<bill-component></bill-component>',

	        data: function data() {

	            return {

	                billsReceive: [{ date_due: '20/08/2016', name: 'Conta de Luz', value: 22280.00, done: 1 }, { date_due: '21/08/2016', name: 'Conta de água', value: 480.00, done: 0 }, { date_due: '22/08/2016', name: 'Conta de telefone', value: 80.00, done: 1 }, { date_due: '23/08/2016', name: 'Gasolina', value: 80.00, done: 0 }, { date_due: '24/08/2016', name: 'Supermercado', value: 80.00, done: 0 }, { date_due: '25/08/2016', name: 'Empréstimo', value: 800.00, done: 0 }]

	            };
	        }

	    });

	    Vue.component('main-component', mainComponent);

	    router.map({
	        '/bill-pays': {
	            component: billPayComponent,
	            subRoutes: {
	                '/': {
	                    name: 'bill-pay.list',
	                    component: billPayListComponent
	                },

	                '/create': {
	                    name: 'bill-pay.create',
	                    component: billPayCreateComponent
	                },
	                '/:id/update': {
	                    name: 'bill-pay.update',
	                    component: billPayCreateComponent
	                }
	            }
	        },
	        '/bill-receives': {
	            component: billReceiveComponent,
	            subRoutes: {
	                '/': {
	                    name: 'bill-receive.list',
	                    component: billReceiveListComponent
	                },

	                '/create': {
	                    name: 'bill-receive.create',
	                    component: billReceiveCreateComponent
	                },

	                '/:id/update': {
	                    name: 'bill-receive.update',
	                    component: billReceiveCreateComponent
	                }
	            }
	        },
	        '*': {
	            component: billPayListComponent
	        }

	    });

	    router.start({

	        components: {
	            'bill-pay-component': billPayComponent
	        }

	    }, '#app');

	    router.redirect({

	        '*': '/bills-pays'

	    });
	}.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));});

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var BillPay = function () {
	    function BillPay() {
	        var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	        _classCallCheck(this, BillPay);

	        this.date_due = '';
	        this.name = '';
	        this.value = 0;
	        this.done = false;
	        Object.assign(this, data);
	    }

	    _createClass(BillPay, [{
	        key: 'toJSON',
	        value: function toJSON() {
	            return {
	                date_due: this.date_due,
	                name: this.name,
	                value: this.value,
	                done: this.done
	            };
	        }
	    }]);

	    return BillPay;
	}();

	module.exports = BillPay;

/***/ },
/* 2 */
/***/ function(module, exports) {

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

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Vue.http.options.root = 'http://192.168.10.10:8000/api';

	window.Bill = Vue.resource('bills{/id}', {}, {
	    total: { method: 'GET', url: 'bills/total' }
	});

	window.BillReceive = Vue.resource('bills-receive{/id}', {}, {
	    total: { method: 'GET', url: 'bills-receive/total' }
	});

/***/ }
/******/ ]);