window.billPayComponent = Vue.extend({

    components: {
        'menu-component': billPayMenuComponent,
    },

    template: `
            
            <style type="text/css">
                
                .sem-contas {
                    color: darkgray;
                }
            </style> 
            
           <h1> {{ title }} </h1>
           <h3 :class="status | statusClass">{{ status | statusMessage }}</h3>
           
           <menu-component></menu-component>
           <router-view></router-view> 
          
    
    `,

    http: {

        root: 'http://192.168.10.10:8000/api'

    },

    data: function () {

        return {
            title: "Contas a pagar",
            status: false
        }
    },

    created: function(){
        this.updateStatus();
    },

    methods: {

        calculateStatus: function (bills) {

            if (!bills.length) {
                return this.status = false;
            }

            var count = 0;

            for (var i in bills) {
                if(!bills[i].done){
                    count ++;
                    console.log('done=>'+bills[i].done+' count=>'+count);
                }
            }
            this.status = count;
        },

        updateStatus: function () {
            var resource = this.$resource('bills{/id}');
            resource.query().then(function (response) {
                this.calculateStatus(response.data);
            });

            this.$http.get('bills').then(function (response) {
                this.calculateStatus(response.data);
            })
        }

    },

    events: {
        'change-status' : function () {
            this.updateStatus();
        }
    }
    
});
