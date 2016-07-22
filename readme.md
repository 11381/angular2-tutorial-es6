# Angular2 Tutorial in ES6

This is an adaptation of the angular2 tutorial series done in ES6 instead of TypeScript.

##### Tech

- webpack
- babel
- babel-preset-angular2
- all other default angular2 quickstart/tutorial dependencies

##### Usage

`npm start` will run webpack in watch mode and also run lite-server for hot-reloading.

##### Items of note

When using ES6 with angular2 in order to properly handle dependency injection the recipient class of a depedency must explicitly implement the `static get` property `parameters()` that returns the list of dependencies (see fig. 1).

Another notable and arguably favorable distinction is that the injected dependency does not automatically get an instance member in the class instead the implementor gets to decide how to manage the dependency.
 
Figure 1: Example of `static get parameters()`

    //This is used in place of TypeScript DI.
    static get parameters(){
        return [[InjectedService]]
    }
    
Figure 2: Example of class implementing DI

    class DependentComponent {
        constructor(injectedService) {
            //Make use of injectedService, optionally assign to a member-level variable
        }
        
        static get parameters() {
            return [[InjectedService]];
        }
    }