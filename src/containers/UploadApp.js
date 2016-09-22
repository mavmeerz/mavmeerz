/*
UploadApp App container (smart component) in charge of connecting React to the
store/state and transforming the state in a way that can be used by the
UploadAppButton component.
  -Renders UploadAppButton
*/
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import '../css/uploadcsv.css'
import Papa from '../util/papaparse.min.js'
import { uploadCSV, parsingCSV } from '../actions/expensesActions.js'
// import { ErrorAlert } from 'pui-react-alerts';
import Dropzone from 'react-dropzone';

import guestExpenses from '../assets/parsedGuestExpenses'

export default class UploadApp extends Component {

  constructor(props){
    super(props)
    this.state = {account: null};
    this.onDrop = this.onDrop.bind(this);
    this.addAccountToState = this.addAccountToState.bind(this);
  }

  addAccountToState(event) {
    this.setState({account: event.target.value});
  }

  onDrop(files){
    var that = this;

    this.props.parsingCSV()
     parseCSV(files[0])
       .then(result => {
         if (that.state.account === null) {
           that.setState({account: 'Undefined Account'})
         }

         that.props.uploadCSV(that.state.account, result)
       })
       .catch(error => console.error(error));
  }

  uploadGuestUserExpenses(){

    this.setState({account: "Guest Account"})
    this.props.uploadCSV(this.state.account, guestExpenses)
  }

  componentDidMount(){
    const username = window.localStorage.getItem('username')
    if (username === "Guest User") {
      this.props.uploadCSV(this.state.account, guestExpenses)
    }
  }

  render () {
    return (
      <div className="uploadcsv">
        <Dropzone className="dropzone" onDrop={this.onDrop}>
          <div> Try dropping some files here, or click to select files to upload.</div>
        </Dropzone>
      </div>
    );
  }
}

UploadApp.PropTypes = {
  uploadCSV: PropTypes.func.isRequired
}

function parseCSV(file) {
  return new Promise(function(resolve, reject) {
    Papa.parse(file.preview, {
      header: true,
      download: true,
      complete: function(results) {
        if (results.data.length !== 0) {
          resolve(results.data);
        } else {
          reject('nothing was parsed!');
        }
      }
    })
  });
}

export default connect(
  (state) => {
    const { expenses, isFetching } = state.expensesReducer
    return {
      expenses: expenses,
      isFetching: isFetching
    }
  },
  {
    uploadCSV: uploadCSV,
    parsingCSV: parsingCSV
  }
)(UploadApp)

// <div className="bank"> Bank Account: </div>
//   <div className="upload-input-container">
//     <input
//       className="upload-input"
//       type="text"
//       placeholder="Account Name"
//       value={this.state.account}
//       onChange={this.addAccountToState}
//     />
//   </div>
