import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./../auth.component.scss'],
  providers: [AuthService],
})
export class SignUpComponent implements OnInit {
  public signUpGroup: FormGroup;
  public submitted: boolean = false;
  public signUpSubscription!: Subscription;
  public errorMessage: string | undefined;
  private unsubscribeSubject: Subject<void> = new Subject<void>();

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private AuthService: AuthService
  ) {}

  ngOnInit(): void {
    this.signUpGroup = this.fb.group(
      {
        username: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        rules: [false, Validators.requiredTrue],
      },
      {
        validators: this.mustMatch('password', 'confirmPassword'),
      }
    );
  }

  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  submitForm() {
    this.submitted = true;
    if (this.signUpGroup.invalid) {
      return;
    }
    this.signUpSubscription = this.AuthService.signUpUser({
      username: this.signUpGroup.get('username')!.value,
      password: this.signUpGroup.get('password')!.value,
    }).pipe(takeUntil(this.unsubscribeSubject))
    .subscribe((e) => {
      if (e.success) {
        this.signUpGroup.reset();
        this.router.navigate(['/']);
      } else {
        this.errorMessage = e.message ?? 'Somthing went wrong';
      }
    });
  }

  ngOnDestroy(): void {
    this.signUpSubscription?.unsubscribe();
  }
}
