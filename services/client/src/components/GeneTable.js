import React from 'react';
import ReactTable from 'react-table';
import "react-table/react-table.css";
// import axios from 'axios';


const getColumns = (data) => {
  const columns = [];
  const sample = data[0];
  for (let key in sample) {
    let columnFields = {
      accessor: key,
      Header: key.replace('_', ' '),
      headerClassName: 'gene-table__header',
      className: 'gene-table__column',
      minWidth: 175
    };
    switch (key) {
      case 'nucleotide_change':
        columnFields.minWidth = 450;
        break;
      case ('other_mappings' || 'transcripts'):
          columnFields.minWidth = 450;
          columnFields.className = 'gene-table__list-column'
          columnFields.Cell = row => (
            <div>
              {
                row.value ? row.value.replace(new RegExp(',', 'g'), ' ') : row.value
              }
            </div>
          );
          break;
      case 'url':
        columnFields.Cell = row => (
          <a href={row.value}>NCBI Reference</a>
        );
        break;
      case 'submitter_comment':
        columnFields.minWidth = 450;
        break;
      default:
        break;
    }
    columns.push(columnFields);
  }
  return columns;
}


export default class GeneTable extends React.Component {
  state = {
    // pages: this.props.data.length,
    loading: true,
    pageSize: 0
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.data !== this.props.data) {
      this.setState({pageSize:this.props.data.length})
    }
    // console.log(this.props.data.length)
    // this.setState({pageSize:this.props.data.length})
  }
  // componentDidReceiveProps() {
  //   console.log(this.props.data.length)
  //   this.setState({pageSize:this.props.data.length})
  // }
  // comp
  render() {
    // const columns = getColumns(this.props.data)
    // console.log(this.props.data.length)
    return(
      <div>
        <ReactTable
          data={this.props.data}
          columns={getColumns(this.props.data)}
          defaultSorted={[
            {
              id: "genomic_start",
              desc: false
            }
          ]}
          // pages={this.state.pages}
          loading={this.props.loading}
          defaultPageSize={this.state.pageSize}
          noDataText='No genes found with given name'
          // onFetchData={() => {this.props.fetchData(this.props.geneInput)}}
          className="gene-table"
        />
      </div>
    )
  }
}
