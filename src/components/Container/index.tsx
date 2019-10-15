import * as React from 'react';

interface IProps {
  comp?: string,
  children?: React.ReactNode,
  render?: React.ReactElement,
  style?: object
}

interface CloneProps {
  comp?: string,
  children?: React.ReactNode,
  style?: object
}

const Container: React.FC<IProps> = ({ comp: comp = 'div', children, render, style }) => {
  
  return !!render ? 
  React.cloneElement(render, {
    comp: comp,
    children,
    style
  } as CloneProps) : 
  React.createElement(comp, {   
    style 
  }, [children])
}

export default Container;