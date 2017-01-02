"use strict";

window.modalComponent = Vue.extend({

    template: "\n        \n        <div>Laravel com Vue</div>\n        <slot>Default</slot>\n\n    ",

    data: function data() {

        return {};
    }
});