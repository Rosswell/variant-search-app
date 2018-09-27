import React from 'react';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import axios from 'axios';


const getColumns = (data) => {
  const columns = [];
  const sample = data[0];
  for (let key in sample) {
    if (key === "_id") continue;
    columns.push({
      accessor: key,
      Header: key
    });
  }
  return columns;
}

export default class GeneTable extends React.Component {
  state = {
    data: [],
    pages: null,
    loading: true,
    geneInput: 'BRAF'
  };

  handleSearchGene = (option) => {
    if (!option) {
      return 'Enter valid gene to search for'
    } else if (this.state.options.indexOf(option) > -1) {
      return 'This option already exists'
    }

    this.setState((prevState) => ({
      options: prevState.options.concat(option)
    }))
  };

  fetchData() {
            // show the loading overlay
            this.setState({loading: true})
            // fetch data
            axios.get(`${process.env.REACT_APP_GENES_SERVICE_URL}:5001/genes/${this.state.geneInput}`)
                .then((res) => { 
                  console.log(res);
                  this.setState({
                    data: res.data.data.variants,
                    loading: false
                  });
                }).catch((err) => { console.log(err); });
          }

  render() {
    return(
      <div>
        <ReactTable
          // data={this.state.data}
          data={this.props.data}
          columns={getColumns(this.state.data)}
          pages={this.state.pages}
          loading={this.state.loading}
          // sorting and filtering handled server-side 
          // TODO: figure out where to do this most efficiently. I would guess server but maybe not
          manual
          // 
          // onFetchData={(state, instance) => {this.fetchData()}}
        />
      </div>
    )
  }
}
