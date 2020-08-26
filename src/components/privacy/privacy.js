import { LitElement, html, customElement, property, css, query } from 'lit-element';

import RootStyles from '../root.scss';

@customElement('dm-privacy')
export default class App extends LitElement {

  static get styles () {
    return css([RootStyles]);
  }

  render () {
    return html`
      <div style="padding: 1rem">
        <a href="/" style="font-weight: 800; color: #EE4871; text-decoration: none">&lt; Return to App</a>
        <h1>Demand Privacy Policy</h1>
        <h2 id="causes">Your App Usage</h2>
        <p>None of your data from this app is uploaded. Everything, such as the causes you've joined, the number of emails you've sent, and the time since your last send, is stored on your device.<br><br>Data can be reset at any time from the <code>/manage</code> page.</p>
        <h2 id="gmail">Gmail/Google Data</h2>
        <p>Demand does not and cannot read your emails. Gmail permission is only required to be able to send emails on your behalf.<br>Your Google Account name and email are used to identify you in emails sent, as per the RFC 2822 standard, and to fill in parts of email templates, such as your name.</p>
      </div>`;
  }
}