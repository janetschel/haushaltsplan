import React from 'react';
import {Snackbar, Typography} from '@material-ui/core'
import Translator from "../utils/Translator";
import ListIcon from '@material-ui/icons/List';
import ToggleOffOutlinedIcon from '@material-ui/icons/ToggleOffOutlined';
import ToggleOnIcon from '@material-ui/icons/ToggleOn';
import Api from "../../api/Api";
import EditDialog from "../edit/EditDialog";
import FeedbackDialog from "../feedback/FeedbackDialog";
import Feedback from "../enums/Feedback";
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import FeedbackIcon from "../feedback/FeedbackIcon";

class Task extends React.Component<Props, { isVisible: boolean, feedbackVisible: boolean, snackbarVisible: boolean,
  snackbarMessage: string, updateDoneOfTaskDisabled: boolean }> {

  private editDialogKey: number;
  private _isMounted: boolean;

  constructor({props}: { props: any }) {
    super(props);

    this.editDialogKey = 0;
    this._isMounted = false;

    this.state = {
      isVisible: false,
      feedbackVisible: false,
      snackbarVisible: false,
      updateDoneOfTaskDisabled: false,
      snackbarMessage: 'Feedback erfolgreich hinzugefügt',
    };

    this.handleClose = this.handleClose.bind(this);
    this.updateTasks = this.updateTasks.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.updateTaskComplete = this.updateTaskComplete.bind(this);
    this.handleFeedbackOpen = this.handleFeedbackOpen.bind(this);
    this.handleFeedbackClose = this.handleFeedbackClose.bind(this);
    this.addFeedbackToTask = this.addFeedbackToTask.bind(this);
    this.userIsNotPic = this.userIsNotPic.bind(this);
  }

  componentDidMount(): void {
    this._isMounted = true;
  }

  componentWillUnmount(): void {
    this._isMounted = false;
  }

  translateDayToGerman = (dayToTranslate: string) => Translator.translateDay(dayToTranslate);

  toggleDoneOfTask = async () => {
    const { updateDoneOfTaskDisabled } = this.state;
    const { currentTask, authtoken } = this.props;

    if (updateDoneOfTaskDisabled) {
      return;
    }

    await this.setState({ updateDoneOfTaskDisabled: true });

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
    this._isMounted && await this.setState({ updateDoneOfTaskDisabled: false });
  };

  addFeedbackToTask = async (feedback: Feedback) => {
    const { currentTask, authtoken } = this.props;

    await Api.addFeedbackToDocument(currentTask.id, feedback, authtoken);
    await this.setState({ snackbarMessage: 'Feedback erfolgreich hinzugefügt' });
    await this.setState({ snackbarVisible: true });
  }

  userIsNotPic = () =>
    !this.props.username.toLowerCase().startsWith(this.props.currentTask.pic.toLowerCase());

  handleOpen = async () =>
    await this.setState({ isVisible: true });

  handleClose = async () =>
    await this.setState({ isVisible: false });

  handleFeedbackOpen = async () => {
    if (!this.userIsNotPic()) {
      await this.setState({ snackbarMessage:
            'Feedback kann nur von Personen hinzugefügt werden, welche nicht für die Aufgabe verantwortlich sind' });
      await this.setState({ snackbarVisible: true });
      return;
    }

    await this.setState({ feedbackVisible: true });
  }

  handleFeedbackClose = async () =>
      await this.setState({ feedbackVisible: false });

  handleSnackbarClose = async () =>
      await this.setState({ snackbarVisible: false });

  render() {
    const { isVisible, feedbackVisible, snackbarVisible, snackbarMessage } = this.state;
    const { currentTask, createNewTaskFromOldTask, username } = this.props;

    const taskDone = currentTask.done ? 'Erledigt' : 'Zu erledigen';
    const colorToDisplay = currentTask.done ? 'rgba(120, 222, 142, 0.3)' : 'rgba(213, 80, 82, 0.2)';

    this.editDialogKey++;

    return (
        <div className="Task" style={{ backgroundColor: colorToDisplay }}>
          <Typography className="chore" variant="body1">{currentTask.chore}</Typography>
          { currentTask.done ?
              <ToggleOnIcon className="toggle" onClick={this.toggleDoneOfTask} /> :
              <ToggleOffOutlinedIcon className="toggle" onClick={this.toggleDoneOfTask} />
          }

          <ListIcon className="editIcon" onClick={this.handleOpen}/>

          <FeedbackIcon userIsNotPic={this.userIsNotPic} currentTask={currentTask} handleFeedbackOpen={this.handleFeedbackOpen} />

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
              key={this.editDialogKey}
          />
          <FeedbackDialog
              feedbackVisible={feedbackVisible}
              closeFeedbackDialog={this.handleFeedbackClose}
              currentTask={currentTask}
              updateTask={this.updateTasks}
              username={username}
              addFeedbackToTask={this.addFeedbackToTask}
          />
          <Snackbar
              anchorOrigin={{vertical: 'bottom', horizontal: 'left', }}
              open={snackbarVisible}
              autoHideDuration={3000}
              message={snackbarMessage}
              onClose={this.handleSnackbarClose}
              action={
                <React.Fragment>
                  <IconButton size="small" aria-label="close" color="inherit" onClick={this.handleSnackbarClose}>
                    <CloseIcon fontSize="small" color="secondary" />
                  </IconButton>
                </React.Fragment>
              }
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
