import React from 'react';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import axios from 'axios';


const getColumns = (data) => {
  const columns = [];
  const sample = data[0];
  for (let key in sample) {
    if (key === "gene") {
      columns.push({
        accessor: key,
        Header: key,
        pivot: true
      });
    } else {
      columns.push({
        accessor: key,
        Header: key
      });
    };
  }
  return columns;
}


export default class GeneTable extends React.Component {
  state = {
    pages: null,
    loading: true
  };

  // handleSearchGene = (option) => {
  //   if (!this.state.geneInput) {
  //     return 'Enter valid gene to search for'
  //   } else if (this.state.data.indexOf(option) > -1) {
  //     return 'This option already exists'
  //   }

  //   this.setState((prevState) => ({
  //     options: prevState.options.concat(option)
  //   }))
  // };

  // fetchData = (searchedGene) => {
  //   // show the loading overlay
  //   this.setState({loading: true})
  //   // fetch data
  //   axios.get(`${process.env.REACT_APP_GENES_SERVICE_URL}:5001/genes/${searchedGene}`)
  //       .then((res) => { 
  //         console.log(res);
  //         this.setState({
  //           data: res.data.data.variants,
  //           loading: false
  //         });
  //       }).catch((err) => { console.log(err); });
  // }

  render() {
    return(
      <div>
        <ReactTable
          // data={this.state.data}
          data={this.props.data}
          columns={getColumns(this.props.data)}
          // pivotBy={["gene"]}
          pages={this.state.pages}
          loading={this.props.loading}
          // sorting and filtering handled server-side 
          // TODO: figure out where to do this most efficiently. I would guess server but maybe not
          manual
          // 
          onFetchData={(state, instance) => {this.props.fetchData(this.props.geneInput)}}
        />
      </div>
    )
  }
}
