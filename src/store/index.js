import Vuex from "vuex";
import Vue from "vue";

const actions={
    ChangeLoginType(context,value){
        context.commit('ChangeLoginType',value)
    },
    GetUser(context,value){
        context.commit('GetUser',value)
    },
    GetRoom(context,value){
      context.commit('GetRoom',value)
    },
    GetOldRoom(context,value){
        context.commit('GetOldRoom',value)
    },
    DeleteRoom(context,value){
        context.commit('DeleteRoom',value)
    },
    DeleteOldRoom(context,value){
        context.commit('DeleteOldRoom',value)
    },
    BackRoom(context,value){
        context.commit('BackRoom',value)
    },
    BackOldRoom(context,value){
        context.commit('BackOldRoom',value)
    }
}

const mutations={
    ChangeLoginType(state,value){
        state.LogInType=value
    },
    GetUser(state,value){
        state.UserData=value
    },
    GetRoom(state,value){
        state.RoomData.push(value)
    },
    GetOldRoom(state, value) {
        state.OldRoomData.push(value)
    },
    DeleteRoom(state,value){
        state.RoomData.splice(this.state.RoomData.indexOf(value),1);
    },
    DeleteOldRoom(state,value){
        state.OldRoomData.splice(this.state.OldRoomData.indexOf(value),1);
    },
    BackRoom(state,value){
        state.RoomData=value
    },
    BackOldRoom(state,value){
        state.OldRoomData=value
    }
}

const state={
    LogInType:false,
    UserData:null,
    RoomData:[],
    OldRoomData:[]
}

Vue.use(Vuex)

export default new Vuex.Store({
    actions, mutations, state
})