import React from 'react';
import { shallow, mount } from 'enzyme';
import { assert } from 'chai';
import App from '../../src/App'

describe("<App />", () => {
    let props;
    let app;
    const Game = () => {
        console.log("props", {...props})
        if(!app) {
            app = mount(
                <App display={props.display} room={props.room} exits={props.exits} />
            );
        }
        return app;
    }

    beforeEach(() => {
        props = {
            display: {start:()=>{}, update:()=>{}, end:()=>{}},
            room: "",
            exits: ["", ""]
        }
        app = undefined;
    });

    it("always renders a div", () => {
        const divs = Game().find("div");
        assert.isAbove(divs.length, 0);
      });

      describe("the rendered div", () => {
        it("contains everything else that gets rendered", () => {
            const divs = Game().find("div");
            const wrappingDiv = divs.first();

            assert.equal(wrappingDiv.children(), Game().children);
        });
      });
});