// Libraries
const React = require('react');

// Styles
require('./style.scss');

// Images
const images = {
  logo: require('../../images/logo.png')
};


// Header class
class Header extends React.Component {
  constructor (props) {
    super(props)
    this.backToGallery = this.backToGallery.bind(this)
  }

  backToGallery () {
    location.reload()
  }
  render () {
    return (
      <header className="header">
        {/* <img src={images.logo} /> */}

        {/* <a href="http://github.com/times/cardkit" target="_blank">About CardKit</a> */}
        <button className="backButton" onClick={ this.backToGallery } >Back to Gallery</button>
      </header>
    );
  }

}

Header.propTypes = {}

// Export
module.exports = Header;
