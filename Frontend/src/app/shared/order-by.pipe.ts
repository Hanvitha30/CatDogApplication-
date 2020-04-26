import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(array: any[], field: string): any[] {
    array.sort((a: any, b: any) => { 
		let val = 0;
		if (b.win > a.win) {
			val = 1;	
		} else if (b.win < a.win) {
			val = -1;
		}
		return val;
    });
	
    return array;
  }

}
