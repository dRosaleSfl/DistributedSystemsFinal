import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }
  public username: string = '';
  public password: string = '';

  ngOnInit(): void {
  
  }

  registra(){
    console.log("im here");
    this.authService.register(this.username, this.password)
    .then((res)=>{
      sessionStorage.setItem('Logeado', 'true');
      sessionStorage.setItem('Metodo', 'email');
      sessionStorage.setItem('email', this.username);
      this.router.navigate(['/perfil']);
    }).catch(err => console.log('err', err.message));

  }

}
