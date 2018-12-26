import React, {Component} from 'react';
import Tabs from "./display/tabs";

let web3 = require('./utils/InitWeb3')
let fundingFactoryInstance = require('./eth/getInstance')

class App extends Component {

    state = {
        currentAccount: '',
    }

    async componentWillMount() {
        let accounts = await web3.eth.getAccounts()

        this.setState({
            currentAccount: accounts[0],
        })
    }

    render() {

        let {currentAccount} = this.state

        return (
            <div className="App">
                <h1>河马众筹</h1>
                <p>当前账户: {currentAccount}</p>

                <Tabs/>
            </div>
        );
    }
}

export default App;
