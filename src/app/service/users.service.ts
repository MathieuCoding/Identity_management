import { Injectable } from '@angular/core';
import {LDAP_USERS} from "../models/ldap-mock-data";
import {UserLdap} from "../models/user-ldap";
import {Observable, of, throwError} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  // Liste des utilisateurs
  users: UserLdap[] = LDAP_USERS;
  private usersUrl = 'api/users';
  private httpOptions = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<UserLdap[]> {
    // return of(this.users);
    return this.http.get<UserLdap[]>(this.usersUrl);
  }

  // getUser(login: string): Observable<UserLdap> {
  //   const user = this.users.find(user => user.login === login);
  //   if (user !== undefined)
  //     return of(user);
  //
  //   return throwError(() => new Error('Utilisateur non trouvé'));
  // }
  getUser(id: number): Observable<UserLdap> {
    return this.http.get<UserLdap>(this.usersUrl + '/' + id);
  }

  addUser(user: UserLdap): Observable<UserLdap> {
    // Ajout dans la liste
    // this.users.push(user);
    // return of(user);
    return this.http.post<UserLdap>(this.usersUrl, user, {
      headers: this.httpOptions
    });
  }

  // updateUser(userToUpdate: UserLdap): Observable<UserLdap> {
  //   // Modification de l'utilisateur
  //   const user = this.users.find( u => u.login === userToUpdate.login);
  //   if (user) {
  //     // Modif
  //     user.nom = userToUpdate.nom;
  //     user.prenom = userToUpdate.prenom;
  //     user.nomComplet = userToUpdate.nomComplet;
  //     user.motDePasse = userToUpdate.motDePasse;
  //
  //     return of(userToUpdate);
  //   }
  //   return throwError(() => new Error('Utilisateur non trouvé'));
  // }
  updateUser(user: UserLdap): Observable<UserLdap> {
    // Modification de l'utilisateur
    return this.http.put<UserLdap>(this.usersUrl + '/' + user.id, user, {
      headers: this.httpOptions
    });
  }

  deleteUser(id: number): Observable<UserLdap> {
    return this.http.delete<UserLdap>(this.usersUrl + '/' + id, {
      headers: this.httpOptions
    });
  }


}
