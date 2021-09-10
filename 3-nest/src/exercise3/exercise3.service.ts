import { HTML } from './html.helper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class Exercise3Service {
   


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
}
