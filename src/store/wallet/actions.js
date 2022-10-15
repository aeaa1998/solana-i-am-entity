import { SET_IS_CONNECTING_WALLET, SET_WALLET_CONECTING_FINISHED } from "./types";
import { notify } from "@kyvg/vue3-notification";
// import { WalletNotReadyError, WalletConnectionError } from "@solana/wallet-adapter-base";
export default {
    connectWallet({ commit, state }){
        // const errorMessages = {
        //     "User rejected the request.": "El usuario rechazo la conección de la billetera.",
        // };
        // commit(SET_IS_CONNECTING_WALLET)
        // state.userWallet
        //   .connect()
        //   .then((res) => {
            
        //   })
        //   .catch((e) => {
        //     if (e instanceof WalletNotReadyError) {
        //       notify({
        //         title: "No se encotro la billetera en el navegador ⚠️",
        //         type: "error",
        //       });
        //     } else if (e instanceof WalletConnectionError) {
        //       notify({
        //         title: errorMessages[e.message],
        //         type: "error",
        //       });
        //     }
        //   })
        //   .finally(() => {
        //     commit(SET_WALLET_CONECTING_FINISHED)
        //   });
    }
}