import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class CryptographyService {

    constructor(private http: HttpClient,) {

    }

    encrypt(data: string) {
        return this.http.post('/api/encrypt', {data});
    }

    decrypt(data: string) {
        return this.http.post('/api/decrypt', {data});
    }

    static copyToClipboard(val: string) {
        let selBox = document.createElement('textarea');
        selBox.style.position = 'fixed';
        selBox.style.left = '0';
        selBox.style.top = '0';
        selBox.style.opacity = '0';
        selBox.value = val;
        document.body.appendChild(selBox);
        selBox.focus();
        selBox.select();
        document.execCommand('copy');
        document.body.removeChild(selBox);
    }

}
