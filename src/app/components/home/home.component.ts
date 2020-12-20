import { SpotifyService } from './../../services/spotify.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {
    nuevasCanciones: any[] = [];
    bandera:boolean;

  constructor(private spotify:SpotifyService) { 
    this.bandera=true;
    //this.spotify.getNewRelease().subscribe( (data:any) => { console.log(data) });
    //this.spotify.getNewRelease().subscribe( (data:any) => { console.log(data.albums.items); });
    this.spotify.getNewRelease().subscribe(
      (data: any) => {
        console.log(data);
        this.nuevasCanciones = data;
        this.bandera=false;
      });
  }

  ngOnInit(): void {
  }

}
