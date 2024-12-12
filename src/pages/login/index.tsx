import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import showMessage from "components/Message";
import { IStaff } from "constant/interface";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTE_URL } from "routes";
import { userService } from "services/user";
import { userStore } from "store/user";

const LoginPage: FC = () => {
  const { handleUserLogin } = userStore();
  const navigate = useNavigate();
  const onFinish = async (values: any) => {
    console.log(values);
    try {
      const res = await userService.login(values);
      const data: IStaff = res.data.data;
      handleUserLogin(data);
      navigate(ROUTE_URL.CREATE_INVOICE);
    } catch (error) {
      showMessage("error", "Sai thông tin đăng nhập!");
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <h1>Login</h1>
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default LoginPage;
