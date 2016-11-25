window.billComponent = Vue.extend({
    
    template: `
        <div class="navbar-fixed">
            <nav>
                    <div class="nav-wrapper container">
                       <a href="#" class="brand-logo right">Code Contas</a>
                        
                       <a href="#" data-activates="nav-mobile" class="button-collapse">
                            <i class="material-icons">menu</i>
                       </a>
                       
                       <ul id="nav-mobile" class="side-nav">
                           <li v-for="o in menus">
                               <a v-link="{name: o.routeName }">{{ o.name }}</a>
                           </li>
                       </ul>
                       
                       <ul class="left hide-on-med-and-down">
                           <li v-for="o in menus">
                               <a v-link="{name: o.routeName }">{{ o.name }}</a>
                           </li>
                       </ul>
                       
                       
                       
                    </div>
            </nav>
        </div>
           
            <router-view></router-view>
    `,

    created(){

        $(document).ready(function() {
            $('.button-collapse').sideNav();
        });


    },

    data() {
        
        return {
            
            menus: [
                {name: "Contas a pagar", routeName: 'bill-pay.list'},
                {name: "Contas a receber", routeName: 'bill-receive.list'}
            ],
            
        };
        
    },
    
});
