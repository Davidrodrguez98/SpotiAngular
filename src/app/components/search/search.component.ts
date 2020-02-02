import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  artistas: any[] = [];
  loading: boolean;
  constructor( private spotify: SpotifyService) { }

  ngOnInit() {
  }

  buscar(busqueda: string) {
    console.log(busqueda);
    this.loading = true;
    this.spotify.getArtistas(busqueda)
    .subscribe( (data: any) => {
      this.artistas = data;
      this.loading = false;
    });
  }

}
