import React from 'react';

import TasksActions from '../actions/TasksActions';
import TasksStore from '../stores/TasksStore';

import IconButton from 'material-ui/IconButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

//import Task from './Task.jsx';
//import TaskCreateModal from './TaskCreateModal.jsx';

import './TasksPage.less';

function getStateFromFlux() {
    return {
        tasks: TasksStore.getTasks()
    };
}

export default class TasksPage extends React.Component{


    render() {
        return (
            <div className='TasksPage'>
                <div className='TasksPage__header'>
                    <h2 className='TasksPage__title'>List name</h2>
                    
                </div>

                <div className='TasksPage__tasks'>
                  Tasks
                </div>
            </div>
        );
    }
};
