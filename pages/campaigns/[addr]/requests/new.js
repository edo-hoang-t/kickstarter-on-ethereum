import React, { Component } from "react";
import { Form, Button, Message, Input } from "semantic-ui-react";
import campaignFromAddress from "../../../../ethereum/campaign";
import web3 from "../../../../ethereum/web3";
import Router from "next/router";
import Link from "next/link";

class RequestNew extends Component {
  state = {
    value: "",
    description: "",
    recipient: "",
    loading: false,
    errorMessage: "",
  };

  static async getInitialProps(props) {
    const { addr } = props.query;

    return { addr };
  }

  onSubmit = async (e) => {
    e.preventDefault();

    const campaign = campaignFromAddress(this.props.addr);
    const { description, value, recipient } = this.state;

    this.setState({ loading: true, errorMessage: "" });

    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods
        .createRequest(description, web3.utils.toWei(value, "ether"), recipient)
        .send({ from: accounts[0] });

      Router.push(`/campaigns/${this.props.addr}/requests`);
    } catch (err) {
      this.setState({ errorMessage: err.message.split("\n")[0] });
    }

    this.setState({ loading: false });
  };

  render() {
    return (
      <>
        <Link href={`/campaigns/${this.props.addr}/requests`}>
          <a>
            <Button>Back</Button>
          </a>
        </Link>
        <h3>Create a Request</h3>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Description</label>
            <Input
              value={this.state.description}
              onChange={(e) => this.setState({ description: e.target.value })}
            />
          </Form.Field>
          <Form.Field>
            <label>Value in ether</label>
            <Input
              value={this.state.value}
              onChange={(e) => this.setState({ value: e.target.value })}
            />
          </Form.Field>
          <Form.Field>
            <label>Recipient</label>
            <Input
              value={this.state.recipient}
              onChange={(e) => this.setState({ recipient: e.target.value })}
            />
          </Form.Field>

          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button primary loading={this.state.loading}>
            Create!
          </Button>
        </Form>
      </>
    );
  }
}

export default RequestNew;
