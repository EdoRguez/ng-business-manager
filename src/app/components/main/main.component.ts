import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {
    isCollapsed: boolean = true;
    
    constructor(private authService: AuthService,
                private cookieService: CookieService,
                private router: Router) { }

    ngOnInit() { 
        
    }

    onLogout() {
        this.cookieService.delete('idUser' , '/');
        this.authService.logout();
        this.router.navigate(['/login']);
    }
}