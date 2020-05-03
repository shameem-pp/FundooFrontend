import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms'
import { RegisterService } from 'src/app/Service/register.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
user:FormGroup;
  validation(){
    let data={
      firstName:this.valueOfInputField('firstName'),
      lastName:this.valueOfInputField('lastName'),
      email:this.valueOfInputField('userName'),
      password:this.valueOfInputField('password')
    }
    this.service.registration(data).subscribe(response=>{
      alert(response)
    });
  }

  valueOfInputField(inputElement:string){
    return this.user.get(inputElement).value;
  }
  constructor(private fb:FormBuilder,private service:RegisterService) { }

//   checkPasswords(group: FormGroup) {
//   let pass = group.get('password').value;
//   let confirmPass = group.get('confirmPass').value;

//   return pass === confirmPass ? null : { notSame: true }     
// }
  ngOnInit(): void {
    this.user =this.fb.group({
      firstName:['',
        Validators.required],
      lastName:['',
        Validators.required],
      userName:['',
        [Validators.required,Validators.email]],
      password:['',
        Validators.required],
      confirm:['',
        Validators.required]});
  }

}
