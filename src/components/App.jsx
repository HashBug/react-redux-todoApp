import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import { addReminder,deleteReminder, clearReminders } from '../actions';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      text: '',
      dueDate: ''
    }
  }

  addReminder(){
    this.props.addReminder(this.state.text, this.state.dueDate);
  }

  deleteReminder(id){
    this.props.deleteReminder(id);
  }

  renderList(){
    const { reminders } =  this.props;
    return(
        <ul className="list-group">
          {reminders.map(reminder => {
              return (
                <li key={reminder.id} className="list-group-item">
                  <div className="list-item">
                    <div>{reminder.text}</div>
                    <div><em>{moment(new Date(reminder.dueDate)).fromNow()}</em></div>
                  </div>
                  <div
                    className="list-item delete-button"
                    onClick={() => this.deleteReminder(reminder.id)}>
                    &#x2716;
                  </div>
                </li>
              )
          })
          }
        </ul>
    )
  }

  render(){
    return (
      <div className="App">
        <div className="App-title">Reminder pro App</div>
        <div className="form-inline reminder-form">
          <div className="form-group">
            <input
              className="form-control"
              placeholder="New Reminder..."
              onChange={event => this.setState({text: event.target.value})}
            />
            <input
              className="form-control"
              type="datetime-local"
              onChange={event => this.setState({dueDate: event.target.value})}
            />
          </div>
          <button
            type="button"
            className="btn btn-success"
            onClick={() => this.addReminder()}
            >
            Add Reminder
          </button>
        </div>
        { this.renderList() }
        <div
          className="btn btn-danger"
          onClick={() => this.props.clearReminders()}
          >
          Clear All
        </div>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    reminders: state
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({addReminder,deleteReminder, clearReminders},dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(App);
