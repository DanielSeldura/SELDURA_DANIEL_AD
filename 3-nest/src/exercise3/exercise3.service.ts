import { Car } from './car.model';
import { HTML } from './html.helper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class Exercise3Service {
   
  private cars: Map<string,Car> = new Map<string,Car>();

  private cars2:Array<{}> = [{
    "id":"CARL143",
    "model":"Ferrari",
    "color":"Black",
    "wheels": {
      "name": "Pirelli",
      "radius":16
    }	
  },{
    "id":"JOSH420",
    "model":"Montero",
    "color":"Red",
    "wheels": {
      "name": "Goodyear",
      "radius":18
    }	
  }
];

searchCar(){
  for(const car of this.cars2){
    if(car['id']==="JOSH420"){
      return car;
    }
  }
}
  getCar(id:string){
    return this.cars.get(id).toJson();
  }


  loopsTriangle(height: number) {
    var html: HTML = new HTML(); 
    for (var i = 1; i <= height; i++) {
      
      var string = ''; 
      var j = i;
      while (j) {
        string += '*';
        j--;
      }
      html.add(html.div([string]));
      console.log(string);
    }
    return html.renderScreenHTML();
  }

  addCar(car:any){
     var newCar: Car; 
     newCar = new Car(car?.model, car?.color, {name: car?.wheels.name, radius:car.wheels.radius});
     this.cars.set(car.id, newCar);
     this.logAllCars();
  }

  deleteCar(id:string){
    if(this.cars.has(id))
    this.cars.delete(id);
    else console.log(id+" does not exist in database!");
  }

  replaceCar(id:string, car:any){
    var newCar: Car; 
    newCar = new Car(car?.model, car?.color, {name: car?.wheels.name, radius:car.wheels.radius});
    this.cars.set(id, newCar);
    this.logAllCars();
  }

  addJoshCar2(){
    var joshuaCar: Car; 
    joshuaCar = new Car("Montero", "Blue", {name: "Goodyear", radius:18});
    this.cars.set("joshua", joshuaCar);
    this.logAllCars();
 }

  logAllCars(){
   for(const [key,car] of this.cars.entries()){
     console.log(key);
     car.log();
   }
  }



}
