import { MaterialService } from './../../classes/material.service';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.scss']
})
export class SiteLayoutComponent implements AfterViewInit {
  @ViewChild('floating') floatingRef: ElementRef;

  links: { url: string, name: string }[] = [
    { url: '/history', name: 'История' },
    { url: '/order', name: 'Добавить заказ' },
    { url: '/categories', name: 'Категории' }
  ]

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngAfterViewInit(): void {
    MaterialService.initFloatingButton(this.floatingRef);
  }

  logout(event: Event): void {
    event.preventDefault();
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
