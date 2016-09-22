import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Modal } from 'react-bootstrap';

import Categories from './DropdownCategory'
import FilterDate from './DropdownFilterDate'
import DatePicker from './DatePicker'
import Upload from '../containers/UploadApp'
import ExpensesApp from '../containers/ExpensesApp'

import { setVisibilityFilter } from '../actions/expensesActions'

import '../css/dropdown.css'
import '../css/uploadcsv.css'

export class DropDownApp extends Component {
  constructor(props) {
    super(props);

    this.state = {showDatePicker: false, showDropzone: false};
    this.showDateModal   = this.showDateModal.bind(this);
    this.hideDateModal   = this.hideDateModal.bind(this);
    this.showDropzone    = this.showDropzone.bind(this);
    this.hideDropzone    = this.hideDropzone.bind(this);
    this.showAllExpenses = this.showAllExpenses.bind(this);
  }

  showDateModal() {
    this.setState({showDatePicker: true});
  }

  hideDateModal() {
    this.setState({showDatePicker: false});

  }

  showDropzone() {
    this.setState({showDropzone: true});
  }


  hideDropzone() {
    this.setState({showDropzone: false});
  }

  showAllExpenses() {
    this.props.setVisibilityFilter('SHOW_ALL', null, null);
  }

  componentWillReceiveProps(props) {
    if (props.uploadSuccess) {
      this.setState({showDropzone: false});
    }
  }

  render() {
    return (
      <div className='expense-actions-list'>
        <nav id="primary_nav_wrap">
          <ul className='expense-action-list'>
            <li><a href="#">Categorize</a>
              <Categories
                categorize={this.props.categorize}
                selected={this.props.selected}
              />
            </li>
            <li className="current-menu-item"><a href="#" onClick={this.showDropzone}>Upload CSV</a></li>
            <li className="current-menu-item"><a href="#" onClick={this.showAllExpenses}>Show All Expenses</a></li>
            <li className="current-menu-item"><a href="#" onClick={this.showDateModal}>Filter By Date</a></li>
          </ul>
        </nav>
        <Modal {...this.props} show={this.state.showDatePicker} onHide={this.hideDateModal} >
          <DatePicker hideModal = {this.hideDateModal}/>
        </Modal>
        <Modal show={this.state.showDropzone} onHide={this.hideDropzone} bsSize="m"
           aria-labelledby="contained-modal-title-m"
        >
          <Modal.Header className="upload-header">
            <Modal.Title id="contained-modal-title-m"> Upload Your CSV </Modal.Title>
          </Modal.Header>
          <Modal.Body className="upload-body">
            <Upload {...this.props}/>
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { startDate, endDate } = state.expensesReducer

  return {
    startDate: startDate,
    endDate: endDate
  }
}

export default connect(
  mapStateToProps,
  {
    setVisibilityFilter: setVisibilityFilter
  }
)(DropDownApp)
// <Modal {...this.props} show={this.state.showDropzone} onHide={this.hideDropzone} >
//   <Upload />
// </Modal>
