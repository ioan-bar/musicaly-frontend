import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CatalogComponent} from './catalog/catalog.component';
import {ArtistsComponent} from './artists/artists.component';
import {GenresComponent} from './genres/genres.component';

const routes: Routes = [
  {path: '', component: CatalogComponent},
  {path: 'artists', component: ArtistsComponent},
  {path: 'genres', component: GenresComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
