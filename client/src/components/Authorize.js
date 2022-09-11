import React, {Component} from 'react';
import '../App.css';

class Authorize extends Component {
  constructor(props){
    super(props);
    this.state = {apiResponse: "No response"};
  }

  callAPI(){
    fetch("http://localhost:8888/")
      .then(res => res.text())
      .then(res => this.setState({apiResponse:res}));
  }

  componentWillMount() {
    this.callAPI();
  }

  render() {
    return (
      <a href={this.state.apiResponse}>Login</a>
    )
  }
}



export default Authorize;