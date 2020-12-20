import { SpotifyService } from 'src/app/services/spotify.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mimusic',
  templateUrl: './mimusic.component.html',
  styleUrls: ['./mimusic.component.css']
})
export class MimusicComponent implements OnInit {
  artistas;
  constructor( private servicio :SpotifyService) { }

  ngOnInit(): void {
    this.aartistas();
  }
aartistas(){
  // Hacer la llamada al servicio de la API para obtener todos los productos
  this.servicio.obtnerartistas().subscribe(data => {
    console.log(data);
    this.artistas=data;
  });
}
eliminar(item:any){
  console.log("hola");
  console.log(item);
  let item1:any;
 
  this.servicio.eliminar(item).subscribe(data=>{
    console.log(`Server Response: ${JSON.stringify(data)}`);
  })
}
}