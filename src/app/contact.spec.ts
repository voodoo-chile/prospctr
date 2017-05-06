import {Contact} from './contact';

describe('Contact', () => {
  it('should create an instance', () => {
    expect(new Contact()).toBeTruthy();
  });

  it('should accept values in the constructor', () => {
    let contact = new Contact({
      name: 'John Brown'
    });
    expect(contact.name).toEqual('John Brown');
  });
});
