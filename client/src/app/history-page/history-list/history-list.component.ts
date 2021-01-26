import { MaterialInstance, MaterialService } from './../../shared/classes/material.service';
import { Order } from './../../shared/interfaces';
import { Component, Input, OnInit, ElementRef, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.scss']
})
export class HistoryListComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('modal') modalRef: ElementRef;
  @Input() orders: Order[];

  selectedOrder: Order;
  modal: MaterialInstance;


  constructor() { }

  ngOnInit(): void {
    this.modal.destroy();
  }

  ngOnDestroy(): void {
    this.modal.destroy();
  }

  ngAfterViewInit(): void {
    this.modal = MaterialService.initModal(this.modalRef);
  }

  computePrice(order: Order): number {
    return order.list.reduce((total, currentItem) => {
      return total += currentItem.quantity * currentItem.cost;
    }, 0);
  }

  selectOrder(order: Order): void {
    this.selectedOrder = order;
    this.modal.open();
  }

  closeModal(): void {
    this.modal.close();
  }
}
