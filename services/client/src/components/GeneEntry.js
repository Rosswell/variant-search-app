import React from 'react';
import Autosuggest from 'react-autosuggest';
import '../styles/components/_gene-entry.scss'


// const renderSuggestion = suggestion => (
//   <span>{suggestion}</span>
// );
const renderSuggestion = suggestion => suggestion

function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// function renderSuggestionsContainer({ containerProps , children, query }) {
//   return (
//     <div {... containerProps}>
//       {children}
//       <div>
//         Press Enter to search <strong>{query}</strong>
//       </div>
//     </div>
//   );
// }

const getSuggestionValue = suggestion => suggestion;

export default class GeneEntry extends React.Component {
  state = {
    error: undefined,
    value: '',
    geneNames: this.props.geneNames,
    suggestions: []
  }

  renderInputComponent = (inputProps) => (
  <div>
    <form 
      onSubmit={this.handleGeneVerification}
      className="gene-entry"
    >
      <input name='inputGene' {...inputProps} />
      <button className="gene-entry__button">Search for Gene</button>
    </form>
    
  </div>
);

  getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    if (escapeRegexCharacters(inputValue.trim()) === '') {
      return [];
    }
    
    return inputLength === 0 ? [] : (this.props.geneNames.filter(gene =>
      gene.toLowerCase().slice(0, inputLength) === inputValue
    )).slice(0, 6);
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };
  // flesh this out to provide suggestions
  handleGeneVerification = (e) => {
    // error handling for text input
    e.preventDefault();
    const gene = e.target.elements.inputGene.value.trim()
    const error = this.props.fetchData(gene)

    this.setState(() => ({ error }))

    if (!error) {
      e.target.elements.inputGene.value = ''
    }
  };
  render() {
    const { value, suggestions, error } = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Type a gene name',
      value,
      onChange: this.onChange
    };

    return (
      <div>
        {error && <p className="gene-entry-error">{error}</p>}
        <Autosuggest
            // theme={{
            //   input: 'gene-entry__input'
            // }}
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
            renderInputComponent={this.renderInputComponent}
            // renderSuggestionsContainer={renderSuggestionsContainer}
          />
      </div>
    );
  }
}
