import { TestBed } from '@angular/core/testing';

import { TipoReservaService } from './tipo-reserva.service';

describe('TipoReservaService', () => {
  let service: TipoReservaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoReservaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
