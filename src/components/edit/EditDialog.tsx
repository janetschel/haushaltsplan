import React from 'react';
import {Dialog, DialogTitle, DialogContent, Typography, Tooltip} from '@material-ui/core';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import EditDialogDetails from "./EditDialogDetails";
import ArrowForwardIosOutlinedIcon from '@material-ui/icons/ArrowForwardIosOutlined';

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

  moveTask = async () => {
    const { currentTask, username, createNewTaskFromOldTask } = this.props;

    const { day, chore, pic} = currentTask;
    const blame = username.startsWith('jan') ? 'Jan' : 'Lea';

    await createNewTaskFromOldTask(currentTask.id, day, chore, pic, blame, currentTask.done);
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
            <Tooltip title="Achtung: dabei wird dieser Auftrag gelöscht">
              <div className="moveTask" onClick={this.moveTask}>
                <ArrowForwardIosOutlinedIcon className="moveIcon" />
                <Typography className="moveText">Aufgabe in zwei Tagen erneut einstellen</Typography>
              </div>
            </Tooltip>
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
  createNewTaskFromOldTask:
      (oldId: string, day: string, chore: string, pic: string, blame: string, done: boolean) => void,
  updateTaskComplete: (day: string, pic: string) => void,
  closeDialog: () => void,
  updateTask: () => void,
  deleteTask: () => void,
  isVisible: boolean,
  username: string,
}

export default EditDialog;
