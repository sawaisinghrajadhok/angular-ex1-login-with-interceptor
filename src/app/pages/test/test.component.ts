import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor() { }

  data :any[] = [
    {'fullname':'one', 'gender':'male', 'mobile':'9460457899', 'region':'jaipur', 'description':'test'}
  ]
  ngOnInit() {
  }

}
