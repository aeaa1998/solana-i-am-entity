import keyPairIdent from '@/keypair/allowedKeyPairs.json'
import { useWorkspace, getAccountMetaData } from "@/composables";

//Middleware to check the user is logged
export const logged = ({ next, to }) => {
    const { wallet } =  useWorkspace()
    //It is logged and they are trying to go to login page
    if(wallet.value && to.name == "Login"){
        return next({ name: 'Dashboard' });
    }
    
    return next()
}