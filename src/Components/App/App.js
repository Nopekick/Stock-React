import React, { Component } from 'react';
import './App.css';
import Company from '../Company/Company'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      names: [],
      companies: [],
      baseUrl: "https://api.iextrading.com/1.0/stock/",
      endUrl: "/batch?types=quote,chart&range=1m&last=10",
      inputValue: "",
      errorStatus: ""
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleErrors = this.handleErrors.bind(this)
    this.handleName = this.handleName.bind(this)

    setInterval(3000, ()=>{
      console.log("ok")
    })
  }

  handleSubmit(event){
    event.preventDefault()
    this.setState({errorStatus: ""})
    const names = this.state.names.slice()
    names.push(this.state.inputValue)
    this.setState({names})
    this.handleName(this.state.inputValue)
    this.setState({inputValue: ""})
  }

  handleName(name){
    fetch(`${this.state.baseUrl}${name}${this.state.endUrl}`)
    .then(this.handleErrors)
    .then(data => data.json())
    .then(data => {
      console.log(data)
      const company = {
        name: data.quote.companyName,
        symbol: data.quote.symbol,
        sector: data.quote.sector,
        curPrice: data.quote.latestPrice,
        high: data.quote.high,
        low: data.quote.low,
        pe: data.quote.peRatio,
        mktCap: data.quote.marketCap
      }
      const companies = this.state.companies.slice();
      companies.push(company);
      this.setState({companies});
    })
  }

  handleErrors(response) {
    if (!response.ok) {
        this.setState({errorStatus: "The company could not be found. Please try again"})
        throw Error
    }
    return response;
  }

  handleChange(event){
    this.setState({inputValue: event.target.value})
  }

  render() {
    const label = <span style={{"color": "white", "marginLeft": "10px"}}> Type company symbol </span>
    const status = <h2 style={{"textAlign":"center"}}> {this.state.errorStatus} </h2>
    let companies = this.state.companies.map((company, i)=>{
      return <Company {...company} key={i} />
    })


    return (
      <div>
        {status}
        <div style={{"display": "flex", "justifyContent": "center", "marginTop": "30px"}}>
          <form className="form" onSubmit={this.handleSubmit}>
             {label}<input className="input" type="text" value={this.state.inputValue} onChange={this.handleChange}/>
            <button className="button"><strong>Add</strong></button>
          </form>
        </div>
        <div className="container">
          {companies}
        </div>
      </div>
    );
  }
}

export default App;
