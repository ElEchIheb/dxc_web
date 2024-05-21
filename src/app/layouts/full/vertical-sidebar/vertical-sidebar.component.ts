import {
  ChangeDetectorRef,
  Component,
  OnDestroy
} from '@angular/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { MediaMatcher } from '@angular/cdk/layout';



import { MenuItems } from '../../../shared/menu-items/menu-items';
import { AuthenticationService } from 'src/app/authentification/AuthServices/authentication.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-vertical-sidebar',
  templateUrl: './vertical-sidebar.component.html',
  styleUrls: []
})

export class VerticalAppSidebarComponent implements OnDestroy {
  public config: PerfectScrollbarConfigInterface = {};
  mobileQuery: MediaQueryList;
  cureentuser:any;
  nameUser:any;
  private _mobileQueryListener: () => void;
  status = true;

  itemSelect: number[] = [];
  parentIndex = 0;
  childIndex = 0;

  setClickedRow(i: number, j: number) {
    this.parentIndex = i;
    this.childIndex = j;
  }
  subclickEvent() {
    this.status = true;
  }
  scrollToTop() {
    document.querySelector('.page-wrapper')?.scroll({
      top: 0,
      left: 0
    });
  }

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public menuItems: MenuItems,private auth:AuthenticationService
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    // tslint:disable-next-line: deprecation
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.getuser()
  }

  ngOnDestroy(): void {
    // tslint:disable-next-line: deprecation
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  logout()
  {
    this.auth.logout();

  }


  public getuser()
  {

/*      this.cureentuser=this.auth.getCurentUser();
 */     this.cureentuser="ooredoo"
    /*   this.nameUser=JSON.parse( this.cureentuser).name;  */
    this.nameUser="ooredoo"
      this.nameUser=  this.nameUser.slice(0,1).toUpperCase() ;
      if(this.cureentuser === null)
       {
        this.nameUser="ooredoo";
       }

  }
}
