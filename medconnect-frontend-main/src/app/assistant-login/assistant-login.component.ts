import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assistant-login',
  templateUrl: './assistant-login.component.html',
  styleUrls: ['./assistant-login.component.css']
})
export class AssistantLoginComponent {

  username = '';
  password = '';

  constructor(private router: Router) {}

  login() {

    if (this.username === 'govind' && this.password === '935611') {

      localStorage.setItem('role', 'ASSISTANT');

      alert('Assistant Login Successful ✅');

      this.router.navigate(['/docdash']);

    } else {
      alert('Invalid credentials ❌');
    }
  }
}