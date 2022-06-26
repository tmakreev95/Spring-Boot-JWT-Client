import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';

import { Category } from '../../../model/post/category/category';
import { Post } from '../../../model/post/post'; 
import { PostService } from '../../../services/post/post.service';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-add-post',
  templateUrl: './post-add.component.html',
  styleUrls: ['./post-add.component.css']
})
export class PostAddComponent implements OnInit {
  post:Post = new Post();
  // isLinear = false;
  
  title = new FormControl('', [ Validators.required ]);
  description = new FormControl('', [ Validators.required ]);
  categories = new FormControl('', [ Validators.required ]);
  featuredImage = new FormControl('', [ Validators.required ]);
  featuredImageSize: string;


  fileContent: any;
  imageMimeType: string;
  imageName: string;
  imageSrc: string;

  wrongFormat: boolean;

  private categoriesList: string[] = new Array();
  
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;

  formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}


  constructor(private formBuilder: FormBuilder, private postService: PostService) {}

  ngOnInit() {
    this.firstFormGroup = this.formBuilder.group({
      title: ['', Validators.required]
    });
    this.secondFormGroup = this.formBuilder.group({
      description: ['', Validators.required]
    });
    this.thirdFormGroup = this.formBuilder.group({
      categories: ['', Validators.required]
    });
    this.fourthFormGroup = this.formBuilder.group({
      featuredImage: ['', Validators.required]
    });

    this.postService.findAllActiveCategories().subscribe(
      response => {
        for(let entry of response) {
          this.categoriesList.push(entry.name);
        }
      }
    );
  }
  
  handleUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if(file.type == "image/jpg" || file.type == "image/jpeg" || 
          file.type == "image/png" || file.type == "image/gif") {
        this.wrongFormat = false;
        this.fileContent = reader.result.toString();
        this.imageMimeType = file.type;
        this.imageName = file.name;
        this.imageSrc = reader.result as string; 
        this.featuredImageSize = this.formatBytes(file.size, 2); 
      }     
      else {
        this.wrongFormat = true;
        this.fileContent = undefined;
        this.imageMimeType = undefined;
        this.imageName = undefined;
        this.imageSrc = undefined; 
        this.featuredImageSize = undefined; 
        this.featuredImage.value == undefined;
        this.featuredImage.reset();
      }
    };
  }

  insertPost() {
    if(this.title.valid && this.description.valid 
    && this.categories.valid && this.featuredImage.valid) {
      this.post.title = this.title.value;
      this.post.description = this.description.value;
      this.post.categories = this.categories.value; 
      
      this.post.featuredImageContents = this.fileContent.substring(22);
      this.post.featuredImageMimeType = this.imageMimeType;
      this.post.featuredImageName = this.imageName;  
  
      this.postService.insertPost(this.post).pipe(first()).subscribe(
        response => {
          if(response) {          
            console.log(response);                   
          }        
        },
        error => {
          console.log(error);
        }
      );

    }
    else {
      console.log("Fill all form inputs!");
    }
  }
}
