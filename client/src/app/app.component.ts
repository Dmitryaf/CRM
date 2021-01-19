import { AuthService } from './shared/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  constructor(private auth: AuthService) {

  }

  ngOnInit(): void {
    const potentialToken: string = localStorage.getItem('auth-token');

    if (potentialToken !== null) {
      this.auth.setToken(potentialToken);
    }
  }
}
