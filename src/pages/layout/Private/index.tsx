import { Avatar, Dropdown, Layout, Menu, MenuProps, theme } from "antd";
import { ROLE, USER_DETAIL } from "constant";
import React, { FC, useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { ROUTE_URL, sidebarItems } from "routes";
import { userStore } from "store/user";
import logoHorizontal from "../../../resources/image/logo_horizontal.png";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
const { Header, Content, Footer } = Layout;

const PriveLayout: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { handleUserLogout, id, role, name } = userStore();
  const [items, setItems] = useState<MenuProps["items"]>([]);

  useEffect(() => {
    const userLocal = localStorage.getItem(USER_DETAIL) || "{}";
    const user = JSON.parse(userLocal).state;

    if (!user?.id) {
      navigate(ROUTE_URL.LOGIN);
    } else {
      setItems([
        {
          key: "1",
          label: <div onClick={handleUserLogout}>Đăng xuất</div>,
          icon: <LogoutOutlined />,
          disabled: false,
        },
      ]);
      navigate(location.pathname || ROUTE_URL.PRODUCT);
    }
  }, [id]);

  const {
    token: {
      // colorBgContainer,
      borderRadiusLG,
      colorBgElevated,
      boxShadowSecondary,
    },
  } = theme.useToken();

  const contentStyle: React.CSSProperties = {
    backgroundColor: colorBgElevated,
    borderRadius: borderRadiusLG,
    boxShadow: boxShadowSecondary,
  };

  const menuStyle: React.CSSProperties = {
    boxShadow: "none",
  };
  return (
    <>
      <Layout className="private-layout">
        <div className="top-header">
          <div className="logo">
            <img src={logoHorizontal} alt="logoHorizontal" />
          </div>
          <Dropdown
            menu={{ items }}
            dropdownRender={(menu) => (
              <div style={contentStyle}>
                <div className="user-info" style={{ display: 'flex', flexDirection: 'column', rowGap: '0.2rem', padding: '0.3rem 1rem'}}>
                  <span style={{ fontSize: '1.1rem' }}>{name}</span>
                  <span style={{ fontSize: '0.9rem', color: "gray"}}>{ROLE[role]}</span>
                </div>
                {React.cloneElement(menu as React.ReactElement, {
                  style: menuStyle,
                })}
              </div>
            )}
          >
            <a onClick={(e) => e.preventDefault()} className="user">
              <span>{id}</span>
              <Avatar size="small" icon={<UserOutlined />} />
            </a>
          </Dropdown>
        </div>
        <Header className="bottom-header">
          <Menu
            theme="dark"
            mode="horizontal"
            style={{ flex: 1, minWidth: 0 }}
            onClick={(e) => navigate(e.key)}
            items={sidebarItems.filter((item) => item.role.includes(role))}
            selectedKeys={location.pathname ? [location.pathname] : []}
          />
        </Header>
        <Content style={{ margin: "24px", overflow: "initial" }}>
          <div
            className="private-layout-content"
            // style={{
            //   padding: 24,
            //   background: colorBgContainer,
            //   borderRadius: borderRadiusLG,
            // }}
          >
            <Outlet />
          </div>
        </Content>

        <Footer style={{ textAlign: "center" }}>
          Market Management ©{new Date().getFullYear()}
        </Footer>
      </Layout>
    </>
  );
};
export default PriveLayout;
