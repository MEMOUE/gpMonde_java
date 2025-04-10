import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterModule} from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {MenuItem} from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { MenuModule } from 'primeng/menu';
import {AuthService} from './services/auth.service';
import {Observable} from 'rxjs';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule, ButtonModule, DropdownModule, MenuModule, TranslatePipe,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'GpMonde';
  isAuthenticated$: Observable<boolean>;
  // Dropdown items
  items: MenuItem[] = [
    { label: 'Connexion', icon: 'pi pi-sign-in', routerLink: '/login' },
    { label: 'Inscription', icon: 'pi pi-user-plus', routerLink: '/register' },
    { label: 'Profile', icon: 'pi pi-user' },
    { label: 'Deconnexion', icon: 'pi pi-sign-out' }
  ];

  constructor(private authService: AuthService, private router: Router, private translate: TranslateService) {
    this.isAuthenticated$ = this.authService.isAuthenticated$;

    translate.setDefaultLang('fr');
    translate.use('fr');
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
  }

  isAdmin(): boolean {
    return this.authService.hasRole('ROLE_ADMINGP');
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Échec de la déconnexion :', err);
      }
    });
  }

}
