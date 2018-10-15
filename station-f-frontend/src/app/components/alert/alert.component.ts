import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  message: any;
  isHidden = false;

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.isHidden = false;
    this.alertService.getMessage().subscribe(message => { this.message = message; });
  }

  closeAlert() {
    this.isHidden = true;
  }

}

