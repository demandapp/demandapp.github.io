import { LitElement, html, customElement, property, css, query } from 'lit-element';
import { get, set } from 'idb-keyval';

import './header/header.js';
import './onboard/onboard.js';
import './cause/cause.js';
import './privacy/privacy.js';
import './manage/manage.js';

import RootStyles from './root.scss';

import MoreIcon from '../assets/more_horiz.svg';

const CLIENT_ID = '20615721953-fjqaoqci8r7kjrr83att8qv518ecme0j.apps.googleusercontent.com';
const API_KEY = 'AIzaSyB7JAg5yxU7Nhb8t7NXRyfzEFuzXjcpcbo';

var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = 'https://www.googleapis.com/auth/gmail.send';

function dispatchSigninEvents (signedIn) {
  if (signedIn) {
    document.dispatchEvent(new CustomEvent('dm-signedin'));
  } else {
    document.dispatchEvent(new CustomEvent('dm-signedout'));
  }
}

@customElement('dm-app')
export default class App extends LitElement {

  @property() lastSent;

  @property() userdata = {"emails_sent": 0, "date_last_sent": undefined}

  causes = [];
  emailsToSend = [];

  @property() loading = true;

  @property() signedIn = false;

  @property() reload = 0;

  @query('.send') sendButton;

  _authorizeApp () {
    
  }

  _initClient () {
    gapi.client.init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES
    }).then(function () {
      // Listen for sign-in state changes.
      gapi.auth2.getAuthInstance().isSignedIn.listen(dispatchSigninEvents);

      // Handle the initial sign-in state.
      dispatchSigninEvents(gapi.auth2.getAuthInstance().isSignedIn.get());
    }, function(error) {
      console.error(error);
    });
  }

  async sendEmails() {
    this.sendButton.disabled = true;
    await Promise.all(this.emailsToSend.map(email  => {return this.sendEmail(email.email, email.subject, email.template)}));
    this.sendButton.disabled = false;
  }

  sendEmail (recipientEmail, subject, content) {
    return new Promise((resolve, reject) => {
      const profile = gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile();
      const email = profile.getEmail();
      const name = profile.getName();

      const now = new Date();

      content = content.replace(/{name}/g, name).replace(/<br>/g, '\n');

      const message = `From: ${name} <${email}>\nTo: ${recipientEmail}\nSubject:${subject}\nDate: ${now.toString()}\nMessage-ID: <${now.getTime()}-test@demandapp.github.io>\n\n${content}`;

      let encodedMessage = btoa(message).replace(/\+/g, '-').replace(/\//g, '_');

      console.log(encodedMessage);

      gapi.client.gmail.users.messages.send({
        userId: 'me',
        resource: {
          raw: encodedMessage
        }
      }).execute(res => {
        console.log('Email sent result', res);
        this.userdata.emails_sent += this.emailsToSend.length;
        this.userdata.date_last_sent = new Date();
        set('userdata', this.userdata);
        this.loadData();
        resolve(res);
      });
    })
  }

  /*
  [
    {"name": "demo", "emails": ["..."], "subject": "...", "template": "...",  "description": "..."},
    ...
  ]
  */
  /*
  {
    "emails_sent": 10,
    "date_last_sent": {...}
  }
  */

  async loadData () {
    let [ causes, userdata ] = await Promise.all([get('causes'), get('userdata')]);
    console.log(userdata);
    if (causes === undefined) {
      causes = []
      set('causes', causes);
    }
    if (userdata === undefined) {
      userdata = {"emails_sent": 0, "date_last_sent": 'Never'};
      set('userdata', userdata);
    }
    this.causes =  causes;
    this.userdata = userdata;
    if (this.userdata.date_last_sent !== undefined) {
      if (this.userdata.date_last_sent === 'Never') this.lastSent = 'Never';
      else this.lastSent = `${Math.floor(((new Date()).getTime() - userdata.date_last_sent.getTime()) / (1000 * 3600))} hours`;
    } else {
      this.lastSent = 'never';
    }
    this.emailsToSend = causes.map(cause => cause.emails.map(email => {return {email, template: cause.template, subject: cause.subject}})).flat();
    this.loading = false;
  }

  connectedCallback () {
    super.connectedCallback();
    document.addEventListener('gapi-loaded', () => {
      console.log('gapi loaded');
      gapi.load('client:auth2', this._initClient);
    });
    document.addEventListener('dm-signedin', () => this.signedIn = true);
    document.addEventListener('dm-signedout', () => this.signedIn = false);
    window.addEventListener('popstate', () => {this.reload++, this.loadData();});

   this.loadData();
  }

  static get styles () {
    return css([RootStyles]);
  }

  render () {

    if (location.pathname.split('/')[1] === 'privacy') {
      return html`<dm-privacy></dm-privacy>`;
    }

    if (!this.signedIn) {
      return html`<dm-onboard></dm-onboard>`;
    }

    if (location.pathname.split('/')[1] === 'manage') {
      return html`<dm-manage></dm-manage>`;
    }

    if (location.pathname.split('/')[1] === 'cause') {
      return html`<dm-cause cause=${location.pathname.split('/')[2]}></dm-cause>`;
    }

    return html`
      <main>
        <dm-header></dm-header>
        <div class="overview">
          <h2>Last Sent</h2>
          <h1 class="overview-last-sent-time">${this.lastSent}</h1>
          <h2>${this.lastSent !== 'Never' ? html`Ago${this.lastSent[0] === '0' ? "! Send again soon!" : ""}` : html`‍`}</h2>
          ${this.loading ? html`` : html`<div class="overview-action">
            <button class="send" @click=${this.sendEmails} ?disabled=${this.emailsToSend.length === 0 || this.lastSent[0] === '0'}>${this.emailsToSend.length > 0 ? html`Send to ${this.emailsToSend.length}` : html`Send`}</button>
            <div class="overview-action-details">
              <span>${this.causes.length} Causes Selected</span>
              <a href="/manage" @click=${event => {
            event.preventDefault();
            history.pushState({}, "Manage Causes", "/manage");
            this.reload++
          }}><img class="overview-action-menu-button" src=${MoreIcon} /></a>
            </div>
          </div>`}
        </div>
      </main>
      <div class="explore">
        ${document.querySelector('pwa-install').getInstalledStatus() ? '' : html`
          <div class="explore-card coloured" @click=${() => {document.querySelector('pwa-install').openPrompt()}}>
            <h2>Make it even easier to fight for change.</h2>
            <p>Save Demand to your device. It’s free and lightweight.</p>
          </div>`}
        <h2>Explore Causes</h2>
        <div class="carousel featured-causes">
          <a class="explore-card" href="/cause/freetianna" @click=${event => {
            event.preventDefault();
            history.pushState({}, "Free Tianna", "/cause/freetianna");
            this.reload++
          }}>
            <h2>Free Tianna Arata</h2>
            <p>Drop the unfair charges against Tianna Arata, including Conspiracy and False Inprisonment, for organizing a peaceful protest.</p>
          </a>
          <a class="explore-card" href="/cause/justiceforjacobblake" @click=${event => {
            event.preventDefault();
            history.pushState({}, "Justice for Jacob Blake", "/cause/justiceforjacobblake");
            this.reload++
          }}>
            <h2>Justice for Jacob Blake</h2>
            <p>29 year old Jacob Blake was shot 7 times in his back by police in Kenosha, Wisconsin, in front of his three children.</p>
          </a>
          <!-- <div class="explore-card coloured">
            <h2>View More</h2>
            <p>Explore even more causes you can help support today.</p>
          </div> -->
        </div>
      </div>`;
  }
}