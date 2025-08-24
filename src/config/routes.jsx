import React from 'react'; 
 
 import {
  HomeOutlined,
  InfoCircleOutlined,
  CodeOutlined
} from '@ant-design/icons';

const Home = React.lazy(() => import('../pages/Home'));
const LC88 = React.lazy(() => import('../pages/LC88'));
const LC27 = React.lazy(() => import('../pages/LC27'));
const LC26 = React.lazy(() => import('../pages/LC26'));
const LC80 = React.lazy(() => import('../pages/LC80'));
const About = React.lazy(() => import('../pages/About'));

// 路由配置
export const routeConfig = [
  {
    path: '/',
    component: Home,
    title: '*ST',
    breadcrumb: ['首页'],
    menuKey: '/',
    label: '首页',
    icon: <HomeOutlined />,
    showInMenu: true,
  },
  {
    path: '/lc88',
    component: LC88,
    title: '合并两个有序数组',
    breadcrumb: ['基本功', '合并有序数组'],
    menuKey: '/lc88',
    label: '合并有序数组',
    parent: 'lc',
    showInMenu: true,
  },
  {
    path: '/lc27',
    component: LC27,
    title: '移除元素',
    breadcrumb: ['基本功', '移除元素'],
    menuKey: '/lc27',
    label: '移除元素',
    parent: 'lc',
    showInMenu: true,
  },
  {
    path: '/lc26',
    component: LC26,
    title: '删除有序数组中的重复项',
    breadcrumb: ['基本功', '删除重复项'],
    menuKey: '/lc26',
    label: '删除重复项',
    parent: 'lc',
    showInMenu: true,
  },
  {
    path: '/lc80',
    component: LC80,
    title: '删除有序数组中的重复项 II',
    breadcrumb: ['基本功', '删除重复项 II'],
    menuKey: '/lc80',
    label: '删除重复项 II',
    parent: 'lc',
    showInMenu: true,
  },
  {
    path: '/about',
    component: About,
    title: '关于笔记',
    breadcrumb: ['关于'],
    menuKey: '/about',
    label: '关于',
    icon: <InfoCircleOutlined/>,
    showInMenu: true,
  },
];

// 菜单组配置
export const menuGroups = {
  lc: {
    key: 'lc',
    icon: <CodeOutlined />,
    label: '基本功',
  },
};

// 生成菜单项
export const generateMenuItems = () => {
  const menuItems = [];
  const groupedItems = {};
  let homeItem = null;
  let aboutItem = null;

  routeConfig.forEach(route => {
    if (!route.showInMenu) return;

    if (route.parent) {
      if (!groupedItems[route.parent]) {
        groupedItems[route.parent] = [];
      }
      groupedItems[route.parent].push({
        key: route.menuKey,
        label: route.label,
      });
    } else {
      const menuItem = {
        key: route.menuKey,
        icon: route.icon,
        label: route.label,
      };

      // 如果是首页，单独保存
      if (route.path === '/') {
        homeItem = menuItem;
      }
      // 如果是关于页面，单独保存
      else if (route.path === '/about') {
        aboutItem = menuItem;
      }
      else {
        menuItems.push(menuItem);
      }
    }
  });

  // 添加分组菜单
  Object.keys(groupedItems).forEach(groupKey => {
    const group = menuGroups[groupKey];
    if (group) {
      menuItems.push({
        key: group.key,
        icon: group.icon,
        label: group.label,
        children: groupedItems[groupKey],
      });
    }
  });

  // 构建最终菜单：首页在第一位，关于页面在最后一位
  const finalMenuItems = [];

  if (homeItem) {
    finalMenuItems.push(homeItem);
  }

  finalMenuItems.push(...menuItems);

  if (aboutItem) {
    finalMenuItems.push(aboutItem);
  }

  return finalMenuItems;
};

// 获取面包屑
export const getBreadcrumbItems = (pathname) => {
  const route = routeConfig.find(r => r.path === pathname);
  return route ? route.breadcrumb : ['首页'];
};

// 获取页面标题
export const getPageTitle = (pathname) => {
  const route = routeConfig.find(r => r.path === pathname);
  return route ? route.title : '*ST';
};