import { ReactElement } from 'react';
import { TextProps } from 'antd/es/typography/Text';
import { Typography } from 'antd';
import clsx from 'clsx';

interface PercentFormatProps extends TextProps {
  value: number;
  fractionDigits?: number;
  hidden?: boolean;
  prefix?: ReactElement | string;
  suffix?: ReactElement | string;
}

export default function PercentFormat(props: PercentFormatProps): ReactElement {
  const { value, fractionDigits, className, hidden, prefix, suffix, ...rest } = props;
  return (
    <Typography.Text className={clsx(className, { 'd-none': hidden })} {...rest}>
      {prefix}
      {fractionDigits ? value.toFixed(fractionDigits) : value.toFixed(2)}%{suffix}
    </Typography.Text>
  );
}
