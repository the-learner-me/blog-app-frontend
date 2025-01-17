import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../_services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
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
    this.authService.register(this.registerForm.value).subscribe(
      (res) => {
        this.loading = false;
        this.snackBar.open(res.message, 'Dismiss', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: 'notify-success',
        });
        this.router.navigate(['/login']);
      },
      (error: HttpErrorResponse) => {
        this.loading = false;
        console.log(error);
        if(error.status==400)
          this.errorMessage = 'Invalid input';
        else
          this.errorMessage = 'Registration failed. Please try again.'
        this.snackBar.open(error.error.message, 'Dismiss', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: 'notify-error',
        });
      }
    );
  }
}
