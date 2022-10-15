// import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
export default {
    state: {
        // userWallet: new PhantomWalletAdapter(),
        connectingWallet: false
    },
    getters: {
        // publicKey: (state, getters) =>  getters.walletInited ? state.userWallet.publicKey : null,
        // walletInited: (state) =>  state.userWallet.publicKey != null,
        publicKeyBase58: (state, getters) =>  getters.walletInited ? getters.publicKey.toBase58() : null,
        connectingWallet: (state) => state.connectingWallet
    }
    
}