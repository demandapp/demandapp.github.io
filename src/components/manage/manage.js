import { LitElement, html, customElement, property, css, query } from 'lit-element';
import { get, set } from 'idb-keyval';

import RootStyles from '../root.scss';

import MoreIcon from '../../assets/more_horiz.svg';

@customElement('dm-manage')
export default class App extends LitElement {

  @property() cause;
  @property() causes = [];
  causeList = [];
  data = {};
  @property() userdata = {"emails_sent": 0, "date_last_sent": undefined}
  @property() loading = true;
  @property() reload = 0;

  static get styles () {
    return css([RootStyles]);
  }

  async getData () {
    this.causes = await get('causes');
    this.userdata = await get('userdata');
    this.causeList = this.causes.map(cause => cause.name);
    this.loading = false;
  }

  async leaveCause (cause) {
    this.causes.splice(this.causeList.indexOf(cause.name), 1);
    await set('causes', this.causes);
    this.getData();
    console.log('left cause');
  }

  connectedCallback () {
    super.connectedCallback();

    this.getData();
  }

  render () {
    return html`
      <div>
        <main>
          <dm-header></dm-header>
          <div class="overview">
            <h1 style="text-align:center">You have joined ${this.causeList.length} causes, and<br>Sent ${this.userdata.emails_sent} emails</h1>
            <div class="overview-action">
              <button class="send" @click=${() => {
                set('causes', []);
                set('userdata', {"emails_sent": 0, "date_last_sent": undefined});
                this.getData();
              }}>Reset Data</button>
              <div class="overview-action-details">
                <span>‍</span>
              </div>
            </div>
          </div>
        </main>
        <div class="explore">
          <h2>Joined Causes</h2>
          <div class="carousel featured-causes">
            ${this.causes.map(cause => {
              return html`
                <div class="explore-card" style="cursor: default">
                  <h2>${cause.name}</h2>
                  <p>${cause.description}</p>
                  <button class="leave-cause-button" @click=${() => this.leaveCause(cause)}>Leave Cause</button>
                </div>
              `;
            })}
            <div class="explore-card-offset"></div>
          </div>
      </div>`;
  }
}