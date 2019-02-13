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
        <Button className={classes.backButton} onClick={this.props.click}><ArrowBack className={classes.backIcon} /></Button>
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
  backButton: {
    position: 'absolute',
    left: '0',
    top: '0',
    marginTop: '70px',
    marginLeft: '4px'
  }
});

export default withStyles(styles)((BackButton));