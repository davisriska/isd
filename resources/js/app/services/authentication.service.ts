import {Injectable, Injector} from '@angular/core';
import {HttpBackend, HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {tap} from "rxjs/operators";
import {User} from "../resources/user";
import {MatDialog} from "@angular/material";

@Injectable()
export class AuthenticationService {

    private userObject: User = null;

    constructor(private http: HttpClient,
                private injector: Injector,
                private dialogService: MatDialog) {

    }

    public get router(): Router {
        return this.injector.get(Router);
    }

    login(username: string, password: string) {
        return this.http.post('/api/login', {username, password}
        ).pipe(tap(
            (response: User) => {
                if (response) {
                    this.userObject = new User(response);
                }
            }
        ));
    }

    register(username: string, password: string) {
        return this.http.post('/api/register', {username, password}
        ).pipe(tap(
            (response: User) => {
                if (response) {
                    this.userObject = new User(response);
                }
            }
        ));
    }

    logout(returnUrl: boolean = false, backendLogout: boolean = true) {
        this.dialogService.closeAll();

        const navigate = () => {
            this.userObject = null;

            if (returnUrl) {
                this.router.navigate(['/login'], {queryParams: {returnUrl: this.router.url}});
            } else {
                this.router.navigate(['/login']);
            }
        };

        if (backendLogout) {
            return this.http.post('/api/logout', {}).subscribe(() => {
                navigate();
            });
        } else {
            navigate();
        }
    }

    me(): Promise<any> { // Used for checking if logged in
        return new Promise((resolve, reject) => {
            new HttpClient(this.injector.get(HttpBackend)).get('/api/me').subscribe((response: User) => {
                this.userObject = new User(response);

                resolve(response);
            }, (response) => {
                this.userObject = null;

                resolve(response);
            })
        })
    }

    isLoggedIn() {
        return this.userObject != null;
    }

    user() {
        return this.userObject;
    }

}
