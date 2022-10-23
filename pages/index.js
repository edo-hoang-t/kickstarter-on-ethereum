import React, { Component } from "react";
import { Card, Button } from "semantic-ui-react";
import factory from "../ethereum/factory";
import Link from "next/link";

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
        description: (
          <Link href={`/campaigns/${addr}`}>
            <a href="#">View Campaign</a>
          </Link>
        ),
        fluid: true,
      };
    });

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <div>
        <h3>Open Campaigns</h3>
        <Link href="/campaigns/new">
          <a>
            <Button
              content="Create Campaign"
              icon="add circle"
              primary
              floated="right"
            />
          </a>
        </Link>
        {this.renderCampaigns()}
      </div>
    );
  }
}

export default CampaignIndex;
