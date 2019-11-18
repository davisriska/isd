import {Component, OnInit} from '@angular/core';
import {CryptographyService} from "../../services/cryptography.service";

@Component({
    selector: 'app-encrypt',
    templateUrl: './encrypt.component.html',
    styleUrls: ['./encrypt.component.scss']
})
export class EncryptComponent implements OnInit {

    protected data: string;
    protected encryptedData: string = null;

    constructor(private cryptographyService: CryptographyService) {

    }

    ngOnInit() {

    }

    submit() {
        this.cryptographyService.encrypt(this.data).subscribe((response: { data }) => {
            this.encryptedData = response.data;
        });
    }

    copy() {
        CryptographyService.copyToClipboard(this.encryptedData);
    }

}
