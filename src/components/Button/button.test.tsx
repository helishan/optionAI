import { render, screen, fireEvent } from "@testing-library/react";
import Button, { ButtonProps, ButtonSize, ButtonType } from "./button";
const defaultProps = {
  onClick: jest.fn()
}
const testProps: ButtonProps = {
  btnType: ButtonType.Primary,
  size: ButtonSize.Large,
  className: 'testClassName'
}
const disabledProps: ButtonProps = {
  disabled: true,
  onClick: jest.fn()
}
// case 分类
describe('test Button component', () => {
  it('should render the correct default button', () => {
    render(<Button {...defaultProps}>Default</Button>)
    const element = screen.getByText('Default') as HTMLButtonElement
    expect(element).toBeInTheDocument()
    expect(element?.tagName).toEqual('BUTTON')
    expect(element).toHaveClass('btn btn-default')
    expect(element.disabled).toBeFalsy()
    fireEvent.click(element)
    expect(defaultProps.onClick).toHaveBeenCalled()
  })
  it('should render the correct component based on different props', () => {
    render(<Button {...testProps}>Primary</Button>)
    const element = screen.getByText('Primary')
    expect(element).toBeInTheDocument()
    expect(element).toHaveClass('btn btn-primary btn-lg testClassName')
  })
  it('should render a link when btnType equals link and href is provided', () => {
    render(<Button btnType={ButtonType.Link} href="http://dummyurl">Link</Button>)
    const element = screen.getByText('Link')
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('A')
    expect(element).toHaveClass('btn btn-link')
  })
  it('should render disabled button when disabled set to true', () => {
    render(<Button {...disabledProps}>Disabled</Button>)
    const element = screen.getByText('Disabled') as HTMLButtonElement
    expect(element).toBeInTheDocument()
    expect(element.disabled).toBeTruthy()
    fireEvent.click(element)
    expect(disabledProps.onClick).not.toHaveBeenCalled()
  })
})