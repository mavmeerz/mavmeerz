import React, {Component} from 'react'
import '../css/dropdown.css'
import Categories from './DropdownCategory'
import Accounts from './DropdownAccount'
import FilterDate from './DropdownFilterDate'
import DatePicker from './DatePicker'
import { Modal } from 'react-bootstrap';
import { receiveExpenses } from '../actions/expensesActions'
// import Dropzone from 'react-dropzone';
import Upload from '../containers/UploadApp'
export class DropDownApp extends Component {
  constructor(props) {
    super(props);

    console.log('====> in Dropdown props are: ', props);
    this.state = {showDatePicker: false, showDropzone: false};
    this.showDateModal = this.showDateModal.bind(this);
    this.hideDateModal = this.hideDateModal.bind(this);
    this.showDropzone  = this.showDropzone.bind(this);
    this.hideDropzone  = this.hideDropzone.bind(this);
    this.dodeezhit     = this.dodeezhit.bind(this);
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

  receiveExpenses() {
    console.log('receiveExpenses');
    this.props.receiveExpenses(this.props.allExpenses);
  }

    render() {

      console.log('====> in Dropdown props are: ', this.props);
      return (
        <div>
          <nav id="primary_nav_wrap">
            <ul>
              <li class="current-menu-item"><a href="#">Add</a></li>
              <li class="current-menu-item"><a href="#" onClick={this.showDropzone}>Upload CSV</a></li>
              <li class="current-menu-item"><a href="#" onClick={this.receiveExpenses}>Show All Expenses</a></li>
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
            <DatePicker/>
          </Modal>
          <Modal {...this.props} show={this.state.showDropzone} onHide={this.hideDropzone} >
            <Upload />
          </Modal>
        </div>
      )
    }
}

export default DropDownApp

// onClick={this.toggle}
