import React from "react";
import classNames from "classnames"; // 用于添加 class 的名称

export enum ButtonSize {
  Large = 'lg',
  Small = 'sm'
}

export enum ButtonType {
  Primary = 'primary',
  Default = 'default',
  Danger = 'danger',
  Link = 'link'
}

interface BaseButtonProps {
  className?: string;
  disabled?: boolean;
  size?: ButtonSize;
  btnType?: ButtonType;
  children: React.ReactNode;
  href?: string; 
}
/*
拿到所有 button 的属性(onClick, autoFocus) 交叉类型是把多种类型合并成新的类型,因为联合类型是或的关系，这个是和的关系
*/
type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>
// a 链接的属性
type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>
/* 
有可能有些属性在 button 上是必须的, 但是在 a 链接中我们没法填写 button 的必须属性，反过来也是一样
所以这个时候要把一些属性设置成可选的，怎么办？Partial<T> 可以让我们把属性变成可选的
*/
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>

const Button: React.FC<ButtonProps> = (props) => {
  const {
    btnType,
    className, // 自定义的 class 名称
    disabled,
    size,
    children,
    href,
    ...restProps //取出剩下的属性
  } = props
  // btn, btn-lg, btn-primary
  const classes = classNames('btn', className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    'disabled': (btnType === ButtonType.Link) && disabled
  })
  if (btnType === ButtonType.Link && href) {
    return (
      <a
        className={classes}
        href={href}
        {...restProps}
      >{children}</a>
    )
  }else {
    return (
      <button
        className={classes}
        disabled={disabled}
        {...restProps}
      >
        {children}
      </button>
    )
  }
}

Button.defaultProps = {
  disabled: false,
  btnType: ButtonType.Default
}

export default Button;