import { Injectable, Inject } from "@angular/core";
import { Http, Response } from "@angular/http";

@Injectable()
export class HeroSearchService {
    http;
    constructor(@Inject(Http) http) {
        this.http = http;
        console.log("Hero Search Service Initialized");
    }

    search(term){
        return this.http
            .get(`app/heroes/?name=${term}+`)
            .map((response => response.json().data));
    }
}