import React, { useEffect, useState } from 'react';
import Button, {ButtonType, ButtonSize} from "./components/Button/button";
import Menu from "./components/Menu/menu";
import MenuItem from "./components/Menu/menuItem";
import SubMenu from "./components/Menu/subMenu";
import Icon from "./components/Icon/icon";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // 1
// import { faCoffee, faCheckSquare } from "@fortawesome/free-solid-svg-icons"; // 1 2
import { fas } from "@fortawesome/free-solid-svg-icons"; // 1 2
import { library } from "@fortawesome/fontawesome-svg-core"; // 2
// library.add(faCheckSquare, faCoffee); // 2
library.add(fas) // 所有图标

const App: React.FC = () => {
  const [count, setCount] = useState(0)
  useEffect(() => {
    console.log(`useEffect Count is ${count}`)
  }, [count])
  const increment = () => {
    setCount(count + 1)
    console.log(`Increment Count is ${count}`)
  }
  return (
    <div className="App" data-testid="app">
      {/* <FontAwesomeIcon icon={faCoffee}/> */}
      {/* <Icon theme="danger" icon={faCoffee}></Icon> */}
      <Icon icon="arrow-down" theme='danger'></Icon>
      <Button autoFocus className='Hello' onClick={(e) => {e.preventDefault(); alert(123)}}>Hello</Button>
      <Button className='hello' btnType={ButtonType.Primary} size={ButtonSize.Large} disabled>Large</Button>
      <Button btnType={ButtonType.Default} size={ButtonSize.Small} >Small</Button>
      <Button btnType={ButtonType.Danger} size={ButtonSize.Small} >Small</Button>
      <Button btnType={ButtonType.Default} size={ButtonSize.Small} >Small</Button>
      <Button btnType={ButtonType.Link} href='http://www.baidu.com' target='_black'>Hello</Button>
      <Button btnType={ButtonType.Link} href='http://www.baidu.com' disabled>Hello</Button>
      {/* <Menu defaultIndex='0' onSelect={(index) => {alert(index)}} mode='vertical'>
        <MenuItem disabled>1</MenuItem>
        <MenuItem>2</MenuItem>
        <MenuItem>3</MenuItem>
      </Menu>
      <Menu defaultIndex='0' onSelect={(index) => {alert(index)}} mode='horizontal'>
        <MenuItem disabled>1</MenuItem>
        <MenuItem>2</MenuItem>
        <MenuItem>3</MenuItem>
      </Menu> */}
      <Menu defaultIndex='0' onSelect={(index) => {alert(index)}} mode='horizontal'>
      <SubMenu title='dropdown'>
        <MenuItem>hor dropdown 1</MenuItem>
        <MenuItem>hor dropdown 2</MenuItem>
        <MenuItem>hor dropdown 3</MenuItem>
      </SubMenu>
      </Menu>
      {/* <Menu defaultIndex='0' onSelect={(index) => {alert(index)}} mode='vertical' defaultOpenSubMenus={['0']}> */}
      <Menu defaultIndex='0' onSelect={(index) => {alert(index)}} mode='vertical'>
      <SubMenu title='dropdown'>
        <MenuItem>ver dropdown 1</MenuItem>
        <MenuItem>ver dropdown 2</MenuItem>
        <MenuItem>ver dropdown 3</MenuItem>
      </SubMenu>
      </Menu>
      <Menu defaultIndex='0' onSelect={(index) => {alert(index)}}>
      <SubMenu title='dropdown'>
        <MenuItem>del dropdown 1</MenuItem>
        <MenuItem>del dropdown 2</MenuItem>
        <MenuItem>del dropdown 3</MenuItem>
      </SubMenu>
      </Menu>
      <p>Count: {count}</p>
      <button onClick={increment}>按钮</button>

    </div>
  );
}

export default App;
