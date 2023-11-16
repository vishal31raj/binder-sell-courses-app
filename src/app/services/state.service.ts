import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  cartItems = new BehaviorSubject<any[]>([]);
  wishlistItems = new BehaviorSubject<any[]>([]);

  constructor() { }
}
