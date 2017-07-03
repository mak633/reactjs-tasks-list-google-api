import React from 'react';
import {
  HashRouter,
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import TaskListsStore from '../stores/TaskListsStore';
import TaskListsActions from '../actions/TaskListsActions';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';

import ListIcon from 'material-ui/svg-icons/action/view-list';
import HomeIcon from 'material-ui/svg-icons/action/home';
import ExitIcon from 'material-ui/svg-icons/action/exit-to-app';
import FolderIcon from 'material-ui/svg-icons/file/folder';
import AddIcon from 'material-ui/svg-icons/content/add';
import TasksPage from './TasksPage.jsx';
import TaskListCreateModal from './TaskListCreateModal.jsx';
import './TasklistsPage.less';
const PropTypes = require('prop-types');

function getStateFromFlux() {
    return {
        taskLists: TaskListsStore.getTaskLists()
    };
}

export default class TasklistsPage extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
       ...getStateFromFlux(),
      isCreatingTaskList: false
    };
    this._onChange = this._onChange.bind(this);
  }
  componentWillMount() {
       TaskListsActions.loadTaskLists();
   }

   componentDidMount() {
       TaskListsStore.addChangeListener(this._onChange);
   }

   componentWillUnmount() {
       TaskListsStore.removeChangeListener(this._onChange);
   }
   handleAddTaskList() {
        this.setState({ isCreatingTaskList : true });
    }

    handleClose() {
        this.setState({ isCreatingTaskList : false });
    }
    handleTaskListSubmit(taskList) {
        TaskListsActions.createTaskList(taskList);

        this.setState({ isCreatingTaskList : false });
    }

    render() {
        const { router } = this.context;

        return (
            <div className='TasklistsPage'>
                <div className='TasklistsPage__menu'>
                    <List className='TasklistsPage__list'>
                        <h3 className='TasklistsPage__title'>Almost Google Tasks</h3>
                        <Divider />

                        <List className='TasklistsPage__list'>
                            <ListItem
                                leftIcon={<HomeIcon />}
                                primaryText="Home"
                                onClick={() => {router.history.push('/lists')}}
                            />
                            <ListItem
                                leftIcon={<ListIcon />}
                                primaryText="About"
                                onClick={() => {router.history.push('/about')}}
                            />
                        </List>
                        <Divider />

                          <List className='TasklistsPage__list'>
                            <Subheader>Task Lists</Subheader>
                              {
                                  this.state.taskLists.map(list =>
                                      <ListItem
                                          key={list.id}
                                          leftIcon={<FolderIcon />}
                                          primaryText={list.name}
                                          onClick={() => {router.history.push(`/lists/${list.id}`)}}
                                      />
                                  )
                              }
                              <ListItem
                                  leftIcon={<AddIcon />}
                                  primaryText="Create new list"
                                  onClick={this.handleAddTaskList.bind(this)}
                              />

                         </List>
                         <Divider />
                        <List className='TasklistsPage__list'>
                            <ListItem
                                leftIcon={<ExitIcon />}
                                primaryText="Log out"
                                onClick={this.handleLogOut}
                            />
                        </List>
                    </List>
                </div>
                <div className='TasklistsPage__tasks'>
                  <Route path='/lists/:id' component={TasksPage} />
                </div>
                <TaskListCreateModal
                    isOpen={this.state.isCreatingTaskList}
                    onSubmit={this.handleTaskListSubmit.bind(this)}
                    onClose={this.handleClose.bind(this)}
                />
            </div>
        );
    }
    _onChange() {
          this.setState({ ...getStateFromFlux() });
    }

}

TasklistsPage.contextTypes = {
  router: PropTypes.object.isRequired
};
