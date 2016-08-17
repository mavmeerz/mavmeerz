import React from 'react'

const GoalTotal = ({total}) => (
  total ?
    <div className='total'> GOAL TOTAL: ${total.toFixed(2)} </div> :
    <div className='total'>GOAL TOTAL: $0</div>
)

export default GoalTotal
