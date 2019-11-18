import {Component, OnInit} from '@angular/core';
import {CryptographyService} from "../../services/cryptography.service";

@Component({
    selector: 'app-decrypt',
    templateUrl: './decrypt.component.html',
    styleUrls: ['./decrypt.component.scss']
})
export class DecryptComponent implements OnInit {

    protected data: string;
    protected decryptedData: string = null;

    constructor(private cryptographyService: CryptographyService) {

    }

    ngOnInit() {

    }

    submit() {
        this.cryptographyService.decrypt(this.data).subscribe((response: { data }) => {
            this.decryptedData = response.data;
        });
    }

    copy() {
        CryptographyService.copyToClipboard(this.decryptedData);
    }

}
