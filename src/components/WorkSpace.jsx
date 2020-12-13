import React from 'react';
import { Layout } from 'antd';
import List from './List';
import MyHeader from './MyHeader';
import '../App.less';
import MyFooter from './MyFooter';

const { Content } = Layout;

const WorkSpace = () => (
  <Layout className="layout">
    <MyHeader />
    <Content className="site-layout workspace-layout site-layout-background">
      <List />
    </Content>
    <MyFooter />
  </Layout>
);

export default WorkSpace;
