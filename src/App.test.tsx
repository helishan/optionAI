import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const appElement = screen.getByTestId('app'); // 使用测试 ID 或其他属性进行定位
  expect(appElement).toBeInTheDocument(); // 断言元素是否在 DOM 中存在
});
