import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { filterBranch } from '../redux';
import { FilterBranch } from '../FilterBranch';
import '../App.css';

class Filter extends React.Component {
    handleLinkClick = (fs) => {
        this.props.dispatch(filterBranch(fs));
    };

    render() {
        return (
            <div className="filter-container">
                <p>
                    <NavLink
                        className="filter-nav-link"
                        to="/all"
                        onClick={() => this.handleLinkClick(FilterBranch.ALL)}
                        activeStyle={{ color: 'red' }}
                    >
                        <span>All</span>
                    </NavLink>
                    <NavLink
                        className="filter-nav-link"
                        to="/master"
                        onClick={() =>
                            this.handleLinkClick(FilterBranch.MASTER)
                        }
                        activeStyle={{ color: 'red' }}
                    >
                        <span>Master</span>
                    </NavLink>
                    <NavLink
                        className="filter-nav-link"
                        to="/other"
                        onClick={() => this.handleLinkClick(FilterBranch.OTHER)}
                        activeStyle={{ color: 'red' }}
                    >
                        <span>Other</span>
                    </NavLink>
                    <NavLink
                        className="filter-nav-link"
                        to="/none"
                        onClick={() => this.handleLinkClick(FilterBranch.NONE)}
                        activeStyle={{ color: 'red' }}
                    >
                        <span>None</span>
                    </NavLink>
                </p>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    filterBranch: state.filterBranch,
});

export default connect(mapStateToProps)(Filter);
