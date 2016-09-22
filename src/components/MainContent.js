import React, { Component } from 'react'
import * as util from '../util/style_functions'


class MainContent extends Component {

  componentDidMount(){
     util.styleLogo("rgba(255,255,255, 0.8)")
  }

  render(){
    return (
      <main className="auth-view" role='main' class='main-content'>
        <div className='inner above-fold'>

            <div className="logo-and-phrase">
              <h1 className="logo" id='title'>ZENMO</h1>
              <p className="phrase">Find Your Path To Financial Nirvana</p>
            </div>

        </div>
      </main>
    )
  }
}

export default MainContent
