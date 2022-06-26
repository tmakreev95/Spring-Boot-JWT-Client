import { Component, OnInit, Inject } from '@angular/core';
import { Post } from '../../model/post/post';
import { Like } from '../../model/post/like/like';
import { PostService } from '../../services/post/post.service';
import { UserDetailsService } from '../../services/userdetails/userdetails.service';

import { Router } from '@angular/router';
import { User } from 'src/app/model/auth/user';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],  
})
export class PostListComponent implements OnInit {
  posts: Post[];
  user = new User();

  constructor(private postService: PostService, 
    private userDetailsService: UserDetailsService,    
    private router: Router) {
  }

  ngOnInit() {
    this.userDetailsService.checkUserDetails().subscribe(
      response => {
        this.user = response;
      }
    );

    this.postService.findAll().subscribe(data => {
      this.posts = data;
    });

    
  }

  addNewPost(): void {
    this.router.navigateByUrl('user/add/post');
  }  
}