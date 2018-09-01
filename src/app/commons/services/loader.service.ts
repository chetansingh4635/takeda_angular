import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class LoaderService {
    public status: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    display(value: boolean) {
        this.status.next(value);
        setTimeout(()=>{
            this.status.next(false);
          },45000);
    }
}
