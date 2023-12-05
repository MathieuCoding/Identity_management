import {Component, OnInit} from '@angular/core';
import { Location } from '@angular/common';
import {ActivatedRoute, Router} from "@angular/router";
import {UsersService} from "../service/users.service";
import {UserLdap} from "../models/user-ldap";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-ldap-details',
  templateUrl: './ldap-details.component.html',
  styleUrls: ['./ldap-details.component.css']
})
export class LdapDetailsComponent implements OnInit {

  user: UserLdap | undefined;
  processLoadRunning = false;
  processValidateRunning = false;

  userForm = this.fb.group({
    login: [''],
    nom: [''],
    prenom: [''],
    // Groupe de données imbriqué
    passwordGroup: this.fb.group({
      password: [''],
      confirmPassword: ['']
    }),
    mail: {value: '', disabled: true},
  })

  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
  ) {}

  ngOnInit() {
    this.getUser();
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

  goToLdap() {
    this.router.navigate(['/users/list']).then((e) => {
      if (!e) {
        console.error('Navigation has failed!');
      }
    })
  }

  onSubmitForm() {
    // Validation des données (à voir plus tard)
  }
  updateLogin() {
    const control = this.userForm.get('login');
    if (control === null) {
      console.error('L\'objet \'login\' du formulaire n\'existe pas');
      return;
    }
    control.setValue((this.formGetValue('prenom') + '.' + this.formGetValue('nom')).toLowerCase());
    this.updateMail();
  }
  updateMail() {
    const control = this.userForm.get('mail');
    if (control === null) {
      console.error('L\'objet \'mail\' du formulaire n\'existe pas');
      return;
    }
    control.setValue(this.formGetValue('login').toLowerCase() + '@epsi.lan');
  }
  isFormValid() { return false; }

  private formGetValue(name: string) {
    const control = this.userForm.get(name);
    if (control === null) {
      console.error('L\'objet \'' + name + '\' du formulaire n\'existe pas');
      return '';
    }
    return control.value;
  }

}
