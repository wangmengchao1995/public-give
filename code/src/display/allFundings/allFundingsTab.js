import React, {Component} from 'react'
import {getAllFundingDetails, supportFunding} from "../../eth/interaction";
import CardLists from '../common/cardLists'
import {Dimmer, Form, Label, Loader, Segment} from 'semantic-ui-react'

let web3 = require('../../utils/InitWeb3')
let {fundingFactoryInstance} = require('../../eth/getInstance')

class AllFundingsTab extends Component {

    state = {
        allFundingDetails: [],
        selectedFunding: [],
        active: false,
    }

    async componentWillMount() {
        let allFundingDetails = await getAllFundingDetails()
        console.log("000:", allFundingDetails)

        this.setState({
            allFundingDetails,
        })
    }

    //传递给CardList的回调函数，用于获取用户在页面上点击的合约的详细信息
    handleFundingCardClick = (selectedFunding) => {
        console.log(selectedFunding)
        this.setState({selectedFunding})
    }

    handleSupport = async () => {
        let [fundingAddress, manager, projectName, targetMoney, supportMoney, leftTime, supportorCounts, currentBalance,] = this.state.selectedFunding
        // console.log("项目名称: ", projectName)
        // console.log("项目地址: ", fundingAddress)
        // console.log("支持金额: ", supportMoney)
        this.setState({active : true})

        try {
            let res = await supportFunding(fundingAddress, supportMoney)
            alert(`参与众筹成功！`)
            this.setState({active : false})
            window.location.reload(true)
        } catch (e) {
            alert(`参与众筹失败！`)
            this.setState({active : false})
        }
    }

    render() {

        let {allFundingDetails} = this.state

        let [
            fundingAddress,
            manager,
            projectName,
            targetMoney,
            supportMoney,
            leftTime,
            supportorCounts,
            currentBalance,
        ] = this.state.selectedFunding

        return (
            <div>
                <CardLists details={allFundingDetails}
                           handleFundingCardClick={this.handleFundingCardClick}
                />

                <div>
                    <h3>参与众筹</h3>
                    <Dimmer.Dimmable as={Segment} dimmed={this.state.active}>
                        <Dimmer active={this.state.active} inverted>
                            <Loader>支持中</Loader>
                        </Dimmer>
                        <Form onSubmit={this.handleSupport}>
                            <Form.Input type='text' value={projectName || ''} label='项目名称:'/>
                            <Form.Input type='text' value={fundingAddress || ''} label='项目地址:'/>
                            <Form.Input type='text' value={supportMoney || ''} label='支持金额:'
                                        labelPosition='left'>
                                <Label basic>￥</Label>
                                <input/>
                            </Form.Input>

                            <Form.Button primary content='参与众筹'/>
                        </Form>
                    </Dimmer.Dimmable>
                </div>
            </div>
        )
    }
}

export default AllFundingsTab
