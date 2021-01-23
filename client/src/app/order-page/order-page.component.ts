import { OrderService } from './../shared/services/order.service';
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

  constructor(
    private router: Router,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.isRoot = this.router.url === "/order" ? true : false;
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isRoot = this.router.url === "/order" ? true : false;
      }
    })
  }

  ngAfterViewInit() {
    this.modal = MaterialService.initModal(this.modalRef);
  }

  ngOnDestroy() {
    this.modal.destroy();
  }

  openModal() {
    this.modal.open();
  }

  closeModal() {
    this.modal.close();
  }

  onSubmit() {

  }

}
