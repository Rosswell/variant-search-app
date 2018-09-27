import React from 'react';

export default class GeneEntry extends React.Component {
  state = {
    error: undefined
  }
  // flesh this out to provide suggestions
  handleGeneVerification = (e) => {
    // error handling for text input
    e.preventDefault();
    const gene = e.target.elements.option.value.trim()
    const error = this.props.fetchData(gene)

    this.setState(() => ({ error }))

    if (!error) {
      e.target.elements.gene.value = ''
    }
  };
  render() {
    return (
      <div>
        {this.state.error && <p className="add-option-error">{this.state.error}</p>}
        <form 
        onSubmit={this.handleGeneVerification}
        className="add-option"
        >
          <input className='add-option__input' type="text" name ="option" />
          <button className="button">Search for Gene</button>
        </form>
      </div>
    );
  }
}
