import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { userDataOutput } from '../interfaces/user-interface';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./../auth.component.scss'],
})
export class SignInComponent implements OnInit {
  public signInGroup: FormGroup;
  public submitted = false;
  public signInSubscription!: Subscription;
  public errorMessage: string | undefined;
  private unsubscribeSubject: Subject<void> = new Subject<void>();

  constructor(private router: Router, private signInService: AuthService) {}

  ngOnInit(): void {
    this.signInGroup = new FormGroup({
      username: new FormControl(),
      password: new FormControl(),
    });
  }

  submitForm() {
    this.submitted = true;
    if (this.signInGroup.invalid) {
      return;
    }
    this.signInService.signInUser({
      username: this.signInGroup.get('username')!.value,
      password: this.signInGroup.get('password')!.value,
    }).pipe(takeUntil(this.unsubscribeSubject))
    .subscribe(
      (data: userDataOutput) => {
        const token = data.token;
        if (token) {
          localStorage.setItem('token', token);
          this.router.navigateByUrl('/products');
          this.signInService.userName = this.signInGroup.get('username')!.value;
        } else {
          this.errorMessage = data.message ?? 'Somthing went wrong';
        }
      }
    );
  }
}
