<span class="badge-npmversion"><a href="https://npmjs.org/package/ngx-json2form" title="View this project on NPM"><img src="https://img.shields.io/npm/v/ngx-json2form.svg" alt="NPM version" /></a></span>
<span class="badge-npmdownloads"><a href="https://npmjs.org/package/ngx-json2form" title="View this project on NPM"><img src="https://img.shields.io/npm/dm/ngx-json2form.svg" alt="NPM downloads" /></a></span>
<span class="badge-nodeico"><a href="https://www.npmjs.com/package/ngx-json2form" title="Nodei.co badge"><img src="https://nodei.co/npm/ngx-json2form.png?downloads=true&compact=true&height=2" alt="Nodei.co badge" /></a></span>

<h1 align="center">ngx-Json2Form</h1>

---

# NgxJson2form

[Angular CLI](https://github.com/angular/angular-cli) version 15.2.0.
[Node](https://nodejs.org/ar/blog/release/v18.14.0/) version 18.14.0

# Exmaple usage:
 1. `import { NgxJson2formModule } from 'ngx-json2form';`
 2. ```
    <div
    style="width: 100%; height:100%;padding:2rem; display:flex; flex-direction: column; justify-content:center; align-items:center;">
    <h1>exmaple-app-ngx-json2form</h1>
    <json2form *ngIf="json && formGroup" [JSON]="json" [(formGroup)]="formGroup"></json2form>
    </div>
    ```
 3. 
 ```
  public formGroup = new FormGroup({});
  public json: JsonFormResponse | null = null;

  constructor(private httpClient: HttpClient) {

  }
  ngOnInit(): void {
    this.httpClient.get<JsonFormResponse>('../assets/forms/example.json').pipe(take(1)).subscribe(json => {
      this.json = json;
    })
  }
  ```


# Documentation
## API
#### `[JSON]="value"` - value correct json structure string or object. Only 1 level of nesting.
#### `([formGroup])="your_empty_form_group"`  - two way bindings formGroup


## JSON STRUCTURE
#### Base structure is
```
{
    "controls": [
        {
            "sortOrder": 1,
            "name": "favColor",
            "label": "Favourite color",
            "value": "blue",
            "type": "select",
            "validators": {
                "type": {
                    "required": true
                },
                "message": {
                    "required": "custom error message for required"
                }
            }
        },
        {
            "sortOrder":2,
            "name": "zipcode",
            "label": "zip code",
            "value":"",
            "type":"text",
            "validators":{
                "type":{
                    "required": true,
                    "minLength":5,
                    "maxLength":5
                }
            },
            "mask":"[00-000]"
        }
    ],
    "dictionaries": {
        "favColor": [
            {
                "label": "red",
                "value": "red"
            },
            {
                "label": "blue",
                "value": "blue"
            }]
    }
}
```

#### `"controls"` - list of controls which will be rendered
#### `"controls.sortOrder"` - order of element
#### `"controls.name"` - name for angular form control 
#### `"controls.label"` - label for angular form control 
#### `"controls.value"` - value for angular form control 
#### `"controls.mask"` - [doc](https://www.npmjs.com/package/ngx-mask)
#### `"controls.type"` - one of `"text" | "checkbox" | "number" | "select"`
#### `"controls.validators.type"` - (optional) anys of default validators and argument`
    min?: number;
    max?: number;
    required?: boolean;
    requiredTrue?: boolean;
    email?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    nullValidator?: boolean;
`
#### `"controls.validators.message"` - (optional) anys of default validators and custtom error message`
    min?: string;
    max?: string;
    required?: string;
    requiredTrue?: string;
    email?: string;
    minLength?: string;
    maxLength?: string;
    pattern?: string;
    nullValidator?: string;
`
#### `"dictionaries"` - object, where keys are equal to angular form control name (`"controls.name"`)
#### `"dictionaries["controls.name"]` - list of elements for select control
#### `"dictionaries["controls.name"].label` - label for element item
#### `"dictionaries["controls.name"].value` - value for element item
### - suffix
in the future it will be developed

#### preffix 
in the future it will be developed

#### validators 
only default validators avilable - required, min, maxLength etc. (in the future it will be extended for custom validators)

## README.md
#### Genereting badges in README
Run command `npm run generate:readme:badges`

## Styles

Form are built using material-angular, so just adjust theme. 
[Theme Angular Material](https://v8.material.angular.io/guide/theming)

## Contribution

Im open for contribution, just write to me! :)

## Legal

Copyright 2023 Szymon Wasiak

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.