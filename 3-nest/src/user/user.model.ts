export class User {
    private id: number;
    private name: string;
    private age:number;
    private email:string;
    private password: string;

    constructor(id:number,name:string,age:number,email:string,password:string){
        this.id=id;
        this.name=name;
        this.age=age;
        this.email = email;
        this.password = password;
    }

    login(email:string, password:string){
        //return true or false
    }

    toJson(){
        return {
            id: this.id,
            name:this.name,
            age: this.age,
            email: this.email
        }
    }
 
}