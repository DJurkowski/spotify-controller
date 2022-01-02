import React from 'react';

interface ButtonProps {
  text: string,
  Icon: (props: React.ComponentProps<'svg'>) => JSX.Element,
  onClick?:()=>void,
  classIconString?:string | undefined,
};

const Button = ({text, Icon, onClick, classIconString}: ButtonProps) => {
  return (
    <button className={`flex items-center space-x-2 hover:text-white`} onClick={onClick}>
      <Icon className={`h-5 w-5 ${classIconString}`}/>
      <p>{text}</p>
    </button>
  )
}

export default Button
