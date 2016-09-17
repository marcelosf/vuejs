var router = new VueRouter();

router.map({
    
    '/bills': {
        name: 'bill.list',
        component: billListComponent
    },
    
    '/bill/create': {
        name: 'bill.create',
        component: billCreateComponent
    },
    
    '*': {
        
        omponent: billListComponent
    }
    
});

router.start({
    
    components: {
        'app-component': appComponent
    }
    
}, '#app');


router.redirect({
    
    '*': '/bills'
    
});