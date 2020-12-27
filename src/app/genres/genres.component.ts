import { Component, OnInit } from '@angular/core';
import {SongsService} from '../shared/services/songs.service';
import {Song} from '../shared/models/song.model';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss']
})
export class GenresComponent implements OnInit {
  public songs: Song[] = [];
  public genres: string[] = [];

  constructor(private service: SongsService) { }

  ngOnInit(): void {
    this.service.genresArraySubject.subscribe(genresArray => {
      this.genres = genresArray;
    });
    this.service.fetchAllGenres();
  }

  public getSongsOfGenre(genre: string): string[] {
    return this.service.getSongsOfGenre(genre);
  }
}
