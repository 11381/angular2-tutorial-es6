import { Component, Inject } from "@angular/core";
import { HeroService } from "./hero.service";
import { HeroesComponent } from "./heroes.component";

@Component({
    selector: "app",
    template: `
      <h1>{{title}}</h1>
      <heroes></heroes>
    `,
    directives: [HeroesComponent],
    providers: [HeroService]
})

export class AppComponent {
    constructor(){
        console.log("AppComponent Constructor");
    }

    title = "Tour of heroes";
}