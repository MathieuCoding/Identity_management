import { Injectable } from '@angular/core';
import {LDAP_USERS} from "../models/ldap-mock-data";
import {UserLdap} from "../models/user-ldap";
import {Observable, of, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  // Liste des utilisateurs
  users: UserLdap[] = LDAP_USERS;

  constructor() {
  }

  getUsers(): Observable<UserLdap[]> {
    return of(this.users);
  }

  getUser(login: string): Observable<UserLdap> {
    const user = this.users.find(user => user.login === login);
    if (user !== undefined)
      return of(user);

    return throwError(() => new Error('Utilisateur non trouvé'));
  }

  addUser(user: UserLdap): Observable<UserLdap> {
    // Ajout dans la liste
    this.users.push(user);
    return of(user);
  }

  updateUser(userToUpdate: UserLdap): Observable<UserLdap> {
    // Modification de l'utilisateur
    const user = this.users.find( u => u.login === userToUpdate.login);
    if (user) {
      // Modif
      user.nom = userToUpdate.nom;
      user.prenom = userToUpdate.prenom;
      user.nomComplet = userToUpdate.nomComplet;
      user.motDePasse = userToUpdate.motDePasse;

      return of(userToUpdate);
    }
    return throwError(() => new Error('Utilisateur non trouvé'));
  }


}
