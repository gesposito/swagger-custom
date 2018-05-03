import React from "react";

import { sanitizeUrl } from "@braintree/sanitize-url";

// Create the layout component
class CustomLayout extends React.Component {
  render() {
    const { specSelectors, getComponent } = this.props;

    const isSpecEmpty = !specSelectors.specStr();
    const isLoading = specSelectors.loadingStatus() === "loading";
    const isFailed = specSelectors.loadingStatus() === "failed";

    if (isSpecEmpty) {
      let loadingMessage;
      if (isLoading) {
        loadingMessage = <div className="loading" />;
      } else {
        loadingMessage = <h4>No API definition provided.</h4>;
      }

      return (
        <div className="swagger-ui">
          <div className="loading-container">{loadingMessage}</div>
        </div>
      );
    }

    const Row = getComponent("Row");
    const Col = getComponent("Col");
    const Operations = getComponent("operations", true);
    const Markdown = getComponent("Markdown", true);

    const info = specSelectors.info();
    const title = info.get("title");
    const tos = info.get("termsOfService");
    const description = info.get("description");

    const contact = info.get("contact");
    const email = contact && contact.get("email");
    const name = contact && contact.get("name");
    const url = contact && contact.get("url");

    return (
      <div className="swagger-ui">
        <Row>
          <Col mobile={12} desktop={3}>
            <div className="info">
              <hgroup className="main">
                <h1>{title}</h1>
                <hr />
                <h2>Contatti</h2>
                <div>
                  {url && (
                    <a href={sanitizeUrl(url)} target="_blank">
                      {name} - Website
                    </a>
                  )}
                </div>
                <div>
                  {email && (
                    <a href={sanitizeUrl(`mailto:${email}`)}>
                      {url ? `Send email to ${name}` : `Contact ${name}`}
                    </a>
                  )}
                </div>
                <hr />
                <h2>Condizioni</h2>
                <div>
                  {tos && (
                    <a target="_blank" href={sanitizeUrl(tos)}>
                      Terms of service
                    </a>
                  )}
                </div>
              </hgroup>
            </div>
          </Col>
          <Col mobile={12} desktop={9}>
            <h2>Descrizione</h2>
            <div className="description">
              {description ? <Markdown source={description} /> : "-"}
            </div>
          </Col>
        </Row>

        <Row>
          <Col mobile={12} desktop={12}>
            <Operations />
          </Col>
        </Row>
      </div>
    );
  }
}

export default CustomLayout;
