import { Component, OnInit, Inject } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import "./rxjs-extensions";

import { HeroSearchService } from "./hero-search.service";

@Component({
    selector: "hero-search",
    templateUrl: "app/hero-search.component.html",
    providers: [HeroSearchService]
})
export class HeroSearchComponent implements OnInit {
    heroSearchService;
    heroes;
    searchSubject = new Subject();
    router;

    constructor(
        @Inject(HeroSearchService) heroSearchService,
        @Inject(Router) router) {

        this.router = router;
        this.heroSearchService = heroSearchService;
        console.log("Her Search Component Initialized");
    }

    search(term){
        this.searchSubject.next(term);
    }

    ngOnInit(){
        this.heroes = this.searchSubject
            .asObservable()           // cast as Observable
            .debounceTime(100)        // wait for 300ms pause in events
            .distinctUntilChanged()   // ignore if next search term is same as previous
            .switchMap(term => term   // switch to new observable each time
                // return the http search observable
                ? this.heroSearchService.search(term)
                // or the observable of empty heroes if no search term
                : Observable.from([]))
            .catch(error => {
                // Todo: real error handling
                console.log(error);
                return Observable.from([]);
            });
    }

    gotoDetail(hero) {
        let link = ['/detail', hero.id];
        this.router.navigate(link);
    }
}