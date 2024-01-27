import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private authService: AuthService, private router: Router) { }

  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();//burda kullanıcının oturum açıp açık olmadıgını kontrol eder
  }
  logout() {
    // Token'ı temizle
    localStorage.removeItem('accessToken');

    // Kullanıcıyı giriş sayfasına yönlendir
    this.router.navigate(['/login']);
  }
}
