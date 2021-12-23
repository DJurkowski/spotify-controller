import React from 'react';

interface ButtonProps {
  text: string,
  Icon: (props: React.ComponentProps<'svg'>) => JSX.Element,
  onClick?:()=>void
};

const Button = ({text, Icon, onClick }: ButtonProps) => {
  return (
    <button className="flex items-center space-x-2 hover:text-white" onClick={onClick}>
      <Icon className="h-5 w-5"/>
      <p>{text}</p>
    </button>
  )
}

export default Button
