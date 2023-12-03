import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { AuthService, Session } from './auth.service';
import { Router } from '@angular/router';
import { RoutesConstant } from '../constants/routes.constant';
import { CustomErrorStateMatcher } from '../core/forms/error-state-matcher';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatButtonModule],
  providers: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  public form = inject(FormBuilder).group({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  public matcher = new CustomErrorStateMatcher();

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login(): void {
    const { email, password } = this.form.getRawValue();
    if (!email || !password) {
      return;
    }
    this.authService.login(email, password).subscribe((session: Session) => {
      if (session.access_token) {
        this.router.navigate([RoutesConstant.Home]);
      }
    });
  }
}
