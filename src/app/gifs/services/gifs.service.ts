import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';



@Injectable({providedIn: 'root'})
export class GifsService {

  public giflist: Gif[] = [];


private _tagsHistory: string[] = [];
private apikey: string = 'dNGRTv1cQt8j8l2AAljOZNK5aX8lcNI4'
private serviceUrl:string ='https://api.giphy.com/v1/gifs';

constructor(private http: HttpClient) {
  this.loadLocalStorage();
  console.log('gifs service ready');
 }



  get tagsHistory(){
    return [...this._tagsHistory];
  }

  private organizeHistory(tag: string){
    tag = tag.toLocaleLowerCase();

    if(this._tagsHistory.includes(tag)){
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag)

    }
    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0,10);
    this.saveLocalStorage();



  }

  private saveLocalStorage():void{
    localStorage.setItem('history',JSON.stringify ( this._tagsHistory));
  }

  private loadLocalStorage():void{
    if( localStorage.getItem('history')) return;

    this._tagsHistory=JSON.parse(localStorage.getItem('history')!);

    if(this._tagsHistory.length ===0) return;
    this.searchTag( this._tagsHistory[0]);


  }



  searchTag( tag: string):void {
    if (tag.length== 0) return;
    this.organizeHistory(tag);

    const params = new HttpParams()
    .set('api_key',this.apikey)
    .set('limit','10' )
    .set('q',tag )



    this.http.get <SearchResponse>  (`${this.serviceUrl}/search`, {params})
    .subscribe(resp =>{



    this.giflist = resp.data;
    //console.log({gifs: this.giflist});
 });




  }

}
