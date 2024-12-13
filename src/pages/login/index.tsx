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
      <div className="login-box-left">
        <div className="text-box">
          <h2 className="title">Market Management</h2>
          <p className="slogan">
            Streamline your market business with our powerful management tools.
          </p>
        </div>
      </div>
      <div className="login-box-right">
        <div className="login-form-box">
          <div className="login-form-title">
            <h2 className="heading">Welcome back</h2>
            <p className="sub-heading">Please sign in to your account</p>
          </div>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your Username!" },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
                className="input-field user-name"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
                className="input-field password"
              />
            </Form.Item>

            <div className="form-atc">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <div>
                <a href="#">Forgot your password?</a>
              </div>
            </div>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="form-button"
              >
                Log in
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
