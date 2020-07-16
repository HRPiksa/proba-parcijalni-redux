import React from 'react';
import { connect } from 'react-redux';
import { fetchRepoData, queryChange } from '../redux';
import '../App.css';

class User extends React.Component {
    getUser = (event) => {
        event.preventDefault();

        this.props.dispatch(fetchRepoData());
    };

    handleQueryChange = (e) => {
        this.props.dispatch(queryChange(e.target.value));
    };

    render() {
        const { query, placeholder } = this.props;

        return (
            <div className="appUser">
                <form>
                    <label htmlFor="inputUser">GitHUb username:</label>
                    <br></br>
                    <input
                        required
                        type="text"
                        placeholder={placeholder}
                        autoFocus
                        id="inputUser"
                        value={query}
                        onChange={this.handleQueryChange}
                    ></input>
                    <br></br>
                    <button id="goButton" type="submit" onClick={this.getUser}>
                        GO!
                    </button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    query: state.query,
    placeholder: state.placeholder,
});

export default connect(mapStateToProps)(User);
