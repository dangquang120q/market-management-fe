import { Layout, Menu, theme } from "antd";
import { ROLE, USER_DETAIL } from "constant";
import { FC, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { ROUTE_URL, sidebarItems } from "routes";
import { userStore } from "store/user";
const { Header, Content, Footer, Sider } = Layout;

const PriveLayout: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { handleUserLogout, id, role, name } = userStore();
  useEffect(() => {
    const userLocal = localStorage.getItem(USER_DETAIL) || "{}";
    const user = JSON.parse(userLocal).state;

    if (!user?.id) navigate(ROUTE_URL.LOGIN);
    else {
      navigate(location.pathname || ROUTE_URL.PRODUCT);
    }
  }, [id]);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout hasSider className="private-layout">
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div className="demo-logo-vertical">
          <h2>Hệ thống Quản lý siêu thị</h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          onClick={(e) => navigate(e.key)}
          items={sidebarItems.filter((item) => item.role.includes(role))}
          selectedKeys={location.pathname ? [location.pathname] : []}
        />
        <div className="footer">
          <div className="logout" onClick={handleUserLogout}>
            <p>Đăng xuất</p>
          </div>
        </div>
      </Sider>
      <Layout style={{ marginLeft: 200 }}>
        <Header style={{ padding: "0 20px", background: colorBgContainer }}>
          <p style={{ textAlign: "right" }}>
            {id}: {name} - {ROLE[role]}
          </p>
        </Header>
        <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
          <div
            className="private-layout-content"
            style={{
              padding: 24,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Market Management ©{new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  );
};
export default PriveLayout;
