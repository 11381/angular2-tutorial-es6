import { Injectable } from "@angular/core";
import { HEROES } from "./mock-heroes";

@Injectable()
export class HeroService {
    constructor(){
        console.log("Hero Service Initialize");
    }

    getHeroes(){
        return Promise.resolve(HEROES);
    }
}