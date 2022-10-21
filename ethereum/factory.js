import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0x2539940780e9AEedDD99eAFCc6A62e2eeF7a6b78"
);

export default instance;
