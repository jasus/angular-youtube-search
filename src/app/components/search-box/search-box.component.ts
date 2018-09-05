import { Component, OnInit, Output, EventEmitter, ElementRef, OnDestroy } from '@angular/core';
import { YoutubeSearchResult } from '../../models/youtube-search-result.model';
import { YoutubeSearchService } from '../../services/youtube-search.service';
import { fromEvent, Subject, Observable } from 'rxjs';
import { map, filter, debounceTime, switchAll, tap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  @Output() loading: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() results: EventEmitter<YoutubeSearchResult[]> = new EventEmitter<YoutubeSearchResult[]>();

  private destroy: Subject<void> = new Subject();
  public isLoading: boolean;

  constructor(private youtubeSearchService: YoutubeSearchService,
    private el: ElementRef) {
      this.isLoading = false;
    }

  ngOnInit() {
      fromEvent(this.el.nativeElement, 'keyup')
      .pipe(
        map((e: any) => e.target.value),
        tap((text: string) => text === '' ? this.results.emit(null) : ''),
        filter((text: string) => text.length > 1 && text !== ''),
        debounceTime(300),
        tap (() => {
          this.loading.emit(true);
          this.isLoading = true;
        }),
        map((query: string) => this.youtubeSearchService.search(query)),
        switchAll(),
        takeUntil(this.destroy)
      )
      .subscribe((results: YoutubeSearchResult[]) => {
        this.loading.emit(false);
        this.isLoading = false;
        this.results.emit(results);
      }, (err: any) => {
        console.log(err);
        this.loading.emit(false);
        this.isLoading = false;
      }, () => {
        this.loading.emit(false);
        this.isLoading = false;
      }
    );
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

}
