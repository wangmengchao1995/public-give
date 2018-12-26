import React, {Component} from 'react'
import {createFunding, createRequest, getCreatorFundingDetails, showAllRequests} from '../../eth/interaction'
import CardLists from "../common/cardLists";
import RequestsTable from "../common/requestLists";
import {Dimmer, Form, Label, Button, Loader, Segment} from 'semantic-ui-react'

let web3 = require('../../utils/InitWeb3')

// let {fundingFactoryInstance, fundingInstance, newFundingInstance} = require('../../eth/getInstance')

class CreatorFundingsTab extends Component {

    state = {
        //展示自己发起的合约详情
        creatorFundingDetails: [],
        //点击项目图片时，获取当前项目的详情
        selectedFunding: [],


        //创建合约相关
        active: false,
        projectName: '',
        supportMoney: '',
        targetMoney: '',
        duration: '',

        //花费请求相关
        requestDesc: '',
        requestMoney: '',
        requestSellerAddress: '',

        //所有的花费请求数组
        requestDetails: [],
    }

    async componentWillMount() {

        let creatorFundingDetails = await getCreatorFundingDetails()
        console.log("11111:", creatorFundingDetails)

        this.setState({
            creatorFundingDetails,

        })
    }

    //++++++++++++++++++++ 处理创建众筹表单逻辑 开始 ++++++++++++++

    handleChange = (e, {name, value}) => this.setState({[name]: value})

    handleCreate = async () => {
        console.log(this.state)

        let {creatorFundingDetails, active, projectName, supportMoney, targetMoney, duration} = this.state

        try {
            let res = await createFunding(projectName, targetMoney, supportMoney, duration)
            alert(`合约创建成功!`)
        } catch (e) {
            alert(`合约创建失败!`)
        }
    }
    //++++++++++++++++++++ 处理创建众筹表单逻辑 结束 ++++++++++++++


    //传递给CardList的回调函数，用于获取用户在页面上点击的合约的详细信息
    handleFundingCardClick = (selectedFunding) => {
        console.log(selectedFunding)
        this.setState({selectedFunding})
    }


    //++++++++++++++++++++ 花费请求相关函数 开始 ++++++++++++++
    //1. 创建花费请求
    handleCreateRequest = async () => {
        let {supportMoney, targetMoney, duration, requestDesc, requestMoney, requestSellerAddress} = this.state
        console.log("花费描述：", requestDesc)
        console.log("花费金额：", requestMoney)
        console.log("花费商家地址：", requestSellerAddress)

        // let [fundingAddress, manager, projectName, targetMoney1, supportMoney, leftTime, supportorCounts, currentBalance] = this.state.selectedFunding
        let fundingAddress = this.state.selectedFunding[0]

        //函数原型
        // createRequest = (fundingAddress, description, cost, sellerAddress) => {
        try {
            let res = await createRequest(fundingAddress, requestDesc, requestMoney, requestSellerAddress)
            alert(`创建花费申请成功！`)
        } catch (e) {
            alert(`创建花费申请失败！`)
        }
    }
    //2. 获取花费请求
    handleGetAllRequests = async () => {
        try {

            let fundingAddress = this.state.selectedFunding[0]
            let requestDetails = await showAllRequests(fundingAddress)
            console.log(requestDetails)

            this.setState({requestDetails})

        } catch (e) {
            console.log(e)
        }
    }


    //++++++++++++++++++++ 花费请求相关函数 结束 ++++++++++++++

    render() {

        let {
            creatorFundingDetails, selectedFunding, active, projectName,
            supportMoney, targetMoney, duration, requestDesc, requestMoney, requestSellerAddress,
            requestDetails,
        } = this.state

        // let [] = selectedFunding
        // let [fundingAddress, manager, projectName, targetMoney, supportMoney, leftTime, supportorCounts, currentBalance,] = this.state.selectedFunding
        return (
            <div>
                <CardLists details={creatorFundingDetails}
                           handleFundingCardClick={this.handleFundingCardClick}
                />
                <br/>
                <br/>

                <h3>发起付款请求</h3>
                <div>
                    <Segment>
                        <h4>当前项目:{selectedFunding[2]}, 地址: {selectedFunding[0]}</h4>
                        <Form onSubmit={this.handleCreateRequest}>
                            <Form.Input type='text' name='requestDesc' required value={requestDesc}
                                        label='请求描述' placeholder='请求描述' onChange={this.handleChange}/>

                            <Form.Input type='text' name='requestMoney' required value={requestMoney}
                                        label='付款金额' labelPosition='left' placeholder='付款金额'
                                        onChange={this.handleChange}>
                                <Label basic>￥</Label>
                                <input/>
                            </Form.Input>

                            <Form.Input type='text' name='requestSellerAddress' required value={requestSellerAddress}
                                        label='商家收款地址' labelPosition='left' placeholder='商家地址'
                                        onChange={this.handleChange}>
                                <Label basic><span role='img' aria-label='location'>📍</span></Label>
                                <input/>
                            </Form.Input>

                            <Form.Button primary content='开始请求'/>
                        </Form>
                    </Segment>
                </div>
                <br/>
                <br/>

                <Button primary onClick={() => this.handleGetAllRequests()}>显示花费申请</Button>
                <RequestsTable details={requestDetails}/>

                <h1>发起众筹</h1>
                <div>
                    <Dimmer.Dimmable as={Segment} dimmed={active}>
                        <Dimmer active={active} inverted>
                            <Loader>Loading</Loader>
                        </Dimmer>
                        <Form onSubmit={this.handleCreate}>
                            <Form.Input required type='text' placeholder='项目名称' name='projectName'
                                        value={projectName} label='项目名称:'
                                        onChange={this.handleChange}/>
                            <Form.Input required type='text' placeholder='支持金额' name='supportMoney'
                                        value={supportMoney} label='支持金额:'
                                        labelPosition='left'
                                        onChange={this.handleChange}>
                                <Label basic>￥</Label>
                                <input/>
                            </Form.Input>

                            <Form.Input required type='text' placeholder='目标金额' name='targetMoney'
                                        value={targetMoney}
                                        label='目标金额:'
                                        labelPosition='left'
                                        onChange={this.handleChange}>
                                <Label basic>￥</Label>
                                <input/>
                            </Form.Input>
                            <Form.Input required type='text' placeholder='目标金额' name='duration' value={duration}
                                        label='众筹时间:'
                                        labelPosition='left'
                                        onChange={this.handleChange}>
                                <Label basic>S</Label>
                                <input/>
                            </Form.Input>
                            <Form.Button primary content='创建众筹'/>
                        </Form>
                    </Dimmer.Dimmable>
                </div>
            </div>
        )
    }
}

export default CreatorFundingsTab
