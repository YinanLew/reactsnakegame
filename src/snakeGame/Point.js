import React from 'react';

import './style.css';

export default function Point({point}) {

    const style = {
        left: `${point[0]}%`,
        top: `${point[1]}%`
    }

  return (
    <div className='point' style={style} ></div>
  )
}
