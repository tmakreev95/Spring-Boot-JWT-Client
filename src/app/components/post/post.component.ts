import { Component, OnInit, Inject, Input } from '@angular/core';
import { Post } from '../../model/post/post';
import { Like } from '../../model/post/like/like';
import { User } from '../../model/auth/user';
import { PostService } from '../../services/post/post.service';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';

import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import {MAT_BOTTOM_SHEET_DATA} from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Router } from '@angular/router';
import { from } from 'rxjs';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})

export class PostComponent implements OnInit { 
  @Input() post: Post; 
  @Input() user: User; 

  likesTooltipPosition: string;
  postLikedByUser: boolean;

  private categoriesList: string[] = new Array();

  constructor(public updatePostDialog: MatDialog, public deletePostDialog: MatDialog, private postService: PostService,     
    private router: Router, private likesBottomSheet: MatBottomSheet) {
      this.likesTooltipPosition = "right"
  }
  
  ngOnInit() {
    this.postService.findAllActiveCategories().subscribe(
      response => {
        for(let entry of response) {
          this.categoriesList.push(entry.name);
        }
      }      
    );    
  }
  
  // userLikedPost () {
  //   var userLikesEmails = this.post.likes.map(item => item.userInfoEmail);

  //   if(userLikesEmails.includes(this.user.email)) {
  //     return true;
  //   }
  //   else {
  //     return false;
  //   }
  // }
 

  openLikeSheet(postId: number): void {
    this.likesBottomSheet.open(LikesBottomSheet, {
      data: { id: postId }});
  }

  openDeleteDialog(postId: number): void {
    const dialogRef = this.deletePostDialog.open(DeletePostDialog, {
      width: '320px',
      data: {
        postId: postId
      }
    });    
  }

  openUpdateDialog(postId: number, postTitle: string, postDescription: string, categories): void {
    const dialogRef = this.updatePostDialog.open(UpdatePostDialog, {
      width: '520px',
      data: {
        postId: postId,
        title: postTitle,
        description: postDescription,
        categories: categories,
        categoriesList: this.categoriesList
      }
    });    
  }

  likePost(postId: number) {    
    this.postService.likePost(postId).subscribe(
      response => {
        console.log(response);
      }
    );
  }  
}

/* Update Post Dialog */

@Component({
  selector: 'update-post-dialog',
  templateUrl: './update-dialog/update-dialog.html',
})
export class UpdatePostDialog implements OnInit{
  post = new Post();
  user = new User();

  title = new FormControl('', [ Validators.required ]);
  description = new FormControl('', [ Validators.required ]);
  categories = new FormControl('', [ Validators.required ]);

  private categoriesList: string[] = new Array();
  private categoriesToBeSet: string[] = new Array();


  updatePostFormGroup: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private postService: PostService,
    public dialogRef: MatDialogRef<UpdatePostDialog>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any
  ) {}

  ngOnInit() {
    this.categoriesList = this.dialogData.categoriesList;   

    //Categories filtering
    this.dialogData.categories.forEach( 
      (element) => {
        this.categoriesToBeSet.push(element.name);
    });
   // console.log(this.categoriesList);
    //Categories filtering

    this.updatePostFormGroup = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      categories: ['', Validators.required]
    });      
    

    this.title.setValue(this.dialogData.title);
    this.description.setValue(this.dialogData.description);
    this.categories.setValue(this.categoriesToBeSet);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }   

  updatePost() {
    if(this.title.valid == true && this.description.valid == true && this.categories.valid == true) {
      this.post.id = this.dialogData.postId;
      this.post.title = this.title.value;
      this.post.description = this.description.value;
      this.post.categories = this.categories.value;
  
      this.postService.updatePost(this.post).subscribe(
        response => {
          if(response.status == true) {
            this.dialogRef.close();
          }
      });      
    }   
    else {
      console.log('Fill all required inputs');
    } 
  }
}
/* Update Post Dialog */

/* Delete Post Dialog */
@Component({
  selector: 'delete-post-dialog',
  templateUrl: './delete-dialog/delete-dialog.html',
})
export class DeletePostDialog {

  constructor(
    private postService: PostService,
    public dialogRef: MatDialogRef<DeletePostDialog>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }   

  deletePostById(postId : number) {
    this.postService.deletePost(this.dialogData.postId).subscribe(
      response => {
        console.log(response);
    });
  }
}
/* Delete Post Dialog */

@Component({
  selector: 'likes-bottom-sheet',
  templateUrl: './likes/likes-bottom-sheet.html',
})
export class LikesBottomSheet implements OnInit{
  likes: Like[];

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<LikesBottomSheet>, 
    private postService: PostService, 
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {}

  ngOnInit() {
    this.postService.getPostLikes(this.data.id).subscribe(
      response => {
        this.likes = response;
    });
  }  
}
