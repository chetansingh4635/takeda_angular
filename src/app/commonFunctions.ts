import { Injectable } from '@angular/core';

@Injectable()
export class CommonFunctions {
  wHeight: any;
  wWidth: any;

  constructor() {
    this.wWidth = function () {
      return Math.max(window.innerWidth, document.documentElement.clientWidth);
    };
    this.wHeight = function () {
      return Math.max(window.innerHeight, document.documentElement.clientHeight);
    };

    // this.logo = <HTMLElement>document.querySelector('.logo');
  }

  // onWindwResize() {
  //   if (this.logo != null) {
  //     document.getElementById('leftNavMenu').style.height = this.wHeight + 'px' ;
  //     document.getElementById('page').style.maxWidth = this.wWidth + 'px';
  //   }
  // }

  bredcrum(routUrlArray) {
    let bredcrumStr;
    const arrow = ' > ';
    bredcrumStr = routUrlArray.toString().replace(',', arrow).split(/(?=[A-Z])/).toString().replace(/,/g, ' ').replace('icf', 'ICF');
    bredcrumStr = bredcrumStr.replace('cro', 'CRO');
    bredcrumStr = bredcrumStr.replace('irb', 'IRB');
    bredcrumStr = bredcrumStr.replace('pi', 'PI');
    return bredcrumStr;
  }


  checkScreenSize() {
    if (this.wWidth() <= 992) {
      return 'tablet';
    }
  }


}




