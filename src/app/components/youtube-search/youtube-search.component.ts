import { Component, OnInit } from '@angular/core';
import { YoutubeSearchResult } from '../../models/youtube-search-result.model';

@Component({
  selector: 'app-youtube-search',
  templateUrl: './youtube-search.component.html',
  styleUrls: ['./youtube-search.component.scss']
})
export class YoutubeSearchComponent implements OnInit {

  public results: YoutubeSearchResult[];

  constructor() { }

  ngOnInit() {
  }

  public updateResults(results): void {
    this.results = results;
  }

}
