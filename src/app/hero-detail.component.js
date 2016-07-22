import { Component, Inject, OnInit, OnDestroy, EventEmitter, Input, Output } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { HeroService } from './hero.service';

@Component({
    selector: "hero-detail",
    templateUrl: "app/hero-detail.component.html",
    styleUrls: ["app/hero-detail.component.css"]
})
export class HeroDetailComponent implements OnInit, OnDestroy {
    @Input() hero;
    @Output() close = new EventEmitter();
    route;
    error;
    sub;
    heroService;
    hero;
    navigated = false;

    constructor(
        @Inject(HeroService) heroService,
        @Inject(ActivatedRoute) route) {

        this.route = route;
        this.heroService = heroService;
        console.log("Hero Detail Component Initialized");
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            if (params['id'] !== undefined) {
                let id = +params['id'];
                this.navigated = true;
                this.heroService.getHero(id)
                    .then(hero => this.hero = hero);
            } else {
                this.navigated = false;
                this.hero = {};
            }
        });
    }

    save() {
        this.heroService
            .save(this.hero)
            .then(hero => {
                this.hero = hero; // saved hero, w/ id if new
                this.goBack(hero);
            })
            .catch(error => this.error = error); // TODO: Display error message
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    goBack(savedHero) {
        this.close.emit(savedHero);
        if(this.navigated) {
            window.history.back();
        }
    }
}