import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Post } from '../../models/post-model';
import { PostService } from '../../services/post.service';


@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit {

  arregloPosts: Post[] = [];

  constructor(private ps: PostService) { }

  ngOnInit(): void {

    this.ps.obtenerPosts().subscribe(data => {
      if (data.length > 0) {
        this.arregloPosts = data;
        console.log(this.arregloPosts)
      }

    })
  }

}
