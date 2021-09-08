import { Injectable } from '@nestjs/common';

@Injectable()
export class Exercise3Service {
    helloWorld(name:string){
        return "Hello there "+name;        
    }

    loopsTriangle(height:number){
        for (var i = 1; i <= height; i++) {
            var string = '';
            var j = i;
            while (j) {
                string += '*';
                j--;
            }
            console.log(string);
        }
        return;
    }
    
    primeNumber(num:number):string{
        return "YOUR NEW STRING STRING HERE";
    }
}
