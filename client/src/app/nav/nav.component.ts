import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Component({
	selector: 'app-nav',
	templateUrl: './nav.component.html',
	styleUrls: [ './nav.component.css' ]
})
export class NavComponent implements OnInit {
	model: any = {};
	userName: string;
	constructor(public accountService: AccountService) {}

	ngOnInit(): void {
		this.getCurrentUser();
	}

	login() {
		this.accountService.login(this.model).subscribe(
			(response) => {
				console.log('response', response);
				this.userName = response.username;
			},
			(error) => {
				console.log(error);
			}
		);
	}

	logout() {
		this.accountService.logout();
	}

	getCurrentUser() {
		this.accountService.currentUser$.subscribe(
			(user) => {
				if (user != null) {
					console.log('user', user);
					this.userName = user.username;
				}
			},
			(error) => {
				console.log(error);
			}
		);
	}
}
