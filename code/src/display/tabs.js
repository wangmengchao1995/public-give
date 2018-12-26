import React from 'react'
import {Tab} from 'semantic-ui-react'
import AllFundingsTab from "./allFundings/allFundingsTab";
import CreatorFundingsTab from "./creatorFundings/creatorFundingsTab";
import SupportorFundingsTab from "./supportorFundings/supportorFundingsTab";

const panes = [
    {menuItem: '所有的', render: () => <Tab.Pane><AllFundingsTab/></Tab.Pane>},
    {menuItem: '我发起的', render: () => <Tab.Pane><CreatorFundingsTab/></Tab.Pane>},
    {menuItem: '我参与的', render: () => <Tab.Pane><SupportorFundingsTab/></Tab.Pane>},
]

const Tabs = () => <Tab panes={panes}/>

export default Tabs
