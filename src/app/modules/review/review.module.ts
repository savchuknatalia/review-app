import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddReviewComponent } from './add-review/add-review.component';
import { ShowReviewsComponent } from './show-reviews/show-reviews.component';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReviewService } from './services/review.service';

@NgModule({
  declarations: [AddReviewComponent, ShowReviewsComponent],
  exports: [AddReviewComponent, ShowReviewsComponent],
  imports: [
    CommonModule,
    NgxStarRatingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [ReviewService],
})
export class ReviewModule {}
