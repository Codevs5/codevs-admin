import React, {Component, PropTypes} from 'react';
import ExpandedEntryInfo from './ExpandedEntryInfo.js';
import ResumeEntry from './ResumeEntry.js';

export default class EntryItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
          expanded : false,
        }
        this.toggleInfo = this.toggleInfo.bind(this);
    }

    toggleInfo() {
        this.setState({
            expanded: !this.state.expanded
        });
    }

    render() {
        const classIcons = {
            visibilityClass: `icon-eye icon-click fa fa-${ (this.props.data.visible)
                ? 'eye'
                : 'eye-slash'}`,
            toggleClass: `icon-click fa fa-${ (!this.state.expanded)
                ? 'caret-down'
                : 'caret-up'}`
        };
        const data = this.props.data;
        const changeVisibility = this.props.changeVisibility;
        return (
            <div className="entry-item">
                <ResumeEntry changeVisibility={changeVisibility} title={data.title} id={data.id} visible={data.visible} icons={classIcons} toggleInfo={this.toggleInfo}/>
                <ExpandedEntryInfo data={data} visible={this.state.expanded}/>
            </div>
        );
    }
}

EntryItem.propTypes = {
    data: PropTypes.shape({title: PropTypes.string, visible: PropTypes.bool, author: PropTypes.string, url: PropTypes.string, id: PropTypes.string.isRequired}),
    changeVisibility: PropTypes.func.isRequired
};
