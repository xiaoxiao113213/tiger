import { fileUploadVo } from '@/utils/baseBo.ts';
import { Tag } from 'antd';
import React from 'react';

export type ProjectReleaseDetailVo = {
    projectReleaseId: number;
    projectId: number;
    status: string;
    sort: number;
    version: string;
    remarks: string;
    progress: string;
    createBy: number;
    createTime: string;
    deleteFlag: number;
    fileList: fileUploadVo[];
    customValues?: object;
};

