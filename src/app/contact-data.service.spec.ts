import { TestBed, inject } from '@angular/core/testing';
import { 
  Http,
  BaseRequestOptions,
  Response,
  ResponseOptions
} from '@angular/http';
import { Observable } from 'rxjs';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { Contact } from './contact';
import { ContactDataService } from './contact-data.service';

let MockContact: Contact = <Contact>{id: 'a', name: 'Alice'};
let MockContact2: Contact = <Contact>{id: 'b', name: 'Bob'};
let NewMockContact: Contact = <Contact>{name: 'Bob'};
let updatedContact: Contact = <Contact>{id: 'b', name: 'Charles'};
let MockContactsArray: Array<Contact> = [ MockContact, MockContact2];
let mockBackend: MockBackend;
let contactDataService: ContactDataService;
let contentType = '';

let setup = (httpMock) => {
  TestBed.configureTestingModule({
    providers: [
      ContactDataService,
      MockBackend,
      BaseRequestOptions,
      { 
        provide: Http,
        useFactory: (backend: MockBackend, options: BaseRequestOptions) => new httpMock(backend, options),
        deps: [ MockBackend, BaseRequestOptions ]
      }
    ]
  });
  inject([ MockBackend, Http],
    (mb: MockBackend, http: Http) => {
      mockBackend = mb;
      contactDataService = new ContactDataService(http);
    })();
};

describe('ContactDataService', () => {

  it('should call handle error from the promise when getContacts fails', (done) => {
    setup(MockFailedGetContactsHttp);
    spyOn(contactDataService, 'handleError');

    contactDataService.getContacts().then(() => {
      expect(contactDataService.handleError).toHaveBeenCalled();
      done();
    })
  });

  it('should return the contacts array from the promise when getContacts succeeds', (done) => {
    setup(MockSuccessGetContactsHttp);
    spyOn(contactDataService, 'handleError');

    contactDataService.getContacts().then((contacts) => {
      expect(contactDataService.handleError).not.toHaveBeenCalled();
      expect(contacts).toEqual(MockContactsArray);
      done();
    })
  });

  it('should return the contact based on passed in id from the promise when it succeeds', (done) => {
    setup(MockSuccessGetContactsHttp);

    contactDataService.getContact(MockContact.id).then((contact) =>{
      expect(contact).toEqual(MockContact);
      done();
    });
  });
  
});


class MockFailedGetContactsHttp extends Http {
  constructor(backend, options) {
    super(backend, options)
  }

  get() {
    return Observable.throw('error');
  }
}

class MockSuccessGetContactsHttp extends Http {
  constructor(backend, options) {
    super(backend, options)
  }

  get() {
    return Observable.from([ new Response(new ResponseOptions({body: {data: MockContactsArray}})) ]);
  }
}
