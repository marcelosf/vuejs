Vue.http.options.root = 'http://192.168.10.10:8000';

window.Bill = Vue.resource('bills{/id}');