import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from "rxjs";
import {catchError} from 'rxjs/operators';
import {AuthenticationService} from "../services/authentication.service";
import {MatSnackBar} from "@angular/material";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private authService: AuthenticationService, private snackBar: MatSnackBar) {

    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {

                if (error.error.errors) {
                    const errors = error.error.errors;

                    let message = '';

                    Object.keys(errors).forEach((value) => {
                        message += errors[value].join('<br/>');
                    });

                    console.log(message);

                    this.snackBar.open(message, null, {
                        duration: 4000,
                        verticalPosition: 'top'
                    });
                } else if (error.error.message) {
                    this.snackBar.open(error.error.message, null, {
                        duration: 4000,
                        verticalPosition: 'top'
                    });
                } else {
                    this.snackBar.open(error.error.error, null, {
                        duration: 4000,
                        verticalPosition: 'top'
                    });
                }

                if (error.status === 401) {
                    this.authService.logout(true, false);
                }

                return throwError(error);
            })
        );


        //
        //
        // return next.handle(request).pipe(
        //     catchError((response: any): Observable<any> => {
        //
        //         console.log(response);
        //
        //         if (response.status === 401) {
        //             this.authService.logout(false, false);
        //         }
        //
        //         this.snackBar.open(response.error.error, null, {
        //             duration: 3000,
        //         });
        //
        //         return Observable.create();
        //     })
        // );
    }

}
