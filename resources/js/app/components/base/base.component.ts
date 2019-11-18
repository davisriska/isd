import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Route, Router} from "@angular/router";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
    selector: 'app-base',
    templateUrl: './base.component.html',
    styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {

    tabs: Route[];

    constructor(private router: Router,
                private route: ActivatedRoute,
                public authenticationService: AuthenticationService) {

    }

    ngOnInit() {
        this.tabs = this.route.routeConfig.children.filter((value) => {
            return value.data && value.data.title;
        });
    }

    logout() {
        this.authenticationService.logout();
    }

}
