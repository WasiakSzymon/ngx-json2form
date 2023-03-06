import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { combineLatest, of, switchMap, take } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { JsonFormResponse } from 'projects/ngx-json2form/src/lib/models';
import { ToastrService } from 'ngx-toastr';
import { NgxJson2formComponent } from 'ngx-json2form';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'example-ngx-json2form';

  @ViewChild('json2formElement') private json2formElement: NgxJson2formComponent | undefined;

  public formGroup = new FormGroup({});
  public json: JsonFormResponse | null = null;
  public fileToLoad: File | null = null;
  public readonly basePath = '../' + window.location.pathname.split('/')[1];

  public jsonPreview: string = '';
  public valuesPreview: string = '';


  constructor(private httpClient: HttpClient, private toastr: ToastrService) {

  }
  ngOnInit(): void {
    const jsonFormPath = this.basePath + '/assets/forms/example.json';
    this.httpClient.get<JsonFormResponse>(jsonFormPath).pipe(
      take(1),
      switchMap(json => {
        this.toastr.success('loaded form map from example.json', '', { disableTimeOut: true });
        const jsonValuesFormPath = this.basePath + `${json.api}.json`;
        return combineLatest([of(json), this.httpClient.get<any>(jsonValuesFormPath).pipe(take(1))])
      })).subscribe(([json, values]) => {
        if (values) {
          this.jsonPreview = JSON.stringify(json, null, 4);
          this.valuesPreview = JSON.stringify(values, null, 4);
          let _json = json;
          const _values = this.removeFalsyElement(values);
          Object.keys(_values).forEach(key => {

            const control = _json.controls.find(control => control.name === key);
            if (control) {
              control.value = _values[key];
            }
          });
          this.json = _json;
        }
        this.toastr.success('loaded values from values.json', '', { disableTimeOut: true });
      })
  }

  saveControlValues(): void {
    if (this.json?.api) {
      this.toastr.success(
        'Form value: ' + JSON.stringify(this.formGroup.getRawValue()),
        this.formGroup.valid ? 'Form state: VALID' : 'Form state: INVALID',
        { disableTimeOut: true })
    }
  }

  onFileChange(evt: any) {
    const files = (evt as any).target.files as FileList;
    let fileToLoad: File | null = null;
    if (files.item(0) != null) {
      fileToLoad = files.item(0);
    }
    this.fileToLoad = fileToLoad;
    if (this.fileToLoad) {
      var reader = new FileReader();
      reader.readAsText(this.fileToLoad, "UTF-8");
      reader.onload = (evt) => {
        try {
          this.json = JSON.parse(evt.target?.result as any);
          setTimeout(() => {
            this.json2formElement?.ngOnInit();
          }, 100);

        } catch (e) {
          this.toastr.error('Can not open or parse file')
        }
      }
    }
  }


  private removeFalsyElement(object: any): any {
    let newObject: any = {};
    Object.keys(object).forEach(key => {
      if (object[key]) {
        newObject[key] = object[key];
      }
    });
    return newObject;
  };
}
