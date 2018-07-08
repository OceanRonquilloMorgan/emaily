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
            style={{ marginTop: '30px' }}
          />
        </a>
        <div class="row center">
          <h5 class="header col s12" style={{ marginTop: '10px' }}>
            Simple survey collection service to collect feedback from your users
          </h5>
        </div>

        <div class="row center" style={{ marginTop: '5px' }}>
          <a
            href="/auth/google"
            id="download-button"
            class="waves-effect waves-light btn-large red lighten-3"
          >
            Get Started
          </a>
        </div>
      </div>

      <br />
      <br />
      <br />
      <br />
      <br />

      <footer class="page-footer red lighten-3">
        <div class="container">
          <div class="row">
            <div class="col l6 s12">
              <h5 class="center">
                <i class="center small material-icons">drafts</i>
              </h5>
              <h5 class="center white-text">What is Emaily?</h5>
              <p class="grey-text text-lighten-4">
                Emaily is a simple, hassle-free service that allows you to send
                mass emails to a large list of users for the purpose of
                collecting feedback. With this platform, you can simplify the
                way you drive customer engagement and achieve your business
                goals with email marketing campaigns that allow you to track
                service results.
              </p>
            </div>
            <div class="col l6 s12">
              <h5 class="center">
                <i class="center small material-icons">smartphone</i>
              </h5>
              <h5 class="center white-text">How to Use Emaily</h5>
              <p class="grey-text text-lighten-4">
                To use our service, simply sign-up with any Google account. Add
                survey credits with a click of the button, curate a new survey
                form, and begin sending out email campaigns to designated users.
                With convenience and a seamless user experience in mind, you can
                watch as your customers respond to your inquiry while we take
                care of the rest.
              </p>
            </div>
          </div>
        </div>
        <div class="footer-copyright">
          <div class="container">
            Emaily 2018 | {''}
            <a
              class="orange-text text-lighten-3"
              href="https://github.com/OceanRonquilloMorgan/emaily"
            >
              Source Code
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
