import React from 'react';
import { shallow } from 'enzyme';
import { assert } from 'chai';
import { Exits } from '../../src/components/Exits'

describe('<Exits/>', function () {
    it('should render ul with length of exits', () => {
        let props = [1, 1, 1, 1];
        const wrapper = shallow(<Exits exits={props}/>);
        assert.lengthOf(wrapper.find("ul").children(), 4);
    });
});

