import React from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";

const largeColumnSize = 450;
const defaultColumnSize = 175;

const getColumns = data => {
  const columns = [];
  const sample = data[0];
  for (let key in sample) {
    let columnFields = {
      id: key,
      accessor: key,
      Header: key.replace("_", " "),
      headerClassName: "gene-table__header",
      className: "gene-table__column"
    };
    switch (key) {
      case "nucleotide_change":
      case "other_mappings":
      case "transcripts":
        columnFields.minWidth =
          key === "transcripts" ? defaultColumnSize : largeColumnSize;
        columnFields.Cell = row => (
          // replacing commas with spaces allows word-wrap to split
          // the list into separate lines
          <div>{row.value && row.value.replace(new RegExp(",", "g"), " ")}</div>
        );
        break;
      case "url":
        columnFields.Cell = row => (
          // matches the url domain to prevent urls from being excessively long
          <a href={row.value}>
            {row.value && row.value.match(/^([^_]*?\/){3}/)[0]}
          </a>
        );
        break;
      case "submitter_comment":
        columnFields.minWidth = largeColumnSize;
        break;
      case "id":
        columnFields.minWidth = 50;
        break;
      default:
        columnFields.minWidth = defaultColumnSize;
        break;
    }
    columnFields.wordSpacing = columnFields.minWidth;
    columns.push(columnFields);
  }
  return columns;
};

export default class GeneTable extends React.Component {
  state = {
    loading: true,
    pageSize: -1,
    selected: null
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.data !== this.props.data) {
      this.setState({
        pageSize: Math.min(this.props.data.length, 20)
      });
    }
  }

  render() {
    return (
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
          loading={this.props.loading}
          defaultPageSize={this.state.pageSize}
          noDataText="No genes found with provided name"
          className="gene-table"
          pageSize={this.state.pageSize}
          // This will force the table body to overflow and scroll, since there is not enough room
          style={{ height: 500 }}
          // modifying the background of the row to reflect the selection of a row
          getTrProps={(state, rowInfo) => {
            if (rowInfo && rowInfo.row) {
              return {
                onClick: e => {
                  this.setState(prevState => {
                    if (prevState.selected === rowInfo.index) {
                      return { selected: null };
                    }
                    return { selected: rowInfo.index };
                  });
                },
                style: {
                  transition: ".2s ease",
                  background:
                    rowInfo.index === this.state.selected ? "#6DC281" : "white",
                  color:
                    rowInfo.index === this.state.selected ? "white" : "black"
                }
              };
            } else {
              return {};
            }
          }}
          // TODO: bring pagination buttons to the top
        />
      </div>
    );
  }
}
