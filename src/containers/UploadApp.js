<<<<<<< 8e7e5e9e8eb040c81b74cfc4627763c94379b9fc
/*
UploadApp App container (smart component) in charge of connecting React to the
store/state and transforming the state in a way that can be used by the
UploadAppButton component.
  -Renders UploadAppButton
*/
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import parse from 'csv-parse'
import Papa from '../../PapaParse-4.1.2'
// import Papa from 'babyparse'
import { uploadCSV, parsingCSV } from '../actions/expensesActions.js'
const Dropzone = require('react-dropzone');

export default class UploadApp extends Component {

  constructor(props){
    super(props)
    this.onDrop = this.onDrop.bind(this)
  }

  onDrop(files){
    var that = this;
    files.forEach((file) => {
      that.props.parsingCSV()
       parseCSV(file)
       .then(function(result) {
         that.props.uploadCSV(result)
         console.log('file sent through onDrop', result);
       })
       .catch(function(error) {
         console.log(error);
       })

    });
  }

  render () {
    return (
      <div>
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
        console.log('results from complete', results);
        if (results.data.length !== 0) {
          //---------
          console.log('papa results', results.data)
          //----------
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
    console.log('UploadApp [state] is', state);
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
=======
// import React, { Component, PropTypes } from 'react'
// import { connect } from 'react-redux'
// import {fetchCSV,
//   uploadRequest,
//   uploadSuccess
// } from '../actions/uploadActions.js'
//
// var Dropzone = require('react-dropzone');
//
// export default class UploadApp extends Component {
//   onDrop(files){
//       //  var req = request.post('/upload');
//       // uploadRequest();
//        files.forEach((file)=> {
//          fetchCSV(file);
//         //  uploadSuccess();
//          console.log('file sent through onDrop', file);
//         // req.attach(file.name, file);
//        });
//
//       //  req.end(callback);
//    }
//
// function mapStateToProps(state) {
//   console.log('STATE from upload', state);
//   const { expenses, isUploading } = state.uploadReducer
//   console.log('EXPENSES from upload: ', expenses);
//   return {
//     expenses: expenses,
//     isUploading: isUploading
//   }
// }
//
// export default connect(
//   mapStateToProps,
//   { fetchCSV: fetchCSV }
// )(UploadApp)
>>>>>>> all is good
