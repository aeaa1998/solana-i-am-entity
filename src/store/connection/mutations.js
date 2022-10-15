import { ADD_CREATED_MACHINE, ADD_CREATED_NFT, UPDATE_METADATA_MAPPED } from "./types.js" 
export default {
    [UPDATE_METADATA_MAPPED](state, nft){
        //It is the same metadata address
        state.nftsMapped[nft.metadataAddress.toBase58()] = nft
    },
    [ADD_CREATED_MACHINE](state, candyMachine) {
        const key = candyMachine.address.toBase58()
        state.candyMachinesMapped[key] = candyMachine
        if(state.candyMachinesAddresses.includes(key)){
            state.candyMachinesAddresses[key] = candyMachine
        }
    }
}