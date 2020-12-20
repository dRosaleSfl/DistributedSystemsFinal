import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  constructor(private http:HttpClient) { 
    console.log("Spotify Service listo");
  }

  getQuery(query:string){
    const url=`https://api.spotify.com/v1/${query}`;
    const headers = new HttpHeaders({'Authorization':'Bearer BQBASXpfIeQx4rbpfPy8X_QNsQgj_k5jAvElTufgkbNQlEV-k2fV4yIypDaVUCM-V1ubv_4ou1fSqtj5lVqBfjvhpdm42VJoQjeSY1fbV1I9sWnnHn_sG3ysalvZcNeL58WzTFLQajrVmugg2CMMoFaxvo4M7Xs5XLM'});
    return this.http.get(url, { headers });
  }

  getNewRelease(){
    return this.getQuery('browse/new-releases')
     .pipe( map  (data =>  data['albums'].items ));
  }

  getArtistas(termino:string){
    return this.getQuery(`search?q=${termino}&type=artist&limit=5`)
    .pipe( map (data => data['artists'].items ));
  }

  getArtista(id:string) {
    return this.getQuery(`artists/${id}`)
  }

  getTopTracks(id:string) {
    return this.getQuery(`artists/${id}/top-tracks?country=us`)
    .pipe(map(data => data['tracks']));
  }
  apiartista(item:any){
   console.log(item);
   return this.http.post('http://localhost:3000/artista',{item});
  }
  obtnerartistas(){
    return this.http.get('http://localhost:3000/obtenerartistas');
  }
  eliminar(item:any){
    console.log(item);
   return this.http.post('http://localhost:3000/elimarartista',{item}); 
  }
  obtenerPerfil() {
    return this.http.get('http://localhost:3000/obtenerInfo');
  }
  agregarInfo(perfil:any){
    console.log(perfil);
    return this.http.post('http://localhost:3000/agregarInfo',{perfil});
   }
}