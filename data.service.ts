import { Injectable } from '@angular/core';
import { Catalogo } from './catalogo/catalogo.model';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  card: Catalogo;

  constructor() { }
  
}
