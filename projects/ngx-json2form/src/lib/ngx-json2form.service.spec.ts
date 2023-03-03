import { TestBed } from '@angular/core/testing';

import { NgxJson2formService } from './ngx-json2form.service';

describe('NgxJson2formService', () => {
  let service: NgxJson2formService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxJson2formService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
