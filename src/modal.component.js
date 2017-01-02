window.modalComponent = Vue.extend({

    template: `
        
        <div>Laravel com Vue</div>
        <slot>Default</slot>

    `,

    data() {

        return {

        };

    }
});