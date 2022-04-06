import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { PostService } from './services/post.service';
import { Post } from './models/post-model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'DesafioRayen';

  arregloPosts: Post[] = [];

  constructor(private ps: PostService) {  }

  ngOnInit(): void {

    this.ps.obtenerPosts().subscribe(data => {
      if (data.length > 0) {
        this.arregloPosts = data;
        console.log(this.arregloPosts)
      }

    })
    
  }

}
