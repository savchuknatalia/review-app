import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Subject, switchMap, takeUntil } from 'rxjs';
import { ReviewDataOutput } from 'src/app/modules/review/interfaces/review-interface';
import { ReviewService } from '../services/review.service';

@Component({
  selector: 'app-show-reviews',
  templateUrl: './show-reviews.component.html',
  styleUrls: ['./show-reviews.component.scss'],
})
export class ShowReviewsComponent implements OnInit {
  public product_id: number;
  public reviews: ReviewDataOutput[];
  private unsubscribeSubject: Subject<void> = new Subject<void>();

  constructor(
    private reviewService: ReviewService,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadReviews();
  }

  private loadReviews(): void {
    this.router.params
      .pipe(
        switchMap((res) => {
          return this.reviewService.getReviews(res['id']);
        }),
        map((response: ReviewDataOutput[]) => {
          return response.sort(
            (dataA: ReviewDataOutput, dataB: ReviewDataOutput) => {
              return (
                +new Date(dataB['created_at']) - +new Date(dataA['created_at'])
              );
            }
          );
        }),
        takeUntil(this.unsubscribeSubject)
      )
      .subscribe((data) => {
        this.reviews = data;
      });
  }
}
