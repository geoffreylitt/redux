import React from 'react'
import './styles.css'

const WcExtraData = ({extraData}) => {
  return <span className="wc--extra-data">
    {extraData && extraData["DueDate"]}
  </span>
}

export default WcExtraData;
