import React, {Component} from 'react'
import { connect } from 'react-redux'
import '../css/dropdown.css'
import Categories from './DropdownCategory'
import Accounts from './DropdownAccount'
import FilterDate from './DropdownFilterDate'
import DatePicker from './DatePicker'
import { Modal } from 'react-bootstrap';
<<<<<<< 0f1eda63f1eb4a213107265495f3aafadb016c92
=======
<<<<<<< b03e31c2ea902e1003ea04417914e4fff2cfcae7
import { receiveExpenses } from '../actions/expensesActions'
// import Dropzone from 'react-dropzone';
>>>>>>> [feat] filter date is working but triggering twice and returning the same expenses twice
import Upload from '../containers/UploadApp'
import ExpensesApp from '../containers/ExpensesApp'
import { setVisibilityFilter } from '../actions/expensesActions'

export class DropDownApp extends Component {
  constructor(props) {
    super(props);

    console.log('>>>>> Dropdown props are: ', props)

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

<<<<<<< 0f1eda63f1eb4a213107265495f3aafadb016c92
  showAllExpenses() {
    this.props.setVisibilityFilter('SHOW_ALL', null, null);
=======
  receiveExpenses() {
    console.log('receiveExpenses');
    this.props.receiveExpenses(this.props.allExpenses);

  dodeezhit() {
    console.log('dodeeezhit');
    this.setState(
      {
        startDate: null,
        endDate: null
      }
    )
    // this.props.setVisibilityFilter('SHOW_ALL', null, null)
    this.props.setVisibilityFilter('SHOW_ALL', this.state.endDate, this.state.endDate)
>>>>>>> [feat] filter date is working but triggering twice and returning the same expenses twice
  }

    render() {
      return (
        <div>
          <nav id="primary_nav_wrap">
            <ul>
              <li class="current-menu-item"><a href="#">Add</a></li>
              <li class="current-menu-item"><a href="#">Delete</a></li>
              <li class="current-menu-item"><a href="#" onClick={this.showDropzone}>Upload CSV</a></li>
              <li class="current-menu-item"><a href="#" onClick={this.showAllExpenses}>Show All Expenses</a></li>
              <li class="current-menu-item"><a href="#" onClick={this.showDateModal}>Filter By Date</a></li>
              <li><a href="#">Categorize</a>
                <Categories
                  categorize={this.props.categorize}
                />
              </li>
              <li><a href='#'>Select Account</a>
                <Accounts
                  selectAccount={this.props.selectAccount}
                />
              </li>
            </ul>
          </nav>
          <Modal {...this.props} show={this.state.showDatePicker} onHide={this.hideDateModal} >
            <DatePicker hideModal = {this.hideDateModal}/>
          </Modal>
          <Modal {...this.props} show={this.state.showDropzone} onHide={this.hideDropzone} >
            <Upload />
          </Modal>
        </div>
      )
    }
}

function mapStateToProps(state) {
  console.log('Dropwndown mapStateToProps state is: ', state);
  const { startDate, endDate } = state.expensesReducer

  return {
    startDate: startDate,
    endDate: endDate,
  }
}

export default connect(
  mapStateToProps,
  {
    setVisibilityFilter: setVisibilityFilter
  }
)(DropDownApp)
