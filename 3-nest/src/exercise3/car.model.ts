export class Car {

    private model:string;
    private color:string; 
    private wheels: Wheels;

    constructor(model:string, color:string, wheels:Wheels){
        this.model = model;
        this.color = color;  
        this.wheels = wheels;   
    }

    log(){
        console.log(`${this.model}:${this.color} with wheels ${this.wheels.name}, ${this.wheels.radius}`);
    }

    toJson(){
        return {
            model:this.model,
            color:this.color,
            wheels:this.wheels
        };
    }

}


export interface Wheels {
    name: string,
    radius: number 
}