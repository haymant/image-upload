import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from 'styled-components';
import CONFIG from "./config";
import { Tabs, Row, Col } from "antd";
const TabPane = Tabs.TabPane;

const DefaultImage = styled.div`
  background-image: url(${props => props.url});
  background-position: 50%;
  background-repeat: no-repeat;
  background-size: cover;
  margin: 0 auto;
  height: 200px;
  width: 100%;
  cursor: pointer;
`;

export default class Gallery extends Component {
  constructor(props) {
    super(props);
    this.generateContent = this.generateContent.bind(this);
    this.generateGallery = this.generateGallery.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  static propTypes = {
    onChange: PropTypes.func.isRequired
  };

  handleClick(data) {
    this.props.onChange([data.url]);
  }

  generateContent(gallery) {
    const that = this;
    const tabs = [];
    for (var key in gallery) {
      if (gallery[key]) {
        var item = gallery[key];
        tabs.push(
          <TabPane key={key} tab={item.name}>
            {that.generateGallery(key, item)}
          </TabPane>
        );
      }
    }
    return tabs;
  }

  generateGallery(key, item) {
    const data = [];
    const that = this;
    for (var i = 1; i <= item.size; i++) {
      data.push({
        url: `https://canner-qa.s3.amazonaws.com/gallery/${key}/${key}_${i}_${
          item.min
        }.${item.type}`,
        name: `https://canner-qa.s3.amazonaws.com/gallery/${key}/${key}_${i}_${
          item.max
        }.${item.type}`
      });
    }
    return (
      <Row>
        {data.map((datum, i) => {
          return (
            <Col span={8} onClick={() => that.handleClick(datum)} key={i}>
              <DefaultImage url={datum.url}/>
            </Col>
          );
        })}
      </Row>
    );
  }

  render() {
    return (
      <Tabs tabPosition="top">{this.generateContent(CONFIG.gallery)}</Tabs>
    );
  }
}
