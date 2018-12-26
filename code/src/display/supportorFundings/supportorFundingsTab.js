import React, {Component} from 'react'
import {getSupportorFundingDtails} from "../../eth/interaction";
import CardLists from '../common/cardLists'

let web3 = require('../../utils/InitWeb3')
let {fundingFactoryInstance} = require('../../eth/getInstance')

class SupportorFundingsTab extends Component {

    state = {
        supportorFundingDetails: [],
    }

    async componentWillMount() {
        let supportorFundingDetails = await getSupportorFundingDtails()
        console.log("222:", supportorFundingDetails)

        this.setState({
            supportorFundingDetails,
        })
    }

    render() {

        let {supportorFundingDetails} = this.state
        return (
            <CardLists details={supportorFundingDetails}/>
        )
    }
}

export default SupportorFundingsTab
