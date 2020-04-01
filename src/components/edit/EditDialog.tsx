import React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography } from '@material-ui/core';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import EditDialogDetails from "./EditDialogDetails";

class EditDialog extends React.Component<Props, {}> {
  handleClose = () => {
    const { closeDialog, updateTask } = this.props;
    updateTask();
    closeDialog();
  };

  deleteTask = async () => {
    const { deleteTask } = this.props;
    await deleteTask();
    this.handleClose();
  };

  render() {
    const { isVisible, currentTask, closeDialog, updateTaskComplete } = this.props;

    return(
        <Dialog open={isVisible} onClose={this.handleClose} className="EditDialog">
          <DialogTitle className="dialogTitle">Bearbeiten der Aufgabe "{currentTask.chore}"</DialogTitle>
          <DialogContent className="dialogContent">
            <div className="contentWrapper">
              <div className="deleteTask" onClick={this.deleteTask}>
                <DeleteOutlineOutlinedIcon color="secondary" className="deleteIcon" />
                <Typography className="deleteText">Aufgabe endgültig löschen</Typography>
              </div>
              <hr className="hr"/>
              <div className="dialogWrapper">
                <EditDialogDetails
                    currentTask={currentTask}
                    handleClose={closeDialog}
                    saveChanges={updateTaskComplete}
                />
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
  deleteTask: () => void,
  updateTaskComplete: (day: string, pic: string) => void,
}

export default EditDialog;
