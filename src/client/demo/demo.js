/**
 * Created by zhoulijun on 16/8/11.
 */
"use strict";

import React from "react";
import {createStore,Dev} from "../dev.js";
import { Provider,connect } from 'react-redux';
import reducers from "./reducers";
import {render} from "react-dom";
import Demo from "components/demo.js";
import {loadName} from "./actions/load_name.js";
const store = createStore(reducers,window.state);

const App = connect(state=>state)(React.createClass({
    render: function () {
        return (
            <Demo {...this.props} loadName={()=>this.props.dispatch(loadName('前端'))}/>
        )
    }
}));

render(
    <Provider store={store}>
            <App />
    </Provider>, document.getElementById('content'));
