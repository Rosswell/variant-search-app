import React from 'react';

export default class GeneEntry extends React.Component {
  state = {
    error: undefined
  }
  // flesh this out to provide suggestions
  handleGeneVerification = (e) => {
    // error handling for text input
    e.preventDefault();
    const gene = e.target.elements.userInput.value.trim()
    const error = this.props.fetchData(gene)

    this.setState(() => ({ error }))

    if (!error) {
      e.target.elements.userInput.value = ''
    }
  };
  render() {
    return (
      <div>
        {this.state.error && <p className="gene-entry-error">{this.state.error}</p>}
        <form 
        onSubmit={this.handleGeneVerification}
        className="gene-entry"
        >
          <input className='gene-entry__input' type="text" name ="userInput" />
          <button className="button">Search for Gene</button>
        </form>
      </div>
    );
  }
}
