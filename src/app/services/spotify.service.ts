import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor( private http: HttpClient) {
    console.log('Spotify service listo');
  }

  getQuery( query: string) {
    const url = `https://api.spotify.com/v1/${query}`;

    const headers = new HttpHeaders({
      Authorization : 'Bearer BQCoS9OxW3OYZe6s8p2ir9iAOF7QRZHWjvtnFtr8I-Ns3krGOsYadILSqjQI3crf27adx0yrOthYCAkIsXo'
    });

    return this.http.get(url, {headers});
  }

  getNewReleases() {

    // const headers = new HttpHeaders({
    //   Authorization : 'Bearer BQBWGtI6Xm3mOhrd_Dn3bMg-ODlyIWcKPuPeg2yNHtBN-7hB_pGQ5tMLmSQ_BMCAkwieq1ORqP5zO72VjHU'
    // });
    // return this.http.get('https://api.spotify.com/v1/browse/new-releases', { headers } )
    // .pipe( map( (data: any) => {
    //   return data.albums.items;
    // }));

    return this.getQuery('browse/new-releases?limit=20')
      .pipe(map( (data: any) => {
        return data.albums.items;
      }));
  }

  getArtistas(busqueda: string) {
    // const headers = new HttpHeaders({
    //   Authorization : 'Bearer BQBWGtI6Xm3mOhrd_Dn3bMg-ODlyIWcKPuPeg2yNHtBN-7hB_pGQ5tMLmSQ_BMCAkwieq1ORqP5zO72VjHU'
    // });
    // return this.http.get(`https://api.spotify.com/v1/search?q=${busqueda}&type=artist&limit=15`, { headers } )
    // .pipe(map( (data: any) => {
    //   return data.artists.items;
    // }));

    return this.getQuery(`search?q=${busqueda}&type=artist&limit=15`)
      .pipe(map( (data: any) => {
        return data.artists.items;
      }));
  }

  getArtista(idArtista: string) {

    return this.getQuery(`artists/${idArtista}`);
      // .pipe(map( (data: any) => {
      //   return data.artists.items;
      // }));
  }

  getCancionesArtista(idArtista: string) {
    return this.getQuery(`artists/${idArtista}/top-tracks?country=es`)
      .pipe(map( (data: any) => data.tracks));
  }
}
