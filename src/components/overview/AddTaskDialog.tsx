import React from 'react';
import {Dialog, DialogContent, DialogTitle} from "@material-ui/core";

class AddTaskDialog extends React.Component<Props, {}> {
  handleClose = () => {
    const { closeDialog } = this.props;
    closeDialog();
  };

  render() {
    const { isVisible } = this.props;

    return(
        <Dialog open={isVisible} onClose={this.handleClose} className="EditDialog">
          <DialogTitle className="dialogTitle">Erstellen einer neuen Aufgabe</DialogTitle>
          <DialogContent className="dialogContent">
            Dummy content for now.. Add task dialog
          </DialogContent>
        </Dialog>
    );
  }
}

type Props = {
  isVisible: boolean,
  closeDialog: () => void,
}

export default AddTaskDialog;
