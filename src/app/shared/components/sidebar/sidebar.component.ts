import { Component } from '@angular/core';
import { GifsService } from '../../../gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

//private
constructor(private GifsService: GifsService){}

get tags(): string[]{
  return this.GifsService.tagsHistory;
}
searchTag(tag: string):void{
  this.GifsService.searchTag( tag);
}

}
