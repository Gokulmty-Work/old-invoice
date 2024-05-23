import { Pipe, PipeTransform, Injectable } from '@angular/core';
import { LowerCasePipe } from '@angular/common';

@Pipe({
  name: 'filter'
})
@Injectable()
export class FilterPipe implements PipeTransform {
	
  transform(items: any[], field: string, value: string): any[] {


    if (!items) {
      return [];
    }
    if (!field || !value) {
      return items;
    }
/* 
    return items.filter(singleItem =>
      			singleItem[field].toLowerCase().includes(value.toLowerCase()));  */
  
            
      items = items.filter(item => item !=null || item != undefined);

      return items.filter(singleItem =>
      		singleItem[field] &&	singleItem[field].toLowerCase().includes(value.toLowerCase()));

      /*      {
        singleItem !== undefined;
      }).filter(singleItem =>
			singleItem[field].toLowerCase().includes(value.toLowerCase())); */
  
  }
}