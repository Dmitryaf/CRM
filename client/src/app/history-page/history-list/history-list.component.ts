import { Order } from './../../shared/interfaces';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.scss']
})
export class HistoryListComponent implements OnInit {
  @Input() orders: Order[];

  constructor() { }

  ngOnInit(): void {
  }

}
