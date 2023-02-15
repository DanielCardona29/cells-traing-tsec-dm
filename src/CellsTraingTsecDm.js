import { LitElement } from 'lit-element';

import { BGADPGrantingTicketsPostV0 } from '@cells-components/bgadp-granting-tickets-v0/bgadp-granting-tickets-v0';

export class CellsTraingTsecDm extends LitElement {
  static get is() {
    return 'cells-traing-tsec-dm';
  }

  // Declare properties
  static get properties() {
    return {
      //Propiedades provenientes de otros componentes 
      user: { type: String, },
      password: { type: String, },
      consumerId: { type: String, },

      //Propiedades del data provider
      host: { type: String, },
      country: { type: String, },
      apiVersion: { type: String, },
    };
  }

  // Initialize properties
  constructor() {
    super();
    this.host = '';
    this.country = '';
    this.apiVersion = '0';
  }

  Login() {
    const options = {
      host: this.host,
      version: this.apiVersion,
    };

    const credentials = {
      consumerId: this.consumerId,
      userId: this.user,
      password: this.password
    };

    const dataProvider = new BGADPGrantingTicketsPostV0(this.country, options);

    dataProvider.generateRequest(false, credentials)
      .then((response) => {
        console.log(response)
        this._fireEvent('login-tsec-success', response);
      })
      .catch((error) => {
        this._fireEvent('login-tsec-error', error);
        throw new Error(error);
      })
      .finally(() => {
        this._fireEvent('login-tsec-ended', true);
      });
  }

  _fireEvent(eventName, detail) {
    this.dispatchEvent(new CustomEvent(eventName, { bubbles: true, detail }));
  }

}
