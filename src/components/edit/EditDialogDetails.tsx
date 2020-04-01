import React from 'react';
import { Typography, FormControl, InputLabel, NativeSelect, Button } from '@material-ui/core';
import Translator from "../utils/Translator";

class EditDialogDetails extends React.Component<Props,
    { weekdays: [string, string, string, string, string, string, string], pics: [string, string],
      currentWeekday: string, currentPic: string, }> {

  constructor({props}: { props: any }) {
    super(props);

    this.state = {
      weekdays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
      pics: ['Jan', 'Lea'],
      currentWeekday: '',
      currentPic: ''
    };
  }

  componentDidMount(): void {
    const { currentTask } = this.props;

    this.setState({ currentWeekday: currentTask.day });
    this.setState({ currentPic: currentTask.pic });
  }

  translateBoolean = (booleanToTranslate: boolean) =>
      Translator.translateBoolean(booleanToTranslate);

  translateDay = (dayToTranslate: string) =>
      Translator.translateDay(dayToTranslate);

  saveChanges = async () => {
    const { currentWeekday, currentPic } = this.state;
    const { saveChanges } = this.props;

    saveChanges(currentWeekday, currentPic);

    this.handleClose();
  };

  handleClose = () => {
    const { handleClose } = this.props;
    handleClose();
  };

  handleDayChange = async (e: any) =>
      await this.setState({ currentWeekday: e.target.value });

  handlePicChange = async (e: any) =>
      await this.setState({ currentPic: e.target.value });

  render() {
    const { weekdays, pics } = this.state;
    const { currentTask } = this.props;
    const taskDone = `${currentTask.done ? 'Erledigt' : 'Zu erledigen'} von`;

    return (
      <div className="dialogContentDetails">
        <Typography className="chore">Aufgabe:</Typography>
        <Typography className="choreContent">{currentTask.chore}</Typography>

        <Typography className="day">Zu erledigen am:</Typography>
        <FormControl className="dropDownDayWrapper" disabled={currentTask.done}>
          <InputLabel htmlFor="uncontrolled-native">Aufgabe fällig am ...</InputLabel>
          <NativeSelect defaultValue={currentTask.day} onChange={this.handleDayChange} >
            { weekdays.map(currentWeekDay =>
                <option key={currentWeekDay} value={currentWeekDay}>{this.translateDay(currentWeekDay)}</option>
            )}
          </NativeSelect>
        </FormControl>

        <Typography className="pic">{taskDone}:</Typography>
        <FormControl className="dropDownPicWrapper" disabled={currentTask.done}>
          <InputLabel htmlFor="uncontrolled-native">{taskDone} ...</InputLabel>
          <NativeSelect defaultValue={currentTask.pic} onChange={this.handlePicChange}>
            { pics.map(currentPic =>
                <option key={currentPic} value={currentPic}>{currentPic}</option>
            )}
          </NativeSelect>
        </FormControl>

        <Typography className="blame">Eingestellt von:</Typography>
        <Typography className="blameContent">{currentTask.blame}</Typography>

        <Typography className="done">Erledigt:</Typography>
        <Typography className="doneContent">{this.translateBoolean(currentTask.done)}</Typography>

        <Button
            onClick={this.handleClose}
            variant="outlined"
            color="secondary"
            className="abortButton"
        >
          Abbrechen
        </Button>
        <Button onClick={this.saveChanges} variant="outlined" className="saveButton">Änderungen speichern</Button>
      </div>
    );
  }
}

type Props = {
  currentTask: { id: string, day:string, chore: string, pic: string, blame: string, done: boolean },
  handleClose: () => void,
  saveChanges: (day: string, pic: string) => void,
}

export default EditDialogDetails;
