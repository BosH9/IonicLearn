import { DateTime } from "ionic-angular/components/datetime/datetime";

export class User{
    public name: string;
    public address: string;
    public gender: string;
    public city: string;
    public image: string;
    public dob: DateTime;

    public constructor(){

    }
}