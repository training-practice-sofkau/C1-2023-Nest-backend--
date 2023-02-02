import { Observer } from "./observerInterface";

export interface Observable{
    add(o:Observer):string;
    remove(o:Observer):string;
    sendData():any;
}