import { Observer } from './observer';

export interface Observable {
  subscribe(observer: Observer): any;
  unSubscribe(observer: Observer): any;
  notify(m: string): void;
}
