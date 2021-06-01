import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authentication:AuthenticationService, private router:Router) { }

  onSubmit(form: NgForm){
    console.log(form);
    console.log(form.value.email + " " + form.value.password);
    if (this.authentication.isUserExist(form.value.email, form.value.password)) {
      alert("success");
      this.router.navigate(['todo/todo']);
    } else {
      alert("User name or password incorrect");
    }
  }

  ngOnInit(): void {
  }

}
