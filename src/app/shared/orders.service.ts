import { Injectable } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from 'rxjs/Observable';
import { flatMap } from 'rxjs/operators';

@Injectable({
  providedIn: "root"
})
export class OrdersService {

  orders: Observable<IOrder[]>;

  constructor(private firestore: AngularFirestore) {}

  form = new FormGroup({
    customerName: new FormControl(""),
    orderNumber: new FormControl(""),
    coffeeOrder: new FormControl(""),
    completed: new FormControl(false)
  });

  //Firestore CRUD actions example
  createCoffeeOrder(data) {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection("coffeeOrders")
        .add(data)
        .then(res => {}, err => reject(err));
    });
  }

  updateCoffeeOrder(data) {
    return this.firestore
      .collection("coffeeOrders")
      .doc(data.payload.doc.id)
      .set({ completed: true }, { merge: true });
  }

  getOrdersById(uid) {
    this.orders= this.firestore.collection('orders', ref=> ref.where('userId', '==', uid)).valueChanges();
    return this.orders;
  }

  deleteCoffeeOrder(data) {
    return this.firestore
      .collection("coffeeOrders")
      .doc(data.payload.doc.id)
      .delete();
  }
}

export interface IOrder {
  date?:string;
  userId?:string;
  recipeId?:string;
}