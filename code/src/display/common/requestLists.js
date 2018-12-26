import React from 'react'
import {Table} from 'semantic-ui-react'

const RequestsTable = (props) => {

    let {details} = props
    console.log('1111111111 :', details)

    let tables = details.map((detail, index) => {
        let {0:description, 1:cost, 2:sellerAddress, 3:isVoted, 4:votedCount, 5:status} = detail

        return (
            <Table.Row key={index}>
                <Table.Cell>{description}</Table.Cell>
                <Table.Cell>{cost}</Table.Cell>
                <Table.Cell>{sellerAddress}</Table.Cell>
                <Table.Cell>{votedCount}</Table.Cell>
                <Table.Cell>{status}</Table.Cell>
                <Table.Cell>待定</Table.Cell>
            </Table.Row>)
    })


    return (
        <Table celled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>花费描述</Table.HeaderCell>
                    <Table.HeaderCell>花费金额</Table.HeaderCell>
                    <Table.HeaderCell>商家地址</Table.HeaderCell>
                    <Table.HeaderCell>赞成人数</Table.HeaderCell>
                    <Table.HeaderCell>状态</Table.HeaderCell>
                    <Table.HeaderCell>操作</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body> {tables} </Table.Body>
        </Table>
    )
}

export default RequestsTable
