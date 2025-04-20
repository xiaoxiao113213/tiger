import { systemConfigByKeyPublic } from '@/pages/system/systemConfig/api';
import { checkApiRst } from '@/utils/utils.ts';


export const getConfig = async (key: string) => {
  let rst = await systemConfigByKeyPublic(key);
  if (checkApiRst(rst)) return;
  return rst.data;
};


let docHost = '';
let serverHost = '';
let serverPort = '80';
//  一开始想要初始化的数据
export const initMySystemConfig = async () => {
  serverHost = await getConfig('server_host') ?? '';
  docHost = await getConfig('doc_host') ?? '';
  serverPort = await getConfig('server_port') ?? '80';
};

export const getServerHost = () => {
  return serverHost;
};
export const getServerPort = () => {
  return serverPort;
};
export const getDocHost = () => {
  return docHost;
};