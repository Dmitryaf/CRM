import { Observable } from 'rxjs';
import { Category, Message } from './../interfaces';
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

  create(name: string, img?: File): Observable<Category> {
    const formData: FormData = new FormData();

    if (img) {
      formData.append('image', img, img.name);
    }
    formData.append('name', name);

    return this.http.post<Category>('/api/categories/', formData);
  }

  update(id: string, name: string, img?: File): Observable<Category> {
    const formData: FormData = new FormData();

    if (img) {
      formData.append('image', img, img.name);
    }
    formData.append('name', name);

    return this.http.patch<Category>(`/api/categories/${id}`, formData);
  }

  delete(id: string): Observable<Message> {
    return this.http.delete<Message>(`/api/categories/${id}`);
  }
}
