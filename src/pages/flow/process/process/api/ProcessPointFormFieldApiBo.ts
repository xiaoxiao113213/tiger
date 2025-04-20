import dayjs from 'dayjs';

export type ProcessPointFormFieldVo = {
  processPointFormFieldId: number;
  processId: number;
  processVersionId: number;
  processPointId: number;
  processPointFormId: number;
  name: string;
  keyName: string;
  type: number;
  optional: string;
  value: string | undefined | dayjs.Dayjs;
  desc: string;
  editFlag: number;
  notNull: number;
  sort: number;
  dateType: number;
  unit: string;
};

//
// export type ProcessPointFormFieldDetailVo = {
//   processPointFormFieldId: number;
//   processId: number;
//   processVersionId: number;
//   processPointId: number;
//   processPointFormId: number;
//   name: string;
//   keyName: string;
//   type: number;
//   optional: string;
//   value: string;
//   desc: string;
//   editFlag: number;
//   notNull: number;
//   sort: number;
//   dateType: number;
//   unit: string;
// };
//
// export type ProcessPointFormFieldListVo = {
//   processPointFormFieldId: number;
//   processId: number;
//   processVersionId: number;
//   processPointId: number;
//   processPointFormId: number;
//   name: string;
//   keyName: string;
//   type: number;
//   optional: string;
//   value: string;
//   desc: string;
//   editFlag: number;
//   notNull: number;
//   sort: number;
//   dateType: number;
//   unit: string;
// };
//
