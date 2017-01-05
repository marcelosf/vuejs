class BillPay {
    constructor(data = {}){
        this.date_due = '';
        this.name = '';
        this.value = 0;
        this.done = false;
        Object.assign(this, data);
    }

    toJSON(){
        return {
            date_due: this.date_due,
            name: this.name,
            value: this.value,
            done: this.done
        }
    }
}