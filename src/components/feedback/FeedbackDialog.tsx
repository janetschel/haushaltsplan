import React from 'react';
import {Dialog, DialogContent, DialogTitle} from '@material-ui/core';
import MoodIcon from '@material-ui/icons/Mood';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import Feedback from "../enums/Feedback";

class FeedbackDialog extends React.Component<Props, { inputDisabled: boolean }> {
  constructor({props}: { props: any }) {
    super(props);

    this.state = {
      inputDisabled: false,
    }
  }

  handleClose = () => {
    const { closeFeedbackDialog, updateTask } = this.props;
    updateTask();
    closeFeedbackDialog();
  };

  handleFeedbackGiven = async (feedbackGiven: Feedback) => {
    const { inputDisabled } = this.state;
    const { addFeedbackToTask } = this.props;

    if (inputDisabled) {
      return;
    }

    await this.setState({ inputDisabled: true });

    await addFeedbackToTask(feedbackGiven);
    await this.setState({ inputDisabled: false });

    this.handleClose();
  }

  render() {
    const { feedbackVisible, currentTask } = this.props;

    return(
        <Dialog open={feedbackVisible} onClose={this.handleClose} className="EditDialog">
          <DialogTitle className="dialogFeedbackTitle">Bewerten der Aufgabe "{currentTask.chore}"</DialogTitle>
          <DialogContent className="dialogFeedbackContent">
            <div className="feedbackWrapper">
              <MoodIcon className="good" onClick={() => this.handleFeedbackGiven(Feedback.GOOD)} />
              <SentimentSatisfiedIcon className="okay" onClick={() => this.handleFeedbackGiven(Feedback.OKAY)} />
              <SentimentVeryDissatisfiedIcon className="bad" onClick={() => this.handleFeedbackGiven(Feedback.BAD)} />
            </div>
          </DialogContent>
        </Dialog>
    );
  }
}

type Props = {
  currentTask: { id: string, day:string, chore: string, pic: string, blame: string, done: boolean, feedback: Feedback },
  closeFeedbackDialog: () => void,
  updateTask: () => void,
  feedbackVisible: boolean,
  username: string,
  addFeedbackToTask: (feedback: Feedback) => void,
}

export default FeedbackDialog;
