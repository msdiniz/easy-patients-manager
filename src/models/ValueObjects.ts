
export interface Email {
    note: string;
    email: string;
    type: string;
  }
  
  export interface Address {
    note: string;
    address: string;
    type: string;
  }
  
  export interface Phone {
    note: string;
    phone: string;
    type: string;
  }
  export type ContactItem = Email | Address | Phone;