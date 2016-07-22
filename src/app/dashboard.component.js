import { Component, OnInit, Inject } from '@angular/core';
import { Router } from "@angular/router";
import { HeroService } from './hero.service';

@Component({
    selector: 'my-dashboard',
    templateUrl: 'app/dashboard.component.html',
    styleUrls: ["app/dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
    heroService;
    heroes;

    constructor(
        @Inject(HeroService) heroService,
        @Inject(Router) router) {

        this.router = router;
        this.heroService = heroService;
    }

    ngOnInit() {
        this.heroService.getHeroes().then(heroes => {
            this.heroes = heroes.slice(1, 5);
        });
    }

    gotoDetail(hero) {
        let link = ['/detail', hero.id];
        this.router.navigate(link);
    }
}