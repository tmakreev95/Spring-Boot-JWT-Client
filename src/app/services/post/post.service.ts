import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

//Model
import { Post } from '../../model/post/post';
import { Category } from '../../model/post/category/category';


@Injectable({
  providedIn: 'root'
})
export class PostService {
  private postsUrl: string;
  
  private insertPostUrl = "http://localhost:8080/user/add/post";
  private updatePostUrl = "http://localhost:8080/user/update/post";
  private deletePostUrl = "http://localhost:8080/user/delete/post/";
  private categoriesUrl = "http://localhost:8080/categories"
  private likePostUrl = "http://localhost:8080/user/post/like";
  private postsLikesUrl = "http://localhost:8080/user/post/likes";

  constructor(private http: HttpClient) {
    this.postsUrl = 'http://localhost:8080/user/posts';
  }

  public findAll(): Observable<Post[]> {
    return this.http.post<Post[]>(this.postsUrl,{});
  } 

  public findAllActiveCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoriesUrl);
  }

  public insertPost(post: Post): Observable<any> {  
    return this.http.post<Post>(this.insertPostUrl, post);
  }
  //title: string, description: string, categories: []
  public findAllAdmin() {
    return this.http.get<any>(this.postsUrl);
  }

  public likePost(id) {
    return this.http.post<any>(this.likePostUrl,  { id } );
  }

  public deletePost(id) {
    return this.http.delete<any>(this.deletePostUrl + id);
  }

  public updatePost(post: Post) {
    return this.http.put<any>(this.updatePostUrl, post);
  }

  public getPostLikes(id): Observable<any> {
    return this.http.post<any>(this.postsLikesUrl, { id });
  }  
}
