import { OrderService } from './../../shared/services/order.service';
import { map, switchMap } from 'rxjs/internal/operators';
import { Position } from './../../shared/interfaces';
import { Observable } from 'rxjs';
import { PositionsService } from './../../shared/services/positions.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-positions',
  templateUrl: './order-positions.component.html',
  styleUrls: ['./order-positions.component.scss']
})
export class OrderPositionsComponent implements OnInit {
  positions$: Observable<Position[]>;

  constructor(
    private route: ActivatedRoute,
    private positionsService: PositionsService,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.positions$ = this.route.params.pipe(
      switchMap((params: Params) => {
        return this.positionsService.fetch(params['id']);
      }),
      map(
        (positions: Position[]) => {
          return positions.map((position) => {
            position.quantity = 1;
            return position;
          })
        }
      )
    );
  }

  addToOrder(position: Position) {
    this.orderService.add(position);
  }

}
