import React from 'react';
import { Layout } from 'antd';
import { CopyrightOutlined } from '@ant-design/icons';
const { Footer } = Layout;
var moment = require('moment'); 

const MyFooter = () => (
  <Footer style={{ position: 'fixed', zIndex: 1, width: '100%', background: '#fff', bottom: 0, textAlign: 'center' }}>Mindig <CopyrightOutlined />{moment().year()} Created by Jackie Fan</Footer>
);

export default MyFooter;
