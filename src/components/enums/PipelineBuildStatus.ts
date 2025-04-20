export enum PipelineBuildStatusEnum {
  queue = 7,//队列中
  construct = 8,//构建中
  process = 9,//流程审批中
  success = 27,//构建成功
  fail = 28,//构建失败
  fail_skip = 29,//错误-跳过
  stop = 30,//强制终止
}

export const PipelineBuildStatusMap = new Map<number, string>()
  .set(7, '队列中')
  .set(8, '构建中')
  .set(9, '流程审批中')
  .set(27, '构建成功')
  .set(28, '构建失败')
  .set(29, '错误-跳过')
  .set(30, '强制终止');

export function getPipelineBuildStatusDic() {

  return Object.keys(PipelineBuildStatusMap).map(key => ({
    value: parseInt(key),
    label: PipelineBuildStatusMap[key],
  }));

}

export function getPipelineBuildStatusEnum(type: number) {
  switch (type) {
    case 7:
      return PipelineBuildStatusEnum.queue;
    case 8:
      return PipelineBuildStatusEnum.construct;
    case 9:
      return PipelineBuildStatusEnum.process;
    case 27:
      return PipelineBuildStatusEnum.success;
    case 28:
      return PipelineBuildStatusEnum.fail;
    case 29:
      return PipelineBuildStatusEnum.fail_skip;
    case 30:
      return PipelineBuildStatusEnum.stop;
  }

}

