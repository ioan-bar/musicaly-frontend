import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Subscription} from 'rxjs';
import {log} from 'util';
import {Song} from '../shared/models/song.model';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
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

  constructor(private service: SongsService) {
  }

  ngOnInit(): void {
    this.service.songArraySubject.subscribe(songsArray => {
      this.songs = songsArray;
    });
    this.service.fetchAllSongs();
  }

  public removeSong(song: Song): void {
    this.service.removeSong(song);
  }

  public addSong(): void {
    this.service.addSong(this.songToBeAdded);
  }
}



