"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {

    template: "\n    \n           <nav>\n               <ul>\n                   <li v-for=\"o in menus\">\n                       <a v-link=\"{name: o.routeName }\">{{ o.name }}</a>\n                   </li>\n               </ul>\n           </nav>\n    \n    ",

    data: function data() {

        return {

            menus: [{ id: 0, name: "Listar contas", routeName: 'bill-receive.list' }, { id: 1, name: "Criar conta", routeName: 'bill-receive.create' }]

        };
    }

};