import React from 'react';
import {Dialog, DialogTitle, DialogContent, Typography } from '@material-ui/core';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import EditDialogDetails from "./EditDialogDetails";
import ArrowForwardIosOutlinedIcon from '@material-ui/icons/ArrowForwardIosOutlined';
import Feedback from "../enums/Feedback";

class EditDialog extends React.Component<Props, { deleteTaskDisabled: boolean, moveTaskDisabled: boolean }> {
  private _isMounted: boolean;

  constructor({props}: { props: any }) {
    super(props);

    this._isMounted = false;

    this.state = {
      deleteTaskDisabled: false,
      moveTaskDisabled: false,
    }
  }

  componentDidMount(): void {
    this._isMounted = true;
  }

  componentWillUnmount(): void {
    this._isMounted = false;
  }

  handleClose = () => {
    const { closeDialog, updateTask } = this.props;
    updateTask();
    closeDialog();
  };

  deleteTask = async () => {
    const { deleteTaskDisabled, moveTaskDisabled } = this.state;
    const { deleteTask } = this.props;

    if (deleteTaskDisabled || moveTaskDisabled) {
      return;
    }

    await this.setState({ deleteTaskDisabled: true });
    await this.setState({ moveTaskDisabled: true });

    await deleteTask();
    this._isMounted && this.handleClose();
  };

  moveTask = async () => {
    const { deleteTaskDisabled, moveTaskDisabled } = this.state;
    const { currentTask, username, createNewTaskFromOldTask } = this.props;

    if (deleteTaskDisabled || moveTaskDisabled) {
      return;
    }

    await this.setState({ deleteTaskDisabled: true });
    await this.setState({ moveTaskDisabled: true });

    const { day, chore, pic} = currentTask;
    const blame = username.startsWith('jan') ? 'Jan' : 'Lea';

    await createNewTaskFromOldTask(currentTask.id, day, chore, pic, blame, currentTask.done);
    this._isMounted && this.handleClose();
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
                <Typography className="deleteText">Aufgabe löschen</Typography>
              </div>
              <div className="moveTask" onClick={this.moveTask} >
                <ArrowForwardIosOutlinedIcon className="moveIcon" />
                <Typography className="moveText">Aufgabe in zwei Tagen erneut einstellen</Typography>
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
  currentTask: { id: string, day:string, chore: string, pic: string, blame: string, done: boolean, feedback: Feedback },
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
