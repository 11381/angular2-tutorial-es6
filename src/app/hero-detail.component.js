import { Component, Input } from "@angular/core";

@Component({
    selector: "hero-detail",
    template: `
      <div *ngIf="hero">
          <h2>{{hero.name}} details!</h2>
          <div><label>id: </label>{{hero.id}}</div>
          <div>
            <label>name: </label>
            <input [(ngModel)]="hero.name" placeholder="name">
          </div>
      </div>
    `
})
export class HeroDetailComponent {
    constructor() {
        console.log("Hero Detail Component Initialized");
    }

    @Input()
    hero;
}