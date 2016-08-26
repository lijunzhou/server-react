/**
 * Created by zhoulijun on 16/8/12.
 */
"use strict";
import demoService from "services/demo_service.js";
const LOAD_NAME = "load_name";

module.exports = {
    LOAD_NAME,
    loadName : (name)=>{
        return dispatch=>{
            demoService.getLoadName(name).then(data=>{
                dispatch({
                    type : LOAD_NAME,
                    name : data.name,
                })
            })
        }
    }
}