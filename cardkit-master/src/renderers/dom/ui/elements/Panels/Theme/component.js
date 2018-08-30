// Libraries
const React = require('react');

// Styles
require('./style.scss');

// ThemePanel class
class ThemePanel extends React.Component {

  constructor (props) {
    super(props);

    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleUpdate (e) {
    const element = e.target;

    this.props.onThemeChange(element.value);
  }

  render () {
    if (!this.props.themes) return null;

    return (
      <div className={'panel panel--theme' + (this.props.active ? ' panel--show' : '')}>
        <h3>Theme</h3>

        {/* <select defaultValue={this.props.theme} onChange={this.handleUpdate}>
          {Object.keys(this.props.themes).map((name, index) => {
            return (<option key={index} value={name}>{name}</option>);
          })}
        </select> */}

        <div>
          { Object.keys(this.props.themes).map((name, i) => {
            return (<button className="theme" key={ i } value={ name } onClick={ this.handleUpdate }>{ name }</button>)
          })}
        </div>

        <style jsx>{`
          button.theme {
            transition: all 300ms;
            box-size: border-box;
            width: 100%;
            padding: 8px 24px;
            font-size: 20px;
            margin-bottom: 8px;
            background: #fff;
            border-radius: 4px;
            box-shadow: 0px 4px 16px -8px rgba(0,0,0, 1);
          }
          button.theme:hover {
            background: #333;
            color: #ccc;

          }
        `}</style>

      </div>
    );
  }

}

ThemePanel.propTypes = {
  onThemeChange: React.PropTypes.func.isRequired,
  themes: React.PropTypes.object.isRequired,
  theme: React.PropTypes.string.isRequired,
  active: React.PropTypes.bool
}

// Export
module.exports = ThemePanel;
