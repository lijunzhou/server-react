/**
 * Created by zhoulijun on 16/8/12.
 */
"use strict"
import { combineReducers } from 'redux';

const name = function(state = "zhangsan",action = {}){
    switch (action.type){
        case "load_name":
            return action.name;
        default :return state;
    }
};

module.exports = combineReducers({
    name
})