import { MaterialService } from './../../shared/classes/material.service';
import { CategoriesService } from './../../shared/services/categories.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/internal/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.scss']
})
export class CategoriesFormComponent implements OnInit {
  isNew = true;
  form: FormGroup;

  constructor(
    private categoriesService: CategoriesService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required)
    });

    this.form.disable();

    this.route.params.pipe(
      switchMap(
        (params: Params) => {
          if (params['id']) {
            this.isNew = false;
            return this.categoriesService.getById(params['id'])
          }
          return of(null);
        }
      )
    ).subscribe(
      (category) => {
        if (category) {
          this.form.patchValue({
            name: category.name
          });
          MaterialService.updateTextInput();
        }
        this.form.enable();
      },
      (error) => {
        MaterialService.toast(error.error.message)
      });
  }

  onSubmit(event): void {
    event.preventDefault();
  }
}
