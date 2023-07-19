import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-for-myself',
  templateUrl: './for-myself.component.html',
  styleUrls: ['./for-myself.component.scss'],
})
export class ForMyselfComponent implements OnInit {
  profileForm!: FormGroup;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    let { email, name, id } = this.userService.currentUser;
    this.profileForm = this.formBuilder.group({
      name: [name, Validators.required],
      email: [email, Validators.required],
      address: [this.userService.currentUser.address],
      token: [this.userService.currentUser.token],
      isAdmin: [this.userService.currentUser.isAdmin],
    });
  }

  onSubmit() {
    this.userService.updateUserInfo(this.profileForm.value).subscribe({
      next: () => {
        this.router.navigateByUrl('/');
      },
      error: console.log,
    });
  }
}
