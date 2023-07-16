import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})

export class FetchDataComponent {

  public people: People[] = [];
  public starshipsTemp: Starship[] = [];
  public data: any;
  private swapiUrl = "https://swapi.dev/api/";
  private _http;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this._http = http;
    this._http.get<any["results"]>(this.swapiUrl + "people").subscribe(result => {
      this.data = result;
      this.people = result["result"];
      this.getStarship();

    }, error => console.error(error));
  }

  public getStarship() {
    this.people.forEach(x => {
      x.starships = [];
      x.starshipsUrls.forEach(y => {
        this._http.get<Starship>(y).subscribe(ssresult => {
          this.starshipsTemp.push(ssresult);
          x.starships.push(ssresult);
          var something = this.people;
        }, error => console.error(error));
      })
    })
  }
}


interface People {
  birth_year: string;
  gender: string;
  name: string;
  starshipsUrls: string[];
  starships: Starship[];
}

interface Starship {

  name: string;
  model: string;
  crew: number;
  url:string;
}

