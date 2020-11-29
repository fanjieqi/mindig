import React from 'react';
import { Layout } from 'antd';
const { Footer } = Layout;
var moment = require('moment'); 

const MyFooter = () => (
  <Footer style={{ position: 'fixed', zIndex: 1, width: '100%', background: '#fff', bottom: 0, textAlign: 'center' }}>Mindig ©{moment().year()} Created by Jackie Fan</Footer>
);

export default MyFooter;
