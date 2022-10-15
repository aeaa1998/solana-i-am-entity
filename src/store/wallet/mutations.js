import { SET_IS_CONNECTING_WALLET, SET_WALLET_ADDRESS, SET_WALLET_CONECTING_FINISHED } from "./types" 
export default {
    [SET_IS_CONNECTING_WALLET](state){
        state.connectingWallet = true
    },
    [SET_WALLET_CONECTING_FINISHED](state){
        state.connectingWallet = false
    }
}