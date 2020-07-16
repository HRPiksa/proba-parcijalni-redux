import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteItem } from '../redux';
import '../App.css';

class ReposListItem extends React.Component {
    handleClickDel = (event) => {
        event.stopPropagation();

        const { item } = this.props;
        this.props.dispatch(deleteItem(item.id));
    };

    render() {
        const { item } = this.props;

        return (
            <tr>
                <td>{item.name}</td>
                <td>{item.language}</td>
                <td>{item.default_branch}</td>
                <td>
                    <button
                        className="repo-list-button"
                        onClick={this.handleClickDel}
                    >
                        X
                    </button>
                </td>
            </tr>
        );
    }
}

ReposListItem.propTypes = {
    item: PropTypes.object,
};

const mapStateToProps = (state) => ({
    isLoading: state.isLoading,
});

export default connect(mapStateToProps)(ReposListItem);
