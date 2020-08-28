import { LitElement, html, customElement, css, query } from 'lit-element';

import LoadingStyles from './loading.scss';

@customElement('dm-loading')
export default class App extends LitElement {

  @query('.airplane') airplane;

  degree = 90;

  static get styles () {
    return css([LoadingStyles]);
  }

  renderAirplanePosition () {
    this.airplane.style.transform = `translate(${Math.sin(this.degree * (Math.PI / 180)) * 256 - 169}px, ${Math.cos(this.degree * (Math.PI / 180)) * 256}px)`; //rotate(${this.degree * 360 - 90}deg)

    console.clear()
    console.log(this.degree);

    this.degree += 1.25;

    if (this.degree >= 360) this.degree = 0;

    requestAnimationFrame(this.renderAirplanePosition.bind(this));
  }

  connectedCallback () {
    super.connectedCallback();

    requestAnimationFrame(() => {
      this.airplane.style.transform = 'translate(86px, 0px)'; //rotate(-45deg)
      setTimeout(() => {
        this.airplane.style.transition = 'unset';
        requestAnimationFrame(this.renderAirplanePosition.bind(this));
      }, 1000);
    });
  }

  render () {
    return html`
      <div class="centre-spinner">
        <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <defs>
              <style>
                  .cls-1 {
                      fill: #203a7d;
                  }
                  .cls-2 {
                      fill: #fff;
                  }
                  .cls-3 {
                      fill: #ee4871;
                  }
                  .cls-4 {
                      fill: #ced9f2;
                  }
                  .cls-5 {
                      fill: #aebfea;
                  }
                  .cls-6 {
                      fill: #eff2fb;
                  }
              </style>
          </defs>
          <circle class="cls-1" cx="255.5" cy="256" r="255.5" />
          <path class="cls-2" d="M51.71,207.65H74.4q15.5,0,23.87,8.28t8.37,23.27q0,11.6-4.09,19.92a28.85,28.85,0,0,1-12,12.76q-7.89,4.44-19,4.43H46.35Zm19.48,61.84q13.44,0,20.31-7.79t6.86-22.59q0-24.65-24.64-24.64H59.21l-4.29,55Z" />
          <path class="cls-2" d="M124.08,253.81v.39q0,7.8,3.84,12.08t11.15,4.29A23.89,23.89,0,0,0,154.56,265l2.24,5.85a20.55,20.55,0,0,1-7.94,4.48A32.38,32.38,0,0,1,138.68,277q-10.32,0-16.41-6.23T116.19,254a30.84,30.84,0,0,1,2.92-13.69,22.22,22.22,0,0,1,8.18-9.3,22.62,22.62,0,0,1,12.27-3.31q9.06,0,14.32,5.41T159.14,249a42.59,42.59,0,0,1-.29,4.77Zm5.35-16.12q-3.9,3.85-5,11.06h27.66q.3-7.41-3-11.15t-9.26-3.75Q133.32,233.85,129.43,237.69Z"
          />
          <path class="cls-3" d="M241.68,232.29q4,5.07,4,15.58v28.44H228.38V248.36c0-2.79-.42-4.81-1.26-6a4.72,4.72,0,0,0-4.19-1.85,6.44,6.44,0,0,0-5.5,2.53q-1.91,2.53-1.9,7.21v26.1H198.19V248.36c0-2.79-.42-4.81-1.26-6a4.72,4.72,0,0,0-4.19-1.85,6.33,6.33,0,0,0-5.46,2.53q-1.84,2.53-1.85,7.21v26.1H168.1V228.39H185v6q4.77-7.2,14.61-7.21,10.32,0,13.92,8.48a17.92,17.92,0,0,1,6.67-6.24,18.88,18.88,0,0,1,9.11-2.24Q237.63,227.22,241.68,232.29Z"
          />
          <path class="cls-3" d="M294.08,232.44q5.4,5.2,5.4,16.21v27.66H283.22v-6.72a11,11,0,0,1-4.58,5.5,14.3,14.3,0,0,1-7.69,2,19.81,19.81,0,0,1-9-2,15.61,15.61,0,0,1-6.28-5.55,14.57,14.57,0,0,1-2.29-8,12.09,12.09,0,0,1,2.68-8.23q2.69-3.08,8.52-4.43a72.32,72.32,0,0,1,15.78-1.37H283v-1.17q0-3.6-1.65-5t-5.85-1.41a26.59,26.59,0,0,0-7.64,1.31,44.88,44.88,0,0,0-8.14,3.36l-4.38-11.39a41.06,41.06,0,0,1,10.47-4.24,44.25,44.25,0,0,1,11.54-1.71Q288.66,227.22,294.08,232.44ZM280.78,263a9.18,9.18,0,0,0,2.24-6.38v-1.17h-1.56c-4.15,0-7.11.37-8.86,1.12a3.86,3.86,0,0,0-2.63,3.75,5.11,5.11,0,0,0,1.41,3.7A4.87,4.87,0,0,0,275,265.5,7.4,7.4,0,0,0,280.78,263Z"
          />
          <path class="cls-3" d="M354.22,232.34q4.18,5.11,4.18,15.53v28.44H341.07V248.65c0-2.86-.51-4.93-1.51-6.23a5.38,5.38,0,0,0-4.53-1.95,8,8,0,0,0-6.19,2.48,9.5,9.5,0,0,0-2.28,6.68v26.68H309.22V228.39h16.85v6.43a16.61,16.61,0,0,1,6.52-5.65,20,20,0,0,1,8.87-1.95Q350,227.22,354.22,232.34Z"
          />
          <path class="cls-3" d="M418.89,207.65v68.66H401.84v-6.52a14,14,0,0,1-6,5.35,20.52,20.52,0,0,1-19.67-1.21,21.22,21.22,0,0,1-7.55-8.92,30.26,30.26,0,0,1-2.73-13.14,29.79,29.79,0,0,1,2.68-13,19.74,19.74,0,0,1,18.56-11.64,19.1,19.1,0,0,1,8.42,1.86,14.9,14.9,0,0,1,6,5V207.65ZM399.41,261c1.62-2.08,2.43-5.06,2.43-9s-.81-6.77-2.43-8.81a9.49,9.49,0,0,0-13.93-.05c-1.62,2-2.44,4.9-2.44,8.67s.83,6.91,2.49,9.05a8.16,8.16,0,0,0,6.86,3.22A8.38,8.38,0,0,0,399.41,261Z"
          />
          <g class="airplane">
            <polyline class="cls-4" points="412.27 313.66 392.75 292.67 400.56 321.83" />
            <polyline class="cls-5" points="412.56 313.83 403.92 304.71 400.56 321.83" />
            <polygon class="cls-6" points="472.27 256.65 377.63 276.3 426.22 328.81 472.27 256.65" />
            <polygon class="cls-4" points="470.52 257.52 392.96 292.88 403.92 304.71 470.52 257.52" />
          </g>
        </svg>
      </div>`;
  }
}