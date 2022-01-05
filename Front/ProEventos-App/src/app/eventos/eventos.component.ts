import { HttpClient} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {
  public showImg: boolean = true;
  public events: any = [];
  public filterEvents: any = [];

  private _filterString: string = '';

  constructor(private http: HttpClient) { }

  public get filterString(): string {
    return this._filterString;
  }
  public set filterString(value: string){
    this._filterString = value;
    this.filterEvents = this.filterString ? this.filterList(this.filterString) : this.events;
  }
  teste(test: string): void{
    console.log('Tema: ' + test);
  }

  filterList(filter: string): any{
    filter = filter.toLocaleLowerCase();
    return this.events.filter(
      (evento: {tema: string, local: string}) => evento.tema.toLocaleLowerCase().indexOf(filter) !== -1 ||
      evento.local.toLocaleLowerCase().indexOf(filter) !== -1
    );
  }

  ngOnInit(): void {
    this.getEventos();
  }
  changeShowImg() : void {
    this.showImg = !this.showImg;
  }
  public getEventos(): void {
      this.http.get("https://localhost:5001/api/Eventos").subscribe(
        response =>{
          this.events = response,
          this.filterEvents = this.events;
        },
        err => console.log(err)
      );
  }

}
