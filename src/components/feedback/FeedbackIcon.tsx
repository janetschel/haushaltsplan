import React from 'react';
import Feedback from "../enums/Feedback";
import MoodIcon from "@material-ui/icons/Mood";
import SentimentSatisfiedIcon from "@material-ui/icons/SentimentSatisfied";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import ErrorOutlineOutlinedIcon from "@material-ui/icons/ErrorOutlineOutlined";

class FeedbackIcon extends React.Component<Props, {}> {
  render() {
    const { currentTask, handleFeedbackOpen, userIsNotPic } = this.props;

    if (!currentTask.done) {
      return <div />;
    }

    switch(currentTask.feedback) {
      case Feedback.NO_FEEDBACK_GIVEN:
        return userIsNotPic() ? <ErrorOutlineOutlinedIcon className="feedbackIcon" onClick={handleFeedbackOpen} /> : <div />;
      case Feedback.GOOD:
        return <MoodIcon className="feedbackIcon" onClick={handleFeedbackOpen} />;
      case Feedback.OKAY:
        return <SentimentSatisfiedIcon className="feedbackIcon" onClick={handleFeedbackOpen} />;
      case Feedback.BAD:
        return <SentimentVeryDissatisfiedIcon className="feedbackIcon" onClick={handleFeedbackOpen} />;
    }
  }
}

type Props = {
  currentTask: { id: string, day:string, chore: string, pic: string, blame: string, done: boolean, feedback: Feedback },
  handleFeedbackOpen: () => void,
  userIsNotPic: () => boolean,
}

export default FeedbackIcon;
