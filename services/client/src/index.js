import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';


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
          <section className="section">
              <div className="container">
                  <div className="columns">
                      <div className="column">
                          <br/>
                          <h1 className="title">All Genes</h1>
                          <hr/>
                          <br/>
                      </div>
                  </div>
              </div>
          </section>
      )
    }
};

ReactDOM.render(<App />, document.getElementById('root'));