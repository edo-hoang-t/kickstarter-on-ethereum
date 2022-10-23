import React, { Component } from "react";
import { Form, Input, Message, Button } from "semantic-ui-react";
import campaignFromAddress from "../ethereum/campaign";
import web3 from "../ethereum/web3";
import Router from "next/router";

class ContributeForm extends Component {
  state = {
    value: "",
    errorMessage: "",
    loading: false,
  };

  onSubmit = async (e) => {
    e.preventDefault();
    this.setState({ loading: true, errorMessage: "" });

    const campaign = campaignFromAddress(this.props.address);

    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(this.state.value, "ether"),
      });

      Router.replace(`/campaigns/${this.props.address}`);
    } catch (err) {
      this.setState({ errorMessage: err.message.split("\n")[0] });
    }

    this.setState({ loading: false, value: "" });
  };

  render() {
    return (
      <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
        <Form.Field>
          <label>Amount to Contribute</label>
          <Input
            label="ether"
            labelPosition="right"
            value={this.state.value}
            onChange={(e) => this.setState({ value: e.target.value })}
          ></Input>
        </Form.Field>

        <Message error header="Oops!" content={this.state.errorMessage} />
        <Button primary loading={this.state.loading}>
          Contribute!
        </Button>
      </Form>
    );
  }
}

export default ContributeForm;
