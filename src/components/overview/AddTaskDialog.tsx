import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  InputLabel,
  FormControl,
  NativeSelect,
  TextField, Button
} from "@material-ui/core";
import Translator from "../utils/Translator";

class AddTaskDialog extends React.Component<Props, {
  weekdays: [string, string, string, string, string, string, string],
  currentWeekday: string, pics: [string, string], currentPic: string, inputDisabled: boolean, showMessage: boolean, }>{

  constructor({props}: { props: any }) {
    super(props);

    this.state = {
      weekdays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
      currentWeekday: 'monday',
      pics: ['Jan', 'Lea'],
      currentPic: 'Jan',
      inputDisabled: false,
      showMessage: false,
    }
  }

  translateDay = (dayToTranslate: string) =>
      Translator.translateDay(dayToTranslate);

  handleClose = async () => {
    const { closeDialog } = this.props;
    closeDialog();
  };

  saveChanges = async () => {
    const { currentWeekday, currentPic, inputDisabled } = this.state;
    const { createNewTask } = this.props;

    if (inputDisabled) {
      return;
    }

    await this.setState({ inputDisabled: true });

    const chore = (document.getElementById('choreContent')! as HTMLInputElement).value;

    if (chore.length <= 0) {
      await this.setState({ showMessage: true });
      await this.setState({ inputDisabled: false });
      return;
    }

    await this.setState({ showMessage: false });
    await createNewTask(chore, currentWeekday, currentPic);

    this.handleClose();
  };

  handleDayChange = async (e: any) =>
    await this.setState({ currentWeekday: e.target.value });

  handlePicChange = async (e: any) =>
      await this.setState({ currentPic: e.target.value });

  render() {
    const { weekdays, pics, showMessage } = this.state;
    const { isVisible } = this.props;

    return(
        <Dialog open={isVisible} onClose={this.handleClose} className="AddTaskDialog">
          <DialogTitle className="dialogTitle">Erstellen einer neuen Aufgabe</DialogTitle>
          <DialogContent className="dialogContentAdd">
            <div className="contentWrapper">
              <Typography className="choreText">Aufgabe:</Typography>
              <TextField className="choreContent" id="choreContent" variant="outlined" label="Aufgabe" />

              <Typography className="day">Zu erledigen am:</Typography>
              <FormControl className="dropDownDayWrapper" >
                <InputLabel htmlFor="uncontrolled-native">Aufgabe fällig am ...</InputLabel>
                <NativeSelect defaultValue="monday" onChange={this.handleDayChange} >
                  { weekdays.map(currentWeekDay =>
                      <option key={currentWeekDay} value={currentWeekDay}>{this.translateDay(currentWeekDay)}</option>
                  )}
                </NativeSelect>
              </FormControl>

              <Typography className="pic">Zu erledigen von:</Typography>
              <FormControl className="dropDownPicWrapper">
                <InputLabel htmlFor="uncontrolled-native">Zu erledigen von ...</InputLabel>
                <NativeSelect defaultValue="Jan" onChange={this.handlePicChange}>
                  { pics.map(currentPic =>
                      <option key={currentPic} value={currentPic}>{currentPic}</option>
                  )}
                </NativeSelect>
              </FormControl>
              <Button onClick={this.handleClose} variant="outlined" className="abortButton" color="secondary">Abbrechen</Button>
              <Button onClick={this.saveChanges} variant="outlined" className="saveButton">Aufgabe erstellen</Button>
              { showMessage && <Typography className="warning" color="secondary">Das Feld "Aufgabe" darf nicht leer sein!</Typography> }
            </div>
          </DialogContent>
        </Dialog>
    );
  }
}

type Props = {
  isVisible: boolean,
  closeDialog: () => void,
  createNewTask: (chore: string, day: string, pic: string) => void,
}

export default AddTaskDialog;
