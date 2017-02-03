<template>

    <nav>
        <ul>
            <li v-for="o in menus">
                <a v-link="{name: o.routeName }">{{ o.name }}</a>
            </li>
        </ul>
    </nav>

</template>

<script type="text/javascript">

    module.exports = {


        data() {

            return {

                menus: [
                    {id:0, name: "Listar contas", routeName: 'bill-pay.list'},
                    {id:1, name: "Criar conta", routeName: 'bill-pay.create'}
                ],

            };

        },

    };


</script>





