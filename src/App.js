import React from 'react';
import { Layout } from 'antd';
import List from './components/List';
import MyHeader from './components/MyHeader';
import './App.css';
const { Content, Footer } = Layout;
var moment = require('moment'); 

const App = () => (
  <Layout className="layout">
    <MyHeader />
    <Content className="site-layout site-layout-background">
      <List />
    </Content>
    <Footer style={{ textAlign: 'center' }}>Mindig ©{moment().year()} Created by Jackie Fan</Footer>
  </Layout>
);

export default App;
