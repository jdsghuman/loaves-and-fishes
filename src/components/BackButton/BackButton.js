import React, { Component } from 'react';
import ArrowBack from '@material-ui/icons/ArrowBack';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router'
import './BackButton.css';

class BackButton extends Component {

  handleBackButtonlist = () => {
    this.props.history.goBack();
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button className="btn__back" onClick={this.props.click}><ArrowBack className={classes.backIcon} /></Button>
      </div>
    )
  }
}

const styles = theme => ({
  backIcon: {
    background: 'transparent',
    color: '#98223e',
    fontSize: '2rem',
    '&:hover': {
      backgroundColor: 'transparent',
  },
  },
});

export default withStyles(styles)((BackButton));