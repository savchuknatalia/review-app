import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.scss'],
})
export class AddReviewComponent implements OnInit {
  public formAddReview!: FormGroup;
  public rating: number;
  public btnCheck: boolean = false;
  public submitted: boolean = false;

  constructor(private auth: AuthService, private fb: FormBuilder) {
    this.rating = 0;
    this.formAddReview = this.fb.group({
      userName: this.auth.userName,
      date: new Date(),
      rating: ['', Validators.required],
      text: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  submit() {
    this.submitted = true;
    if (this.formAddReview.invalid) {
      return;
    }
    this.formAddReview.reset();
  }

  btnClick() {
    this.btnCheck = !this.btnCheck;
  }
}
