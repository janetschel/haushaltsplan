import React from 'react';
import {Dialog, DialogContent, DialogTitle} from "@material-ui/core";

class FilterTaskDialog extends React.Component<Props, {}> {
  handleClose = () => {
    const { closeDialog } = this.props;
    closeDialog();
  };

  render() {
    const { isVisible } = this.props;

    return(
        <Dialog open={isVisible} onClose={this.handleClose} className="EditDialog">
          <DialogTitle className="dialogTitle">Filtern der Aufgaben</DialogTitle>
          <DialogContent className="dialogContent">
            Dummy content for now.. Filter task dialog
          </DialogContent>
        </Dialog>
    );
  }
}

type Props = {
  isVisible: boolean,
  closeDialog: () => void,
}

export default FilterTaskDialog;
