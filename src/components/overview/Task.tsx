import React from 'react';
import { Typography } from '@material-ui/core'
import Translator from "../utils/Translator";
import ListIcon from '@material-ui/icons/List';
import ToggleOffOutlinedIcon from '@material-ui/icons/ToggleOffOutlined';
import ToggleOnIcon from '@material-ui/icons/ToggleOn';
import Api from "../../api/Api";
import EditDialog from "../edit/EditDialog";

class Task extends React.Component<Props, { isVisible: boolean }> {
  constructor({props}: { props: any }) {
    super(props);

    this.state = {
      isVisible: false,
    };

    this.handleClose = this.handleClose.bind(this);
    this.updateTasks = this.updateTasks.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.updateTaskComplete = this.updateTaskComplete.bind(this);
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
    const { currentTask, authtoken, username } = this.props;

    currentTask.day = day;
    currentTask.pic = pic;
    currentTask.blame = username.startsWith('jan') ? 'Jan' : 'Lea';

    await Api.updateDocument(currentTask, authtoken);
  };

  updateTasks = async () => {
    const { getTasks } = this.props;
    await getTasks();
  };

  handleOpen = async () =>
    await this.setState({ isVisible: true });

  handleClose = async () =>
    await this.setState({ isVisible: false });

  render() {
    const { isVisible } = this.state;
    const { currentTask } = this.props;

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
          />
        </div>
    );
  }
}

type Props = {
  currentTask: { id: string, day:string, chore: string, pic: string, blame: string, done: boolean },
  authtoken: string,
  getTasks: () => void,
  username: string,
}

export default Task;
