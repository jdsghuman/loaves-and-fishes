import React from 'react';

const Dashboard = (props) => (
    <div style={{ display: 'inline-block', borderRadius: '5%', minWidth: '175px', height: '95px', backgroundColor: 'rgba(0,0,0, 0.7)', marginRight: '15px', marginBottom: '10px', padding: '10px' }}>
      <p style={{ color: '#d1d130', fontSize: '2rem', marginTop: '13px', marginBottom: '0' }}>{props.count}</p>
      <p style={{ marginTop: '0', fontSize: '.8rem', color: 'gold' }}>{props.children}</p>
    </div>
  )

  export default Dashboard

  