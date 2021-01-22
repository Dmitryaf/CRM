import { MaterialService, MaterialInstance } from './../../../shared/classes/material.service';
import { Position } from './../../../shared/interfaces';
import { PositionService } from './../../../shared/services/positions.service';
import { Component, Input, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-positions-form',
  templateUrl: './positions-form.component.html',
  styleUrls: ['./positions-form.component.scss']
})
export class PositionsFormComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input('categoryId') categoryId: string;
  @ViewChild('modal') modalRef: ElementRef;

  positions: Position[] = [];
  loading: boolean = false;
  modal: MaterialInstance;

  constructor(
    private positionService: PositionService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.positionService.fetch(this.categoryId).subscribe((positions) => {
      this.positions = positions;
      this.loading = false;
    });
  }

  ngAfterViewInit(): void {
    this.modal = MaterialService.initModal(this.modalRef);
  }

  ngOnDestroy(): void {
    this.modal.destroy();
  }

  onAddPosition(): void {
    this.modal.open();
  }

  onCancel(): void {
    this.modal.close();
  }

  onSelectPosition(position: Position) {
    this.modal.open();
  }

}
