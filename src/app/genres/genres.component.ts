import {Component, OnInit} from '@angular/core';
import {SongsService} from '../shared/services/songs.service';
import {take, tap} from 'rxjs/operators';


export class Result {
  public genre: string;
  public songs: string[];


  constructor(genre: string, songs: string[]) {
    this.genre = genre;
    this.songs = songs;
  }
}

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss']
})
export class GenresComponent implements OnInit {
  public genres: string[] = [];
  public myList: Result[] = [];

  constructor(private service: SongsService) {
  }

  ngOnInit(): void {
    this.service.genresArraySubject.subscribe(data => {
      this.myList = [];
      this.genres = [];
      this.genres = data;
      console.log(data);
      this.genres.forEach(item => {
        console.log(item);
        this.service.fetchSongsOfGenre(item).pipe(take(1)).subscribe(dd => {
          this.myList.push(new Result(item, [...dd]));
        });
      });
    });
    this.service.fetchAllGenres();
  }

  public fetchSongsOfGenre(genre: string): void {
    this.service.fetchSongsOfGenre(genre);
  }
}
