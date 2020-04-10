import React from 'react';
import {Typography} from '@material-ui/core'
import Translator from "../utils/Translator";
import ListIcon from '@material-ui/icons/List';
import ToggleOffOutlinedIcon from '@material-ui/icons/ToggleOffOutlined';
import ToggleOnIcon from '@material-ui/icons/ToggleOn';
import Api from "../../api/Api";
import EditDialog from "../edit/EditDialog";
import FeedbackDialog from "../feedback/FeedbackDialog";
import MoodIcon from '@material-ui/icons/Mood';
import Feedback from "../enums/Feedback";

class Task extends React.Component<Props, { isVisible: boolean, feedbackVisible: boolean }> {
  constructor({props}: { props: any }) {
    super(props);

    this.state = {
      isVisible: false,
      feedbackVisible: false,
    };

    this.handleClose = this.handleClose.bind(this);
    this.updateTasks = this.updateTasks.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.updateTaskComplete = this.updateTaskComplete.bind(this);
    this.handleFeedbackClose = this.handleFeedbackClose.bind(this);
  }

  translateDayToGerman = (dayToTranslate: string) => Translator.translateDay(dayToTranslate);

  toggleDoneOfTask = async () => {
    const { currentTask, authtoken } = this.props;

    currentTask.done = !currentTask.done;
    await Api.updateDocument(currentTask, authtoken)
        .catch(error => console.error(error));

    this.updateTasks();
  };

  deleteTask = async () => {
    const { currentTask, authtoken } = this.props;

    await Api.deleteDocument(currentTask.id, authtoken)
        .catch(error => console.error(error));
  };

  updateTaskComplete = async (day: string, pic: string) => {
    const { currentTask, authtoken, username, getTasks } = this.props;

    currentTask.day = day;
    currentTask.pic = pic;
    currentTask.blame = username.startsWith('jan') ? 'Jan' : 'Lea';
    currentTask.feedback = Feedback.NO_FEEDBACK_GIVEN;

    await Api.updateDocument(currentTask, authtoken);
    await getTasks();
  };

  updateTasks = async () => {
    const { getTasks } = this.props;
    await getTasks();
  };

  userIsNotPic = () =>
    !this.props.username.toLowerCase().startsWith(this.props.currentTask.pic.toLowerCase());

  handleOpen = async () =>
    await this.setState({ isVisible: true });

  handleClose = async () =>
    await this.setState({ isVisible: false });

  handleFeedbackOpen = async () =>
      await this.setState({ feedbackVisible: true });

  handleFeedbackClose = async () =>
      await this.setState({ feedbackVisible: false });

  render() {
    const { isVisible, feedbackVisible } = this.state;
    const { currentTask, createNewTaskFromOldTask, username } = this.props;

    const taskDone = currentTask.done ? 'Erledigt' : 'Zu erledigen';
    const colorToDisplay = currentTask.done ? 'rgba(120, 222, 142, 0.3)' : 'rgba(213, 80, 82, 0.2)';

    return (
        <div className="Task" style={{ backgroundColor: colorToDisplay }}>
          <Typography className="chore" variant="body1">{currentTask.chore}</Typography>
          { currentTask.done ?
              <ToggleOnIcon className="toggle" onClick={this.toggleDoneOfTask} /> :
              <ToggleOffOutlinedIcon className="toggle" onClick={this.toggleDoneOfTask} />
          }
          <ListIcon className="editIcon" onClick={this.handleOpen}/>
          { currentTask.done && this.userIsNotPic() && <MoodIcon className="feedbackIcon" onClick={this.handleFeedbackOpen} /> }
          <Typography className="day" variant="body2">{this.translateDayToGerman(currentTask.day)}</Typography>
          <Typography className="pic" variant="body2">{taskDone} von: {currentTask.pic}</Typography>
          <Typography className="blame" variant="caption">Eingetragen von: {currentTask.blame}</Typography>
          <EditDialog
              isVisible={isVisible}
              closeDialog={this.handleClose}
              currentTask={currentTask}
              updateTask={this.updateTasks}
              deleteTask={this.deleteTask}
              updateTaskComplete={this.updateTaskComplete}
              createNewTaskFromOldTask={createNewTaskFromOldTask}
              username={username}
          />
          <FeedbackDialog
              feedbackVisible={feedbackVisible}
              closeFeedbackDialog={this.handleFeedbackClose}
              currentTask={currentTask}
              updateTask={this.updateTasks}
              username={username}
          />
        </div>
    );
  }
}

type Props = {
  currentTask: { id: string, day:string, chore: string, pic: string, blame: string, done: boolean, feedback: Feedback },
  createNewTaskFromOldTask:
      (oldId: string, day: string, chore: string, pic: string, blame: string, done: boolean) => void,
  authtoken: string,
  getTasks: () => void,
  username: string,
}

export default Task;
