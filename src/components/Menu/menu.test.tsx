import { render, screen, RenderResult, fireEvent, waitFor } from "@testing-library/react";
import Menu, { MenuProps } from "./menu";
import MenuItem from "./menuItem";
import SubMenu from "./subMenu";
jest.mock('../Icon/icon', () => {
  return () => {
    return <i className="fa"></i>
  }
})
jest.mock('react-transition-group', () => {
  return {
    CSSTransition: (props: any) => {
      return props.children
    }
  }
})
const testProps: MenuProps = {
  defaultIndex: '0',
  onSelect: jest.fn(),
  className: 'test'
}
const testVerProps: MenuProps = {
  defaultIndex: '0',
  mode: 'vertical',
  defaultOpenSubMenus: ['4'],
  onSelect: jest.fn(),
}
const createStyleFile = () => {
  const cssFile: string = `
    .submenu {
      display: none;
    }
    .submenu.menu-opened {
      display: block;
    }
    `
    const style = document.createElement('style')
    style.type = 'text/css'
    style.innerHTML = cssFile
    return style
}
let wrapper: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement
const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>active</MenuItem>
      <MenuItem disabled>disabled</MenuItem>
      <MenuItem>third</MenuItem>
      <SubMenu title="dropdown">
        <MenuItem>drop1</MenuItem>
      </SubMenu>
      <SubMenu title="opened">
        <MenuItem>
          opened1
        </MenuItem>
      </SubMenu>
    </Menu>
  )
}
const menuRender = (props: MenuProps) => {
  wrapper = render(generateMenu(props))
  wrapper.container.append(createStyleFile())
  menuElement = screen.getByTestId('test-menu')
  activeElement = screen.getByText('active')
  disabledElement = screen.getByText('disabled')
}
describe('test Menu and MenuItem component in default(horizontal) mode', () => {
  it('should render correct Menu and MenuItem based on default props', () => {
    menuRender(testProps)
    expect(menuElement).toBeInTheDocument()
    expect(menuElement).toHaveClass('menu test')
    const menuItems = screen.queryAllByTestId('test-menu-item')
    expect(menuItems).toHaveLength(5);
    // expect(menuElement.getElementsByTagName('li').length).toEqual(3)
    // expect(menuElement.querySelectorAll(':scope > li').length).toEqual(4)
    expect(activeElement).toHaveClass('menu-item is-active')
    expect(disabledElement).toHaveClass('menu-item is-disabled')
  })
  it('click items should change active and call the right callback', () => {
    menuRender(testProps)
    const thirdItem = screen.getByText('third')
    fireEvent.click(thirdItem)
    expect(thirdItem).toHaveClass('is-active')
    expect(activeElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).toHaveBeenCalledWith('2')
    fireEvent.click(disabledElement)
    expect(disabledElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).not.toHaveBeenCalledWith('1')
  })
  it('should render vertical mode when mode is set to vertical', () => {
    menuRender(testVerProps)
    expect(menuElement).toHaveClass('menu-vertical')
  })
  it('should show dropdown items when hover on subMenu', async () => {
    menuRender(testProps)
    const drop1Item = screen.queryByText('drop1')
    expect(drop1Item).not.toBeVisible()
    const dropdownElement = screen.getByText('dropdown')
    fireEvent.mouseEnter(dropdownElement)
    await waitFor(() => {
      expect(drop1Item).toBeVisible()
    })
    fireEvent.click(screen.getByText('drop1'))
    expect(testProps.onSelect).toHaveBeenCalledWith('3-0')
    fireEvent.mouseLeave(dropdownElement)
    await waitFor(() => {
      expect(drop1Item).not.toBeVisible()
    })
  })
  
it('should show dropdown items when click on subMenu', () => {
  menuRender(testVerProps)
  const drop1Item = screen.queryByText('drop1')
  expect(drop1Item).not.toBeVisible()
  const dropdownElement = screen.getByText('dropdown')
  fireEvent.click(dropdownElement)
  expect(drop1Item).toBeVisible()
  fireEvent.click(screen.getByText('drop1'))
  expect(testVerProps.onSelect).toHaveBeenCalledWith('3-0')
})
})

describe('test Menu and MenuItem component is vertical mode', () => {
  it('should render vertical mode when mode is set to vertical', () => {
    menuRender(testVerProps)
    const menuElement = screen.getByTestId('test-menu')
    expect(menuElement).toHaveClass('menu-vertical')
  })
  it('should show dropdown items when click on subMenu for vertical mode', () => {
    menuRender(testVerProps)
    const drop1DownItem = screen.queryByText('drop1')
    expect(drop1DownItem).not.toBeVisible()
    fireEvent.click(screen.getByText('dropdown'))
    expect(drop1DownItem).toBeVisible()
  })
  it('should show subMenu dropdown when defaultOpenSubMenus contains SubMenu index', async () => {
    menuRender(testVerProps)
    expect(screen.queryByText('opened1')).toBeVisible()
  })
})