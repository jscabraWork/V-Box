import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { IOrder, OrdersService } from "../shared/orders.service";

@Component({
  selector: "app-orders",
  templateUrl: "./orders.component.html",
  styleUrls: ["./orders.component.scss"]
})
export class OrdersComponent implements OnInit {
  constructor(public ordersService: OrdersService, public authService: AuthService, public router: Router) {}

  orders: IOrder[];

  ngOnInit() {
    this.logIn();
  }

  async logIn() {
    if(await this.authService.isLoggedIn) {
      this.ordersService.getOrdersById(this.authService.uid).subscribe(orders => {
        this.orders = orders; 
      })
    } else {
      this.router.navigate(['home']);
    }
  }

  coffees = [
    "Emeral Dal",
    "Broccoli Quinoa Cakes",
    "Summer Tomato Risotto with Saffron",
    "Nasi Goreng",
    "Orecchite Pasta with Broccoli Sauce",
    "Roasted Chile Rellenos",
    "Farmers Market Vegetarian Enchiladas",
    "Mushroom Wellington with Rosemary and Pecans",
    "Garam Masala"
  ];

  coffeeOrder = [];

  addCoffee = coffee => this.coffeeOrder.push(coffee);

  removeCoffee = coffee => {
    let index = this.coffeeOrder.indexOf(coffee);
    if (index > -1) this.coffeeOrder.splice(index, 1);
  };

  onSubmit() {
    this.ordersService.form.value.coffeeOrder = this.coffeeOrder;
    let data = this.ordersService.form.value;

    this.ordersService.createCoffeeOrder(data).then(res => {
      /*do something here....maybe clear the form or give a success message*/
    });
  }
}