import React from 'react';
import './Footer.css'

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

const Footer = () => (
  <footer>
    <span style={{color: '#98223e', fontWeight: '600'}}>Loaves & fishes</span> | 721 Kasota Avenue SE, Minneapolis, MN 55414 | 612.377.9810
  </footer>
);

export default Footer;
