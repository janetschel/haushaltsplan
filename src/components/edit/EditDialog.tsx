import React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography } from '@material-ui/core';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import Api from "../../api/Api";

class EditDialog extends React.Component<Props, {}> {
  handleClose = () => {
    const { closeDialog, updateTask } = this.props;
    updateTask();
    closeDialog();
  };

  deleteTask = async () => {
    const { currentTask, authtoken } = this.props;

    await Api.deleteDocument(currentTask.id, authtoken)
        .catch(error => console.error(error));

    this.handleClose();
  };

  render() {
    const { isVisible, currentTask } = this.props;

    return(
        <Dialog open={isVisible} onClose={this.handleClose} className="EditDialog">
          <DialogTitle className="dialogTitle">Bearbeiten der Aufgabe "{currentTask.chore}"</DialogTitle>
          <DialogContent className="dialogContent">
            <div className="contentWrapper">
              <div className="deleteTask" onClick={this.deleteTask}>
                <DeleteOutlineOutlinedIcon color="secondary" className="deleteIcon" />
                <Typography className="deleteText">Aufgabe endgültig löschen</Typography>
              </div>

            </div>
          </DialogContent>
        </Dialog>
    );
  }
}

type Props = {
  currentTask: { id: string, day:string, chore: string, pic: string, blame: string, done: boolean },
  isVisible: boolean,
  closeDialog: () => void,
  updateTask: () => void,
  authtoken: string,
}

export default EditDialog;
