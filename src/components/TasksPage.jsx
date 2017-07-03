import React from 'react';

import TasksActions from '../actions/TasksActions';
import TasksStore from '../stores/TasksStore';

import IconButton from 'material-ui/IconButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import Task from './Task.jsx';
import TaskCreateModal from './TaskCreateModal.jsx';

import './TasksPage.less';

function getStateFromFlux() {
    return {
        tasks: TasksStore.getTasks()
    };
}

export default class TasksPage extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      ...getStateFromFlux(),
      isCreatingTask: false
    };
    this._onChange = this._onChange.bind(this);
  }

  componentWillMount() {
      TasksActions.loadTasks(this.props.match.params.id);
  }

  componentDidMount() {
      TasksStore.addChangeListener(this._onChange);
  }

  componentWillReceiveProps(nextProps) {

      if (this.props.match.params.id !== nextProps.match.params.id) {
          TasksActions.loadTasks(nextProps.match.params.id);
      }
  }

  componentWillUnmount() {
      TasksStore.removeChangeListener(this._onChange);
  }

  handleStatusChange = (taskId, { isCompleted }) => {
      TasksActions.updateTaskStatus({
          taskListId: this.props.match.params.id,
          taskId: taskId,
          isCompleted: isCompleted
      });
  }

  handleTaskUpdate = (taskId, { text }) => {
      TasksActions.updateTask({
          taskListId: this.props.match.params.id,
          taskId: taskId,
          text: text
      });
  }

  handleAddTask = () => {
      this.setState({ isCreatingTask : true });
  }

  handleClose = () => {
      this.setState({ isCreatingTask : false });
  }

  handleTaskSubmit = (task) => {
      const taskListId = this.props.match.params.id;

      TasksActions.createTask({ taskListId, ...task });

      this.setState({ isCreatingTask : false });
  }

  render() {
      return (
          <div className='TasksPage'>
              <div className='TasksPage__header'>
                  <h2 className='TasksPage__title'>List name</h2>
                  <div className='TasksPage__tools'>
                      <IconButton onClick={this.handleAddTask}>
                          <ContentAdd />
                      </IconButton>
                  </div>
              </div>

              <div className='TasksPage__tasks'>
                  {

                      this.state.tasks.map(task =>
                          <Task
                              key={task.id}
                              text={task.text}
                              isCompleted={task.isCompleted}
                              onStatusChange={this.handleStatusChange.bind(null, task.id)}
                              onUpdate={this.handleTaskUpdate.bind(null, task.id)}
                          />
                      )
                  }
              </div>
              <TaskCreateModal
                  isOpen={this.state.isCreatingTask}
                  onSubmit={this.handleTaskSubmit}
                  onClose={this.handleClose}
              />
          </div>
      );
  }

  _onChange() {
        this.setState({ ...getStateFromFlux() });
  }
};
