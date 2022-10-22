import React, { Component } from "react";
import { Card, Button } from "semantic-ui-react";
import factory from "../ethereum/factory";

class CampaignIndex extends Component {
  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    return { campaigns };
  }

  //   async componentDidMount() {
  //   }

  renderCampaigns() {
    const items = this.props.campaigns.map((addr) => {
      return {
        header: addr,
        description: <a href="#">View Campaign</a>,
        fluid: true,
      };
    });

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <div>
        <h3>Open Campaigns</h3>
        <Button
          content="Create Campaign"
          icon="add circle"
          primary
          floated="right"
        />
        {this.renderCampaigns()}
      </div>
    );
  }
}

export default CampaignIndex;
