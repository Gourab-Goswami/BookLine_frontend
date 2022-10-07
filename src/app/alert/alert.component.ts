import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent implements OnInit {
  @Input()
  isError!: Boolean;

  @Input()
  errorMsg!: String;

  constructor() {}

  ngOnInit(): void {}
}
