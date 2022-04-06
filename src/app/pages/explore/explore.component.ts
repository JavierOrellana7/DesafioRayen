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
  arrayUsuarios: string [] = [];

  constructor(private ps: PostService) { }

  ngOnInit(): void {

    this.ps.obtenerPosts().subscribe(data => {
      if (data.length > 0) {
        this.arregloPosts = data;       
        
        this.arrayUsuarios = this.obtenerUsuarios(this.arregloPosts)
        

      }

    })
  }

  obtenerUsuarios(array: Post[]): string[]{
    let arrayUsuarios: string[] = [];
    array.forEach(post => {
      if (!arrayUsuarios.includes(post.usuario.username)) {
        arrayUsuarios.push(post.usuario.username)
      }
    })

    return arrayUsuarios;
  }

}
