import React from 'react';
import { connect } from 'react-redux';
import { searchItem } from '../redux';
import '../App.css';

class Search extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text: '',
            placeholder: 'Search...',
        };
    }

    handleSearchChange = (e) => {
        this.setState({ text: e.target.value.trim() });
    };

    handleSearchEnter = () => {
        this.props.dispatch(searchItem(this.state.text));
    };

    render() {
        return (
            <div className="search-container">
                <input
                    type="text"
                    value={this.state.text}
                    id="search-input"
                    placeholder={this.state.placeholder}
                    onChange={this.handleSearchChange}
                    onKeyPress={(event) => {
                        if (event.key === 'Enter') {
                            this.handleSearchEnter();
                        }
                    }}
                ></input>
                <i className="fa fa-search search-icon" />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    search: state.search,
});

export default connect(mapStateToProps)(Search);
