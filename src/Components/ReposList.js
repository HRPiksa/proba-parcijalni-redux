import React from 'react';
import ReposListItem from './ReposListItem';
import { connect } from 'react-redux';
import '../App.css';

function ReposList({ data }) {
    if (!data || data.length === 0) {
        return '';
    }

    return (
        <div>
            <div className="repo-list-header-text">
                <p>{'REPOSITORIES: '}</p>
            </div>

            <div className="repo-table-container">
                <table>
                    <tbody>
                        {data.map((item) => {
                            return (
                                <React.Fragment key={item.id + '-' + item.name}>
                                    <ReposListItem item={item} />
                                </React.Fragment>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    data: state.resultReposFiltered,
});

export default connect(mapStateToProps)(ReposList);
