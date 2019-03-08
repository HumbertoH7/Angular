import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'search'
  })

  export class SearchPipe implements PipeTransform {
    transform(items: any[], searchText: string): any[] {
      if(!items) return [];
      if(!searchText) return items;
      var filtered:any[];
      var isFound:boolean;
      searchText = searchText.toLowerCase();
  
      filtered = items.filter( it => {
        if (it.titulo.toLowerCase().includes(searchText)){
          return it
        }
        for (let cat in it.categoria) {
          if (it.categoria[cat].toLowerCase().includes(searchText)){
            return it
          }
        }
      });
      if (filtered.length <= 0) {
        isFound = false;
      } else {
        isFound = true;
        return filtered
      }
    }
  }