import { NumericFormat } from "react-number-format";

const NumberFormat = ({
  value,
  decimalScale = 2,
  ...props
}: {
  value: any;
  decimalScale?: number;
}) => {
  return (
    <NumericFormat
      thousandSeparator
      displayType="text"
      decimalScale={decimalScale}
      value={value}
      {...props}
    />
  );
};

export default NumberFormat;
