
export default class User{
    static getInstance(){
        if(!this.instance){
            this.instance = new User();
        }
        return this.instance;
    }
}