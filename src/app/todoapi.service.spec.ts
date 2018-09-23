import { TestBed, inject } from '@angular/core/testing';

import { TodoapiService } from './todoapi.service';

describe('TodoapiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TodoapiService]
    });
  });

  it('should be created', inject([TodoapiService], (service: TodoapiService) => {
    expect(service).toBeTruthy();
  }));
});
