import React from 'react'
import '../css/dropdown.css'
import Categories from './DropdownCategory'
import Accounts from './DropdownAccount'
import Datepicker from './Datepicker'


const Dropdown = ({categorize, selectAccount}) => {

  return (
    <div>
      <nav id="primary_nav_wrap">
        <ul>
          <li class="current-menu-item"><a href="#">Add</a></li>
          <li class="current-menu-item"><a href="#">Delete</a></li>
          <li class="current-menu-item"><a href="#">Upload CSV</a></li>
          <li class="current-menu-item" onClick={Datepicker}><a href="#">Filter By Date <Datepicker /></a>
          </li>
          <li><a href="#">Categorize</a>
            <Categories
              categorize={categorize}
            />
          </li>
          <li><a href='#'>Select Account</a>
            <Accounts
              selectAccount={selectAccount}
            />
          </li>
        </ul>
      </nav>
    </div>
  )

}

export default Dropdown
