import { Component, OnInit } from '@angular/core';
//import blogData from '../blogData.json';
import { BlogPost } from '../BlogPost';
import { PostComponent } from '../post/post.component';
import { PostServiceService } from '../post-service.service';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  blogPosts: Array<BlogPost> = null;
  post: PostComponent;
  error: string = null;

  //A5
  page: number = 1;
  tag: string = null;
  category: string = null;
  querySub: any = [];

  constructor(private postservice: PostServiceService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.querySub = this.route.queryParams.subscribe(params => {
      if(params['tag']){
      this.tag = params['tag'];
      this.category = null;
      }else{
      this.tag = null;
      }
      if(params['category']){
      this.category = params['category'];
      this.tag = null;
      }else{
      this.category = null;
      }
      this.getPage(+params['page'] || 1);
     });
  }

  getPage(num): void {
    this.postservice.getPosts(num, this.tag, this.category)
    .subscribe((res: BlogPost[]) => {
      this.blogPosts = res;
    })
  }

  ngOnDestroy(): void {
    if (this.querySub) {
      this.querySub.unsubscribe();
    }
  }
}
