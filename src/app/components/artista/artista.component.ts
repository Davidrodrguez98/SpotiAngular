import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styleUrls: ['./artista.component.css']
})
export class ArtistaComponent implements OnInit {

  artista: any = {};
  loadingArtista: boolean;
  canciones: any[] = [];

  constructor(private route: ActivatedRoute, private spotify: SpotifyService) {
    this.loadingArtista = true;
    route.params.subscribe( params => {
      this.getArtista(params.id);
      this.getCancionesArtista(params.id);
    });
  }

  ngOnInit() {
  }

  getArtista(id: string) {
    this.loadingArtista = true;
    this.spotify.getArtista(id).subscribe( artista => {
      console.log(artista);
      this.artista = artista;
      this.loadingArtista = false;
    });
  }

  getCancionesArtista(idArtista: string) {
    this.spotify.getCancionesArtista(idArtista)
      .subscribe( canciones => {
        console.log(canciones);
        this.canciones = canciones;
      });
  }
}
