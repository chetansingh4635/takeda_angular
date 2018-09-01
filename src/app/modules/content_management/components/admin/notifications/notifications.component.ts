import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'tm-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  constructor(public router: Router) { }
  ngOnInit() {
  }
  public shareNotification() {
    this.router.navigateByUrl('contentManagement/shareNotificationWithPatients');
  }
}
