/**
 * Created by zhoulijun on 16/8/2.
 */
"use strict";
const React = require("react");
import {isClient} from "../utils/env_tools.js";

isClient(()=>{
    require("./demo.css");
});



module.exports = React.createClass({
    componentDidMount(){
        const {loadName} = this.props;
        setTimeout(()=>{
            loadName();
        })
    },
    render(){
        return <p>我来自 {this.props.name} 渲染</p>
    }
})