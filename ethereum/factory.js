import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0xfE0CcA0f2d12d25AeBae7578Afcf33925Ebe1ae3"
);

export default instance;
