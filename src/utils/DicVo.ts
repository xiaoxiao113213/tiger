export type DicVo = {
  label: string;
  value: number | string;
  color?: string | undefined;
};

export type OptionVo = {
  label: string;
  value: string;
  disabled?: boolean;
  children?: OptionVo[];
}