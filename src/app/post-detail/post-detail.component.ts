import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../_services/post.service';
import { PostDetail } from '../_models/post-detail';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
})
export class PostDetailComponent implements OnInit {
  commentForm = new FormGroup({
    postId: new FormControl()
  });

  post: PostDetail;
  loading = false;
  postId;
  loggedIn = false;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loggedIn = this.authService.isAuthorized();
    this.route.paramMap.subscribe((params) => {
      this.postService.getPostDetail(params.get('id')).subscribe((data) => {
        this.postId = Number(params.get('id'));
        this.post = data;
        this.commentForm.patchValue({ postId: Number(params.get('id')) });
      });
    });
  }

  submit(): void {
    this.loading = true;
  }

}
