import React from 'react';
import { Typography } from '@material-ui/core'
import Translator from "../utils/Translator";

class Task extends React.Component<Props, {}> {
  translateDayToGerman = (dayToTranslate: string) => Translator.translateDay(dayToTranslate);

  render() {
    const { currentTask } = this.props;
    const colorToDisplay = currentTask.done ? 'rgba(120, 222, 142, 0.3)' : 'rgba(213, 80, 82, 0.2)';

    return (
        <div className="Task" style={{ backgroundColor: colorToDisplay }}>
          <Typography className="chore" variant="body1">{currentTask.chore}</Typography>
          <Typography className="day" variant="body2">{this.translateDayToGerman(currentTask.day)}</Typography>
          <Typography className="pic" variant="body2">zu Erledigen durch: {currentTask.pic}</Typography>
          <Typography className="blame" variant="caption">eingetragen von: {currentTask.blame}</Typography>
        </div>
    );
  }
}

type Props = {
  currentTask: { id: string, day:string, chore: string, pic: string, blame: string, done: boolean },
}

export default Task;
