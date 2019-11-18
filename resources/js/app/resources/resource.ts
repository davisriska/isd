export class Resource {

    singleTypeName: string;
    collectionTypeName: string;

    constructor(singleTypeName: string, collectionTypeName: string = null) {
        this.singleTypeName = singleTypeName.toLowerCase();

        if (!collectionTypeName) {
            this.collectionTypeName = singleTypeName.toLowerCase() + 's';
        }

        this.errors = {};
    }

    id: number;

    errors: any;

}
