import { ReactElement } from 'react';
import { Typography } from 'antd';
import { TextProps } from 'antd/es/typography/Text';
import clsx from 'clsx';

interface CurrencyFormatProps extends TextProps {
  value: number;
  textSuccess?: boolean;
  hidden?: boolean;
  prefix?: ReactElement | string;
  suffix?: ReactElement | string;
}

export default function CurrencyFormat(props: CurrencyFormatProps): ReactElement {
  const { value, textSuccess, className, hidden, prefix, suffix, ...rest } = props;
  const price = value || 0;
  const numberFormat = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 2,
  });
  return (
    <Typography.Text
      className={clsx(className, { 'd-none': hidden })}
      {...rest}
      type={price < 0 ? 'danger' : textSuccess ? 'success' : undefined}
    >
      {prefix}
      {numberFormat.format(price)}
      {suffix}
    </Typography.Text>
  );
}
