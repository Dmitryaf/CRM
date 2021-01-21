import { Observable } from 'rxjs';
import { Category } from './../interfaces';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  constructor(private http: HttpClient) { }

  fetch(): Observable<Category[]> {
    return this.http.get<Category[]>('/api/categories');
  }

  getById(id: string): Observable<Category> {
    return this.http.get<Category>(`/api/categories/${id}`);
  }
}
