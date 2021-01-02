import {Component, OnInit} from '@angular/core';
import {Song} from '../shared/models/song.model';
import {Singer} from '../shared/models/singer.model';
import {SongsService} from '../shared/services/songs.service';


@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  public songs: Song[] = [];
  public songToBeAdded: Song = new Song('', 0, new Singer('', 0), '');
  public singers: string[] = [];

  constructor(private service: SongsService) {
  }

  ngOnInit(): void {
    this.service.songArraySubject.subscribe(songsArray => {
      this.songs = songsArray;
    });
    this.service.singersArraySubject.subscribe(singersArray => {
      this.singers = singersArray;
    });
    this.service.fetchAllSongs();
    this.service.fetchAllArtists();
  }

  public removeSong(song: Song): void {
    this.service.removeSong(song);
  }

  public addSong(): void {
    this.service.addSong(this.songToBeAdded);
  }

  public fetchRequiredSongs(artist: string): void {
    if (artist.toLowerCase() === 'all') {
      this.service.fetchAllArtists();
    } else {
      this.service.fetchSongsOfArtist(artist).subscribe(data => {
        this.songs = data;
      });
    }
  }
}



