import React from 'react';

const Total = ({total}) => (
  total ?
    <div className='total'> TOTAL: ${total.toFixed(2)} </div> :
    <div>Total: </div>
)

export default Total
