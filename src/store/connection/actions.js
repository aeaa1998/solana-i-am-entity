
import { Connection, clusterApiUrl, PublicKey } from '@solana/web3.js';
import { AnchorProvider, Program, web3 } from '@project-serum/anchor'
import idl from '../../keypair/solana.json'
import { useAnchorWallet } from 'solana-wallets-vue'
import { useWorkspace, getAccountMetaData } from '@/composables';
import { notify } from "@kyvg/vue3-notification";
import { ADD_CREATED_NFT, UPDATE_METADATA_MAPPED } from './types.js'
import { Metadata } from '@metaplex-foundation/mpl-token-metadata'
import { Pda, toMetaplexFileFromBrowser } from '@metaplex-foundation/js';

export const normalizeNft = (nftDeserialized) => {
  nftDeserialized.address = new Pda(nftDeserialized.address, 255)
  if(nftDeserialized.mintAddress){
      nftDeserialized.mintAddress = new PublicKey(nftDeserialized.mintAddress)
  }
  if(nftDeserialized.metadataAddress){
    nftDeserialized.metadataAddress = new PublicKey(nftDeserialized.metadataAddress)
}
  if(nftDeserialized.mint){
      nftDeserialized.mint.address = new PublicKey(nftDeserialized.mint.address)
  }
  nftDeserialized.updateAuthorityAddress = new PublicKey(nftDeserialized.updateAuthorityAddress)
  if(nftDeserialized.collection){
      nftDeserialized.collection.address = new PublicKey(nftDeserialized.collection.address)
  }
  nftDeserialized.creators = nftDeserialized.creators.map(c => {
      c.address = new PublicKey(c.address)
      return c
  })
  
  return nftDeserialized
}
export default {
 setNftMetadata({ commit }, nft){
  //Update nft in state
  commit(UPDATE_METADATA_MAPPED, nft)
 },

 async getNftTransactions ({ commit, state }, nft) {
  let allSignatures = []
  const { connection } = useWorkspace();
  let mintAddress = nft.mint ? nft.mint.address : nft.mintAddress
  let signatures = await connection.getSignaturesForAddress(mintAddress)
  let lastFound = signatures[signatures.length - 1]
  allSignatures = [...signatures]

  while(signatures.length){
      signatures = await connection.getSignaturesForAddress(mintAddress, {
          before: lastFound.signature
      })
      if(signatures.length){
          allSignatures.push(...signatures)
          lastFound = signatures[signatures.length - 1]
      }
  }
  
  state.nftTransactionsMapped[mintAddress.toBase58()] = allSignatures
  
},
async createNft({commit} , {title, description, image, requisites, expiration, ...metadataBody}){
  const { normalWallet } = useWorkspace()
  const formData = new FormData()
  const config = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}
  formData.append('title', title)
  formData.append('description', description)
  formData.append('image', image)
  requisites.forEach((requisite, index) => {
    formData.append(`requisites[]`, requisite)
  })
  
Object.keys(expiration ?? {}).forEach((key) => {
  formData.append(`expiration.${key}`, expiration[key])
})

  Object.keys(metadataBody).forEach((key) => {
    formData.append(key, metadataBody[key])
  })
  
  
  try { 
      const response = await _axios.post("/create/NFT", formData, config)
      notify({
        type: "success",
        title: "NFT CREADO 🎉.",
        text: `Se ha creado la credencial: ${title} con éxito`
     })
      return true
  } catch (error) {
    console.error(error)
      notify({
       type: "error",
       title: "Ocurrio un error al crear el nft por favor prueba nuevamente."
    })
    return false
  }

},
//The credentials are a list of nfts that serve to validate if the nft can bee created
async createNftLegacy({commit} , {title, description, image, symbol, ...metadataBody}){
    const { metaplexnormalWallet } = useWorkspace()
    
    const metafile = await toMetaplexFile(image)
    
    const {uri, metadata} = await metaplex.value.nfts().uploadMetadata({
      name: title,
      description: description,
      image: metafile,
      symbol: symbol,
      //Append the rest of the metadata
      ...metadataBody
    })
    
    
    try {
      const {
        nft,
        mintAddress,
        metadataAddress,
        masterEditionAddress,
        tokenAddress,
      } = await metaplex.value
        .nfts()
        .create({
          uri,
          name: title,
          // No editions can be printed 
          // maxSupply: null,
          sellerFeeBasisPoints: 200,
          // isCollection: false,
          symbol: title
        })
        ;

        notify({
          type: "success",
          title: "NFT CREADO 🎉.",
          text: `Se ha creado la credencial: ${title} con éxito`
       })
       return true
    } catch (error) {
      console.error(error)
        notify({
         type: "error",
         title: "Ocurrio un error al crear el nft por favor prueba nuevamente."
      })
      return false
    }

  },
async updateNft({ commit }, {metadata, nft}){
  const { metaplex, normalWallet } = useWorkspace()
  try {
    const { data: { updatedNft } } = await _axios.post("/update/NFT", {
      metadata, 
      mintAddress: nft.mint ? nft.mint.address.toBase58() : nft.mintAddress.toBase58()
    })
    
    commit(UPDATE_METADATA_MAPPED, normalizeNft(updatedNft))
    notify({
      type: "success",
      title: "NFT EDITADO 🎉.",
      text: `Se ha editado la credencial con éxito`
   }) 
   return normalizeNft(updatedNft)
  } catch (error) {
    console.log(error)
    notify({
      type: "error",
      title: "Ocurrio un error al editar el nft por favor prueba nuevamente."
   })
   return null
  }
},

async getNftFromCreator(store, loadMetadata = false) {
  const { connection, wallet, metaplex, identity } = useWorkspace()
  const { state }  = store
  const nfts = await metaplex.value.nfts().findAllByOwner({ owner : identity})
  nfts.forEach((nft) => {
    if(nft.uri != "" && nft.uri != null){
      const key = nft.address.toBase58()
      state.nftsMapped[key] = nft
      if(!state.nftsAddresses.includes(key)){
        state.nftsAddresses.push(key)
      }
      if(loadMetadata) {
        //If it loads metadata  in the same action fire it
        (async function(metadata) {
          getAccountMetaData(metadata, store)
          store.dispatch("getNftTransactions", metadata)
        })(nft)
      }
    }
  })

  
 },

 async getCandyMachines(store, mintAddress = undefined){
  const { state, getters }  = store
  const { metaplex, wallet, identity } = useWorkspace();
  if(!mintAddress || !(mintAddress in getters.candyMachinesMintMapped)){
    const candyMachines = await metaplex.value.candyMachines().findAllBy({ type: "wallet", publicKey: identity });
    candyMachines.forEach((candyMachine) => {
      //Use the mint address
      //Alias the nft
      const key = candyMachine.address.toBase58()
      state.candyMachinesMapped[key] = candyMachine
      if(!state.candyMachinesAddresses.includes(key)){
        state.candyMachinesAddresses.push(key)
      }
    })
  }
 } 
}
 