import React from 'react';
import './App.css';

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            sum: 100,
            months: 2,
            rate: ''
        }   
    }
    
    componentDidMount(){
        let url = "http://www.nbrb.by/API/ExRates/Rates/145?Periodicity=0";
        fetch(url)
            .then(response => {
            response = response.json();
            return response;
            })
            .then( data =>{
                let rate = data.Cur_OfficialRate;
                this.setState({rate});
        });
        
    }
    
    handleChange=(e)=>{
        let elem = e.target;
        this.markProgress(elem);
        this.setState({[elem.id]: +elem.value})
    }
    
    markProgress =( elem )=>{
        let progress = (elem.value-elem.min)/(elem.max-elem.min)*100;
        let background = `-webkit-linear-gradient(left , red 0%, red ${progress}%, #9E9E9E ${progress}%, #9E9E9E 100%)`;
        elem.style.background = background;
    }

    render(){
      const amount = (this.state.sum  + this.state.sum * this.state.months * 0.16/12).toFixed(1);    
      return (
        <div className="App">
            <div className="select-option">
                <div className="bold left">Сумма кредита($)</div>
                <div className="right red bold">{this.state.sum}</div>
                <input type="range" min="100" max="1000" step="100"
                    id="sum"
                    value={this.state.sum}
                    onChange={this.handleChange}
                />
            </div>
            <div className="select-option">
                <div className="bold left">Количество месяцев</div>
                <div className="right red bold">{this.state.months}</div>
                <input type="range" min="1" max="12" step="1" 
                    id="months"
                    value={this.state.months}
                    onChange={this.handleChange}
                />
            </div>
            <p className="bold amount">
                <span>К возврату:</span>
                <span className="red">  ${ amount }  </span>
                <span className="totalbyn">( {(amount * this.state.rate).toFixed(1)} бел.руб. ) </span>
            </p>
        </div>
        )  
    }
}

export default App;
