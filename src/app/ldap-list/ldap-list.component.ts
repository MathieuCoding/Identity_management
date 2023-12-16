import {Component, OnInit, ViewChild} from '@angular/core';
import {UserLdap} from "../models/user-ldap";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {UsersService} from "../service/users.service";
import {Router} from "@angular/router";
import {MatSlideToggleChange} from "@angular/material/slide-toggle";

@Component({
  selector: 'app-ldap-list',
  templateUrl: './ldap-list.component.html',
  styleUrls: ['./ldap-list.component.css'] // or .scss ?
})
export class LdapListComponent implements OnInit {
  displayedColumns: string[] = ['nomComplet', 'mail', 'employeNumero'];
  dataSource = new MatTableDataSource<UserLdap>([]);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator | null;
  inactiveSelected: any;

  constructor(private usersService: UsersService, private router: Router) { // TODO: custom added
    this.paginator = null;
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = (data: UserLdap, filter: string) => this.filterPredicate(data, filter);
    this.getUsers();
  }

  filterPredicate(data: UserLdap, filter: string): boolean {
    return !filter || data.nomComplet.toLowerCase().startsWith(filter);
  }

  applyFilter($event: KeyboardEvent): void {
    const filterValue = ($event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // private getUsers(): void {
  //   if (this.unactiveSelected) {
  //     this.dataSource.data = LDAP_USERS.filter(user
  //       => !user.active
  //     )
  //   } else {
  //     this.dataSource.data = LDAP_USERS;
  //   }
  // }
  getUsers(): void {
    this.usersService.getUsers().subscribe(
      users => {
        if (this.inactiveSelected) {
          this.dataSource.data = users.filter(user =>
            !user.active
          );
        } else {
          this.dataSource.data = users
        }
      }
    )
  }

  unactiveChanged($event: MatSlideToggleChange): void {
    this.inactiveSelected = $event.checked;
    this.getUsers();
  }

  edit(login: string): void {
    this.router.navigate(['user/', login]).then((e) => {
      if (!e) {
        console.error('Navigation has failed!');
      }
    });
  }

  addUser() {
    this.router.navigate(['user/add']).then((e) => {
      if (!e) {
        console.log('Navigation has failed!');
      }
    });
  }

}
