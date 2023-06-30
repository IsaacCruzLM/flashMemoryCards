export interface DataRangeInputProps {
  label: string;
  onChangeRange: (data: rangeDataType) => {};
  defaultValue?: rangeDataType;
}

export interface rangeDataType {
  init: Date | null;
  end: Date | null;
}
