import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MaterialService, MaterialInstance } from './../../../shared/classes/material.service';
import { Position } from './../../../shared/interfaces';
import { PositionsService } from './../../../shared/services/positions.service';
import { Component, Input, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-positions-form',
  templateUrl: './positions-form.component.html',
  styleUrls: ['./positions-form.component.scss']
})
export class PositionsFormComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input('categoryId') categoryId: string;
  @ViewChild('modal') modalRef: ElementRef;

  form: FormGroup;
  positions: Position[] = [];
  positionId: string = null;
  loading: boolean = false;
  modal: MaterialInstance;

  constructor(
    private positionsService: PositionsService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      cost: new FormControl(1, [Validators.required, Validators.min(1)])
    })

    this.loading = true;
    this.positionsService.fetch(this.categoryId).subscribe((positions) => {
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
    this.positionId = null;
    this.form.reset({
      name: null,
      cost: 1
    })
    this.modal.open();
    MaterialService.updateTextInput();
  }

  onSelectPosition(position: Position): void {
    this.positionId = position._id;
    this.form.patchValue({
      name: position.name,
      cost: position.cost
    })
    this.modal.open();
    MaterialService.updateTextInput();
  }

  onCancel(): void {
    this.modal.close();
  }



  onDeletePosition(event: Event, position: Position): void {
    event.stopPropagation();
    const decision = window.confirm(`Вы действительно хотите удалить позицию: ${position.name}`);

    if (decision) {
      this.positionsService.delete(position).subscribe(
        (response) => {
          const index = this.positions.findIndex(p => p._id === position._id);
          this.positions.splice(index, 1);
          MaterialService.toast(response.message);
        },
        (error) => {
          MaterialService.toast(error.error.message);
        }
      );
    }
  }

  onSubmit() {
    this.form.disable();
    const newPosition: Position = {
      name: this.form.value.name,
      cost: this.form.value.cost,
      category: this.categoryId
    }

    const completed = () => {
      this.modal.close();
      this.form.reset({
        name: '',
        cost: 1
      });
      this.form.enable();

    }

    if (this.positionId) {
      newPosition._id = this.positionId;
      this.positionsService.update(newPosition).subscribe(
        (position) => {
          const index = this.positions.findIndex(p => p._id === position._id);
          this.positions[index] = position;
          MaterialService.toast('Позиция измененна');
        },
        (error) => { MaterialService.toast(error.error.message); },
        completed
      )
    } else {
      this.positionsService.create(newPosition).subscribe(
        (position) => {
          MaterialService.toast('Позиция создана');
          this.positions.push(position);
        },
        (error) => { MaterialService.toast(error.error.message); },
        completed
      )
    }
  }

}
