import React from 'react';
import { connect } from 'react-redux';
import { filterLanguage } from '../redux';
import { allLanguage } from '../Common';
import '../App.css';

class Language extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            language: '',
        };
    }

    handleLanguageChange = (e) => {
        this.setState({ language: e.target.value.trim() });

        this.props.dispatch(filterLanguage(e.target.value.trim()));
    };

    render() {
        const { data } = this.props;

        const distinctLanguages = [
            allLanguage,
            ...new Set(data.map((x) => x.language)),
        ];

        return (
            <div>
                <label className="language-label">Language:</label>
                <select
                    className="language-select"
                    value={this.state.language}
                    onChange={this.handleLanguageChange}
                >
                    {distinctLanguages.map((language) => (
                        <option key={language}>{language}</option>
                    ))}
                </select>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    language: state.language,
    data: state.resultRepos,
});

export default connect(mapStateToProps)(Language);
