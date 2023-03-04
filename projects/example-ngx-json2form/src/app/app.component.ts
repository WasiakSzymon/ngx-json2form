import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { take } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { JsonFormResponse } from 'projects/ngx-json2form/src/lib/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'example-ngx-json2form';

  public formGroup = new FormGroup({});
  public json: JsonFormResponse | null = null;

  constructor(private httpClient: HttpClient) {

  }
  ngOnInit(): void {
    this.httpClient.get<JsonFormResponse>('../assets/forms/example.json').pipe(take(1)).subscribe(json => {
      this.json = json;
    })
  }
}
