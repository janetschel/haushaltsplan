import React from 'react';
import { Typography } from '@material-ui/core'
import Translator from "../utils/Translator";
import ListIcon from '@material-ui/icons/List';
import ToggleOffOutlinedIcon from '@material-ui/icons/ToggleOffOutlined';
import ToggleOnIcon from '@material-ui/icons/ToggleOn';
import Api from "../../api/Api";

class Task extends React.Component<Props, {}> {
  translateDayToGerman = (dayToTranslate: string) => Translator.translateDay(dayToTranslate);

  toggleDoneOfTask = async () => {
    const { currentTask, authtoken } = this.props;

    currentTask.done = !currentTask.done;
    await Api.updateDocument(currentTask, authtoken)
        .catch(error => console.error(error));

    this.updateTasks();
  };

  updateTasks = async () => {
    const { getTasks } = this.props;
    await getTasks();
  };

  render() {
    const { currentTask } = this.props;
    const taskDone = currentTask.done ? 'erledigt' : 'zu Erledigen';
    const colorToDisplay = currentTask.done ? 'rgba(120, 222, 142, 0.3)' : 'rgba(213, 80, 82, 0.2)';

    return (
        <div className="Task" style={{ backgroundColor: colorToDisplay }}>
          <Typography className="chore" variant="body1">{currentTask.chore}</Typography>
          { currentTask.done ?
              <ToggleOnIcon className="toggle" onClick={this.toggleDoneOfTask} /> :
              <ToggleOffOutlinedIcon className="toggle" onClick={this.toggleDoneOfTask} />
          }
          <ListIcon className="editIcon"/>
          <Typography className="day" variant="body2">{this.translateDayToGerman(currentTask.day)}</Typography>
          <Typography className="pic" variant="body2">{taskDone} durch: {currentTask.pic}</Typography>
          <Typography className="blame" variant="caption">eingetragen von: {currentTask.blame}</Typography>
        </div>
    );
  }
}

type Props = {
  currentTask: { id: string, day:string, chore: string, pic: string, blame: string, done: boolean },
  authtoken: string,
  getTasks: () => void,
}

export default Task;
