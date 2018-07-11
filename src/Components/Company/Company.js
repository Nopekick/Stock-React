import React, {Component} from 'react';
import './Company.css';

const Company = ({name, symbol,sector, curPrice, high, low, pe, mktCap}) => {
  return <div className="item">
        <p> <strong>{name}</strong>  ({symbol}) </p>
        <p> Sector: {sector} </p>
        <p> Market Cap: {mktCap} </p>
        <p> Current Price: {curPrice} </p>
        <p> High: {high}  </p>
        <p> Low: {low} </p>
        <p> Price/Earning: {pe} </p>
      </div>
}

export default Company;
