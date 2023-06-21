export interface DataRangeInputProps {
  label: string;
  onChangeRange: (data: rangeDataType) => {};
}

export interface rangeDataType {
  init: Date | null;
  end: Date | null;
}
