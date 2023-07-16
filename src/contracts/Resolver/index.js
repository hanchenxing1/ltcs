import { Contract, ethers } from "ethers";
import { chainsInfo, contractAddress, emptyAddress } from "../../config/const";
import { getProvider, getSigner, getChainId } from "../../utils/web3";
import ResolverContractABI from "./Resolver.json";

export const ResolverInstance = () => {
    const provider = getProvider();
    const chainId = getChainId();
    const resolverAddress = contractAddress(chainId).resolverAddress;
    const resolver = new Contract(resolverAddress, ResolverContractABI, provider);
    return resolver;
};

const getResolverInfo = async (name_) => {
    const allProperties = await ResolverInstance().getAllProperties(name_);
    if (allProperties === "") {
        allProperties = "++++++++++++++"
    }
    let arr = allProperties.split('+');
    return {
        ipfsUrl: arr[4],
        description: arr[8]
    };
};

const setResolverInfo = async (name_, ipfsUrl_, description_) => {
    const allProperties = await ResolverInstance().getAllProperties(name_);
    if (allProperties === "") {
        allProperties = "++++++++++++++"
    }
    let arr = allProperties.split('+');
    if (ipfsUrl_ === arr[4] && description_ === arr[8]) {
        return
    }
    arr[4] = ipfsUrl_;
    arr[8] = description_;
    const newStr = arr.join("+")
    await setAllProperties(name_, newStr)
};


const setAllProperties = async (name_, recordsStr_) => {
    const signer = await getSigner();
    const resolver = await ResolverInstance().connect(signer);
    return resolver.setAllProperties(name_, recordsStr_);
};



export {
    getResolverInfo,
    setResolverInfo
};
