import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BnNgIdleService } from 'bn-ng-idle';
import {Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css','../../../../assets/b4/css/bootstrap.min.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class HomeComponent implements OnInit {

  constructor(private bnIdle: BnNgIdleService, private router: Router) {

  }
 
  ngOnInit(): void {
    this.router.navigate(["/home"])
  }
}
