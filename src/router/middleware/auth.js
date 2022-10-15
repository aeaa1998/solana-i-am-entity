import keyPairIdent from '@/keypair/allowedKeyPairs.json'
import { useWorkspace, getAccountMetaData } from "@/composables";

//Middleware to check the user is logged
export const auth = ({ next, to }) => {
    const { wallet } =  useWorkspace()
    if(!wallet.value){
        sessionStorage.setItem("redirectTo", to.path);
        return next({ name: 'Login' });
    }
    //Check if wallet is authorized
    else if(!keyPairIdent.includes(wallet.value.publicKey.toBase58())){
        return next({ name: '401' });
    }
    return next()
}