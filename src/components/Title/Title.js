import React from 'react';

const Title = (props) => {
  return (
    <h2 style={title}>{props.children}</h2>
  )
}

const title = {
  display: 'block',
  margin: '20px auto',
  // width: '140px',
  fontSize: '2rem',
  fontWeight: '300',
  textAlign: 'center',
  color: '#333333',
}

export default Title;