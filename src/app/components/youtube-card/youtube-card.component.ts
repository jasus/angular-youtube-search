import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { YoutubeSearchResult } from '../../models/youtube-search-result.model';

@Component({
  selector: 'app-youtube-card',
  templateUrl: './youtube-card.component.html',
  styleUrls: ['./youtube-card.component.scss']
})
export class YoutubeCardComponent implements OnInit {
  @Input() public youtubeResult: YoutubeSearchResult;

  @HostBinding('attr.class') cssClass = 'card';

  constructor() { }

  ngOnInit() {
  }

}
