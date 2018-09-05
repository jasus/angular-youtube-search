import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { YoutubeSearchResult } from '../models/youtube-search-result.model';

export const YOUTUBE_API_KEY = 'AIzaSyAkSKsp51PDnbJy-ca7YANrFA6OjV0uZF8';
export const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/search';

/**
 * YoutubeService connects to the YouTube API
 * See: https://developers.google.com/youtube/v3/docs/search/list
 */
@Injectable()
export class YoutubeSearchService {

  constructor(
    private http: HttpClient,
    @Inject(YOUTUBE_API_KEY) private apiKey: string,
    @Inject(YOUTUBE_API_URL) private apiUrl: string) { }


  public search(query: string): Observable<YoutubeSearchResult[]> {
    const params: string = [
      `q=${query}`,
      `key=${this.apiKey}`,
      `part=snippet`,
      `type=video`,
      `maxResults=10`
    ].join('&');

    const queryUrl = `${this.apiUrl}?${params}`;

    return this.http.get(queryUrl)
      .pipe(map(res => {
        return <any>res['items'].map(item => {
          return new YoutubeSearchResult({
            id: item.id.videoId,
            title: item.snippet.title,
            description: item.snippet.description,
            thumbnailUrl: item.snippet.thumbnails.high.url,
            publishedAt: item.snippet.publishedAt
          });
        });
      }));
  }
}
