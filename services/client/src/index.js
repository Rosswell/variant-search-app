import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import GeneTable from './components/Table'


class App extends React.Component {
    constructor() {
        super();
        this.getGenes();
    }
    getGenes() {
        axios.get(`${process.env.REACT_APP_GENES_SERVICE_URL}:5001/genes/RHD`)
        .then((res) => { console.log(res); })
        .catch((err) => { console.log(err); });
    }

    render() {
      return (
        <div>
          <GeneTable />
        </div>
      )
    }
};

ReactDOM.render(<App />, document.getElementById('root'));