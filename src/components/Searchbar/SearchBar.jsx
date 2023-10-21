import { Component } from "react";
import PropTypes from 'prop-types';
import {
  SearchForm,
  SearchInput,
  SearchButton,
  SearchSpan,
} from './SearchBar.styled';

class SearchBar extends Component{
    state = {
        inputValue: '',
    };

    handleChange = event => {
        this.setState({ inputValue: event.target.value })
    };

    handleSubmit = event => {
        event.preventDefault();
        this.props.onSubmit(this.state.inputValue);
        this.setState.inputValue('');
    };

    
    render() {
        return (
            <header>
                <SearchForm onSubmit={this.handleSubmit}>
                    <SearchButton>
                        <SearchSpan>Search</SearchSpan>
                    </SearchButton>
                    <SearchInput
                        name="searchName"
                        type="text"
                        id="search"
                        value={this.state.inputValue}
                        onChange={this.handleChange}
                    />
                </SearchForm>
            </header>
        );
    }
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;

