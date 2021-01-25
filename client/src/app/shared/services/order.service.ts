import { Position, OrderPosition } from '../interfaces';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { isNgTemplate } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  public list: OrderPosition[] = [];
  public price: number = 0;

  constructor() { }

  add(position: Position): void {
    const orderPosition: OrderPosition = Object.assign({}, {
      name: position.name,
      cost: position.cost,
      quantity: position.quantity,
      _id: position._id
    });

    const candidate = this.list.find((pos) => pos._id === position._id);

    if (candidate) {
      candidate.quantity += orderPosition.quantity;
    } else {
      this.list.push(orderPosition);
    }

    this.computePrice();
  }

  remove(orderPosition: OrderPosition): void {
    const index = this.list.findIndex((position) => position._id === orderPosition._id);
    this.list.splice(index, 1);
    this.computePrice();
  }

  clear(): void {
    this.list = [];
    this.price = 0;
  }

  private computePrice(): void {
    this.price = this.list.reduce((total, currentItem) => {
      return total += currentItem.quantity * currentItem.cost;
    }, 0);
  }
}
