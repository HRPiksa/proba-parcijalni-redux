import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import Loading from './Components/Loading';
import User from './Components/User';
import Repo from './Components/Repo';

class App extends React.Component {
    render() {
        const { isLoading } = this.props;

        let showing = <Repo />;

        if (isLoading) {
            // showing = 'Loading ...';
            showing = <Loading />;
        }

        return (
            <div className="app">
                <div className="app-container">
                    <h1 className="header">REACT</h1>
                    <h2 className="header">Parcijalni ispit</h2>
                </div>
                <div>
                    <User />
                    {showing}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    isLoading: state.isLoading,
});

export default connect(mapStateToProps)(App);
