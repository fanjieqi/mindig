import React from 'react';
import { Layout } from 'antd';
import List from './List';
import MyHeader from './MyHeader';
import '../App.less';
const { Content, Footer } = Layout;
var moment = require('moment'); 

const WorkSpace = () => (
  <Layout className="layout">
    <MyHeader />
    <Content className="site-layout workspace-layout site-layout-background">
      <List />
    </Content>
    <Footer style={{ textAlign: 'center' }}>Mindig ©{moment().year()} Created by Jackie Fan</Footer>
  </Layout>
);

export default WorkSpace;
