import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Form, Input, Checkbox, Button, Typography } from 'antd';
import Layout from 'antd/lib/layout/layout';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import MyFooter from './MyFooter';
const { Content } = Layout;
const { Title } = Typography;

function mapDispatchToProps(dispatch) {
  return {
  };
}

class ConnectedLogin extends Component {
  constructor(props) {
    super(props);
    this.onFinish = this.onFinish.bind(this);
    this.onFinishFailed = this.onFinishFailed.bind(this);
  }

  onFinish(values) {
    console.log('Success:', values);
    this.props.history.push('/workspace');
  };

  onFinishFailed(errorInfo) {
    console.log('Failed:', errorInfo);
  };

  render () {
    return (
      <Layout className="layout">
        <Content className="site-layout login-layout site-layout-background">
          <Form
            name="login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={this.onFinish}
            onFinishFailed={this.onFinishFailed}
          >
            <Title style={{color: '#563d7c', textAlign: 'center'}}>Mindig</Title>
            <Form.Item name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username"/>
            </Form.Item>

            <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]} >
              <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password"/>
            </Form.Item>

            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <a className="login-form-forgot" href="">
                Forgot password
              </a>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
              </Button>
              <a href="">register now!</a>
            </Form.Item>
          </Form>
        </Content>
        <MyFooter />
      </Layout>
    )
  }
};

const Login = connect(null, mapDispatchToProps)(ConnectedLogin);

export default Login;
