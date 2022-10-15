// import { Connection, Keypair } from '@solana/web3.js';
// import keyPairIdent from './keypair.json' assert {type: "json"};

// const tempArraySecret = Object.values(keyPairIdent._keypair.secretKey);
// const secret = new Uint8Array(tempArraySecret)
        
// const keyPair = Keypair.fromSecretKey(secret);
// const connection = new Connection("https://api.devnet.solana.com");
// console.log(keyPair.publicKey.toBase58())
// const request = async () => {
//     for (let index = 0; index < 1000; index++) {
//         await (async () => {
//             // 1e9 lamports = 10^9 lamports = 1 SOL
//             let txhash = await connection.requestAirdrop(keyPair.publicKey, 1e9 * 1);
//             console.log(`txhash: ${txhash}`);
//             await new Promise(r => setTimeout(r, 12000));
//         })();
//     }
// }

// request()