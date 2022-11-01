import React, { Component } from "react";
import { Button, Table } from "semantic-ui-react";
import Link from "next/link";
import campaignFromAddress from "../../../../ethereum/campaign";
import RequestRow from "../../../../components/RequestRow";

class RequestIndex extends Component {
  static async getInitialProps({ query }) {
    const { addr } = query;
    const campaign = campaignFromAddress(addr);
    const requestCount = await campaign.methods.getRequestsCount().call();
    const approversCount = await campaign.methods.approversCount().call();

    const requests = await Promise.all(
      Array(parseInt(requestCount))
        .fill()
        .map((_, idx) => {
          return campaign.methods.requests(idx).call();
        })
    );

    return { addr, requests, requestCount, approversCount };
  }

  renderRows() {
    return this.props.requests.map((request, idx) => {
      return (
        <RequestRow
          key={idx}
          id={idx}
          address={this.props.addr}
          request={request}
          approversCount={this.props.approversCount}
        />
      );
    });
  }

  render() {
    const { Header, Row, HeaderCell, Body } = Table;

    return (
      <>
        <h3>Request List</h3>
        <Link href={`/campaigns/${this.props.addr}/requests/new`}>
          <a>
            <Button primary floated="right" style={{ marginBottom: 10 }}>
              Add request
            </Button>
          </a>
        </Link>
        <Table>
          <Header>
            <Row>
              <HeaderCell>ID</HeaderCell>
              <HeaderCell>Description</HeaderCell>
              <HeaderCell>Amount</HeaderCell>
              <HeaderCell>Recipient</HeaderCell>
              <HeaderCell>Approval Count</HeaderCell>
              <HeaderCell>Approve</HeaderCell>
              <HeaderCell>Finalize</HeaderCell>
            </Row>
          </Header>
          <Body>{this.renderRows()}</Body>
        </Table>
        <div>Found {this.props.requestCount} requests.</div>
      </>
    );
  }
}

export default RequestIndex;
