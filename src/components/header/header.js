import { LitElement, html, customElement, query, css } from 'lit-element';

import HeaderStyles from './header.scss';

import HeaderImage from '../../assets/Header.svg';
import AccountIcon from '../../assets/account.svg';

import '@material/mwc-menu';
import '@material/mwc-list/mwc-list-item';

@customElement('dm-header')
export default class Header extends LitElement {

  @query('header') header;
  @query('#menu') menu;
  @query('.header-user') accountIcon;

  static get styles () {
    return css([HeaderStyles.toString()]);
  }

  _menuEvent (event) {
    if (event.detail.index === 0) {
      gapi.auth2.getAuthInstance().signOut();
    }
  }

  render () {
    return html`<header>
      <a href="/" @click=${event => {
        event.preventDefault();
        history.pushState({}, "Free Tianna", "/");
        window.dispatchEvent(new CustomEvent('popstate'));
      }}><img src="${HeaderImage}" alt="Demand" class="header-logo" /></a>
      <img src=${AccountIcon} alt="User" class="header-user" @click=${() => this.menu.show()}/>
      <mwc-menu id="menu" absolute x="0" y="0" @selected=${this._menuEvent}>
        <mwc-list-item>Sign Out</mwc-list-item>
        <mwc-list-item>Manage Causes</mwc-list-item>
      </mwc-menu>
    </header>`;
  }
}