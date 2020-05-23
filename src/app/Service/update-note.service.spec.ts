import { TestBed } from '@angular/core/testing';

import { UpdateNoteService } from './update-note.service';

describe('UpdateNoteService', () => {
  let service: UpdateNoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateNoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
