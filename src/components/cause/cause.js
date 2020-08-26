import { LitElement, html, customElement, property, css, query } from 'lit-element';
import { get, set } from 'idb-keyval';

import RootStyles from '../root.scss';

import MoreIcon from '../../assets/more_horiz.svg';

@customElement('dm-cause')
export default class App extends LitElement {

  @property() cause;
  @property() causes = [];
  causeList = [];
  data = {};
  @property() loading = true;
  @property() reload = 0;

  static get styles () {
    return css([RootStyles]);
  }

  async getData () {
    this.causes = await get('causes');
    this.causeList = this.causes.map(cause => cause.name);
    const response = await fetch(`/data/causes/${this.cause}.json`);
    this.data = await response.json();
    this.loading = false;
  }

  async joinCause () {
    this.causes.push(this.data);
    this.causeList.push(this.data.name);
    await set('causes', this.causes);
    this.reload++;
    console.log('joined cause');
  }

  connectedCallback () {
    super.connectedCallback();

    this.getData();
  }

  render () {
    if (this.loading) {
      return html`<div class="loading">
        <main>
          <dm-header></dm-header>
          <div class="overview">
            <h1 style="text-align:center" class="filler-bar">‍</h1>
            <div class="overview-action">
              <button class="send" disabled>Join Cause</button>
              <div class="overview-action-details">
                <span>‍</span>
              </div>
            </div>
          </div>
        </main>
        <div class="explore">
          <h2>Email Template</h2>
          <p style="text-align: justify" class="filler-bar">‍</p>
        </div>
      </div>`;
    }
    return html`
      <div>
        <main>
          <dm-header></dm-header>
          <div class="overview">
            <h1 style="text-align:center">${this.data.name}</h1>
            <div class="overview-action">
              <button class="send" @click=${this.joinCause} ?disabled=${this.causeList.includes(this.data.name)}>Join Cause</button>
              <div class="overview-action-details">
                <span>${this.data.emails.length} Recipients</span>
              </div>
            </div>
          </div>
        </main>
        <div class="explore">
          <h2>Email Template</h2>
          <p style="text-align: justify">${html([this.data.template.replace(/{name}/g, '<span class="property">Name</span>')])}</p>
        </div>
      </div>`;
  }
}