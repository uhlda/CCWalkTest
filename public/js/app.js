/*
  eslint-disable react/prefer-stateless-function, react/jsx-boolean-value,
  no-undef, jsx-a11y/label-has-for
*/
class TimerDashboard extends React.Component {
  render() {
    return (
      <div className='ui three column centered grid'>
        <div className='column'>
          <EditableTimerList />
        />
        </div>
      </div>
    );
  }
}

class EditableTimerList extends React.Component {
  render() {
    return (
      <div id='timers'>
        <Timer
          title='Walk Timer'
          project='Dr. Strangelove'
          elapsed='0000000'
          runningSince={null}
        />
      </div>
    );
  }
}

class Timer extends React.Component {
  state = {
    timerIsRunning: false,
    elapsed: '0000000',
    runningSince: Date.now()
  }
  componentDidMount() {
    this.forceUpdateInterval = setInterval(
      () => this.forceUpdate(), 
      50);
  }
  componentWillUnmount() {
    clearInterval(this.forceUpdateInterval);
  }
  handleStartClick = () => {
    this.setState({ timerIsRunning: true })
  };
  handleStopClick = () => {
    this.setState({ timerIsRunning: false })
  };
  render() {
    let elapsedString = '00:00:00';
    if (this.state.timerIsRunning) {
      elapsedString = helpers.renderElapsedString(
        this.state.elapsed, 
        this.state.runningSince
      );
    }
    return (
      <div className='ui centered card'>
        <div className='content'>
          <div className='header'>
            {this.props.title}
          </div>
          <div className='meta'>
            {this.props.project}
          </div>
          <div className='center aligned description'>
            <h2>
              {elapsedString}
            </h2>
          </div>
          <div className='extra content'>
            <span className='right floated edit icon'>
              <i className='edit icon' />
            </span>
            <span className='right floated trash icon'>
              <i className='trash icon' />
            </span>
          </div>
        </div>
        <TimerActionButton
          timerIsRunning={this.state.timerIsRunning}
          onStartClick={this.handleStartClick}
          onStopClick={this.handleStopClick}
        />
      </div>
    );
  }
}

class TimerActionButton extends React.Component {
  render() {
    if (this.props.timerIsRunning) {
      return (
        <div
          className='ui bottom attached red basic button'
          onClick={this.props.onStopClick}
        >
          Stop
        </div>
      );
    } else {
      return (
        <div
          className='ui bottom attached green basic button'
          onClick={this.props.onStartClick}
        >
          Start
        </div>
      );
    }
  }
}

ReactDOM.render(
  <TimerDashboard />,
  document.getElementById('content')
);

  