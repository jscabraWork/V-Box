import { OrdersComponent } from './../orders/orders.component';
import { Component, OnInit } from "@angular/core";
import { MatDialog } from '@angular/material/dialog';
import { OrdersService } from "../shared/orders.service";

@Component({
  selector: "app-order-list",
  templateUrl: "./order-list.component.html",
  styleUrls: ["./order-list.component.scss"]
})
export class OrderListComponent implements OnInit {
  constructor(private ordersService: OrdersService, private dialog:MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(OrdersComponent, {
      width: '600px',
      height:'680px'
      
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
  }
  ngOnInit() {
  }

  coffeeOrders;

  deleteOrder = data => this.ordersService.deleteCoffeeOrder(data);

  markCompleted = data => this.ordersService.updateCoffeeOrder(data);

  
}