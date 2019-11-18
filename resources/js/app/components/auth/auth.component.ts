import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../services/authentication.service";
import {MatSnackBar} from "@angular/material";

class AuthForm {
    username: string;
    password: string;
}

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

    loginForm: AuthForm;
    registerForm: AuthForm;
    returnUrl: string;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private authenticationService: AuthenticationService,
                private snackBar: MatSnackBar) {

    }

    ngOnInit() {
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

        this.loginForm = new AuthForm();
        this.registerForm = new AuthForm();
    }

    onSubmitLogin() {
        this.authenticationService.login(this.loginForm.username, this.loginForm.password).subscribe((response) => {
            (<any>window).url = this.returnUrl;

            this.router.navigateByUrl(this.returnUrl);
        });
    }

    onSubmitRegister() {
        this.authenticationService.register(this.registerForm.username, this.registerForm.password).subscribe((response) => {
            (<any>window).url = this.returnUrl;

            this.router.navigateByUrl(this.returnUrl);
        });
    }

}
