import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import {map} from 'rxjs/operators'
import { Post } from '../models/post-model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  obtenerPosts ( ){
    return this.http.get('http://localhost:3000/api/posts')
                    .pipe(
                      map(resp => this.crearArregloPosts(resp))
                    );
  }

  crearArregloPosts (posts: object) {

    let arregloPosts: Post[] = []
    
    Object.keys(posts).forEach (key => {
      
      const post: Post = posts[key]
      arregloPosts.push(post)
      
    })

    return arregloPosts;

  }

 


}
