import React from 'react'
import {Card, Image, List, Progress} from 'semantic-ui-react'

const src = '/images/funding.jpg'

//*<CardLists details={creatorFundingDetails}/>*/

const CardLists = (props) => {
    //在props中包含了所有合约详情
    let {details, handleFundingCardClick} = props

    console.log('在CardList中展示详情:', details)

    //这个details是数组，我们要根据数组的元素个数，动态展示card的数量
    let cards = details.map(function (detail, index) {
        return <CardFunding key={index} detail={detail}
                            handleFundingCardClick={handleFundingCardClick}
        />
    })


    return (
        <Card.Group itemsPerRow={4}> {cards} </Card.Group>
    )
}

const CardFunding = (props) => {
    let {detail, handleFundingCardClick} = props

    let [
        fundingAddress,
        manager,
        projectName,
        targetMoney,
        supportMoney,
        leftTime,
        supportorCounts,
        currentBalance,
    ] = detail

    // let percentage = currentBalance / targetMoney
    let percentage = (parseFloat(currentBalance) / parseFloat(targetMoney)).toFixed(2) * 100
    // let percentage = (parseFloat(currentBalance) / parseFloat(targetMoney)) * 100

    return (
        <Card onClick={() => {
            handleFundingCardClick && handleFundingCardClick(detail)
        }}>
            <Image src='/images/funding.jpg'/>
            <Card.Content>
                <Card.Header> {projectName} </Card.Header>
                <Card.Meta>
                    <p>剩余时间: {leftTime}</p>
                    <Progress percent={percentage} inverted color='orange' progress size='small'/>
                </Card.Meta>
                <Card.Description>用过的都说好!</Card.Description>
            </Card.Content>

            <Card.Content extra>
                <List horizontal style={{display: 'flex', justifyContent: 'space-around'}}>
                    <List.Item>
                        <List.Content>
                            <List.Header>已筹</List.Header>
                            {currentBalance} wei
                        </List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Content>
                            <List.Header>已达</List.Header>
                            {percentage}%
                        </List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Content>
                            <List.Header>参与人数</List.Header>
                            {supportorCounts}
                        </List.Content>
                    </List.Item>
                </List>
            </Card.Content>
        </Card>
    )
}

//如果加了default，那么只能导出这一个组件，在使用端不许要加{}结构
export default CardLists
