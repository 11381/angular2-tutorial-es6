import { Component, OnInit, Input, Inject } from "@angular/core";
import { HeroService } from "./hero.service";
import { Router } from "@angular/router";
import { HeroDetailComponent } from "./hero-detail.component";

@Component({
    selector: "heroes",
    templateUrl: "app/heroes.component.html",
    styleUrls: ["app/heroes.component.css"],
    directives: [HeroDetailComponent]
})
export class HeroesComponent implements OnInit {
    heroService;
    hero;
    heroes;
    selectedHero;

    constructor(@Inject(HeroService) heroService, @Inject(Router) router){
        this.heroService = heroService;
        this.router = router;
        console.log("Heroes Component Constructor");
    }

    ngOnInit(){
        this.getHeroes();
    }

    addHero() {
        this.addingHero = true;
        this.selectedHero = null;
    }

    close(savedHero) {
        this.addingHero = false;
        if (savedHero) {
            this.getHeroes();
        }
    }

    deleteHero(hero, event) {
        event.stopPropagation();
        this.heroService
            .delete(hero)
            .then(res => {
                this.heroes = this.heroes.filter(h => h !== hero);
                if (this.selectedHero === hero) { this.selectedHero = null; }
            })
            .catch(error => this.error = error);
    }

    getHeroes() {
        this.heroService.getHeroes().then(heroes => {
            this.heroes = heroes;
        });
    }

    onSelect(hero){
        this.selectedHero = hero;
    }

    gotoDetail(hero) {
        let link = ['/detail', hero.id];
        this.router.navigate(link);
    }
}