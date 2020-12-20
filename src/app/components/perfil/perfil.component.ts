import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  perfilForm: any;
  perfil: any;
  perfiles;
  musuario;

  id;
  usrname;
  name;
  ape_pat;
  ape_mat;
  fecha_nac;
  email;
  tel;
  prof;
  desc;
  face;
  inst;
  twit;
  img;
  constructor(private spotifyservice: SpotifyService, private formBuilder: FormBuilder) { 
    this.perfilForm = this.formBuilder.group({
      id: '',
      nombre_usuario:'',
      nombre:'',
      ape_pat:'',
      ape_mat:'',
      fecha_nac:'',
      correo:'',
      telefono:'',
      profesion:'',
      descripcion:'',
      facebook:'',
      instagram:'',
      twitter:'',
      foto:''
    });
  }


  ngOnInit(): void {
    if (sessionStorage.getItem('Metodo') == 'email') {
      this.getperfil();
    }
    else if (sessionStorage.getItem('Metodo') == 'google') {
      this.name = sessionStorage.getItem('name');
      this.ape_pat = sessionStorage.getItem('ape_pat');
      this.email = sessionStorage.getItem('email');
      this.img = sessionStorage.getItem('imgURL');
    }
  }

  
  getperfil() {
    console.log("yes");
    this.spotifyservice.obtenerPerfil().subscribe(
      res => {
        console.log(res);
        this.perfiles = res;
        console.log(this.perfiles);
        for (var i = 0; i<this.perfiles.length; i++) {
          console.log(this.perfiles[i]);
          console.log(sessionStorage.getItem('email') + " == " + this.perfiles[i].correo);
          if (sessionStorage.getItem('email') == this.perfiles[i].correo) {
            sessionStorage.setItem('usrname', this.perfiles[i].nombre_usuario);
            sessionStorage.setItem('name', this.perfiles[i].nombre);
            sessionStorage.setItem('ape_pat', this.perfiles[i].ape_pat);
            sessionStorage.setItem('ape_mat', this.perfiles[i].ape_mat);
            sessionStorage.setItem('fecha_nac', this.perfiles[i].fecha_nac);
            sessionStorage.setItem('tel', this.perfiles[i].telefono);
            sessionStorage.setItem('prof', this.perfiles[i].profesion);
            sessionStorage.setItem('desc', this.perfiles[i].descripcion);
            sessionStorage.setItem('face', this.perfiles[i].facebook);
            sessionStorage.setItem('insta', this.perfiles[i].instagram);
            sessionStorage.setItem('twit', this.perfiles[i].twitter);
            sessionStorage.setItem('imgURL', this.perfiles[i].imgURL);
    

            this.name = sessionStorage.getItem('name');
            this.usrname = sessionStorage.getItem('usrname');
            this.ape_pat = sessionStorage.getItem('ape_pat');
            this.ape_mat = sessionStorage.getItem('ape_mat');
            this.fecha_nac = sessionStorage.getItem('fecha_nac');
            this.email = sessionStorage.getItem('email');
            this.tel  = sessionStorage.getItem('tel');
            this.prof = sessionStorage.getItem('prof');
            this.desc  = sessionStorage.getItem('desc');
            this.face = sessionStorage.getItem('face');
            this.inst = sessionStorage.getItem('insta');
            this.twit = sessionStorage.getItem('twit');
            this.img = sessionStorage.getItem('imgURL');

          }
        }
      }
    );
  }


/*
  verusuario(item: any) {
    console.log("si entro");
    let usuarioId;
    usuarioId = item.id;
    console.log(usuarioId);
    this.spotifyservice.obtenerPerfil(usuarioId).subscribe(res => {
      console.log(res);
      this.musuario = res;
      this.perfilForm.setValue({
      id: usuarioId ,
      nombre_usuario:this.musuario[0].nombre_usuario,
      nombre:this.musuario[0].nombre,
      ape_pat:this.musuario[0].ape_pat,
      ape_mat:this.musuario[0].ape_mat,
      fecha_nac:this.musuario[0].fecha_nac,
      correo:this.musuario[0].correo,
      telefono:this.musuario[0].telefono,
      profesion:this.musuario[0].profesion,
      descripcion:this.musuario[0].descripcion,
      facebook:this.musuario[0].facebook,
      instagram:this.musuario[0].instagram,
      twitter:this.musuario[0].twitter,
      foto:this.musuario[0].foto
     
     });
      console.log(this.perfilForm.value);
    }
    );
  }*/

}
