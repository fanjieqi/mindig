import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Form, Input, Checkbox, Button, Typography } from 'antd';
import Layout from 'antd/lib/layout/layout';
import { MailOutlined, UserOutlined, LockOutlined } from '@ant-design/icons';
import MyFooter from './MyFooter';
const { Content } = Layout;
const { Title, Text } = Typography;

function mapDispatchToProps(dispatch) {
  return {
  };
}

class ConnectedRegistration extends Component {
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
        <Content className="site-layout register-layout site-layout-background">
          <Form
            name="register"
            className="register-form"
            initialValues={{ remember: true }}
            onFinish={this.onFinish}
            onFinishFailed={this.onFinishFailed}
            align='middle'
          >
            <Title style={{color: '#563d7c', textAlign: 'center'}}>Mindig</Title>

            <Form.Item name="email" rules={[{ type: 'email', message: 'The input is not valid E-mail!'}, { required: true, message: 'Please input your E-mail!'}]} >
              <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
            </Form.Item>

            <Form.Item name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username"/>
            </Form.Item>

            <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]} hasFeedback >
              <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password"/>
            </Form.Item>

            <Form.Item name="confirm" dependencies={['password']} hasFeedback rules={[
                { required: true, message: 'Please confirm your password!'},
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject('The two passwords that you entered do not match!');
                  },
                }),
              ]}
            >
              <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Confirm Password" />
            </Form.Item>

            <Form.Item name="agreement" valuePropName="checked" rules={[{validator: (_, value) => value ? Promise.resolve() : Promise.reject('Should accept agreement')}]}>
              <Checkbox>
                <Text type='secondary'>I have read the </Text><a href="">agreement</a>
              </Checkbox>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="register-form-button">
                Register
              </Button>
            </Form.Item>
          </Form>
        </Content>
        <MyFooter />
      </Layout>
    )
  }
};

const Registration = connect(null, mapDispatchToProps)(ConnectedRegistration);

export default Registration;
