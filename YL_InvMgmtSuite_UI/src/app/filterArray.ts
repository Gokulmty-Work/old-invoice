import { Pipe, PipeTransform, Injectable } from '@angular/core';
import { LowerCasePipe } from '@angular/common';


@Pipe({
  name: 'filterArray'
})
@Injectable()
export class FilterArrayPipe implements PipeTransform {
	
  transform(items: any[], field: string, values: string[]): any[] {


    if (!items) {
      return [];
    }
    if (!field || !values) {
      return items;
    }
/* 
    return items.filter(singleItem =>
      			singleItem[field].toLowerCase().includes(value.toLowerCase()));  */
  
            
      items = items.filter(item => item !=null || item != undefined);

   //   values = values.map(item => item.toLowerCase());
   
      
      var abc =[];

      items.forEach(val => 
        {
//          console.log(val[field]);
          if(values.indexOf(val[field],0) != -1)
          abc.push(val);
        }
        
        );
      
      return abc;
     
     
   
  }
}