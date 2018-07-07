// marketing side of application; front-end
import React from 'react';

const Landing = () => {
  return (
    <div>
      <div class="header center">
        <a href={'/'}>
          <img
            src={'/emaily-logo.svg'}
            alt={'Emaily'}
            className="logo"
            style={{ marginTop: '75px' }}
          />
        </a>
      </div>
      <div class="row center">
        <h5 class="header col s12" style={{ marginTop: '30px' }}>
          Simple survey collection service to collect feedback from your users
        </h5>
      </div>

      <div class="row center" style={{ marginTop: '10px' }}>
        <a
          href="/auth/google"
          id="download-button"
          class="btn-large waves-effect waves-light red lighten-3"
        >
          Get Started
        </a>
      </div>
    </div>
  );
};

export default Landing;
