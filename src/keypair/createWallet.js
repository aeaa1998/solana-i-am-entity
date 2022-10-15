import { Connection, Keypair } from "@solana/web3.js"
import { writeFileSync } from 'fs'

const account = Keypair.generate()

writeFileSync('./keypair.json', JSON.stringify(account))
const connection = new Connection("https://api.devnet.solana.com");
const request = async () => {
for (let index = 0; index < 3; index++) {
    await (async () => {
        // 1e9 lamports = 10^9 lamports = 1 SOL
        let txhash = await connection.requestAirdrop(account.publicKey, 1e9 * 2);
        console.log(`txhash: ${txhash}`);
    })();
}
}

request()
