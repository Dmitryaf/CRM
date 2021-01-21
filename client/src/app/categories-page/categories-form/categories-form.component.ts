import { Category } from './../../shared/interfaces';
import { MaterialService } from './../../shared/classes/material.service';
import { CategoriesService } from './../../shared/services/categories.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/internal/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.scss']
})
export class CategoriesFormComponent implements OnInit {

  @ViewChild('fileInput') inputRef: ElementRef;
  isNew = true;
  form: FormGroup;
  image: File;
  imagePreview: string | ArrayBuffer;
  category: Category;

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
      (category: Category) => {
        if (category) {
          this.category = category;
          this.form.patchValue({
            name: category.name
          });
          this.imagePreview = category.imgSrc;
          MaterialService.updateTextInput();
        }
        this.form.enable();
      },
      (error) => {
        MaterialService.toast(error.error.message);
      });
  }

  onSubmit(): void {
    let obs$;
    this.form.disable();

    if (this.isNew) {
      obs$ = this.categoriesService.create(this.form.value.name, this.image);
    } else {
      obs$ = this.categoriesService.update(this.category._id, this.form.value.name, this.image);
    }

    obs$.subscribe(
      (category: Category) => {
        this.category = category;
        MaterialService.toast('Изменения сохраненны');
        this.form.enable();
      },
      (error) => {
        MaterialService.toast(error.error.message);
        this.form.enable();
      }
    );
  }

  triggerClick(): void {
    this.inputRef.nativeElement.click();
  }

  onFileUpload(event: any): void {
    const file: File = event.target.files[0];
    this.image = file;

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };

    reader.readAsDataURL(file);
  }
}
