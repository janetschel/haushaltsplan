import React from 'react';
import {Dialog, DialogTitle, DialogContent, Typography } from '@material-ui/core';

class FeedbackDialog extends React.Component<Props, {}> {
  handleClose = () => {
    const { closeFeedbackDialog, updateTask } = this.props;
    updateTask();
    closeFeedbackDialog();
  };

  render() {
    const { feedbackVisible, currentTask } = this.props;

    return(
        <Dialog open={feedbackVisible} onClose={this.handleClose} className="EditDialog">
          <DialogTitle className="dialogFeedbackTitle">Bewerten der Aufgabe "{currentTask.chore}"</DialogTitle>
          <DialogContent className="dialogFeedbackContent">
            <Typography>Nicht implementiert</Typography>
          </DialogContent>
        </Dialog>
    );
  }
}

type Props = {
  currentTask: { id: string, day:string, chore: string, pic: string, blame: string, done: boolean },
  closeFeedbackDialog: () => void,
  updateTask: () => void,
  feedbackVisible: boolean,
  username: string,
}

export default FeedbackDialog;
