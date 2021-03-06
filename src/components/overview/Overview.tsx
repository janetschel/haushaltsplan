import React from 'react';
import {Typography} from '@material-ui/core'
import Api from '../../api/Api';
import Task from './Task';
import DayUtil from "../utils/DayUtil";
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import AddTaskDialog from "./AddTaskDialog";
import SettingsDialog from "./SettingsDialog";
import Translator from "../utils/Translator";
import SettingsIcon from '@material-ui/icons/Settings';
import Feedback from "../enums/Feedback";

class Overview extends React.Component<Props,
    { tasks: [{id: string, day: string, chore: string, pic: string, blame: string, done: boolean, feedback: Feedback }],
      error: boolean, authtoken: string, username: string,
      addDialogIsVisbile: boolean, settingDialogIsVisible: boolean, initialFetchComplete: boolean,
      weekdays: [string, string, string, string, string, string, string]}> {

  private addTaskDialogKey: number;

  constructor({props}: { props: any }) {
    super(props);

    this.addTaskDialogKey = 0;

    this.state = {
      weekdays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
      tasks: [{id: "1", day: "monday", chore: "Kochen", pic: "Jan", blame: "Jan", done: false, feedback: Feedback.NO_FEEDBACK_GIVEN}],
      error: false,
      authtoken: '',
      username: '',
      addDialogIsVisbile: false,
      settingDialogIsVisible: false,
      initialFetchComplete: false,
    };

    this.getTasks = this.getTasks.bind(this);
    this.createNewTaskFromOldTask = this.createNewTaskFromOldTask.bind(this);
    this.createNewTask = this.createNewTask.bind(this);
    this.handleAddDialogClose = this.handleAddDialogClose.bind(this);
    this.handleSettingDialogClose = this.handleSettingDialogClose.bind(this);
  }

  componentDidMount(): void {
    this.setUsername();
    this.performInitialFetch();
  }

  setUsername = async () => {
    const { username } = this.props;
    await this.setState({ username: username });
  };

  performInitialFetch = async () => {
    await this.setAuthToken();
    await this.getTasks();
    this.scrollCurrentTasksOfDayIntoView();
  };

  scrollCurrentTasksOfDayIntoView = () => {
    const currentDay = DayUtil.getDayOfWeekFromCorrespondingNumber((new Date()).getUTCDay())!;
    const element = document.getElementById(currentDay)!;
    element.scrollIntoView({behavior: "smooth", block: "start", inline: "center"});
  };

  setAuthToken = async () => {
    const { authtoken } = this.props;
    await this.setState({ authtoken: authtoken });
  };

  getTasks = async () => {
    const { authtoken } = this.state;
    const { loginExpired } = this.props;

    try {
      const tasks = await (await Api.getDocuments(authtoken)).json();
      await this.setState({ tasks: tasks });
      await this.setState({ initialFetchComplete: true});
    } catch (error) {
      console.error(error);
      await this.setState({ error: true });

      if (error.message === 'User is not logged in') {
        loginExpired();
      }
    }
  };

  createNewTaskFromOldTask =
      async (oldId: string, day: string, chore: string, pic: string, blame: string, done: boolean) => {

    const { authtoken } = this.state;
    const { loginExpired } = this.props;

    const dayForNewDocument = DayUtil.getDayTwoDaysFromDay(day);

    const newDocument = {
      day: dayForNewDocument,
      chore: chore,
      pic: pic,
      blame: blame,
      done: false
    };

    try {
      await Api.addDocument(newDocument, authtoken);

      if (done) {
        await Api.deleteDocument(oldId, authtoken);
      }
    } catch (error) {
      if (error.message === 'User is not logged in') {
        loginExpired();
        return;
      }
    }
  };

  createNewTask = async (chore: string, day: string, pic: string) => {
    const { authtoken, username } = this.state;
    const { loginExpired } = this.props;

    const blame = username.startsWith('jan') ? 'Jan' : 'Lea';

    const newDocument = {
      day: day,
      chore: chore,
      pic: pic,
      blame: blame,
      done: false,
    };

    try {
      await Api.addDocument(newDocument, authtoken);
    } catch (error) {
      if (error.message === 'User is not logged in') {
        loginExpired();
        return;
      }
    }

    await this.getTasks();
  };

  translateDay = (dayToTranslate: string) =>
      Translator.translateDay(dayToTranslate);

  handleAddDialogOpen = async () =>
      await this.setState({ addDialogIsVisbile: true });

  handleAddDialogClose = async () =>
      await this.setState({ addDialogIsVisbile: false });

  handleSettingDialogOpen = async () =>
      await this.setState({ settingDialogIsVisible: true });

  handleSettingDialogClose = async () =>
      await this.setState({ settingDialogIsVisible: false });

  logoutUser = () =>
    window.location.reload();

  render() {
    const {
      tasks,
      error,
      authtoken,
      username,
      addDialogIsVisbile,
      settingDialogIsVisible,
      weekdays,
      initialFetchComplete
    } = this.state;

    const {
      loginExpired
    } = this.props;

    this.addTaskDialogKey++;

    return(
        <div className="Overview">
          <div className="headingWrapper" >
            <Typography variant="h4" className="heading">Haushaltsplaner</Typography>
              <Typography
                  variant="caption"
                  className="loggedInUser"
                  onClick={this.logoutUser}
              >
                Eingeloggt als {username}
              </Typography>
          </div>
          <div className="functionsWrapper">
            <div className="addWrapper" onClick={this.handleAddDialogOpen}>
              <AddCircleOutlineOutlinedIcon className="addIcon" />
              <Typography className="headingAdd">Neue Aufgabe erstellen</Typography>
            </div>
            <div className="settingWrapper" onClick={this.handleSettingDialogOpen}>
              <SettingsIcon className="settingsIcon" />
            </div>
          </div>
          <hr />
          <div className="taskWrapper">
            <div className="gridTask">
              { weekdays.map(weekday =>
                  <div className={weekday} key={weekday} id={weekday}>
                    <Typography className="columnHeading" variant="h6">{this.translateDay(weekday)}</Typography>
                    { initialFetchComplete && !error && tasks.filter(currentTask => currentTask.day === weekday).map((currentTask, index) =>
                        <Task
                            authtoken={authtoken}
                            key={index}
                            currentTask={currentTask}
                            getTasks={this.getTasks}
                            username={username}
                            createNewTaskFromOldTask={this.createNewTaskFromOldTask}
                            weekdays={weekdays}
                            loginExpired={loginExpired}
                        />
                    )}
                  </div>
              )}
              { error && <Typography color="secondary">Ungültiger oder fehlender Authentifizierungs-Token.</Typography>}
            </div>
          </div>
        <AddTaskDialog
            isVisible={addDialogIsVisbile}
            closeDialog={this.handleAddDialogClose}
            createNewTask={this.createNewTask}
            key={this.addTaskDialogKey}
        />
        <SettingsDialog isVisible={settingDialogIsVisible} closeDialog={this.handleSettingDialogClose} />
        </div>
    );
  }
}

type Props = {
  authtoken: string,
  username: string,
  loginExpired: () => void,
}

export default Overview;
