import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { youtubeSearchInjectables } from './services/youtube-search.injectables';
import { HttpClientModule } from '@angular/common/http';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { YoutubeCardComponent } from './components/youtube-card/youtube-card.component';
import { YoutubeSearchComponent } from './components/youtube-search/youtube-search.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchBoxComponent,
    YoutubeCardComponent,
    YoutubeSearchComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [youtubeSearchInjectables],
  bootstrap: [AppComponent]
})
export class AppModule { }
