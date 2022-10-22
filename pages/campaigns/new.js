import React, { Component } from "react";
import { Form, Button, Input, Message } from "semantic-ui-react";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
import Router from "next/router";

class CampaignNew extends Component {
  state = {
    minContribution: "",
    errorMessage: "",
    loading: false,
  };

  onSubmit = async (e) => {
    e.preventDefault();
    this.setState({ loading: true, errorMessage: "" });

    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods
        .createCampaign(this.state.minContribution)
        .send({ from: accounts[0] });

      Router.push("/");
    } catch (err) {
      this.setState({ errorMessage: err.message.split("\n")[0] });
    }

    this.setState({ loading: false });
  };

  render() {
    return (
      <>
        <h3>New Campaign</h3>

        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Minimum Contribution</label>
            <Input
              label="wei"
              labelPosition="right"
              value={this.state.minContribution}
              onChange={(e) =>
                this.setState({ minContribution: e.target.value })
              }
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

export default CampaignNew;
