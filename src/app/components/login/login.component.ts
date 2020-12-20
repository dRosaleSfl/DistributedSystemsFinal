import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user;
  loadScript;

  constructor(public afAuth: AngularFireAuth, private router: Router, private authService: AuthService) { }
  public username: string = '';
  public password: string = '';

  ngOnInit(): void {
//    this.loadScript('https://apis.google.com/js/platform.js');
    if (sessionStorage.getItem('Logeado') == 'true') {
      this.router.navigate(['/perfil']);
    }
  }

  async onLogin(){
    this.user = await this.authService.loginEmailUser(this.username, this.password);
    if ( this.user ) {
      sessionStorage.setItem('Logeado', 'true');
      sessionStorage.setItem('Metodo', 'email');
      sessionStorage.setItem('email', this.username);
      this.router.navigate(['/perfil']);
    } else {
      console.log(" else");
      sessionStorage.setItem('Logeado', 'false');
      this.router.navigate(['/failed']);
    }
/*
    //console.log('username', this.username);
    //console.log('password', this.password);
    this.authService.loginEmailUser(this.username, this.password).then((res)=>{
      this.router.navigate(['perfil']);
    }).catch(err => console.log('err', err.message)); */
  }
  
onLoginFacebook():void{
  this.authService.loginFacebookUser()
    .then((res) =>{
     this.router.navigate(['perfil']);
    }).catch(err => console.log('err', err.message));  
}

onSignIn(googleUser) {
  console.log("im in");
 
     var profile = googleUser.getBasicProfile()
     console.log('User ir' + JSON.stringify(profile))

     var element = document.querySelector('#content')
     element.innerHTML = profile.getId();

     var element = document.querySelector('#content')
     element.innerHTML = profile.getName();

     var image = document.createElement('img')
     image.setAttribute('src', googleUser.getImageUrl())
     element.append(image)

     var element = document.querySelector('#content')
     element.innerHTML = profile.getEmail();
   
}

  onLogout(){
    //this.afAuth.auth.signOut();
    sessionStorage.setItem('Logeado', 'false');
    sessionStorage.removeItem('Logeado');
    sessionStorage.removeItem('name');
    sessionStorage.removeItem('usrname');
    sessionStorage.removeItem('ape_pat');
    sessionStorage.removeItem('ape_mat');
    sessionStorage.removeItem('fecha_nac');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('tel');
    sessionStorage.removeItem('prof');
    sessionStorage.removeItem('desc');
    sessionStorage.removeItem('face');
    sessionStorage.removeItem('insta');
    sessionStorage.removeItem('twit');
    sessionStorage.removeItem('imgURL');
    this.authService.logoutUser();
  }

   async onLoginGoogle() {
    console.log("User");
    var user =  await this.authService.loginGoogleUser();
    var profile = user.additionalUserInfo.profile;
/*
    console.log(profile);
    console.log(JSON.parse( JSON.stringify(profile) ).email );
    console.log(JSON.parse( JSON.stringify(profile) ).family_name );
    console.log(JSON.parse( JSON.stringify(profile) ).given_name );
    console.log(JSON.parse( JSON.stringify(profile) ).picture );
*/
    sessionStorage.setItem('Logeado', 'true');
    sessionStorage.setItem('Metodo', 'google');
    sessionStorage.setItem('name', JSON.parse( JSON.stringify(profile) ).given_name);
    sessionStorage.setItem('ape_pat', JSON.parse( JSON.stringify(profile) ).family_name);
    sessionStorage.setItem('email', JSON.parse( JSON.stringify(profile) ).email);
    sessionStorage.setItem('imgURL', JSON.parse( JSON.stringify(profile) ).picture);
    this.router.navigate(['home']);
  }

  /*
  async onLoginGoogle() {
    console.log("User");
    var user = await this.authService.loginGoogleUser();
    var profile = user.additionalUserInfo.profile;
    console.log(profile);
    console.log(JSON.parse(JSON.stringify(profile) ).email );
  }
  */

reg(){
  this.router.navigate(['register']);
}


}

