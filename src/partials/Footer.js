import React from 'react';
import '../styles/Footer.css';

class Footer extends React.Component {
  completeAll = (e) => {
    this.props.completeAll();
  };

  deleteAll = (e) => {
    this.props.deleteAll();
  };

  render() {
    return (
      <>
        <button type='submit' className='footerBtn' onClick={this.completeAll}>
          complete all
        </button>
        <button type='submit' className='footerBtn' onClick={this.deleteAll}>
          delete all
        </button>
      </>
    );
  }
}

export default Footer;
