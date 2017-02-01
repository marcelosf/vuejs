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

    export default {

        data: function () {

            return {

                menus: [
                    {id:0, name: "Listar contas", routeName: 'bill-receive.list'},
                    {id:1, name: "Criar conta", routeName: 'bill-receive.create'}
                ],

            };

        },

    };

</script>

