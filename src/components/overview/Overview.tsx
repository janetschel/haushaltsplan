import React from 'react';
import {Typography} from '@material-ui/core'
import Api from '../../api/Api';
import Task from './Task';
import DayUtil from "../utils/DayUtil";
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import TabUnselectedIcon from '@material-ui/icons/TabUnselected';
import AddTaskDialog from "./AddTaskDialog";
import FilterTaskDialog from "./FilterTaskDialog";

class Overview extends React.Component<Props,
    { tasks: [], error: boolean, authtoken: string, username: string,
      addDialogIsVisbile: boolean, filterDialogIsVisible: boolean }> {

  constructor({props}: { props: any }) {
    super(props);

    this.state = {
      tasks: [],
      error: false,
      authtoken: '',
      username: '',
      addDialogIsVisbile: false,
      filterDialogIsVisible: false,
    };

    this.getTasks = this.getTasks.bind(this);
    this.createNewTaskFromOldTask = this.createNewTaskFromOldTask.bind(this);
    this.createNewTask = this.createNewTask.bind(this);
    this.handleAddDialogClose = this.handleAddDialogClose.bind(this);
    this.handleFilterDialogClose = this.handleFilterDialogClose.bind(this);
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
  };

  setAuthToken = async () => {
    const { authtoken } = this.props;
    await this.setState({ authtoken: authtoken });
  };

  getTasks = async () => {
    const { authtoken } = this.state;

    try {
      const tasks = await (await Api.getDocuments(authtoken)).json();
      await this.setState({ tasks: tasks });
    } catch (error) {
      console.error(error);
      await this.setState({ error: true });
    }
  };

  createNewTaskFromOldTask =
      async (oldId: string, day: string, chore: string, pic: string, blame: string, done: boolean) => {

    const { authtoken } = this.state;
    const dayForNewDocument = DayUtil.getDayTwoDaysFromDay(day);

    const newDocument = {
      day: dayForNewDocument,
      chore: chore,
      pic: pic,
      blame: blame,
      done: false
    };

    await Api.addDocument(newDocument, authtoken);

    if (done) {
      await Api.deleteDocument(oldId, authtoken);
    }
  };

  createNewTask = async (chore: string, day: string, pic: string) => {
    const { authtoken, username } = this.state;
    const blame = username.startsWith('jan') ? 'Jan' : 'Lea';

    const newDocument = {
      day: day,
      chore: chore,
      pic: pic,
      blame: blame,
      done: false,
    };

    await Api.addDocument(newDocument, authtoken);
    await this.getTasks();
  };

  handleAddDialogOpen = async () =>
      await this.setState({ addDialogIsVisbile: true });

  handleAddDialogClose = async () =>
      await this.setState({ addDialogIsVisbile: false });

  handleFilterDialogOpen = async () =>
      await this.setState({ filterDialogIsVisible: true });

  handleFilterDialogClose = async () =>
      await this.setState({ filterDialogIsVisible: false });

  logoutUser = () =>
    window.location.reload();

  render() {
    const { tasks, error, authtoken, username, addDialogIsVisbile, filterDialogIsVisible } = this.state;

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
          <div className="wrapper">
            <div className="addWrapper" onClick={this.handleAddDialogOpen}>
              <AddCircleOutlineOutlinedIcon className="addIcon" />
              <Typography className="headingAdd">Neue Aufgabe erstellen</Typography>
            </div>
            <div className="filterWrapper" onClick={this.handleFilterDialogOpen}>
              <TabUnselectedIcon className="filterIcon" />
              <Typography className="headingFilter">Aufgaben filtern</Typography>
            </div>
          </div>
          { !error && tasks.map((currentTask, index) =>
              <Task
                  authtoken={authtoken}
                  key={index}
                  currentTask={currentTask}
                  getTasks={this.getTasks}
                  username={username}
                  createNewTaskFromOldTask={this.createNewTaskFromOldTask}
              />
          )}
          { error && <Typography color="secondary">Ungültiger oder fehlender Authentifizierungs-Token.</Typography>}
        <AddTaskDialog
            isVisible={addDialogIsVisbile}
            closeDialog={this.handleAddDialogClose}
            createNewTask={this.createNewTask}
        />
        <FilterTaskDialog isVisible={filterDialogIsVisible} closeDialog={this.handleFilterDialogClose} />
        </div>
    );
  }
}

type Props = {
  authtoken: string,
  username: string,
}

export default Overview;
