import {Component, OnInit} from '@angular/core';
import {UsersService} from "../service/users.service";
import {LdapDetailsComponent} from "../ldap-details/ldap-details.component";
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-ldap-add',
  templateUrl: '../ldap-details/ldap-details.component.html',
  styleUrls: ['../ldap-details/ldap-details.component.css']
})
export class LdapAddComponent extends LdapDetailsComponent implements OnInit {

    constructor(private usersService: UsersService,
                fb: FormBuilder,
                router: Router) {
      super(true, fb, router);
    }

    ngOnInit() {
      super.onInit();
    }

  private getUser() {
    const login = this.route.snapshot.paramMap.get('login');

    if (login === null) {
      console.error('Can\'t retrieve user id from URL');
      return;
    }

    this.usersService.getUser(login).subscribe(
      user => {
        this.user = user;
        console.log('LdapDetails getUser: ' + user);
      }
    )
  }

    validateForm() {
      console.log('LdapAddComponent validateForm');
    }


}
