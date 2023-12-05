import {Component, OnInit, ViewChild} from '@angular/core';
import {UserLdap} from "../models/user-ldap";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {UsersService} from "../service/users.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-ldap-list',
  templateUrl: './ldap-list.component.html',
  styleUrls: ['./ldap-list.component.css'] // or .scss ?
})
export class LdapListComponent implements OnInit {
  displayedColumns: string[] = ['nomComplet', 'mail', 'employeNumero'];
  dataSource = new MatTableDataSource<UserLdap>([]);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator | null;
  private unactiveSelected: any;

  constructor(private usersService: UsersService, private router: Router) { // TODO: custom added
    this.paginator = null;
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.getUsers();
  }

  private getUsers(): void {
    this.usersService.getUsers().subscribe(
      users => {
        if (this.unactiveSelected) {
          this.dataSource.data = users.filter(user =>
            !user.active
          );
        } else {
          this.dataSource.data = users
        }
      }
    )
  }

  edit(login: string): void {
    this.router.navigate(['user/', login]).then((e) => {
      if (!e) {
        console.error('Navigation has failed!');
      }
    });
  }

}
