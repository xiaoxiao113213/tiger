export enum OperateEnum {
  add = 'add',
  edit = 'edit',
  detail = 'detail',
  close = 'close',
}

export function showOperateName(operateEnum: OperateEnum) {
  if (operateEnum === OperateEnum.add) {
    return '新增';
  } else if (operateEnum === OperateEnum.edit) {
    return '编辑';
  } else if (operateEnum === OperateEnum.detail) {
    return '详情';
  } else {
    return '';
  }
}

export const DisabledMap = {
  可用: '0',
  禁用: '1',
  0: '可用',
  1: '禁用',
};
// 0目录 1菜单 2按钮
export const MenuTypeMap = {
  目录: '0',
  菜单: '1',
  按钮: '2',
  0: '目录',
  1: '菜单',
  2: '按钮',
};

export const AccountTypeMap = {
  前台: '0',
  后台: '1',

  0: '前台',
  1: '后台',
};
