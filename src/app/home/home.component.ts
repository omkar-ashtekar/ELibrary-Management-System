import { Component } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { AccountService } from "@app/_services";
import { User } from "@app/_models";

@Component({selector: 'app-home',
    templateUrl: 'home.component.html',
styleUrls: ['home.component.css']})
export class HomeComponent{

  user?: User | null;
  public userName:string= '';
  
  logout() {
      this.accountService.logout();
  }

  paramFlag: number=1;// Initialize this variable

  constructor(private accountService: AccountService, private route: ActivatedRoute) {
    this.accountService.user.subscribe(x => this.user = x);
    //let userCredentials=JSON.parse(localStorage.getItem('user')); 
    const userCredentials = localStorage.getItem('user');
    if (userCredentials !== null) {
      const parsedUser = JSON.parse(userCredentials);
      this.userName = parsedUser.username;
    }

    this.route.queryParams.subscribe(params => {
        this.paramFlag = +params['paramFlag'];
    });
}

}
