import { LitElement, html, customElement, property, css, query } from 'lit-element';

import OnboardStyles from './onboard.scss';

import HeaderImage from '../../assets/Header.svg';

@customElement('dm-onboard')
export default class App extends LitElement {

  static get styles () {
    return css([OnboardStyles]);
  }

  _authorize () {
    gapi.auth2.getAuthInstance().signIn();
  }

  render () {
    return html`
      <div>
        <header>
          <div class="header-content">
            <div class="demand-logo-container">
              <img src="${HeaderImage}" alt="Demand" class="header-logo" />
            </div>
            <h2>Send emails to demand justice and change for causes you care about at the push of a button.</h2>
            <a href="/privacy">Privacy Policy &gt;</a>
          </div>
        </header>
        <footer>
          <button class="auth_button" @click=${this._authorize}>Connect Gmail</button>
        </footer>
      </div>`;
  }
}