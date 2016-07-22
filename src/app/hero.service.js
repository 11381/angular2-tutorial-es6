import {Injectable, Inject} from "@angular/core";
import {Http} from "@angular/http";
import "rxjs/add/operator/toPromise";

@Injectable()
export class HeroService {
    heroesUrl = "app/heroes";

    constructor(@Inject(Http) http) {
        this.http = http;
        console.log("Hero Service Initialize");
    }

    save(hero) {
        if (hero.id) {
            return this.put(hero);
        }
        return this.post(hero);
    }

    post(hero) {
        let headers = {
            'Content-Type': 'application/json'
        };

        return this.http
            .post(this.heroesUrl, JSON.stringify(hero), {headers: headers})
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    put(hero) {
        let headers = {
            'Content-Type': 'application/json'
        };

        let url = `${this.heroesUrl}/${hero.id}`;

        return this.http
            .put(url, JSON.stringify(hero), {headers: headers})
            .toPromise()
            .then(() => hero)
            .catch(this.handleError);
    }

    delete(hero) {
        let headers = {
            'Content-Type': 'application/json'
        };

        let url = `${this.heroesUrl}/${hero.id}`;

        return this.http
            .delete(url, {headers: headers})
            .toPromise()
            .catch(this.handleError);
    }

    getHeroes() {
        return this.http.get(this.heroesUrl)
            .toPromise()
            .then(response => response.json().data)
            .catch(this.handleError);
    }

    getHero(id) {
        return this.getHeroes()
            .then(heroes => heroes.find(hero => hero.id === id));
    }

    handleError(error) {
        console.error("an error has occured", error);
        return Promise.reject(error.message || error);
    }
}