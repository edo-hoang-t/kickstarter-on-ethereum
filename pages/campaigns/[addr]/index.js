import React, { Component } from "react";
import { Card, Grid, Button } from "semantic-ui-react";
import campaignFromAddress from "../../../ethereum/campaign";
import web3 from "../../../ethereum/web3";
import ContributeForm from "../../../components/ContributeForm";
import Link from "next/link";

class CampaignShow extends Component {
  static async getInitialProps({ query }) {
    const { addr } = query;
    const campaign = campaignFromAddress(addr);
    const summary = await campaign.methods.getSummary().call();
    console.log(summary);
    return {
      minimumContribution: summary[0],
      balance: summary[1],
      requestsCount: summary[2],
      approversCount: summary[3],
      manager: summary[4],
      addr: addr,
    };
  }

  renderCards() {
    const {
      balance,
      manager,
      minimumContribution,
      requestsCount,
      approversCount,
    } = this.props;

    const items = [
      {
        header: manager,
        description:
          "The manager created this campaign and can create requests to withdraw money.",
        meta: "Address of Manager",
        style: { overflowWrap: "break-word" },
      },
      {
        header: minimumContribution,
        description:
          "You must contribute at least this much wei to become an approver.",
        meta: "Minimum Contribution (wei)",
        // style: { overflowWrap: "break-word" },
      },
      {
        header: requestsCount,
        description:
          "A request tries to withdraw money from the contract. Requests must be approved by approvers.",
        meta: "Number of Requests",
        // style: { overflowWrap: "break-word" },
      },
      {
        header: approversCount,
        description:
          "Number of people who have already donated to this campaign.",
        meta: "Number of Approvers",
        // style: { overflowWrap: "break-word" },
      },
      {
        header: web3.utils.fromWei(balance, "ether"),
        description:
          "The balance is how much money this campaign has left to spend.",
        meta: "Campaign Balance (ether)",
        // style: { overflowWrap: "break-word" },
      },
    ];

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <>
        <h3>Campaign {this.props.addr}</h3>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>{this.renderCards()}</Grid.Column>
            <Grid.Column width={6}>
              <ContributeForm address={this.props.addr} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Link href={`/campaigns/${this.props.addr}/requests`}>
                <a>
                  <Button primary>View Requests</Button>
                </a>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </>
    );
  }
}

export default CampaignShow;
