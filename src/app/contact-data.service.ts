import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Contact } from './contact';


@Injectable()
export class ContactDataService {

  //lastId: number = 0;
  //private contacts: Contact[] = [];

  constructor(private http: Http) {}
  
  // GETting contacts
  getContacts(): Promise<Contact[]> {
    return this.http
      .get('http://localhost:3000/contacts')
      .toPromise()
      .then(response => response.json().data as Contact[])
      .catch(this.handleError);
  }

  getContact(id: string): Promise<Contact> {
    return this.getContacts()
      .then(contacts => contacts.find(contact => contact.id === id));
  }

  // POSTing and PUTting a contact
  saveContact(contact: Contact): Promise<Contact> {
    if(contact.id) {
      return this.put(contact);
    }
    return this.post(contact);
  }

  delete(contact: Contact): Promise<Response> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = 'http://localhost:3000/contacts/' + contact.id;

    return this.http
      .delete(url, {headers: headers})
      .toPromise()
      .catch(this.handleError);
  }

  private post(contact: Contact): Promise<Contact> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let url = 'http://localhost:3000/contacts'
    return this.http
      .post(url, JSON.stringify(contact), {headers: headers})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  private put(contact: Contact): Promise<Contact> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    
    let url = 'http://localhost:3000/contacts/' + contact.id;

    return this.http
      .put(url, JSON.stringify(contact), {headers: headers})
      .toPromise()
      .then(() => contact)
      .catch(this.handleError);
  }

  handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
