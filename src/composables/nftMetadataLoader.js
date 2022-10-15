
import { useWorkspace } from './useWorkspace.js'

export const getAccountMetaData = async (metadata, store) => {
    //Only fetch if it is metadata

    if(metadata.model == "metadata"){
        try {
        const { metaplex } = useWorkspace();
        const _nft = await metaplex.value
            .nfts()
            .load({ metadata })
            
            
        store.dispatch("setNftMetadata", _nft);
        } catch {
            
        }
    }
  };


  