import React from 'react';
import ReposList from './ReposList';
import Search from './Search';
import Language from './Language';
import Filter from './Filter';
import { connect } from 'react-redux';
import { resetData } from '../redux';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import '../App.css';

function Repo({
    data,
    dataRepos,
    hasError,
    errorMsg,
    resetUser,
    filterBranch,
}) {
    const history = useHistory();

    if (!data) {
        // return 'No results';
        return (
            <div className="message-container msg-result">
                <div className="message-text">
                    <p>{'No results '}</p>
                </div>
            </div>
        );
    }

    if (!dataRepos) {
        // return 'No results';
        return (
            <div className="message-container msg-result">
                <div className="message-text">
                    <p>{'No results '}</p>
                </div>
            </div>
        );
    }

    if (hasError) {
        // return 'Looks like there was a problem:  ' + errorMsg;
        return (
            <div className="message-container msg-error">
                <div className="message-text">
                    <p>{'Looks like there was a problem: '}</p>
                    <p>{errorMsg}</p>
                </div>
            </div>
        );
    }

    const style = Object.keys(data).length === 0 ? { display: 'none' } : {};

    const resetUserBtn = () => {
        history.push('/all');

        resetUser();
    };

    return (
        <div className="appRepo" style={style}>
            <div className="repo-container">
                <div>
                    <img
                        className="repo-container-img"
                        src={data.avatar_url}
                        alt={data.name}
                        width={100}
                    ></img>

                    <div className="repo-container-text">
                        <h2>{data.name}</h2>
                    </div>
                </div>

                <br></br>

                <div className="repo-container-text-row">
                    <div className="repo-container-text-left">
                        <p>{'BIO: '}</p>
                    </div>
                    <div className="repo-container-text-right">
                        <p>{data.bio}</p>
                    </div>
                </div>
                <div className="repo-container-text-row">
                    <div className="repo-container-text-left">
                        <p>{'LOCATION: '}</p>
                    </div>
                    <div className="repo-container-text-right">
                        <p>{data.location}</p>
                    </div>
                </div>
            </div>

            <div>
                <Search />

                <Language />

                <Filter />

                {/* {dataRepos && <ReposList />} */}

                <Switch>
                    <Route exact path="/">
                        <Redirect to="/all" />
                    </Route>

                    <Route exact path="/all">
                        {dataRepos && <ReposList />}
                    </Route>
                    <Route exact path="/master">
                        {dataRepos && <ReposList />}
                    </Route>
                    <Route exact path="/other">
                        {dataRepos && <ReposList />}
                    </Route>
                    <Route exact path="/none">
                        {dataRepos && <ReposList />}
                    </Route>
                </Switch>
            </div>

            <div>
                <br></br>
                <button id="resetButton" type="reset" onClick={resetUserBtn}>
                    Reset
                </button>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    data: state.result,
    dataRepos: state.resultRepos,
    hasError: state.hasError,
    errorMsg: state.errorMsg,
    filterBranch: state.filterBranch,
});

const mapDispatchToProps = (dispatch) => ({
    resetUser: () => dispatch(resetData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Repo);
