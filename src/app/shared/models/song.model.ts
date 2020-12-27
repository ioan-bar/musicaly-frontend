import {Singer} from './singer.model';

export class Song {
  title: string;
  year: number;
  singer: Singer;
  genre: string;


  constructor(title: string, year: number, singer: Singer, genre: string) {
    this.title = title;
    this.year = year;
    this.singer = singer;
    this.genre = genre;
  }
}
