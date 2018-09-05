import { TestBed, inject, ComponentFixture, async, fakeAsync, tick } from '@angular/core/testing';

import {
  HttpTestingController,
  HttpClientTestingModule
} from '@angular/common/http/testing';

import { YoutubeSearchService, YOUTUBE_API_KEY, YOUTUBE_API_URL } from './youtube-search.service';
import { YoutubeSearchComponent } from '../components/youtube-search/youtube-search.component';
import { SearchBoxComponent } from '../components/search-box/search-box.component';
import { YoutubeSearchResult } from '../models/youtube-search-result.model';

const defaultResponse = {
  items: [
    {
      id: { videoId: 'VIDEO_ID' },
      snippet: {
        title: 'TITLE',
        description: 'DESCRIPTION',
        thumbnails: {
          high: { url: 'THUMBNAIL_URL' }
        }
      }
    }
  ]
};

describe('YoutubeService', () => {
  let component: YoutubeSearchComponent;
  let fixture: ComponentFixture<YoutubeSearchComponent>;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    async(() => {
      TestBed.configureTestingModule({
        declarations: [
          YoutubeSearchComponent,
          SearchBoxComponent,
          YoutubeSearchResult
        ],
        imports: [HttpClientTestingModule],
        providers: [
          YoutubeSearchService,
          { provide: YOUTUBE_API_KEY, useValue: YOUTUBE_API_KEY },
          { provide: YOUTUBE_API_URL, useValue: YOUTUBE_API_URL }
        ]
      });
    });
  });

  beforeEach(() => {
    async(
      inject([HttpTestingController], _httpMock => {
        fixture = TestBed.createComponent(YoutubeSearchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        httpMock = _httpMock;
      })
    );
  });

  it('should be created', inject([YoutubeSearchService], (service: YoutubeSearchService) => {
    expect(service).toBeTruthy();
  }));

  describe('search', () => {
    function search(term: string, response: any, callback) {
      return inject(
        [YoutubeSearchService, HttpTestingController],
        fakeAsync((service, _httpMock) => {
          let res;

          // search
          service.search(term).subscribe(_res => {
            res = _res;
          });

          const req = _httpMock.expectOne({ method: 'GET' });
          req.flush(response);
          tick();

          callback(req.request, res);
        })
      );
    }

    it(
      'parses YouTube video id',
      search('hey', defaultResponse, (req, res) => {
        const video = res[0];
        expect(video.id).toEqual('VIDEO_ID');
      })
    );

    it(
      'parses YouTube video title',
      search('hey', defaultResponse, (req, res) => {
        const video = res[0];
        expect(video.title).toEqual('TITLE');
      })
    );

    it(
      'parses YouTube video description',
      search('hey', defaultResponse, (req, res) => {
        const video = res[0];
        expect(video.description).toEqual('DESCRIPTION');
      })
    );

    it(
      'parses YouTube video thumbnail',
      search('hey', defaultResponse, (req, res) => {
        const video = res[0];
        expect(video.description).toEqual('DESCRIPTION');
      })
    );

    it(
      'sends the query',
      search('term', defaultResponse, (req, res) => {
        expect(req.url).toContain('q=term');
      })
    );

    it(
      'sends the API key',
      search('term', defaultResponse, (req, res) => {
        expect(req.url).toContain('key=YOUTUBE_API_KEY');
      })
    );

    it(
      'uses the provided YouTube URL',
      search('term', defaultResponse, (req, res) => {
        expect(req.url).toMatch(/^YOUTUBE_API_URL\?/);
      })
    );
  });
});
