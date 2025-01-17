import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../_services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  loading = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {}

  submit(): void {
    this.loading = true;
    this.authService.login(this.loginForm.value).subscribe(
      (res) => {
        this.loading = false;
        this.router.navigate(['/']);
      },
      (error: HttpErrorResponse) => {
        this.loading = false;
        console.log(error);
        if(error.status==400)
          this.errorMessage = 'Invalid Credentials';
        else
          this.errorMessage = 'Login failed. Please try again.'
        this.snackBar.open(this.errorMessage, 'Dismiss', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: 'notify-error',
        });
      }
    );
  }
}
