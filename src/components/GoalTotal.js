import React from 'react'

export const GoalTotal = ({Total}) => (
  total ?
    <div className='total'> GOAL TOTAL: ${total.toFixed(2)} </div> :
    <div className='total'>GOAL TOTAL: $0</div>
)
