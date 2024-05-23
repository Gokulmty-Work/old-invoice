import { ChangeDetectorRef, Component, Input, EventEmitter, Output, OnDestroy ,ViewChild, OnInit} from '@angular/core';
import {AppConstants} from './AppConstants';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { AppParameterService } from './services/app-parameter.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title = 'Inventory Management';
  isRoleResource: boolean = false;
  wideScreen:boolean=false;
 
  @Input() isMenuOpened: boolean;
  

  public openMenu(item: string): void {

  if(item=='menu')  
  this.isMenuOpened = !this.isMenuOpened;

  if(item=='select')
  {
 if(!this.wideScreen)
 {
   this.isMenuOpened = !this.isMenuOpened;
 }
  }

  

  
  }

ngOnInit()
{
 
 
}

constructor(public authService :AuthService, public router: Router)
   {
    
 //  console.log("Checking Screen Width")
    if(window.innerWidth > 700)
    {
     this.wideScreen = true;
 //  AppConstants.wideScreen = true;
    }
 
    if(!this.authService.isUserLoggedIn())
    {
      this.router.navigate(['login']);
    }

 //   this.authService.getSettings().subscribe(data => {

 // AppConstants.servicesURL = data.servicesURL;
 // console.log(AppConstants.servicesURL)
 
  
  //   },error => console.log(error));
        
   }  

  logout()
  {
    this.authService.logout();
    this.router.navigate(['login']);
  }

}


