import { Component, OnInit } from '@angular/core';
import { FormGroup , FormControl , FormBuilder ,Validators} from '@angular/forms';
import { InvoiceService } from '../../invoice.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Invoice } from '../../models/invoice';
import { Login } from '../../models/login';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email:string;
  password:string

  loginForm:FormGroup;
  private invoice:Invoice[]


  constructor(
       private fb: FormBuilder ,
       private invoiceService : InvoiceService ,
       private _snackBar: MatSnackBar,
       private router:Router,
       private route:ActivatedRoute

       ) { }

  ngOnInit(): void {

    this.createForm();
  }

  createForm(){

    this.loginForm = this.fb.group({ 
    
         
          email : ['' , Validators.required],
          password: ['', Validators.required]
          
      })
    
     }
     


     onReset(){

      this.loginForm.reset();

     }

      

     onLoginSubmit(){
       if(!this.loginForm.valid){
         console.log("Invalid") ;
         return
       }

       this.invoiceService.loginUser(this.loginForm.value)
       .subscribe(
         data=>{
          this._snackBar.open('You have Login successfully' , 'Success' , {
            duration:4000
          })
           console.log(data);
           this.router.navigate(['dashboard' ,'invoices']);
         },
         error=>console.log(error)
         )


      
  
    }

    goToRegister(){
      this.router.navigate(['dashboard' ,'register']);
    }
  

     
   
  }


