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
        console.log(res);
        this.setState({
          variantData: res.data.data.variants,
          loading: false
        });
      }).catch((err) => { 
        console.log(err);
        return err;
    });
  };

  // load default data
  componentDidMount() {
    axios.get(`${process.env.REACT_APP_GENES_SERVICE_URL}:5001/gene_names/`)
        .then((res) => { 
          console.log('gene names getted successfully');
          this.setState({
            geneSuggestions: res.data.data.gene_names
          });
        }).catch((err) => { 
          console.log(err);
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
            geneInput={this.state.searchedGene}
            fetchData={this.fetchData}
            loading={this.state.loading}
          />
        }
      </div>
    )
  }
};

ReactDOM.render(<App />, document.getElementById('root'));