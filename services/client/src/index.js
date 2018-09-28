import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import GeneTable from './components/GeneTable';
import Header from './components/Header';
import GeneEntry from './components/GeneEntry';
import './styles/styles.css';

class App extends React.Component {
  state = {
    searchedGene: '',
    variantData: [],
    geneSuggestions: []
  };

  fetchData = (searchedGene) => {
    // show the loading overlay
    this.setState({
      loading: true,
      searchedGene: searchedGene
    });

    // fetch data
    axios.get(`${process.env.REACT_APP_GENES_SERVICE_URL}:5001/genes/${searchedGene}`)
      .then((res) => { 
        this.setState({
          variantData: res.data.data.variants,
          loading: false
        });
      }).catch((err) => { 
        console.error(err);
        return err;
    });
  };

  // load gene names for the live suggestions upon mounting
  componentDidMount() {
    axios.get(`${process.env.REACT_APP_GENES_SERVICE_URL}:5001/gene_names/`)
      .then((res) => { 
        this.setState({
          geneSuggestions: res.data.data.gene_names
        });
      }).catch((err) => { 
        console.error(err);
        return err;
    });
  };

  render() {
    return (
      <div>
        <Header />
        <GeneEntry 
          fetchData={this.fetchData}
          geneNames={this.state.geneSuggestions}
        />
        <br/>
        {
          this.state.searchedGene &&
          <GeneTable 
            data={this.state.variantData}
            loading={this.state.loading}
          />
        }
      </div>
    )
  }
};

ReactDOM.render(<App />, document.getElementById('root'));