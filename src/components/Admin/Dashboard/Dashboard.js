import React, { Component } from 'react';

const Dashboard = (props) => (
    <div style={{ display: 'inline-block', borderRadius: '100%', width: '95px', height: '95px', backgroundColor: 'rgba(0,0,0, 0.7)', marginRight: '15px' }}>
      <p style={{ color: '#98dfea', fontSize: '2rem', marginTop: '13px', marginBottom: '0' }}>{props.count}</p>
      <p style={{ marginTop: '0', fontSize: '.8rem', color: 'gold' }}>{props.children}</p>
    </div>
  )

  export default Dashboard

  