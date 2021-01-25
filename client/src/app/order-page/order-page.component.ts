import { Subscription } from 'rxjs';
import { OrdersService } from './../shared/services/orders.service';
import { Order, OrderPosition } from './../shared/interfaces';
import { OrderService } from '../shared/services/order.service';
import { MaterialService, MaterialInstance } from './../shared/classes/material.service';
import { NavigationEnd, Router } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss']
})
export class OrderPageComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('modal') modalRef: ElementRef;

  isRoot: boolean;
  modal: MaterialInstance;
  loading = false;
  oSub: Subscription;

  constructor(
    private router: Router,
    private ordersService: OrdersService,
    public orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.isRoot = this.router.url === "/order" ? true : false;
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isRoot = this.router.url === "/order" ? true : false;
      }
    })
  }

  ngAfterViewInit(): void {
    this.modal = MaterialService.initModal(this.modalRef);
  }

  ngOnDestroy(): void {
    this.modal.destroy();
    if (this.oSub) {
      this.oSub.unsubscribe();
    }
  }

  removePosition(orderPosition: OrderPosition): void {
    MaterialService.toast(`${orderPosition.name} удалён из списка заказов`);
    this.orderService.remove(orderPosition);
  }

  openModal(): void {
    this.modal.open();
  }

  closeModal(): void {
    this.modal.close();
  }

  onSubmit(): void {
    this.loading = true;

    this.modal.close();

    const order: Order = {
      list: this.orderService.list.map((item) => {
        delete item._id;
        return item;
      })
    };

    this.oSub = this.ordersService.create(order).subscribe(
      (newOrder) => {
        MaterialService.toast(`Заказ №${newOrder.order} был добавлен`);
        this.orderService.clear();
      },
      (error) => { MaterialService.toast(error.error.message); },
      () => {
        this.modal.close();
        this.loading = false;
      }
    );
  }

}
