import React from 'react'
import { Link, IndexLink } from 'react-router';

import Dropdown from './Dropdown'
import Categories from './DropdownCategory'

//css passed fown from dashboard.css
import '../css/dropdown.css'

const DashLinks = () => {
  return (
    <div className='dash-links-container'>

      <ul className="dash-paths">
        <li className="dash-link"><Link to='/'>TRANSACTIONS</Link></li>
        <li className="dash-link"><Link to='/budget'>BUDGET</Link></li>
      </ul>

    <nav id="primary_nav_wrap">
      <ul className='dash-paths'>
        <li><a href="#">Categorize</a>
          <Categories

          />
        </li>
        <li className="current-menu-item"><a href="#" >Upload CSV</a></li>
        <li className="current-menu-item"><a href="#" >Show All Expenses</a></li>
        <li className="current-menu-item"><a href="#" >Filter By Date</a></li>
      </ul>
    </nav>

    </div>
  )
}

export default DashLinks

// <Dropdown/>
