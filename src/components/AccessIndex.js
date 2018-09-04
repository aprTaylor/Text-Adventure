import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import React, {Component} from 'react';

export class AccessIndex extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        return(
        <Tabs>
            <TabList>
                <Tab>Inventory</Tab>
            </TabList>

        <TabPanel>
          <p>Protagonist, from the 20th Century. Delivery boy. Many times great-uncle to Professor Hubert Farnsworth. Suitor of Leela.</p>
        </TabPanel>
        </Tabs>)
    }
}