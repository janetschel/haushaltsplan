import React from 'react';
import { Dialog, DialogContent, DialogTitle, Typography } from "@material-ui/core";

class SettingsDialog extends React.Component<Props, {}> {
  handleClose = () => {
    const { closeDialog } = this.props;
    closeDialog();
  };

  render() {
    const { isVisible } = this.props;

    return(
        <Dialog open={isVisible} onClose={this.handleClose} className="EditDialog">
          <DialogTitle className="dialogTitle">Benutzer-Einstellungen</DialogTitle>
          <DialogContent className="dialogContent">
            <Typography>Die Einstellungs-Komponente ist noch nicht implementiert..</Typography>
          </DialogContent>
        </Dialog>
    );
  }
}

type Props = {
  isVisible: boolean,
  closeDialog: () => void,
}

export default SettingsDialog;
