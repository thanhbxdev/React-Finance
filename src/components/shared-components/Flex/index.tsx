import React, { ReactNode, ReactNodeArray, useMemo } from 'react';
import clsx from 'clsx';

interface Props {
  alignItems?: 'center' | 'start' | 'end' | 'baseline' | 'stretch';
  alignSize?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  justifyContent?: 'center' | 'start' | 'end' | 'between' | 'around' | 'evenly';
  justifySize?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  direction?:
    | 'column'
    | 'column-reverse'
    | 'fill'
    | 'grow-0'
    | 'grow-1'
    | 'nowrap'
    | 'row'
    | 'row-reverse'
    | 'wrap'
    | 'wrap-reverse'
    | 'shrink-0'
    | 'shrink-1';
  directionSize?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  children: ReactNode | ReactNodeArray;
  className?: string;
}
export default function Flex(props: Props) {
  const { alignSize, alignItems, justifyContent, justifySize, direction, directionSize, children, className } = props;
  const alignItemClassName = useMemo(
    () => (alignItems ? `align-items-${alignSize ? `${alignSize}-` : ''}${alignItems}` : ''),
    [alignItems, alignSize],
  );
  const justifyContentClassName = useMemo(
    () => (justifyContent ? `justify-content-${justifySize ? `${justifySize}-` : ''}${justifyContent}` : ''),
    [justifyContent, justifySize],
  );
  const directionClassName = useMemo(
    () => (direction ? `flex-${directionSize ? `${directionSize}-` : ''}${direction}` : ''),
    [direction, directionSize],
  );
  return (
    <div className={clsx('d-flex', className, alignItemClassName, justifyContentClassName, directionClassName)}>
      {children}
    </div>
  );
}
