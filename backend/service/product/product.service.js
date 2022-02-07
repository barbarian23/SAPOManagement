
export default class Product{
    static getInstance(){
        if(!this.instance){
            this.instance = new Product();
        }
        return this.instance;
    }
}