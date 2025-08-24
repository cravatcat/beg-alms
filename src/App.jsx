import React, { useState, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout, Menu, theme, Typography, Breadcrumb, Spin } from 'antd';
import {
  CodeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  GithubOutlined,
} from '@ant-design/icons';
import './App.css';

import { 
  routeConfig, 
  generateMenuItems, 
  getBreadcrumbItems, 
  getPageTitle 
} from './config/routes.jsx';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // 生成菜单项
  const menuItems = generateMenuItems();

  // 处理菜单点击
  const handleMenuClick = ({ key }) => {
    if (key !== 'lc') {
      window.location.href = key;
    }
  };

  // 获取当前路径
  const currentPath = window.location.pathname;

  return (
    <div className="h-screen overflow-hidden">
      <Layout className="h-full">
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          className="border-r border-gray-200"
          style={{ background: colorBgContainer }}
          width={250}
        >
          <div className="h-14 mx-4 my-4 flex items-center border-b border-gray-200 pb-4 mb-4">
            <div className={`flex items-center ${collapsed ? 'justify-center w-full' : 'justify-start'}`}>
              <CodeOutlined className="text-2xl text-blue-500" />
              {!collapsed && (
                <Title level={4} className="ml-3 mb-0 text-blue-500 leading-none pt-2">
                  前端生存手册
                </Title>
              )}
            </div>
          </div>
          <Menu
            mode="inline"
            defaultSelectedKeys={[currentPath]}
            defaultOpenKeys={['lc']}
            items={menuItems}
            onClick={handleMenuClick}
            className="border-none"
          />
        </Sider>

        <Layout className="h-screen overflow-hidden">
          <Header 
            className="px-6 border-b border-gray-200 flex items-center justify-between flex-shrink-0"
            style={{ background: colorBgContainer }}
          >
            <div className="flex items-center">
              {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'text-lg cursor-pointer hover:text-blue-500 transition-colors',
                onClick: () => setCollapsed(!collapsed),
              })}
              <Title level={3} className="ml-6 mb-0 mt-3">
                {getPageTitle(currentPath)}
              </Title>
            </div>
            <div className="flex items-center">
              <a 
                href="https://github.com/cravatcat/beg-alms" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center text-blue-500 no-underline text-base font-medium hover:text-blue-600 transition-colors"
              >
                <GithubOutlined className="text-xl mr-2" />
                GitHub
              </a>
            </div>
          </Header>

          <Content
            className="m-4 overflow-auto flex flex-col"
            style={{
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              height: 'calc(100vh - 64px - 32px)',
            }}
          >
            <div className="pt-4 px-6 flex-shrink-0">
              <Breadcrumb
                items={getBreadcrumbItems(currentPath).map(item => ({ title: item }))}
                className="mb-4"
              />
            </div>

            <div className="px-6 pb-6 flex-1 overflow-auto">
              <Suspense fallback={
                <div className="flex justify-center mt-12">
                  <Spin size="large" />
                </div>
              }>
                <Routes>
                  {routeConfig.map(route => (
                    <Route 
                      key={route.path} 
                      path={route.path} 
                      element={<route.component />} 
                    />
                  ))}
                </Routes>
              </Suspense>
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default App;
