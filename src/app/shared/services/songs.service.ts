import {Injectable} from '@angular/core';
import {Song} from '../models/song.model';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SongsService {

  constructor(private http: HttpClient) {
  }
  public songArraySubject = new BehaviorSubject([]);
  public genresArraySubject = new BehaviorSubject([]);
  public songsOfGenreArraySubject = new BehaviorSubject([]);
  private rootURL = 'http://localhost:8080/';

  public songs: string[] = [];

  public fetchAllSongs(): void {
    this.http.get<Song[]>(this.rootURL + 'songs').subscribe(songsArray => {
      this.songArraySubject.next(songsArray);
    });
  }

  public addSong(songToBeAdded: Song): void {
    this.http.post(this.rootURL + 'song', songToBeAdded).subscribe(data => {
      window.location.reload();
    });
  }

  public removeSong(song: Song): void {
    this.http.delete(this.rootURL + 'song?title=' + song.title)
      .toPromise()
      .then(
        () => {
          window.location.reload();
        });
  }

  public fetchAllGenres(): void {
    this.http.get<string[]>(this.rootURL + 'genres').subscribe(data => {
      this.genresArraySubject.next(data);
    });
  }
  public fetchSongsOfGenre(genre: string): Observable<any> {
     return this.http.get<string[]>(this.rootURL + 'genres/songs?genre=' + genre);
  }

  public fetchSongsOfArtist(artist: string): Observable<Song[]> {
    return this.http.get<Song[]>(this.rootURL + 'song?singer=' + artist);
  }
}
