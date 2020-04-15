import React from 'react';
import { Typography, CircularProgress } from '@material-ui/core';

class LoginExpired extends React.Component<{}, {}> {
  reloadSite = () =>
    window.location.reload();

  render() {
    return(
        <div className="LoginExpired">
          <Typography variant="h4" className="heading">Haushaltsplaner - Login abgelaufen</Typography>
          <Typography variant="h6" className="explanation">
            Sie wurden aus Sicherheitsgründen automatisch ausgeloggt.
          </Typography>
          <Typography className="headsup">
            Sie werden innerhalb von 15 Sekunden auf die Login-Seite weitergeleitet. Bitte melden Sie sich dort erneut an.
          </Typography>
          <div className="linkWrapper" onClick={this.reloadSite}>
            <Typography className="manual">
              Falls Sie nicht weitergeleitet werden, klicken Sie bitte
            </Typography>
            <Typography className="button">
              hier
            </Typography>
          </div>
          <CircularProgress className="loadingIcon" />
        </div>
    )
  }
}

export default LoginExpired;
