import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import firebase from 'firebase/app'


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user;
  constructor(private afsAuth: AngularFireAuth) { }

  register(username: string, password:string){
    return new Promise ((resolve, reject) =>{
      this.afsAuth.createUserWithEmailAndPassword(username, password)
      .then( userData => resolve(userData),
      err => reject (err));
    })
  }
 
  async loginEmailUser(username: string, password:string){
    try {
      const { user } = await this.afsAuth.signInWithEmailAndPassword(username, password);
      return user;
    } catch (error) {
      console.log(error);
    }
/*
   this.afsAuth.signInWithEmailAndPassword(username, password).then((u) => {
      console.log("User = U");
      this.user = u;
   }).catch((error) => {
    this.user = null;
   });
   return this.user;
*/
  }

  loginFacebookUser(){
    return this.afsAuth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
  }

   loginGoogleUser(){
    return this.afsAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logoutUser(){
    return this.afsAuth.signOut();
  }

  isAuth(){
    return this.afsAuth.authState.pipe(map(auth =>
      auth));
  }

}
