import { Injectable } from "@angular/core";
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from "rxjs";
import { delay, materialize, dematerialize } from 'rxjs/operators';
import { User } from "@app/_models";
//import { ok } from "assert";

// array in local storage for registered users
const usersKey = 'elibrary-users';
let users: any[] = JSON.parse(localStorage.getItem(usersKey)!) || [];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next:HttpHandler ): Observable<HttpEvent<any>> {
        const{ url, method, headers, body } = request;

        return handleRoute();

        function handleRoute(){
            switch(true){
                case url.endsWith('/users/authenticate') && method === 'POST':
                   return authenticate();
                case url.endsWith('/users/register') && method === 'POST':
                   return register();
                default:
                    //pass through any requests not handled above
                    return next.handle(request); 
            }
        }

        function authenticate() {
            const { username, password } = body;
            const user = users.find(x => x.username === username && x.password === password);
            if (!user) return error('Username or password is incorrect');
            return ok({
                ...basicDetails(user),
                token: 'fake-jwt-token'
            })
        }

        function register() {
            const user = body;
        
            if (users.find(x => x.username === user.username)) {
                return error('Username "' + user.username + '" is already taken');
            }
        
            // Load existing users from localStorage
            const existingUsers = JSON.parse(localStorage.getItem(usersKey) as string) || [];

        
            user.id = existingUsers.length ? Math.max(...existingUsers.map((x: User) => x.id)) + 1 : 1;
        
            // Add the new user to the existing users
            existingUsers.push(user);
        
            // Save all users, including the newly registered one, to localStorage
            localStorage.setItem(usersKey, JSON.stringify(existingUsers));
        
            return ok();
        }        

        // function register() {
        //     const user = body

        //     if (users.find(x => x.username === user.username)) {
        //         return error('Username "' + user.username + '" is already taken')
        //     }

        //     user.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
        //     users.push(user);
        //     localStorage.setItem(usersKey, JSON.stringify(users));
        //     return ok();
        // }

        //helper functions

        function ok(body?: any){
            return of(new HttpResponse({ status: 200, body }))
                .pipe(delay(500));// delay observable to simulate server api call hahaXD
        }

        function error(message: string){
            return throwError(() => ({error: { message } }))
                .pipe(materialize(), delay(500), dematerialize()); // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648);
        }

        function basicDetails(user: any) {
            const { id, username, fisrtName, lastName, bookSubscribed } = user;
            return { id, username, fisrtName, lastName, bookSubscribed };
        }
    }
}

export const fakeBackendProvider = {
    //fake backend in place of http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};