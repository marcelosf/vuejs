<template>

    <style type="text/css">

        .sem-contas {
            color: darkgray;
        }
    </style>

    <h1> {{ title }} </h1>
    <h3 :class="status | statusClass">{{ status | statusMessage }}</h3>
    <h3>{{ total | currency 'R$ ' }}</h3>

    <menu-component></menu-component>

    <router-view></router-view>


</template>


<script type="text/javascript">

    import billReceiveMenuComponent from './bill-receive-menu.vue';
    import {BillReceiveResource} from "../resources";

    export default {

        components: {
            'menu-component': billReceiveMenuComponent,
        },

        data: function () {

            return {
                title: "Contas a receber",
                status: false,
                total: 0,
            }
        },

        created: function(){
            this.updateStatus();
            this.updateTotal();
        },

        methods: {

            calculateStatus: function (bills) {

                if (!bills.length) {
                    return this.status = false;
                }

                let count = 0;

                for (let i in bills) {
                    if(!bills[i].done){
                        count ++;
                    }
                }
                this.status = count;
            },

            updateStatus: function () {
                let self = this;
                BillReceiveResource.query('bills').then(function (response) {
                    self.calculateStatus(response.data);
                })
            },

            updateTotal: function () {
                let self = this;
                BillReceiveResource.total('bills').then(function (response) {
                    self.total = response.data.total;
                })
            }

        },

        events: {
            'change-info' : function () {
                this.updateStatus();
                this.updateTotal();
            }
        }

    };

</script>