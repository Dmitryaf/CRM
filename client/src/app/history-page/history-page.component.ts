import { Subscription } from 'rxjs';
import { OrdersService } from './../shared/services/orders.service';
import { MaterialInstance, MaterialService } from './../shared/classes/material.service';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { Order } from '../shared/interfaces';

const STEP = 2;
@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('tooltip') tooltipRef: ElementRef;

  orders: Order[] = [];
  oSub: Subscription;
  tooltip: MaterialInstance;
  isFilterVisible = false;

  offset = 0;
  limit: number = STEP;

  loading = false;
  reloading = false;
  noMoreOrders = false;

  constructor(
    private ordersService: OrdersService
  ) { }

  ngOnInit(): void {
    this.reloading = true;
    this.fetch();
  }

  ngOnDestroy(): void {
    this.tooltip.destroy();
    this.oSub.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.tooltip = MaterialService.initTooltip(this.tooltipRef);
  }

  loadMore(): void {
    this.offset += STEP;
    this.loading = true;
    this.fetch();
  }

  private fetch(): void {
    const params = {
      offset: this.offset,
      limit: this.limit
    };
    this.oSub = this.ordersService.fetch(params).subscribe((orders) => {
      this.orders = this.orders.concat(orders);
      this.noMoreOrders = orders.length < STEP;
      this.loading = false;
      this.reloading = false;
    });
  }

}
