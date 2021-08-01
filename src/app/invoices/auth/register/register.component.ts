import { Component, OnInit } from '@angular/core';
import { FormGroup , FormControl , FormBuilder ,Validators} from '@angular/forms';
import { InvoiceService } from '../../invoice.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Invoice } from '../../models/invoice';
import { Register } from '../../models/register';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm:FormGroup;
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

    this.registerForm = this.fb.group({ 
    
          name :['' , Validators.required],
          email: ['', Validators.compose([Validators.required, Validators.minLength(1)])],    
          password: ['', Validators.required],  
          

      })
    
     }
     
   

     private errorHandler(error ,message ){
       console.log(error);
       this._snackBar.open(message , 'Error' , {
         duration:2000
       })
     }

     onCancel() {

      this.router.navigate(['dashboard' ,'invoices'])

     }

     onRegisterSubmit(){
      if(!this.registerForm.valid){
        console.log("Invalid") ;
        return
      }

      this.invoiceService.registerUser(this.registerForm.value)
      .subscribe(
        data=>{
         this._snackBar.open('User have Register successfully' , 'Success' , {
           duration:4000
         })
          console.log(data);
          this.router.navigate(['dashboard' ,'login']);
        },
        error=>console.log(error)
        )


     
 
   }

     onRegister(){
       
       console.log(this.registerForm.value)
       this._snackBar.open('User Register successfully' , 'Success' , {
        duration:2000
      }
      )

      this.router.navigate(['dashboard' ,'login'])
     }
   
     goTologin(){
      this.router.navigate(['dashboard' ,'login'])  
     }
  }


