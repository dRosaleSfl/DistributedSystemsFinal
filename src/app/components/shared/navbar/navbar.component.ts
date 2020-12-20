import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {

  constructor(public router: Router) { }
    

  ngOnInit(): void {
  }

  isLogged(): boolean {
      var logged = sessionStorage.getItem('Logeado');
      if ('true' == logged){
        return true;
      }
      else {
        return false;
      }
  }

  logout() {
    sessionStorage.setItem('Logeado', 'false');
    this.router.navigate(['/login']);
  }

}

