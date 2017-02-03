<template>

    <div class="section">
        <div class="container">
            <h4> {{ title }} </h4>
            <div class="row">
                <div class="col s6">
                    <div class="collection">
                        <a href="#!" class="collection-item"><span class="badge">{{ status }}</span><i class="material-icons left">account_balance</i>{{ status | statusMessage }}</a>
                    </div>
                </div>

                <div class="col s6">
                    <div class="collection">
                        <a href="#!" class="collection-item"><span class="badge">{{ total | numberFormat }}</span><i class="material-icons left">payment</i>Total</a>
                    </div>

                </div>
            </div>
        </div>
    </div>

    <div class="divider"></div>

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