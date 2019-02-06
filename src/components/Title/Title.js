import React from 'react';

const Title = (props) => {
  return (
    <h2 style={title}>{props.children}</h2>
  )
}

const title = {
  margin: '25px auto',
  // width: '240px',
  fontSize: '2.2rem',
  fontWeight: '600',
  textAlign: 'center',
  color: '#333333'
}

export default Title;