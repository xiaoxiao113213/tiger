SET NAMES utf8mb4;

CREATE DATABASE IF NOT EXISTS tiger
    DEFAULT CHARACTER SET utf8mb4
    DEFAULT COLLATE utf8mb4_0900_ai_ci;
-- 切换到新创建的数据库
USE tiger;

DROP TABLE IF EXISTS `account`;
CREATE TABLE `account`
(
    `id`                bigint                                                        NOT NULL AUTO_INCREMENT COMMENT '主键',
    `account`           varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '账号',
    `nick_name`         varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL     DEFAULT NULL COMMENT 'nickName',
    `avatar`            varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL     DEFAULT NULL COMMENT '头像',
    `password`          varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
    `password_strength` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'weak' COMMENT 'weak  medium  strong',
    `type`              int UNSIGNED                                                  NOT NULL COMMENT '类型:0前台  1后台',
    `disabled`          int UNSIGNED                                                  NOT NULL DEFAULT 0 COMMENT '状态0 启用 1禁用',
    `remarks`           varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL     DEFAULT NULL COMMENT '备注',
    `create_time`       datetime                                                      NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `create_by`         bigint                                                        NOT NULL COMMENT '创建人id',
    `update_time`       datetime                                                      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `update_by`         bigint UNSIGNED                                               NOT NULL COMMENT '更新人',
    `delete_flag`       int UNSIGNED                                                  NOT NULL DEFAULT 0 COMMENT '删除 0不删除 1删除',
    `email`             varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL     DEFAULT NULL COMMENT '邮箱',
    `phone`             varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL     DEFAULT NULL COMMENT '手机号',
    `openid`            varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL     DEFAULT NULL COMMENT 'openid',
    `flag_login_out`    int                                                           NOT NULL DEFAULT 0 COMMENT '是否退出登录 0未退出 1退出',
    PRIMARY KEY (`id`) USING BTREE,
    UNIQUE INDEX `account_1` (`account` ASC, `delete_flag` ASC) USING BTREE
) ENGINE = InnoDB
  AUTO_INCREMENT = 20020
  CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci COMMENT = '账号;'
  ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for account_dept
-- ----------------------------
DROP TABLE IF EXISTS `account_dept`;
CREATE TABLE `account_dept`
(
    `id`          bigint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
    `account_id`  bigint UNSIGNED NOT NULL COMMENT '账号id',
    `dept_id`     bigint UNSIGNED NOT NULL COMMENT '部门id',
    `owner`       int UNSIGNED    NOT NULL DEFAULT 0 COMMENT '职责0员工 1负责人',
    `create_time` datetime        NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `create_by`   bigint UNSIGNED NOT NULL COMMENT '创建人id',
    `update_time` datetime        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `update_by`   bigint UNSIGNED NOT NULL COMMENT '更新人',
    PRIMARY KEY (`id`) USING BTREE,
    UNIQUE INDEX `account_dept_1` (`account_id` ASC, `dept_id` ASC) USING BTREE
) ENGINE = InnoDB
  AUTO_INCREMENT = 106
  CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci COMMENT = '账号-部门;'
  ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for account_role
-- ----------------------------
DROP TABLE IF EXISTS `account_role`;
CREATE TABLE `account_role`
(
    `id`          bigint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
    `account_id`  bigint UNSIGNED NOT NULL,
    `role_id`     bigint UNSIGNED NOT NULL,
    `create_time` datetime        NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `create_by`   bigint UNSIGNED NOT NULL COMMENT '创建人id',
    PRIMARY KEY (`id`) USING BTREE,
    INDEX `account_role_1` (`account_id` ASC) USING BTREE
) ENGINE = InnoDB
  AUTO_INCREMENT = 20144
  CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci COMMENT = '账号-角色;'
  ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for ai_chat
-- ----------------------------
DROP TABLE IF EXISTS `ai_chat`;
CREATE TABLE `ai_chat`
(
    `ai_chat_id`  bigint UNSIGNED                                                NOT NULL AUTO_INCREMENT COMMENT '主键',
    `title`       varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci  NOT NULL COMMENT '标题',
    `type`        varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci   NOT NULL COMMENT '类型',
    `create_by`   bigint UNSIGNED                                                NOT NULL COMMENT '创建人id',
    `create_time` datetime                                                       NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `update_by`   bigint UNSIGNED                                                NOT NULL COMMENT '更新人id',
    `update_time` datetime                                                       NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `delete_flag` int                                                            NOT NULL DEFAULT 0,
    `sort`        int                                                            NOT NULL DEFAULT 0 COMMENT '排序',
    `remarks`     varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL     DEFAULT NULL COMMENT '备注',
    PRIMARY KEY (`ai_chat_id`) USING BTREE,
    INDEX `ai_chat_1` (`update_time` ASC) USING BTREE
) ENGINE = InnoDB
  AUTO_INCREMENT = 35
  CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci
  ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for ai_chat_msg
-- ----------------------------
DROP TABLE IF EXISTS `ai_chat_msg`;
CREATE TABLE `ai_chat_msg`
(
    `ai_chat_msg_id` bigint UNSIGNED                                              NOT NULL AUTO_INCREMENT COMMENT '主键',
    `ai_chat_id`     bigint                                                       NOT NULL,
    `type`           varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '类型 0text  1file',
    `create_time`    datetime                                                     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
    `delete_flag`    int                                                          NOT NULL DEFAULT 0,
    `delete_time`    datetime                                                     NULL     DEFAULT NULL COMMENT '删除消息的时间',
    `text`           longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci    NULL COMMENT '文本消息',
    `file`           json                                                         NULL COMMENT '文件消息',
    `biz_type`       varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '类型 0用户 1ai的pipeline',
    `biz_id`         bigint                                                       NOT NULL DEFAULT 0 COMMENT '用户id 或者...',
    `status`         varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '进行中，成功，失败',
    `tokens`         bigint                                                       NOT NULL DEFAULT 0,
    PRIMARY KEY (`ai_chat_msg_id`) USING BTREE
) ENGINE = InnoDB
  AUTO_INCREMENT = 256
  CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci
  ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for ai_chat_user
-- ----------------------------
DROP TABLE IF EXISTS `ai_chat_user`;
CREATE TABLE `ai_chat_user`
(
    `ai_chat_user_id` bigint UNSIGNED                                               NOT NULL AUTO_INCREMENT COMMENT '主键',
    `ai_chat_id`      bigint                                                        NOT NULL COMMENT '聊天框id',
    `biz_type`        varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci  NOT NULL COMMENT '类型 0用户 1ai的pipeline',
    `biz_id`          bigint                                                        NOT NULL DEFAULT 0 COMMENT '用户id 或者...',
    `model`           varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL     DEFAULT NULL COMMENT '模型',
    `system_prompt`   longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci     NULL,
    `ai_pipeline_id`  bigint                                                        NULL     DEFAULT NULL,
    `audio_type`      varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL     DEFAULT NULL,
    `voice`           varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL     DEFAULT NULL,
    `live_portrait`   json                                                          NULL,
    PRIMARY KEY (`ai_chat_user_id`) USING BTREE
) ENGINE = InnoDB
  AUTO_INCREMENT = 52
  CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci
  ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for ai_model
-- ----------------------------
DROP TABLE IF EXISTS `ai_model`;
CREATE TABLE `ai_model`
(
    `ai_model_id`    bigint UNSIGNED                                                NOT NULL AUTO_INCREMENT COMMENT '主键',
    `belong`         varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci  NULL     DEFAULT NULL COMMENT '通义千问  豆包',
    `type`           json                                                           NOT NULL COMMENT '类型 文本  图片 文本和图片 ',
    `sort`           int                                                            NOT NULL DEFAULT 0 COMMENT '排序',
    `remarks`        varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL     DEFAULT NULL COMMENT '备注',
    `name`           varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci  NOT NULL,
    `code`           varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci  NOT NULL,
    `context_length` bigint                                                         NOT NULL COMMENT '上下文长度',
    `max_input`      bigint                                                         NOT NULL COMMENT '最大输入',
    `max_output`     bigint                                                         NOT NULL COMMENT '最大输出',
    PRIMARY KEY (`ai_model_id`) USING BTREE,
    UNIQUE INDEX `ai_model_1` (`code` ASC) USING BTREE
) ENGINE = InnoDB
  AUTO_INCREMENT = 6
  CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci
  ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for ai_pipeline
-- ----------------------------
DROP TABLE IF EXISTS `ai_pipeline`;
CREATE TABLE `ai_pipeline`
(
    `ai_pipeline_id` bigint UNSIGNED                                                NOT NULL AUTO_INCREMENT COMMENT '主键',
    `type`           varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci   NOT NULL COMMENT '类型',
    `name`           varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci  NOT NULL COMMENT '名称',
    `remarks`        varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '备注',
    `create_by`      bigint UNSIGNED                                                NOT NULL COMMENT '创建人id',
    `create_time`    datetime                                                       NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `update_by`      bigint UNSIGNED                                                NOT NULL COMMENT '更新人id',
    `update_time`    datetime                                                       NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `delete_flag`    int                                                            NOT NULL DEFAULT 0,
    `sort`           int                                                            NOT NULL DEFAULT 0 COMMENT '排序',
    PRIMARY KEY (`ai_pipeline_id`) USING BTREE
) ENGINE = InnoDB
  AUTO_INCREMENT = 13
  CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci COMMENT = 'ai流程'
  ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for ai_pipeline_edge
-- ----------------------------
DROP TABLE IF EXISTS `ai_pipeline_edge`;
CREATE TABLE `ai_pipeline_edge`
(
    `ai_pipeline_edge_id` bigint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
    `ai_pipeline_id`      bigint          NOT NULL,
    `source`              bigint          NOT NULL,
    `target`              bigint          NOT NULL,
    PRIMARY KEY (`ai_pipeline_edge_id`) USING BTREE
) ENGINE = InnoDB
  AUTO_INCREMENT = 50
  CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci
  ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for ai_pipeline_point
-- ----------------------------
DROP TABLE IF EXISTS `ai_pipeline_point`;
CREATE TABLE `ai_pipeline_point`
(
    `ai_pipeline_point_id` bigint UNSIGNED                                                NOT NULL AUTO_INCREMENT COMMENT '主键',
    `ai_pipeline_id`       bigint                                                         NOT NULL,
    `type`                 varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci   NOT NULL COMMENT '类型',
    `remarks`              varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '备注',
    `x`                    varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci  NULL DEFAULT NULL,
    `y`                    varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci  NULL DEFAULT NULL,
    `title`                varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci  NOT NULL,
    `model`                varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci  NULL DEFAULT NULL,
    `is_history`           varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci  NULL DEFAULT NULL,
    `system_prompt`        varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
    `user_prompt`          varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
    PRIMARY KEY (`ai_pipeline_point_id`) USING BTREE
) ENGINE = InnoDB
  AUTO_INCREMENT = 57
  CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci
  ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for ai_pipeline_point_var
-- ----------------------------
DROP TABLE IF EXISTS `ai_pipeline_point_var`;
CREATE TABLE `ai_pipeline_point_var`
(
    `ai_pipeline_point_var_id` bigint UNSIGNED                                                NOT NULL AUTO_INCREMENT,
    `ai_pipeline_point_id`     bigint                                                         NOT NULL COMMENT '主键',
    `ai_pipeline_id`           bigint                                                         NOT NULL,
    `name`                     varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci  NULL     DEFAULT NULL,
    `type`                     varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci   NULL     DEFAULT NULL COMMENT '类型',
    `remarks`                  varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL     DEFAULT NULL COMMENT '备注',
    `category`                 varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci  NOT NULL,
    `related_id`               json                                                           NULL,
    `related_var_id`           bigint                                                         NULL     DEFAULT NULL,
    `related_point_id`         bigint                                                         NULL     DEFAULT NULL,
    `default_value`            longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci      NULL,
    `parent_id`                bigint                                                         NOT NULL DEFAULT 0,
    PRIMARY KEY (`ai_pipeline_point_var_id`) USING BTREE,
    UNIQUE INDEX `ai_pipeline_point_var_1` (`ai_pipeline_point_id` ASC, `name` ASC, `category` ASC) USING BTREE,
    INDEX `ai_pipeline_point_var_2` (`ai_pipeline_id` ASC) USING BTREE,
    INDEX `ai_pipeline_point_var_3` (`ai_pipeline_point_id` ASC) USING BTREE,
    INDEX `ai_pipeline_point_var_4` (`category` ASC) USING BTREE
) ENGINE = InnoDB
  AUTO_INCREMENT = 157
  CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci COMMENT = '节点参数表'
  ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for application
-- ----------------------------
DROP TABLE IF EXISTS `application`;
CREATE TABLE `application`
(
    `id`          bigint UNSIGNED                                               NOT NULL AUTO_INCREMENT COMMENT '主键',
    `name`        varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '应用名称',
    `code`        varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '唯一编码',
    `token`       varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'sso 登录认证的令牌',
    `remarks`     varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL     DEFAULT NULL COMMENT '备注',
    `sort`        int                                                           NOT NULL DEFAULT 0,
    `disabled`    int                                                           NOT NULL DEFAULT 0,
    `create_time` datetime                                                      NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `create_by`   bigint UNSIGNED                                               NOT NULL COMMENT '创建人id',
    `update_time` datetime                                                      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `update_by`   bigint UNSIGNED                                               NOT NULL COMMENT '更新人',
    `delete_flag` int UNSIGNED                                                  NOT NULL DEFAULT 0 COMMENT '删除 0不删除 1删除',
    PRIMARY KEY (`id`) USING BTREE,
    UNIQUE INDEX `application_1` (`code` ASC) USING BTREE,
    UNIQUE INDEX `application_2` (`token` ASC) USING BTREE
) ENGINE = InnoDB
  AUTO_INCREMENT = 7
  CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci COMMENT = '应用;'
  ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for database_board
-- ----------------------------
DROP TABLE IF EXISTS `database_board`;
CREATE TABLE `database_board`
(
    `database_board_id` bigint UNSIGNED                                               NOT NULL AUTO_INCREMENT COMMENT '主键',
    `name`              varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '名称',
    `remarks`           varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL     DEFAULT NULL COMMENT '备注',
    `create_time`       datetime                                                      NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `create_by`         bigint UNSIGNED                                               NOT NULL COMMENT '创建人id',
    `update_time`       datetime                                                      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `update_by`         bigint UNSIGNED                                               NOT NULL COMMENT '更新人',
    `delete_flag`       int UNSIGNED                                                  NOT NULL DEFAULT 0 COMMENT '删除 0不删除 1删除',
    `zoom`              decimal(10, 5)                                                NOT NULL DEFAULT 1.00000 COMMENT '缩放比例',
    `pointx`            decimal(10, 5)                                                NOT NULL DEFAULT 0.00000 COMMENT '中心点x',
    `pointy`            decimal(10, 5)                                                NOT NULL DEFAULT 0.00000 COMMENT '中心点y',
    PRIMARY KEY (`database_board_id`) USING BTREE
) ENGINE = InnoDB
  AUTO_INCREMENT = 9
  CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci COMMENT = '数据库画板'
  ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for database_board_edge
-- ----------------------------
DROP TABLE IF EXISTS `database_board_edge`;
CREATE TABLE `database_board_edge`
(
    `database_board_edge_id` bigint UNSIGNED                                               NOT NULL AUTO_INCREMENT COMMENT '主键',
    `database_board_id`      bigint                                                        NOT NULL COMMENT '数据库画板id',
    `source`                 varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
    `source_handle`          varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
    `target`                 varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
    `target_handle`          varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
    PRIMARY KEY (`database_board_edge_id`) USING BTREE
) ENGINE = InnoDB
  AUTO_INCREMENT = 8
  CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci COMMENT = '连线'
  ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for database_config
-- ----------------------------
DROP TABLE IF EXISTS `database_config`;
CREATE TABLE `database_config`
(
    `database_config_id` bigint UNSIGNED                                               NOT NULL AUTO_INCREMENT COMMENT '主键',
    `name`               varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '库名称',
    `type`               int UNSIGNED                                                  NOT NULL COMMENT '库类型',
    `ip`                 varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '连接地址',
    `port`               int UNSIGNED                                                  NOT NULL COMMENT '端口号',
    `username`           varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL     DEFAULT NULL COMMENT '用户名',
    `password`           varchar(555) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL     DEFAULT NULL COMMENT '密码',
    `remarks`            varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL     DEFAULT NULL COMMENT '备注',
    `create_time`        datetime                                                      NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `create_by`          bigint UNSIGNED                                               NOT NULL COMMENT '创建人id',
    `update_time`        datetime                                                      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `update_by`          bigint UNSIGNED                                               NOT NULL COMMENT '更新人',
    `delete_flag`        int UNSIGNED                                                  NOT NULL DEFAULT 0 COMMENT '删除 0不删除 1删除',
    PRIMARY KEY (`database_config_id`) USING BTREE
) ENGINE = InnoDB
  AUTO_INCREMENT = 7
  CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci COMMENT = '数据库配置'
  ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for dept
-- ----------------------------
DROP TABLE IF EXISTS `dept`;
CREATE TABLE `dept`
(
    `id`          bigint UNSIGNED                                               NOT NULL AUTO_INCREMENT COMMENT '主键',
    `name`        varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '部门名称',
    `disabled`    int UNSIGNED                                                  NOT NULL DEFAULT 0 COMMENT '状态 0启用 1禁用',
    `parent_id`   bigint UNSIGNED                                               NOT NULL DEFAULT 0,
    `remarks`     varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL     DEFAULT NULL COMMENT '备注',
    `sort`        int UNSIGNED                                                  NOT NULL DEFAULT 0 COMMENT '排序',
    `create_time` datetime                                                      NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `create_by`   bigint UNSIGNED                                               NOT NULL COMMENT '创建人id',
    `update_time` datetime                                                      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `update_by`   bigint UNSIGNED                                               NOT NULL COMMENT '更新人',
    `delete_flag` int UNSIGNED                                                  NOT NULL DEFAULT 0 COMMENT '删除 0不删除 1删除',
    PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB
  AUTO_INCREMENT = 25
  CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci COMMENT = '部门;'
  ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for dic
-- ----------------------------
DROP TABLE IF EXISTS `dic`;
CREATE TABLE `dic`
(
    `id`          bigint UNSIGNED                                               NOT NULL AUTO_INCREMENT COMMENT '主键',
    `code`        varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '字典类型编码',
    `name`        varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '字典名称',
    `remarks`     varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL     DEFAULT NULL COMMENT '备注',
    `create_time` datetime                                                      NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `create_by`   bigint UNSIGNED                                               NOT NULL COMMENT '创建人id',
    `update_time` datetime                                                      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `update_by`   bigint UNSIGNED                                               NOT NULL COMMENT '更新人',
    `delete_flag` int UNSIGNED                                                  NOT NULL DEFAULT 0 COMMENT '删除 0不删除 1删除',
    PRIMARY KEY (`id`) USING BTREE,
    UNIQUE INDEX `dic_1` (`code` ASC, `delete_flag` ASC) USING BTREE
) ENGINE = InnoDB
  AUTO_INCREMENT = 28
  CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci COMMENT = '字典;'
  ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for dic_value
-- ----------------------------
DROP TABLE IF EXISTS `dic_value`;
CREATE TABLE `dic_value`
(
    `id`          bigint UNSIGNED                                               NOT NULL AUTO_INCREMENT COMMENT '主键',
    `dic_id`      bigint UNSIGNED                                               NOT NULL,
    `value`       varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '字典值',
    `label`       varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '字典标签名称',
    `color`       varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL     DEFAULT NULL,
    `remarks`     varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL     DEFAULT NULL,
    `disabled`    int                                                           NOT NULL DEFAULT 0,
    `create_time` datetime                                                      NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `create_by`   bigint UNSIGNED                                               NOT NULL COMMENT '创建人id',
    `update_time` datetime                                                      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `update_by`   bigint UNSIGNED                                               NOT NULL COMMENT '更新人',
    `delete_flag` int UNSIGNED                                                  NOT NULL DEFAULT 0 COMMENT '删除 0不删除 1删除',
    PRIMARY KEY (`id`) USING BTREE,
    UNIQUE INDEX `dic_value_1` (`dic_id` ASC, `value` ASC) USING BTREE
) ENGINE = InnoDB
  AUTO_INCREMENT = 131
  CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci COMMENT = '字典详情;'
  ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for do_log
-- ----------------------------
DROP TABLE IF EXISTS `do_log`;
CREATE TABLE `do_log`
(
    `id`          bigint UNSIGNED                                                NOT NULL AUTO_INCREMENT COMMENT '主键',
    `path`        varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL     DEFAULT NULL COMMENT '请求路径',
    `method`      varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci  NULL     DEFAULT NULL COMMENT '方法类型',
    `content`     longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci      NULL COMMENT '内容',
    `create_time` datetime                                                       NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `create_by`   bigint UNSIGNED                                                NOT NULL COMMENT '创建人id',
    `type`        int UNSIGNED                                                   NULL     DEFAULT 0 COMMENT '类型',
    `referer`     varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci  NULL     DEFAULT NULL COMMENT 'referer',
    PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB
  AUTO_INCREMENT = 79
  CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci COMMENT = '操作日志;'
  ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for doc
-- ----------------------------
DROP TABLE IF EXISTS `doc`;
CREATE TABLE `doc`
(
    `doc_id`      bigint UNSIGNED                                               NOT NULL AUTO_INCREMENT COMMENT '文档id',
    `name`        varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL     DEFAULT NULL,
    `remarks`     varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL     DEFAULT NULL COMMENT '备注',
    `create_time` datetime                                                      NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `create_by`   bigint                                                        NOT NULL COMMENT '创建人id',
    `update_time` datetime                                                      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `update_by`   bigint                                                        NOT NULL COMMENT '更新人',
    `delete_flag` int UNSIGNED                                                  NOT NULL DEFAULT 0 COMMENT '删除 0不删除 1删除',
    PRIMARY KEY (`doc_id`) USING BTREE
) ENGINE = InnoDB
  AUTO_INCREMENT = 6
  CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci COMMENT = '文档'
  ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for doc_tree
-- ----------------------------
DROP TABLE IF EXISTS `doc_tree`;
CREATE TABLE `doc_tree`
(
    `doc_tree_id` bigint                                                        NOT NULL AUTO_INCREMENT COMMENT '文档树id',
    `name`        varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '名称',
    `doc_id`      bigint                                                        NOT NULL COMMENT '文档id',
    `parent_id`   bigint                                                        NOT NULL COMMENT '父级id',
    `parent_path` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '父级路径 ,1,2,',
    `create_time` datetime                                                      NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `create_by`   bigint                                                        NOT NULL COMMENT '创建人id',
    `update_time` datetime                                                      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `update_by`   bigint                                                        NOT NULL COMMENT '更新人',
    `sort`        int                                                           NOT NULL DEFAULT 0 COMMENT '排序 小到大',
    `delete_flag` int UNSIGNED                                                  NOT NULL DEFAULT 0 COMMENT '删除 0不删除 1删除',
    `type`        int                                                           NOT NULL COMMENT '0文档 1excel',
    PRIMARY KEY (`doc_tree_id`) USING BTREE,
    INDEX `doc_tree_1` (`parent_id` ASC) USING BTREE,
    INDEX `doc_tree_2` (`doc_id` ASC) USING BTREE
) ENGINE = InnoDB
  AUTO_INCREMENT = 75
  CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci COMMENT = '文档目录'
  ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for doc_tree_content
-- ----------------------------
DROP TABLE IF EXISTS `doc_tree_content`;
CREATE TABLE `doc_tree_content`
(
    `doc_tree_id` bigint                                                    NOT NULL,
    `create_time` datetime                                                  NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `create_by`   bigint UNSIGNED                                           NOT NULL COMMENT '创建人id',
    `update_time` datetime                                                  NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `update_by`   bigint UNSIGNED                                           NOT NULL COMMENT '更新人',
    `delete_flag` int UNSIGNED                                              NOT NULL DEFAULT 0 COMMENT '删除 0不删除 1删除',
    `doc_id`      bigint                                                    NOT NULL,
    `content`     longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
    PRIMARY KEY (`doc_tree_id`) USING BTREE
) ENGINE = InnoDB
  CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci COMMENT = '文档树内容'
  ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for file_store
-- ----------------------------
DROP TABLE IF EXISTS `file_store`;
CREATE TABLE `file_store`
(
    `id`          bigint                                                        NOT NULL AUTO_INCREMENT COMMENT '文件id',
    `file_key`    varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci  NOT NULL COMMENT '文件唯一标识',
    `file_name`   varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '文件名',
    `file_size`   bigint                                                        NOT NULL COMMENT '文件大小',
    `mime_type`   varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '' COMMENT '文件格式',
    `checksum`    varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci  NOT NULL DEFAULT '' COMMENT '文件指纹',
    `store_type`  varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci  NOT NULL DEFAULT '' COMMENT '存储类型',
    `store_id`    varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci  NOT NULL DEFAULT '' COMMENT '存储仓库ID',
    `store_path`  varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '存储路径',
    `create_by`   bigint                                                        NOT NULL DEFAULT 0 COMMENT '创建人',
    `create_time` datetime                                                      NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `delete_flag` int UNSIGNED                                                  NOT NULL DEFAULT 0 COMMENT '删除标记;0:未删除 1:已删除',
    `delete_by`   bigint                                                        NOT NULL DEFAULT 0 COMMENT '删除人',
    `delete_time` bigint                                                        NOT NULL DEFAULT 0 COMMENT '删除时间',
    `suffix`      varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'other' COMMENT '文件后缀,没有后缀的文件都是 other',
    `biz_type`    int                                                           NOT NULL DEFAULT 0 COMMENT ' 0:公开   其他数字根据具体的枚举进行类型判断',
    `biz_id`      bigint                                                        NOT NULL COMMENT '相关的业务id',
    PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB
  AUTO_INCREMENT = 375
  CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci COMMENT = '文件存储'
  ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for machine
-- ----------------------------
DROP TABLE IF EXISTS `machine`;
CREATE TABLE `machine`
(
    `machine_id`  bigint UNSIGNED                                                NOT NULL AUTO_INCREMENT COMMENT '主键',
    `type`        varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci    NOT NULL COMMENT '类型 0linux',
    `create_by`   bigint UNSIGNED                                                NOT NULL COMMENT '创建人id',
    `create_time` datetime                                                       NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `update_by`   bigint UNSIGNED                                                NOT NULL COMMENT '更新人id',
    `update_time` datetime                                                       NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `delete_flag` int                                                            NOT NULL DEFAULT 0,
    `sort`        int                                                            NOT NULL DEFAULT 0 COMMENT '排序',
    `remarks`     varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL     DEFAULT NULL COMMENT '备注',
    `username`    varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci  NOT NULL,
    `password`    varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci  NOT NULL,
    `is_online`   varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci    NOT NULL COMMENT '是否在线 0不在线 1在线',
    `host`        varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci  NOT NULL,
    `port`        int                                                            NOT NULL,
    `init_dir`    varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci  NOT NULL,
    PRIMARY KEY (`machine_id`) USING BTREE
) ENGINE = InnoDB
  AUTO_INCREMENT = 2
  CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci COMMENT = '机器表'
  ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for machine_task
-- ----------------------------
DROP TABLE IF EXISTS `machine_task`;
CREATE TABLE `machine_task`
(
    `machine_task_id` bigint UNSIGNED                                                NOT NULL AUTO_INCREMENT COMMENT '主键',
    `machine_id`      bigint                                                         NOT NULL COMMENT '机器id',
    `status`          varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci   NOT NULL COMMENT '状态',
    `type`            varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci   NOT NULL COMMENT '类型',
    `create_by`       bigint                                                         NOT NULL,
    `create_time`     datetime                                                       NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
    `delete_flag`     int                                                            NOT NULL DEFAULT 0,
    `remote_path`     varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
    `local_path`      varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
    `local_zip_path`  varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL     DEFAULT NULL,
    `error_log`       text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci          NULL,
    `start_time`      datetime                                                       NULL     DEFAULT NULL,
    `end_time`        datetime                                                       NULL     DEFAULT NULL,
    `is_file`         int                                                            NULL     DEFAULT NULL,
    PRIMARY KEY (`machine_task_id`) USING BTREE
) ENGINE = InnoDB
  AUTO_INCREMENT = 18
  CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci COMMENT = '机器任务表'
  ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for md5log
-- ----------------------------
DROP TABLE IF EXISTS `md5log`;
CREATE TABLE `md5log`
(
    `md5log` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
    PRIMARY KEY (`md5log`) USING BTREE
) ENGINE = InnoDB
  CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci
  ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for message
-- ----------------------------
DROP TABLE IF EXISTS `message`;
CREATE TABLE `message`
(
    `message_id`    bigint UNSIGNED                                               NOT NULL AUTO_INCREMENT COMMENT '主键',
    `type`          varchar(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci   NOT NULL COMMENT '类型',
    `status`        varchar(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci   NOT NULL COMMENT '状态',
    `title`         varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '' COMMENT '标题',
    `msg`           varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '' COMMENT '消息内容',
    `create_by`     bigint UNSIGNED                                               NOT NULL COMMENT '创建人id',
    `remarks`       varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL     DEFAULT NULL COMMENT '备注',
    `biz_id`        bigint                                                        NOT NULL DEFAULT 0 COMMENT '相关业务id',
    `to_account_id` bigint                                                        NOT NULL COMMENT '接收消息人',
    `create_time`   datetime                                                      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `update_by`     bigint UNSIGNED                                               NOT NULL COMMENT '更新人id',
    `update_time`   datetime                                                      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `delete_flag`   int                                                           NOT NULL DEFAULT 0,
    PRIMARY KEY (`message_id`) USING BTREE
) ENGINE = InnoDB
  AUTO_INCREMENT = 2
  CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci COMMENT = '消息表'
  ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for module
-- ----------------------------
DROP TABLE IF EXISTS `module`;
CREATE TABLE `module`
(
    `id`             bigint UNSIGNED                                               NOT NULL AUTO_INCREMENT COMMENT '主键',
    `name`           varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '名称',
    `application_id` bigint UNSIGNED                                               NOT NULL,
    `disabled`       int UNSIGNED                                                  NOT NULL DEFAULT 0 COMMENT '状态0开启 1禁用',
    `parent_id`      bigint UNSIGNED                                               NOT NULL DEFAULT 0,
    `icon`           varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL     DEFAULT NULL COMMENT '图标',
    `permission`     varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL     DEFAULT NULL COMMENT '权限标识',
    `component`      varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL     DEFAULT NULL COMMENT '组件',
    `sort`           int UNSIGNED                                                  NOT NULL DEFAULT 0 COMMENT '排序',
    `route_url`      varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL     DEFAULT NULL COMMENT '路由地址',
    `type`           int UNSIGNED                                                  NOT NULL COMMENT '0目录 1菜单 2按钮',
    `ext_flag`       int                                                           NOT NULL DEFAULT 0 COMMENT '是否外链 0非 1是',
    `show_flag`      int                                                           NOT NULL DEFAULT 0 COMMENT '是否显示 0非 1是',
    `create_time`    datetime                                                      NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `create_by`      bigint UNSIGNED                                               NOT NULL COMMENT '创建人id',
    `update_time`    datetime                                                      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `update_by`      bigint UNSIGNED                                               NOT NULL COMMENT '更新人',
    `delete_flag`    int UNSIGNED                                                  NOT NULL DEFAULT 0 COMMENT '删除 0不删除 1删除',
    PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB
  AUTO_INCREMENT = 147
  CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci COMMENT = '模块权限;'
  ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for other_account
-- ----------------------------
DROP TABLE IF EXISTS `other_account`;
CREATE TABLE `other_account`
(
    `id`               bigint UNSIGNED                                               NOT NULL AUTO_INCREMENT COMMENT '主键',
    `type`             int UNSIGNED                                                  NOT NULL COMMENT '三方账号类型 字典',
    `account_name`     varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '账号名称',
    `account_password` varchar(555) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL     DEFAULT NULL COMMENT '账号密码',
    `remarks`          varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL     DEFAULT NULL COMMENT '备注',
    `create_time`      datetime                                                      NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `create_by`        bigint UNSIGNED                                               NOT NULL COMMENT '创建人id',
    `update_time`      datetime                                                      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `update_by`        bigint UNSIGNED                                               NOT NULL COMMENT '更新人',
    `delete_flag`      int UNSIGNED                                                  NOT NULL DEFAULT 0 COMMENT '删除 0不删除 1删除',
    PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB
  AUTO_INCREMENT = 5
  CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci COMMENT = '三方账号表;'
  ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for pipeline
-- ----------------------------
DROP TABLE IF EXISTS `pipeline`;
CREATE TABLE `pipeline`
(
    `id`                    bigint UNSIGNED                                               NOT NULL AUTO_INCREMENT COMMENT '主键',
    `name`                  varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '名称',
    `use_status`            int UNSIGNED                                                  NOT NULL DEFAULT 16 COMMENT '使用状态 看字典',
    `last_build_total_time` int UNSIGNED                                                  NULL     DEFAULT NULL COMMENT '上次构建时长',
    `last_build_status`     int UNSIGNED                                                  NULL     DEFAULT NULL COMMENT '上次构建状态 看字典',
    `disabled`              int UNSIGNED                                                  NOT NULL DEFAULT 0 COMMENT '启用禁用状态 0启用 1禁用',
    `pipeline_group_id`     bigint UNSIGNED                                               NOT NULL DEFAULT 1 COMMENT '组id',
    `soft_ids`              json                                                          NULL COMMENT '软件ids',
    `pipeline_node_label`   varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '执行机label',
    `docker_flag`           int UNSIGNED                                                  NOT NULL COMMENT '是否使用镜像0不用用 1用',
    `docker_name`           varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL     DEFAULT NULL COMMENT '镜像名称',
    `docker_param`          longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci     NULL COMMENT '镜像参数',
    `parallel`              int UNSIGNED                                                  NOT NULL DEFAULT 0 COMMENT '是否允许并行构建1允许 0不允许',
    `timer`                 int UNSIGNED                                                  NOT NULL DEFAULT 1 COMMENT '是否开启定时触发 1开启 0不开启',
    `timer_cron`            varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL     DEFAULT NULL COMMENT '定时表达式',
    `email`                 int UNSIGNED                                                  NOT NULL DEFAULT 0 COMMENT '是否发送邮件1发送 0不发送',
    `email_user`            json                                                          NULL COMMENT '发送邮件的用户id数组',
    `create_time`           datetime                                                      NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `create_by`             int UNSIGNED                                                  NOT NULL COMMENT '创建人id',
    `update_time`           datetime                                                      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `update_by`             int UNSIGNED                                                  NOT NULL COMMENT '更新人',
    `delete_flag`           int UNSIGNED                                                  NOT NULL DEFAULT 0 COMMENT '删除 0不删除 1删除',
    PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB
  AUTO_INCREMENT = 19
  CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci COMMENT = '流水线;'
  ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for pipeline_build
-- ----------------------------
DROP TABLE IF EXISTS `pipeline_build`;
CREATE TABLE `pipeline_build`
(
    `id`                  bigint UNSIGNED                                               NOT NULL AUTO_INCREMENT COMMENT '主键',
    `pipeline_id`         bigint UNSIGNED                                               NOT NULL COMMENT '流水线id',
    `name`                varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '名称',
    `build_start_time`    datetime                                                      NULL     DEFAULT NULL COMMENT '构建开始时间',
    `build_end_time`      datetime                                                      NULL     DEFAULT NULL COMMENT '构建结束时间',
    `build_status`        int UNSIGNED                                                  NULL     DEFAULT NULL COMMENT '构建状态 看字典',
    `soft_ids`            json                                                          NULL COMMENT '软件ids',
    `pipeline_node_id`    bigint UNSIGNED                                               NULL     DEFAULT NULL COMMENT '执行机id',
    `pipeline_node_label` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '执行机label',
    `docker_flag`         int UNSIGNED                                                  NOT NULL COMMENT '是否使用镜像0用 1不用',
    `docker_name`         varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL     DEFAULT NULL COMMENT '镜像名称',
    `docker_param`        longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci     NULL COMMENT '镜像参数',
    `parallel`            int UNSIGNED                                                  NOT NULL DEFAULT 0 COMMENT '是否允许并行构建1允许 0不允许',
    `email`               int UNSIGNED                                                  NOT NULL DEFAULT 0 COMMENT '是否发送邮件1发送 0不发送',
    `email_user`          json                                                          NULL COMMENT '发送邮件的用户id数组',
    `create_time`         datetime                                                      NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `create_by`           bigint UNSIGNED                                               NOT NULL COMMENT '创建人id',
    `update_time`         datetime                                                      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `update_by`           bigint UNSIGNED                                               NOT NULL COMMENT '更新人',
    `delete_flag`         int UNSIGNED                                                  NOT NULL DEFAULT 0 COMMENT '删除 0不删除 1删除',
    `workspace_path`      varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL     DEFAULT NULL COMMENT '工作目录',
    `log`                 longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci     NULL,
    `param_file_status`   int                                                           NOT NULL DEFAULT 0 COMMENT '参数文件状态 0未上传 1正在上传 2已上传 3上传失败',
    PRIMARY KEY (`id`) USING BTREE,
    INDEX `pipeline_build_1` (`delete_flag` ASC, `build_status` ASC) USING BTREE
) ENGINE = InnoDB
  AUTO_INCREMENT = 198
  CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci COMMENT = '流水线构建记录;'
  ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for pipeline_build_data
-- ----------------------------
DROP TABLE IF EXISTS `pipeline_build_data`;
CREATE TABLE `pipeline_build_data`
(
    `id`                      bigint UNSIGNED                                               NOT NULL AUTO_INCREMENT COMMENT '主键',
    `pipeline_id`             bigint UNSIGNED                                               NOT NULL COMMENT '流水线id',
    `pipeline_build_id`       bigint UNSIGNED                                               NOT NULL COMMENT '构建记录id',
    `pipeline_build_stage_id` bigint UNSIGNED                                               NOT NULL COMMENT '流水线构建记录阶段id',
    `pipeline_build_step_id`  bigint UNSIGNED                                               NOT NULL COMMENT '流水线构建记录步骤id',
    `tag`                     varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '数据标签',
    `data`                    json                                                          NOT NULL COMMENT '回传的数据',
    `create_time`             datetime                                                      NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `delete_flag`             int UNSIGNED                                                  NOT NULL DEFAULT 0 COMMENT '删除 0不删除 1删除',
    PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB
  AUTO_INCREMENT = 1
  CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci COMMENT = '构建数据表;'
  ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for pipeline_build_data_config
-- ----------------------------
DROP TABLE IF EXISTS `pipeline_build_data_config`;
CREATE TABLE `pipeline_build_data_config`
(
    `id`          bigint UNSIGNED                                               NOT NULL AUTO_INCREMENT COMMENT '主键',
    `tag`         varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '数据标签',
    `data`        json                                                          NOT NULL COMMENT '数据',
    `delete_flag` int UNSIGNED                                                  NOT NULL DEFAULT 0 COMMENT '删除 0不删除 1删除',
    `name`        varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL     DEFAULT NULL COMMENT '名称',
    `create_time` datetime                                                      NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB
  AUTO_INCREMENT = 1
  CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci COMMENT = '构建数据配置表表;'
  ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for pipeline_build_file
-- ----------------------------
DROP TABLE IF EXISTS `pipeline_build_file`;
CREATE TABLE `pipeline_build_file`
(
    `id`                bigint UNSIGNED                                               NOT NULL AUTO_INCREMENT COMMENT '主键',
    `pipeline_id`       bigint UNSIGNED                                               NOT NULL COMMENT '流水线id',
    `pipeline_build_id` bigint UNSIGNED                                               NOT NULL COMMENT '构建记录id',
    `file_name`         varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '文件名称',
    `file_size`         bigint                                                        NOT NULL COMMENT '文件大小',
    `file_md5`          varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL     DEFAULT NULL COMMENT 'md5值',
    `file_type`         varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL     DEFAULT NULL COMMENT '文件类型',
    `file_path`         varchar(555) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL     DEFAULT NULL COMMENT '文件路径',
    `source_type`       int UNSIGNED                                                  NOT NULL COMMENT '文件存储类型 字典表',
    `create_time`       datetime                                                      NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `delete_flag`       int UNSIGNED                                                  NOT NULL DEFAULT 0 COMMENT '删除 0不删除 1删除',
    PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB
  AUTO_INCREMENT = 1
  CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci COMMENT = '构建记录归档文件表;'
  ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for pipeline_build_node_mapping
-- ----------------------------
DROP TABLE IF EXISTS `pipeline_build_node_mapping`;
CREATE TABLE `pipeline_build_node_mapping`
(
    `id`                bigint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
    `pipeline_build_id` bigint UNSIGNED NOT NULL COMMENT '构建记录id',
    `pipeline_node_id`  bigint UNSIGNED NOT NULL COMMENT '执行机id',
    PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB
  AUTO_INCREMENT = 3
  CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci COMMENT = '构建中job和node的关系'
  ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for pipeline_build_param
-- ----------------------------
DROP TABLE IF EXISTS `pipeline_build_param`;
CREATE TABLE `pipeline_build_param`
(
    `id`                        bigint UNSIGNED                                                NOT NULL AUTO_INCREMENT COMMENT '主键',
    `pipeline_id`               bigint UNSIGNED                                                NOT NULL COMMENT '流水线id',
    `pipeline_build_id`         bigint UNSIGNED                                                NOT NULL COMMENT '流水线构建id',
    `pipeline_plugin_detail_id` bigint UNSIGNED                                                NOT NULL COMMENT '插件详情id',
    `pipeline_plugin_id`        bigint UNSIGNED                                                NOT NULL COMMENT '插件id',
    `name`                      varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci  NOT NULL COMMENT '名称',
    `key_name`                  varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci  NOT NULL COMMENT '编码 供后面引用',
    `type`                      int UNSIGNED                                                   NOT NULL COMMENT '类型 看字典',
    `optional`                  json                                                           NULL COMMENT '可选值',
    `value`                     varchar(5000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL     DEFAULT NULL COMMENT '默认值',
    `desc`                      longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci      NULL COMMENT '描述',
    `not_null`                  int                                                            NOT NULL DEFAULT 0 COMMENT '0可为空 1不可为空',
    `edit_flag`                 int UNSIGNED                                                   NOT NULL DEFAULT 0 COMMENT '是否可编辑 0 可编辑 1不编辑',
    `sort`                      int                                                            NULL     DEFAULT 0 COMMENT '排序',
    `date_type`                 int                                                            NOT NULL DEFAULT 0 COMMENT '时间插件类型',
    `unit`                      varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci  NULL     DEFAULT NULL COMMENT '数组单位',
    PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB
  AUTO_INCREMENT = 1203
  CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci COMMENT = '流水线构建记录全局参数;'
  ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for pipeline_build_runtime_param
-- ----------------------------
DROP TABLE IF EXISTS `pipeline_build_runtime_param`;
CREATE TABLE `pipeline_build_runtime_param`
(
    `id`                      bigint UNSIGNED                                               NOT NULL AUTO_INCREMENT COMMENT '主键',
    `key_name`                varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '变量名称',
    `key_value`               varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL     DEFAULT NULL COMMENT '变量值',
    `pipeline_build_id`       bigint                                                        NOT NULL,
    `pipeline_build_stage_id` bigint                                                        NOT NULL,
    `pipeline_build_step_id`  bigint                                                        NOT NULL,
    `create_time`             datetime                                                      NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB
  AUTO_INCREMENT = 7
  CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci COMMENT = '构建运行时step回传给服务的变量;'
  ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for pipeline_build_source_change
-- ----------------------------
DROP TABLE IF EXISTS `pipeline_build_source_change`;
CREATE TABLE `pipeline_build_source_change`
(
    `id`                bigint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
    `pipeline_id`       bigint UNSIGNED NOT NULL COMMENT '流水线id',
    `pipeline_build_id` bigint UNSIGNED NOT NULL COMMENT '构建记录id',
    `data`              json            NOT NULL COMMENT '回传的数据',
    `create_time`       datetime        NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `delete_flag`       int UNSIGNED    NOT NULL DEFAULT 0 COMMENT '删除 0不删除 1删除',
    PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB
  AUTO_INCREMENT = 1
  CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci COMMENT = '构建记录代码变更数据表;'
  ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for pipeline_build_stage
-- ----------------------------
DROP TABLE IF EXISTS `pipeline_build_stage`;
CREATE TABLE `pipeline_build_stage`
(
    `id`                bigint UNSIGNED                                                NOT NULL AUTO_INCREMENT COMMENT '主键',
    `pipeline_build_id` bigint UNSIGNED                                                NOT NULL COMMENT '构建记录id',
    `pipeline_id`       bigint UNSIGNED                                                NOT NULL COMMENT '流水线id',
    `name`              varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci  NOT NULL COMMENT '名称',
    `build_start_time`  datetime                                                       NULL     DEFAULT NULL COMMENT '构建开始时间',
    `build_end_time`    datetime                                                       NULL     DEFAULT NULL COMMENT '构建结束时间',
    `build_status`      int UNSIGNED                                                   NULL     DEFAULT NULL COMMENT '构建状态 看字典',
    `node_default`      int UNSIGNED                                                   NOT NULL DEFAULT 0 COMMENT '是否使用默认执行机 1 使用默认 0不使用默认',
    `node_label`        varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci  NULL     DEFAULT NULL COMMENT '执行机label',
    `node_id`           bigint UNSIGNED                                                NULL     DEFAULT NULL COMMENT '执行机id',
    `docker_flag`       int UNSIGNED                                                   NOT NULL DEFAULT 1 COMMENT '是否使用镜像1用 0不用',
    `docker_name`       varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci  NULL     DEFAULT NULL COMMENT '镜像名称',
    `docker_param`      varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL     DEFAULT NULL COMMENT '镜像参数',
    `parent_id`         bigint UNSIGNED                                                NOT NULL DEFAULT 0 COMMENT '父id',
    `sort`              int                                                            NOT NULL DEFAULT 0,
    PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB
  AUTO_INCREMENT = 800
  CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci COMMENT = '流水线构建记录阶段表;'
  ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for pipeline_build_step
-- ----------------------------
DROP TABLE IF EXISTS `pipeline_build_step`;
CREATE TABLE `pipeline_build_step`
(
    `id`                        bigint UNSIGNED                                               NOT NULL AUTO_INCREMENT COMMENT '主键',
    `pipeline_id`               bigint UNSIGNED                                               NOT NULL COMMENT '流水线id',
    `pipeline_build_id`         bigint UNSIGNED                                               NOT NULL COMMENT '构建记录id',
    `pipeline_build_stage_id`   bigint UNSIGNED                                               NOT NULL COMMENT '构建记录阶段id',
    `name`                      varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '名称',
    `build_start_time`          datetime                                                      NULL     DEFAULT NULL COMMENT '构建开始时间',
    `build_end_time`            datetime                                                      NULL     DEFAULT NULL COMMENT '构建结束时间',
    `build_status`              int UNSIGNED                                                  NULL     DEFAULT NULL COMMENT '构建状态 看字典',
    `pipeline_plugin_detail_id` bigint UNSIGNED                                               NOT NULL COMMENT '插件详情id',
    `pipeline_plugin_id`        bigint UNSIGNED                                               NOT NULL COMMENT '插件id',
    `error_stop`                int UNSIGNED                                                  NOT NULL COMMENT '错误是否退出 0 不退 1退',
    `script`                    longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci     NULL COMMENT '脚本',
    `sort`                      int                                                           NOT NULL DEFAULT 0,
    `error_log_md5`             varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL     DEFAULT NULL,
    PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB
  AUTO_INCREMENT = 885
  CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci COMMENT = '流水线构建记录步骤表;'
  ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for pipeline_build_step_param
-- ----------------------------
DROP TABLE IF EXISTS `pipeline_build_step_param`;
CREATE TABLE `pipeline_build_step_param`
(
    `id`                        bigint UNSIGNED                                                NOT NULL AUTO_INCREMENT COMMENT '主键',
    `pipeline_id`               bigint UNSIGNED                                                NOT NULL COMMENT '流水线id',
    `pipeline_build_id`         bigint UNSIGNED                                                NOT NULL COMMENT '构建记录id',
    `pipeline_build_stage_id`   bigint UNSIGNED                                                NOT NULL COMMENT '流水线构建记录阶段id',
    `pipeline_build_step_id`    bigint UNSIGNED                                                NOT NULL COMMENT '流水线构建记录步骤id',
    `pipeline_plugin_detail_id` bigint UNSIGNED                                                NOT NULL COMMENT '插件详情id',
    `pipeline_plugin_id`        bigint UNSIGNED                                                NOT NULL COMMENT '插件id',
    `name`                      varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci  NOT NULL COMMENT '名称',
    `key_name`                  varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci  NOT NULL COMMENT '编码 供后面引用',
    `type`                      int UNSIGNED                                                   NOT NULL COMMENT '类型 看字典',
    `optional`                  json                                                           NULL COMMENT '可选值',
    `value`                     varchar(5000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL     DEFAULT NULL COMMENT '默认值',
    `desc`                      longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci      NULL COMMENT '描述',
    `not_null`                  int                                                            NOT NULL DEFAULT 0 COMMENT '0可为空 1不可为空',
    `scope`                     int UNSIGNED                                                   NOT NULL COMMENT '作用域0局部 1全局',
    `edit_flag`                 int UNSIGNED                                                   NOT NULL DEFAULT 0 COMMENT '是否可编辑 0 可编辑 1不编辑',
    `sort`                      int                                                            NULL     DEFAULT 0 COMMENT '排序',
    `date_type`                 int                                                            NOT NULL DEFAULT 0 COMMENT '时间插件类型',
    `unit`                      varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci  NULL     DEFAULT NULL COMMENT '数组单位',
    PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB
  AUTO_INCREMENT = 365
  CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci COMMENT = '流水线构建记录步骤参数表;'
  ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for pipeline_group
-- ----------------------------
DROP TABLE IF EXISTS `pipeline_group`;
CREATE TABLE `pipeline_group`
(
    `id`          bigint UNSIGNED                                               NOT NULL AUTO_INCREMENT COMMENT '主键',
    `name`        varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '组名称',
    `create_time` datetime                                                      NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `create_by`   bigint UNSIGNED                                               NOT NULL COMMENT '创建人id',
    `update_time` datetime                                                      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `update_by`   bigint UNSIGNED                                               NOT NULL COMMENT '更新人',
    `delete_flag` int UNSIGNED                                                  NOT NULL DEFAULT 0 COMMENT '删除 0不删除 1删除',
    PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB
  AUTO_INCREMENT = 6
  CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci COMMENT = '流水线分组表;'
  ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for pipeline_node
-- ----------------------------
DROP TABLE IF EXISTS `pipeline_node`;
CREATE TABLE `pipeline_node`
(
    `id`          bigint UNSIGNED                                               NOT NULL AUTO_INCREMENT COMMENT '主键',
    `name`        varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '名称',
    `work_dir`    varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '工作目录',
    `desc`        longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci     NULL COMMENT '描述',
    `status`      int UNSIGNED                                                  NOT NULL DEFAULT 0 COMMENT '状态 0未连接 1已连接',
    `disabled`    int UNSIGNED                                                  NULL     DEFAULT NULL COMMENT '0启用 1禁用  控制node是否可以连接server',
    `error_log`   longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci     NULL COMMENT '连接错误日志',
    `create_time` datetime                                                      NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `create_by`   bigint UNSIGNED                                               NOT NULL COMMENT '创建人id',
    `update_time` datetime                                                      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `update_by`   bigint UNSIGNED                                               NOT NULL COMMENT '更新人',
    `delete_flag` int UNSIGNED                                                  NOT NULL DEFAULT 0 COMMENT '删除 0不删除 1删除',
    `token`       varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL     DEFAULT NULL,
    `label`       varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
    `work_num`    int                                                           NOT NULL DEFAULT 5 COMMENT '并行任务数量',
    `priority`    int                                                           NOT NULL DEFAULT 0 COMMENT '优先级 默认0  值越大优先级越高',
    `ip`          varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL     DEFAULT NULL,
    PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB
  AUTO_INCREMENT = 3
  CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci COMMENT = '执行机表;'
  ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for pipeline_param
-- ----------------------------
DROP TABLE IF EXISTS `pipeline_param`;
CREATE TABLE `pipeline_param`
(
    `id`                        bigint                                                         NOT NULL AUTO_INCREMENT COMMENT '主键',
    `pipeline_id`               bigint UNSIGNED                                                NOT NULL COMMENT '流水线id',
    `pipeline_plugin_detail_id` bigint UNSIGNED                                                NOT NULL DEFAULT 0 COMMENT '插件详情id',
    `pipeline_plugin_id`        bigint UNSIGNED                                                NOT NULL DEFAULT 0 COMMENT '插件id',
    `name`                      varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci  NOT NULL COMMENT '名称',
    `key_name`                  varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci  NOT NULL COMMENT '编码 供后面引用',
    `type`                      int UNSIGNED                                                   NOT NULL COMMENT '类型 看字典',
    `optional`                  json                                                           NULL COMMENT '可选值',
    `value`                     varchar(5000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL     DEFAULT NULL COMMENT '默认值',
    `desc`                      longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci      NULL COMMENT '描述',
    `not_null`                  int                                                            NOT NULL DEFAULT 0 COMMENT '0可为空 1不可为空',
    `edit_flag`                 int UNSIGNED                                                   NOT NULL DEFAULT 0 COMMENT '是否可编辑 0 可编辑 1不编辑',
    `sort`                      int                                                            NULL     DEFAULT 0 COMMENT '排序',
    `date_type`                 int                                                            NOT NULL DEFAULT 0 COMMENT '时间插件类型',
    `unit`                      varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci  NULL     DEFAULT NULL COMMENT '数组单位',
    `scope`                     int UNSIGNED                                                   NULL     DEFAULT NULL COMMENT '作用域 1全局 当为空的时候 是手动添加的全局参数',
    PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB
  AUTO_INCREMENT = 865
  CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci COMMENT = '流水线全局参数;'
  ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for pipeline_permission
-- ----------------------------
DROP TABLE IF EXISTS `pipeline_permission`;
CREATE TABLE `pipeline_permission`
(
    `pipeline_permission_id` bigint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
    `pipeline_id`            bigint          NOT NULL,
    `type`                   int             NOT NULL COMMENT '类型 0人 1部门 2角色',
    `biz_id`                 bigint          NOT NULL COMMENT '对应的id',
    PRIMARY KEY (`pipeline_permission_id`) USING BTREE,
    UNIQUE INDEX `project_permission_1` (`pipeline_id` ASC, `type` ASC, `biz_id` ASC) USING BTREE
) ENGINE = InnoDB
  AUTO_INCREMENT = 9
  CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci COMMENT = '流水线权限'
  ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for pipeline_plugin
-- ----------------------------
DROP TABLE IF EXISTS `pipeline_plugin`;
CREATE TABLE `pipeline_plugin`
(
    `id`          bigint UNSIGNED                                               NOT NULL AUTO_INCREMENT COMMENT '主键',
    `name`        varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '插件名称',
    `type`        int UNSIGNED                                                  NOT NULL COMMENT '插件类型 看字典',
    `source`      int UNSIGNED                                                  NOT NULL COMMENT '来源 看字典',
    `desc`        longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci     NULL COMMENT '描述',
    `number`      int UNSIGNED                                                  NOT NULL COMMENT '版本号',
    `script_type` int UNSIGNED                                                  NOT NULL COMMENT '脚本类型 看字典',
    `script`      longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci     NOT NULL COMMENT '脚本',
    `create_time` datetime                                                      NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `create_by`   bigint UNSIGNED                                               NOT NULL COMMENT '创建人id',
    `update_time` datetime                                                      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `update_by`   bigint UNSIGNED                                               NOT NULL COMMENT '更新人',
    `delete_flag` int UNSIGNED                                                  NOT NULL DEFAULT 0 COMMENT '删除 0不删除 1删除',
    PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB
  AUTO_INCREMENT = 26
  CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci COMMENT = '流水线插件;'
  ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for pipeline_plugin_detail
-- ----------------------------
DROP TABLE IF EXISTS `pipeline_plugin_detail`;
CREATE TABLE `pipeline_plugin_detail`
(
    `id`                 bigint UNSIGNED                                               NOT NULL AUTO_INCREMENT COMMENT '主键',
    `name`               varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '插件名称',
    `type`               int UNSIGNED                                                  NOT NULL COMMENT '插件类型 看字典',
    `source`             int UNSIGNED                                                  NOT NULL COMMENT '来源 看字典',
    `desc`               longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci     NULL COMMENT '描述',
    `number`             int UNSIGNED                                                  NOT NULL COMMENT '版本号',
    `script_type`        int UNSIGNED                                                  NOT NULL COMMENT '脚本类型 看字典',
    `script`             longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci     NOT NULL COMMENT '脚本',
    `create_time`        datetime                                                      NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `create_by`          bigint UNSIGNED                                               NOT NULL COMMENT '创建人id',
    `pipeline_plugin_id` bigint UNSIGNED                                               NOT NULL COMMENT '流水线插件id',
    `delete_flag`        int UNSIGNED                                                  NOT NULL DEFAULT 0 COMMENT '删除 0不删除 1删除',
    PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB
  AUTO_INCREMENT = 117
  CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci COMMENT = '流水线插件;'
  ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for pipeline_plugin_param
-- ----------------------------
DROP TABLE IF EXISTS `pipeline_plugin_param`;
CREATE TABLE `pipeline_plugin_param`
(
    `id`                        bigint UNSIGNED                                                NOT NULL AUTO_INCREMENT COMMENT '主键',
    `pipeline_plugin_detail_id` bigint UNSIGNED                                                NOT NULL COMMENT '插件详情id',
    `name`                      varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci  NOT NULL COMMENT '名称',
    `key_name`                  varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci  NOT NULL COMMENT '编码 供后面引用',
    `type`                      int UNSIGNED                                                   NOT NULL COMMENT '类型 看字典',
    `scope`                     int UNSIGNED                                                   NOT NULL COMMENT '作用域0局部 1全局',
    `optional`                  json                                                           NULL COMMENT '可选值',
    `value`                     varchar(5000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL     DEFAULT NULL COMMENT '默认值',
    `desc`                      longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci      NULL COMMENT '描述',
    `not_null`                  int                                                            NOT NULL DEFAULT 0 COMMENT '0可为空 1不可为空',
    `edit_flag`                 int UNSIGNED                                                   NOT NULL DEFAULT 0 COMMENT '是否可编辑 0 可编辑 1不编辑',
    `sort`                      int                                                            NULL     DEFAULT 0 COMMENT '排序',
    `date_type`                 int                                                            NOT NULL DEFAULT 0 COMMENT '时间插件类型',
    `unit`                      varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci  NULL     DEFAULT NULL COMMENT '数组单位',
    PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB
  AUTO_INCREMENT = 255
  CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci COMMENT = '插件参数;'
  ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for pipeline_stage
-- ----------------------------
DROP TABLE IF EXISTS `pipeline_stage`;
CREATE TABLE `pipeline_stage`
(
    `id`           bigint UNSIGNED                                                NOT NULL AUTO_INCREMENT COMMENT '主键',
    `pipeline_id`  bigint UNSIGNED                                                NOT NULL COMMENT '流水线id',
    `name`         varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci  NOT NULL COMMENT '名称',
    `node_default` int UNSIGNED                                                   NOT NULL DEFAULT 0 COMMENT '是否使用默认执行机 0 使用默认 1不使用默认',
    `node_label`   varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci  NULL     DEFAULT NULL COMMENT '执行机label',
    `docker_flag`  int UNSIGNED                                                   NOT NULL DEFAULT 1 COMMENT '是否使用镜像0用 1不用',
    `docker_name`  varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci  NULL     DEFAULT NULL COMMENT '镜像名称',
    `docker_param` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL     DEFAULT NULL COMMENT '镜像参数',
    `parent_id`    bigint UNSIGNED                                                NOT NULL DEFAULT 0 COMMENT '父id',
    `disabled`     int UNSIGNED                                                   NOT NULL DEFAULT 0 COMMENT '0启用 1禁用',
    `sort`         int                                                            NOT NULL DEFAULT 0,
    PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB
  AUTO_INCREMENT = 935
  CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci COMMENT = '流水线阶段;'
  ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for pipeline_step
-- ----------------------------
DROP TABLE IF EXISTS `pipeline_step`;
CREATE TABLE `pipeline_step`
(
    `id`                        bigint UNSIGNED                                               NOT NULL AUTO_INCREMENT COMMENT '主键',
    `pipeline_id`               bigint UNSIGNED                                               NOT NULL COMMENT '流水线id',
    `pipeline_stage_id`         bigint UNSIGNED                                               NOT NULL COMMENT '流水线阶段id',
    `name`                      varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '名称',
    `disabled`                  int UNSIGNED                                                  NOT NULL DEFAULT 0 COMMENT '0启用 1禁用',
    `pipeline_plugin_detail_id` bigint UNSIGNED                                               NOT NULL COMMENT '插件详情id',
    `pipeline_plugin_id`        bigint UNSIGNED                                               NOT NULL COMMENT '插件id',
    `error_stop`                int UNSIGNED                                                  NOT NULL COMMENT '错误是否退出 0 不退 1退',
    `script`                    longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci     NULL COMMENT '脚本',
    `sort`                      int                                                           NOT NULL DEFAULT 0,
    PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB
  AUTO_INCREMENT = 782
  CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci COMMENT = '流水线步骤;'
  ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for pipeline_step_param
-- ----------------------------
DROP TABLE IF EXISTS `pipeline_step_param`;
CREATE TABLE `pipeline_step_param`
(
    `id`                        bigint UNSIGNED                                                NOT NULL AUTO_INCREMENT COMMENT '主键',
    `pipeline_id`               bigint UNSIGNED                                                NOT NULL COMMENT '流水线id',
    `pipeline_stage_id`         bigint UNSIGNED                                                NOT NULL COMMENT '流水线阶段id',
    `pipeline_step_id`          bigint UNSIGNED                                                NOT NULL COMMENT '流水线步骤id',
    `pipeline_plugin_detail_id` bigint UNSIGNED                                                NOT NULL COMMENT '插件详情id',
    `pipeline_plugin_id`        bigint UNSIGNED                                                NOT NULL COMMENT '插件id',
    `name`                      varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci  NOT NULL COMMENT '名称',
    `key_name`                  varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci  NOT NULL COMMENT '编码 供后面引用',
    `type`                      int UNSIGNED                                                   NOT NULL COMMENT '类型 看字典',
    `optional`                  json                                                           NULL COMMENT '可选值',
    `value`                     varchar(5000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL     DEFAULT NULL COMMENT '默认值',
    `desc`                      longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci      NULL COMMENT '描述',
    `not_null`                  int                                                            NOT NULL DEFAULT 0 COMMENT '0可为空 1不可为空',
    `scope`                     int UNSIGNED                                                   NOT NULL COMMENT '作用域0局部 1全局',
    `edit_flag`                 int UNSIGNED                                                   NOT NULL DEFAULT 0 COMMENT '是否可编辑 0 可编辑 1不编辑',
    `sort`                      int                                                            NULL     DEFAULT 0 COMMENT '排序',
    `date_type`                 int                                                            NOT NULL DEFAULT 0 COMMENT '时间插件类型',
    `unit`                      varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci  NULL     DEFAULT NULL COMMENT '数组单位',
    PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB
  AUTO_INCREMENT = 510
  CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci COMMENT = '流水线步骤参数;'
  ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for process
-- ----------------------------
DROP TABLE IF EXISTS `process`;
CREATE TABLE `process`
(
    `process_id`         bigint UNSIGNED                                               NOT NULL AUTO_INCREMENT COMMENT '主键',
    `name`               varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '流程名称',
    `version`            int UNSIGNED                                                  NOT NULL DEFAULT 0 COMMENT '版本号',
    `process_version_id` bigint UNSIGNED                                               NOT NULL COMMENT '具体版本id',
    `disabled`           int                                                           NOT NULL DEFAULT 1 COMMENT '0启用 1禁用',
    `create_time`        datetime                                                      NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `create_by`          bigint UNSIGNED                                               NOT NULL COMMENT '创建人id',
    `update_time`        datetime                                                      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `update_by`          bigint UNSIGNED                                               NOT NULL COMMENT '更新人',
    `delete_flag`        int UNSIGNED                                                  NOT NULL DEFAULT 0 COMMENT '删除 0不删除 1删除',
    `remarks`            varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL     DEFAULT NULL COMMENT '备注',
    PRIMARY KEY (`process_id`) USING BTREE
) ENGINE = InnoDB
  AUTO_INCREMENT = 24
  CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci COMMENT = '流程表;'
  ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for process_instance
-- ----------------------------
DROP TABLE IF EXISTS `process_instance`;
CREATE TABLE `process_instance`
(
    `process_instance_id` bigint UNSIGNED                                               NOT NULL AUTO_INCREMENT COMMENT '主键',
    `process_id`          bigint UNSIGNED                                               NOT NULL,
    `process_version_id`  bigint UNSIGNED                                               NOT NULL,
    `title`               varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '标题 默认流程名称加发起人名称',
    `status`              int UNSIGNED                                                  NOT NULL COMMENT '状态',
    `process_point_id`    bigint UNSIGNED                                               NULL     DEFAULT NULL COMMENT '当前节点id',
    `process_point_name`  varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL     DEFAULT NULL COMMENT '当前节点名称',
    `create_time`         datetime                                                      NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `create_by`           bigint UNSIGNED                                               NOT NULL COMMENT '发起人id',
    `update_time`         datetime                                                      NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
    `update_by`           bigint UNSIGNED                                               NOT NULL COMMENT '更新人',
    `delete_flag`         int UNSIGNED                                                  NOT NULL DEFAULT 0 COMMENT '删除 0不删除 1删除',
    `end_time`            datetime                                                      NULL     DEFAULT NULL COMMENT '结束时间',
    PRIMARY KEY (`process_instance_id`) USING BTREE
) ENGINE = InnoDB
  AUTO_INCREMENT = 34
  CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci COMMENT = '流程发起实例'
  ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for process_instance_approval_people
-- ----------------------------
DROP TABLE IF EXISTS `process_instance_approval_people`;
CREATE TABLE `process_instance_approval_people`
(
    `process_instance_approval_people_id` bigint UNSIGNED                                               NOT NULL AUTO_INCREMENT COMMENT '主键',
    `process_instance_point_id`           bigint UNSIGNED                                               NOT NULL COMMENT '流程节点id',
    `process_instance_id`                 bigint UNSIGNED                                               NOT NULL COMMENT '流程实例id',
    `status`                              varchar(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci   NULL DEFAULT NULL COMMENT '审批结果 同意/已办理 拒绝/拒办',
    `account_id`                          bigint UNSIGNED                                               NOT NULL COMMENT '账号id',
    `dept_ids`                            json                                                          NULL COMMENT '部门id 快照',
    `role_ids`                            json                                                          NULL COMMENT '角色id 快照',
    `reason`                              varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '审批意见',
    `end_time`                            datetime                                                      NULL DEFAULT NULL COMMENT '结束时间',
    PRIMARY KEY (`process_instance_approval_people_id`) USING BTREE
) ENGINE = InnoDB
  AUTO_INCREMENT = 95
  CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci COMMENT = '流程实例审批人列表;'
  ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for process_instance_point
-- ----------------------------
DROP TABLE IF EXISTS `process_instance_point`;
CREATE TABLE `process_instance_point`
(
    `process_instance_point_id` bigint UNSIGNED                                               NOT NULL AUTO_INCREMENT COMMENT '主键',
    `process_instance_id`       bigint UNSIGNED                                               NOT NULL COMMENT '流程实例id',
    `name`                      varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '节点名称',
    `type`                      varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '节点类型 看字典',
    `approve_condition`         int UNSIGNED                                                  NOT NULL DEFAULT 0 COMMENT '审批通过条件 0：一人通过即可 1:全部通过才行',
    `pipeline_id`               bigint UNSIGNED                                               NOT NULL DEFAULT 0 COMMENT '流水线id 当是流水线节点的时候 使用',
    `pipeline_pass_condition`   int UNSIGNED                                                  NOT NULL DEFAULT 0 COMMENT '0成功才可通过 1执行完成即可通过',
    `script`                    json                                                          NULL COMMENT '判断脚本',
    `role_ids`                  json                                                          NULL COMMENT '角色ids',
    `dept_ids`                  json                                                          NULL COMMENT '指定部门id列表',
    `user_ids`                  json                                                          NULL COMMENT '指定人员id列表',
    `remarks`                   varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL     DEFAULT NULL COMMENT '备注',
    `status`                    varchar(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci   NULL     DEFAULT NULL COMMENT '状态 待开始 审批中 拒绝 通过 排他',
    `end_time`                  datetime                                                      NULL     DEFAULT NULL COMMENT '结束时间',
    PRIMARY KEY (`process_instance_point_id`) USING BTREE
) ENGINE = InnoDB
  AUTO_INCREMENT = 234
  CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci COMMENT = '流程发起实例节点表;'
  ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for process_instance_point_form
-- ----------------------------
DROP TABLE IF EXISTS `process_instance_point_form`;
CREATE TABLE `process_instance_point_form`
(
    `process_instance_point_form_id` bigint UNSIGNED                                               NOT NULL AUTO_INCREMENT COMMENT '主键',
    `process_instance_id`            bigint UNSIGNED                                               NOT NULL COMMENT '流程id',
    `name`                           varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '名称',
    `code`                           varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '表单编码 用来后面的引用',
    `process_instance_point_id`      bigint UNSIGNED                                               NOT NULL COMMENT '审批节点id',
    PRIMARY KEY (`process_instance_point_form_id`) USING BTREE
) ENGINE = InnoDB
  AUTO_INCREMENT = 34
  CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci COMMENT = '流程实例节点定义的表单表;'
  ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for process_instance_point_form_field
-- ----------------------------
DROP TABLE IF EXISTS `process_instance_point_form_field`;
CREATE TABLE `process_instance_point_form_field`
(
    `process_instance_point_form_field_id` bigint UNSIGNED                                                NOT NULL AUTO_INCREMENT COMMENT '主键',
    `process_instance_id`                  bigint UNSIGNED                                                NOT NULL COMMENT '流程id',
    `process_instance_point_form_id`       bigint UNSIGNED                                                NOT NULL COMMENT '表单id',
    `process_instance_point_id`            bigint UNSIGNED                                                NOT NULL COMMENT '审批节点id',
    `name`                                 varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci  NOT NULL COMMENT '名称',
    `key_name`                             varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci  NOT NULL COMMENT '编码 供后面引用',
    `type`                                 int UNSIGNED                                                   NOT NULL COMMENT '类型 看字典',
    `optional`                             json                                                           NULL COMMENT '可选值',
    `value`                                varchar(5000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL     DEFAULT NULL COMMENT '默认值',
    `desc`                                 longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci      NULL COMMENT '描述',
    `edit_flag`                            int UNSIGNED                                                   NOT NULL DEFAULT 0 COMMENT '是否可编辑 0 可编辑 1不编辑',
    `not_null`                             int                                                            NOT NULL DEFAULT 0 COMMENT '0可为空 1不可为空',
    `sort`                                 int                                                            NULL     DEFAULT 0 COMMENT '排序',
    `date_type`                            int                                                            NOT NULL DEFAULT 0 COMMENT '时间插件类型',
    `unit`                                 varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci  NULL     DEFAULT NULL COMMENT '数组单位',
    PRIMARY KEY (`process_instance_point_form_field_id`) USING BTREE
) ENGINE = InnoDB
  AUTO_INCREMENT = 184
  CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci COMMENT = '流程节点定义的表单字段表;'
  ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for process_instance_point_relation
-- ----------------------------
DROP TABLE IF EXISTS `process_instance_point_relation`;
CREATE TABLE `process_instance_point_relation`
(
    `process_instance_point_relation_id` bigint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
    `process_instance_id`                bigint UNSIGNED NOT NULL COMMENT '流程id',
    `source`                             bigint          NOT NULL,
    `target`                             bigint          NOT NULL,
    PRIMARY KEY (`process_instance_point_relation_id`) USING BTREE,
    UNIQUE INDEX `process_point_relation_1` (`source` ASC, `target` ASC) USING BTREE
) ENGINE = InnoDB
  AUTO_INCREMENT = 223
  CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci COMMENT = '流程节点表关系'
  ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for process_point
-- ----------------------------
DROP TABLE IF EXISTS `process_point`;
CREATE TABLE `process_point`
(
    `process_point_id`        bigint UNSIGNED                                               NOT NULL AUTO_INCREMENT COMMENT '主键',
    `process_id`              bigint UNSIGNED                                               NOT NULL COMMENT '流程id',
    `process_version_id`      bigint UNSIGNED                                               NOT NULL COMMENT '流程版本号id',
    `name`                    varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '节点名称',
    `type`                    varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '节点类型 看字典',
    `approve_condition`       int UNSIGNED                                                  NOT NULL DEFAULT 0 COMMENT '审批通过条件 0：一人通过即可 1:全部通过才行',
    `pipeline_id`             bigint UNSIGNED                                               NOT NULL DEFAULT 0 COMMENT '流水线id 当是流水线节点的时候 使用',
    `pipeline_pass_condition` int UNSIGNED                                                  NOT NULL DEFAULT 0 COMMENT '0成功才可通过 1执行完成即可通过',
    `script`                  json                                                          NULL COMMENT '判断脚本',
    `role_ids`                json                                                          NULL COMMENT '角色ids',
    `dept_ids`                json                                                          NULL COMMENT '指定部门id列表',
    `user_ids`                json                                                          NULL COMMENT '指定人员id列表',
    `remarks`                 varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL     DEFAULT NULL COMMENT '备注',
    PRIMARY KEY (`process_point_id`) USING BTREE
) ENGINE = InnoDB
  AUTO_INCREMENT = 546
  CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci COMMENT = '流程节点表;'
  ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for process_point_form
-- ----------------------------
DROP TABLE IF EXISTS `process_point_form`;
CREATE TABLE `process_point_form`
(
    `process_point_form_id` bigint UNSIGNED                                               NOT NULL AUTO_INCREMENT COMMENT '主键',
    `process_id`            bigint UNSIGNED                                               NOT NULL COMMENT '流程id',
    `process_version_id`    bigint UNSIGNED                                               NOT NULL COMMENT '流程版本号id',
    `process_point_id`      bigint UNSIGNED                                               NOT NULL COMMENT '审批节点id',
    `name`                  varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '名称',
    `code`                  varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '表单编码 用来后面的引用',
    `edit`                  int UNSIGNED                                                  NOT NULL DEFAULT 0 COMMENT '设置值类型 0当前节点审批人 1 所有节点审批人',
    PRIMARY KEY (`process_point_form_id`) USING BTREE
) ENGINE = InnoDB
  AUTO_INCREMENT = 39
  CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci COMMENT = '流程节点定义的表单表;'
  ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for process_point_form_field
-- ----------------------------
DROP TABLE IF EXISTS `process_point_form_field`;
CREATE TABLE `process_point_form_field`
(
    `process_point_form_field_id` bigint UNSIGNED                                                NOT NULL AUTO_INCREMENT COMMENT '主键',
    `process_id`                  bigint UNSIGNED                                                NOT NULL COMMENT '流程id',
    `process_version_id`          bigint UNSIGNED                                                NOT NULL COMMENT '流程版本号id',
    `process_point_id`            bigint UNSIGNED                                                NOT NULL COMMENT '审批节点id',
    `process_point_form_id`       bigint UNSIGNED                                                NOT NULL COMMENT '表单id',
    `name`                        varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci  NOT NULL COMMENT '名称',
    `key_name`                    varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci  NOT NULL COMMENT '编码 供后面引用',
    `type`                        int UNSIGNED                                                   NOT NULL COMMENT '类型 看字典',
    `optional`                    json                                                           NULL COMMENT '可选值',
    `value`                       varchar(5000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL     DEFAULT NULL COMMENT '默认值',
    `desc`                        longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci      NULL COMMENT '描述',
    `edit_flag`                   int UNSIGNED                                                   NOT NULL DEFAULT 0 COMMENT '是否可编辑 0 可编辑 1不编辑',
    `not_null`                    int                                                            NOT NULL DEFAULT 0 COMMENT '0可为空 1不可为空',
    `sort`                        int                                                            NULL     DEFAULT 0 COMMENT '排序',
    `date_type`                   int                                                            NOT NULL DEFAULT 0 COMMENT '时间插件类型',
    `unit`                        varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci  NULL     DEFAULT NULL COMMENT '数组单位',
    PRIMARY KEY (`process_point_form_field_id`) USING BTREE
) ENGINE = InnoDB
  AUTO_INCREMENT = 237
  CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci COMMENT = '流程节点定义的表单字段表;'
  ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for process_point_pipeline_param
-- ----------------------------
DROP TABLE IF EXISTS `process_point_pipeline_param`;
CREATE TABLE `process_point_pipeline_param`
(
    `process_point_pipeline_param_id` bigint UNSIGNED                                                NOT NULL AUTO_INCREMENT COMMENT '主键',
    `process_id`                      bigint UNSIGNED                                                NOT NULL COMMENT '流程id',
    `process_version_id`              bigint UNSIGNED                                                NOT NULL COMMENT '流程版本号id',
    `process_point_id`                bigint UNSIGNED                                                NOT NULL COMMENT '审批节点id',
    `name`                            varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci  NOT NULL COMMENT '名称',
    `key_name`                        varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci  NOT NULL COMMENT '流水线那边全局变量的key_name',
    `type`                            int UNSIGNED                                                   NOT NULL COMMENT '类型 看字典',
    `optional`                        json                                                           NULL COMMENT '可选值',
    `value`                           varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL     DEFAULT NULL COMMENT '触发流水线此参数的值 当此值为空的时候 使用流水线设置的默认值;此值可以输入$表达式 例如 ${form1.code1} 这就表示form1表单的code1字段值',
    `desc`                            longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci      NULL COMMENT '描述',
    `not_null`                        int                                                            NOT NULL DEFAULT 0 COMMENT '0可为空 1不可为空',
    `sort`                            int                                                            NOT NULL DEFAULT 0,
    PRIMARY KEY (`process_point_pipeline_param_id`) USING BTREE
) ENGINE = InnoDB
  AUTO_INCREMENT = 1
  CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci COMMENT = '流程节点流水线参数表'
  ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for process_point_relation
-- ----------------------------
DROP TABLE IF EXISTS `process_point_relation`;
CREATE TABLE `process_point_relation`
(
    `process_point_relation_id` bigint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
    `process_id`                bigint UNSIGNED NOT NULL COMMENT '流程id',
    `process_version_id`        bigint UNSIGNED NOT NULL COMMENT '流程版本号id',
    `source`                    bigint          NOT NULL,
    `target`                    bigint          NOT NULL,
    PRIMARY KEY (`process_point_relation_id`) USING BTREE,
    UNIQUE INDEX `process_point_relation_1` (`source` ASC, `target` ASC) USING BTREE
) ENGINE = InnoDB
  AUTO_INCREMENT = 641
  CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci COMMENT = '流程节点表关系'
  ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for process_version
-- ----------------------------
DROP TABLE IF EXISTS `process_version`;
CREATE TABLE `process_version`
(
    `process_version_id` bigint UNSIGNED                                               NOT NULL AUTO_INCREMENT COMMENT '主键',
    `process_id`         bigint UNSIGNED                                               NOT NULL COMMENT '流程id',
    `name`               varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '流程名称',
    `create_time`        datetime                                                      NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `create_by`          bigint UNSIGNED                                               NOT NULL COMMENT '创建人id',
    `version`            int UNSIGNED                                                  NOT NULL DEFAULT 0 COMMENT '版本号',
    `flag_submit`        varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci   NOT NULL DEFAULT '0' COMMENT '提交人范围',
    `dept_ids`           json                                                          NULL COMMENT '指定部门id列表',
    `user_ids`           json                                                          NULL COMMENT '指定人员id列表',
    `flag_use`           varchar(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci   NULL     DEFAULT '0' COMMENT '0未使用 1使用中',
    PRIMARY KEY (`process_version_id`) USING BTREE,
    UNIQUE INDEX `process_version_1` (`process_id` ASC, `version` ASC) USING BTREE
) ENGINE = InnoDB
  AUTO_INCREMENT = 58
  CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci COMMENT = '流程版本表'
  ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for project
-- ----------------------------
DROP TABLE IF EXISTS `project`;
CREATE TABLE `project`
(
    `project_id`       bigint UNSIGNED                                                NOT NULL AUTO_INCREMENT COMMENT '主键',
    `type`             int                                                            NOT NULL COMMENT '类型 ',
    `name`             varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci  NOT NULL COMMENT '项目名称',
    `code`             varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci  NOT NULL COMMENT '项目编码',
    `status`           varchar(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci    NOT NULL COMMENT '状态 0使用中 1归档',
    `plan_start_date`  datetime                                                       NULL     DEFAULT NULL COMMENT '计划开始日期',
    `plan_end_date`    datetime                                                       NULL     DEFAULT NULL COMMENT '计划结束日期',
    `start_date`       datetime                                                       NULL     DEFAULT NULL COMMENT '实际开始日期',
    `end_date`         datetime                                                       NULL     DEFAULT NULL COMMENT '实际结束日期',
    `remarks`          varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL     DEFAULT NULL COMMENT '描述',
    `head_user_id`     bigint                                                         NOT NULL DEFAULT 0 COMMENT '负责人id',
    `reporter_user_id` bigint                                                         NOT NULL DEFAULT 0 COMMENT '报告人id',
    `create_by`        bigint UNSIGNED                                                NOT NULL COMMENT '创建人id',
    `create_time`      datetime                                                       NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `delete_flag`      int                                                            NOT NULL DEFAULT 0,
    `file_list`        json                                                           NULL COMMENT '附件',
    PRIMARY KEY (`project_id`) USING BTREE
) ENGINE = InnoDB
  AUTO_INCREMENT = 6
  CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci COMMENT = '项目'
  ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for project_application
-- ----------------------------
DROP TABLE IF EXISTS `project_application`;
CREATE TABLE `project_application`
(
    `project_application_id` bigint UNSIGNED                                                NOT NULL AUTO_INCREMENT COMMENT '主键',
    `tag`                    varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci  NOT NULL DEFAULT '' COMMENT '标签',
    `sort`                   int                                                            NOT NULL DEFAULT 0 COMMENT '排序',
    `remarks`                varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL     DEFAULT NULL COMMENT '备注',
    `name`                   varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci  NOT NULL COMMENT '名称',
    `create_by`              bigint UNSIGNED                                                NOT NULL COMMENT '创建人id',
    `create_time`            datetime                                                       NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `delete_flag`            int                                                            NOT NULL DEFAULT 0,
    `head_user_id`           bigint                                                         NULL     DEFAULT 0 COMMENT '责任人',
    PRIMARY KEY (`project_application_id`) USING BTREE
) ENGINE = InnoDB
  AUTO_INCREMENT = 1
  CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci COMMENT = '项目的应用'
  ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for project_custom_field
-- ----------------------------
DROP TABLE IF EXISTS `project_custom_field`;
CREATE TABLE `project_custom_field`
(
    `project_custom_field_id` bigint UNSIGNED                                                NOT NULL AUTO_INCREMENT COMMENT '主键',
    `biz_type`                varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci    NOT NULL COMMENT '类型 0项目 1版本 2issue ',
    `name`                    varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci  NOT NULL COMMENT '名称',
    `key_name`                varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci  NOT NULL COMMENT '编码 供后面引用',
    `type`                    int UNSIGNED                                                   NOT NULL COMMENT '类型 看字典',
    `optional`                json                                                           NULL COMMENT '可选值',
    `value`                   varchar(5000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL     DEFAULT NULL COMMENT '默认值',
    `desc`                    longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci      NULL COMMENT '描述',
    `not_null`                int                                                            NOT NULL DEFAULT 0 COMMENT '0可为空 1不可为空',
    `date_type`               int                                                            NOT NULL DEFAULT 0 COMMENT '时间插件类型',
    `unit`                    varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci  NULL     DEFAULT NULL COMMENT '数组单位',
    `sort`                    int                                                            NOT NULL DEFAULT 0 COMMENT '排序',
    `delete_flag`             int                                                            NOT NULL DEFAULT 0,
    PRIMARY KEY (`project_custom_field_id`) USING BTREE,
    UNIQUE INDEX `project_custom_field_1` (`biz_type` ASC, `key_name` ASC, `delete_flag` ASC) USING BTREE
) ENGINE = InnoDB
  AUTO_INCREMENT = 23
  CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci COMMENT = '项目的自定义字段'
  ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for project_custom_value
-- ----------------------------
DROP TABLE IF EXISTS `project_custom_value`;
CREATE TABLE `project_custom_value`
(
    `project_custom_value_id` bigint UNSIGNED                                             NOT NULL AUTO_INCREMENT COMMENT '主键',
    `biz_type`                varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '类型 0项目 1版本 2issue ',
    `biz_id`                  bigint                                                      NOT NULL COMMENT '对应的业务id',
    `project_custom_field_id` bigint                                                      NOT NULL,
    `value`                   text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci       NOT NULL COMMENT '创建人id',
    PRIMARY KEY (`project_custom_value_id`) USING BTREE,
    UNIQUE INDEX `project_custom_value_1` (`biz_type` ASC, `biz_id` ASC, `project_custom_field_id` ASC) USING BTREE
) ENGINE = InnoDB
  AUTO_INCREMENT = 69
  CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci
  ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for project_issue
-- ----------------------------
DROP TABLE IF EXISTS `project_issue`;
CREATE TABLE `project_issue`
(
    `project_issue_id`   bigint UNSIGNED                                                NOT NULL AUTO_INCREMENT COMMENT '主键',
    `project_id`         bigint                                                         NOT NULL,
    `project_release_id` bigint                                                         NOT NULL DEFAULT 0 COMMENT '版本id',
    `type`               varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci    NOT NULL COMMENT '类型',
    `name`               varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci  NOT NULL COMMENT '项目名称',
    `status`             varchar(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci    NOT NULL COMMENT '状态 0使用中 1归档',
    `plan_start_date`    datetime                                                       NULL     DEFAULT NULL COMMENT '计划开始日期',
    `plan_end_date`      datetime                                                       NULL     DEFAULT NULL COMMENT '计划结束日期',
    `start_date`         datetime                                                       NULL     DEFAULT NULL COMMENT '实际开始日期',
    `end_date`           datetime                                                       NULL     DEFAULT NULL COMMENT '实际结束日期',
    `remarks`            varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL     DEFAULT NULL COMMENT '描述',
    `head_user_id`       bigint                                                         NOT NULL DEFAULT 0 COMMENT '负责人id',
    `reporter_user_id`   bigint                                                         NOT NULL DEFAULT 0 COMMENT '报告人id',
    `priority`           int                                                            NOT NULL DEFAULT 0 COMMENT '优先级 0一般 1重要  2紧急',
    `create_by`          bigint UNSIGNED                                                NOT NULL COMMENT '创建人id',
    `create_time`        datetime                                                       NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `delete_flag`        int                                                            NOT NULL DEFAULT 0,
    `sort`               int                                                            NOT NULL DEFAULT 0 COMMENT '排序',
    `file_list`          json                                                           NULL COMMENT '附件',
    PRIMARY KEY (`project_issue_id`) USING BTREE
) ENGINE = InnoDB
  AUTO_INCREMENT = 10
  CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci
  ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for project_permission
-- ----------------------------
DROP TABLE IF EXISTS `project_permission`;
CREATE TABLE `project_permission`
(
    `project_permission_id` bigint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
    `biz_type`              int             NOT NULL DEFAULT 0,
    `biz_type_id`           bigint          NOT NULL,
    `type`                  int             NOT NULL COMMENT '类型 0人 1部门 2角色',
    `type_id`               bigint          NOT NULL COMMENT '对应的id',
    PRIMARY KEY (`project_permission_id`) USING BTREE,
    UNIQUE INDEX `project_permission_1` (`biz_type` ASC, `biz_type_id` ASC, `type` ASC, `type_id` ASC) USING BTREE
) ENGINE = InnoDB
  AUTO_INCREMENT = 35
  CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci
  ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for project_release
-- ----------------------------
DROP TABLE IF EXISTS `project_release`;
CREATE TABLE `project_release`
(
    `project_release_id` bigint UNSIGNED                                                NOT NULL AUTO_INCREMENT COMMENT '主键',
    `project_id`         bigint                                                         NOT NULL,
    `status`             varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci    NOT NULL COMMENT '状态 0待开始 1冲刺中 2已发布',
    `sort`               int                                                            NOT NULL DEFAULT 0 COMMENT '排序',
    `version`            varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci  NOT NULL COMMENT '版本号',
    `remarks`            varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL     DEFAULT NULL COMMENT '备注',
    `progress`           decimal(10, 2)                                                 NOT NULL DEFAULT 0.00 COMMENT '进度',
    `create_by`          bigint UNSIGNED                                                NOT NULL COMMENT '创建人id',
    `create_time`        datetime                                                       NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `delete_flag`        int                                                            NOT NULL DEFAULT 0,
    `file_list`          json                                                           NULL COMMENT '附件',
    PRIMARY KEY (`project_release_id`) USING BTREE
) ENGINE = InnoDB
  AUTO_INCREMENT = 9
  CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci COMMENT = '版本'
  ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for provinces
-- ----------------------------
DROP TABLE IF EXISTS `provinces`;
CREATE TABLE `provinces`
(
    `id`          bigint                                                       NOT NULL COMMENT '城市id',
    `city_name`   varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '城市名称',
    `parent_id`   bigint                                                       NOT NULL COMMENT '父级id',
    `short_name`  varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '简称',
    `depth`       int                                                          NOT NULL COMMENT '层级',
    `city_code`   varchar(4) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci  NOT NULL COMMENT '城市编码',
    `zip_code`    varchar(6) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci  NOT NULL COMMENT '邮编',
    `merger_name` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '拼接名称',
    `longitude`   varchar(16) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '经度',
    `latitude`    varchar(16) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '纬度',
    `pinyin`      varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
    `if_use`      int(1) UNSIGNED ZEROFILL                                     NULL DEFAULT NULL,
    PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB
  CHARACTER SET = utf8mb3
  COLLATE = utf8mb3_general_ci COMMENT = '省市'
  ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for rili
-- ----------------------------
DROP TABLE IF EXISTS `rili`;
CREATE TABLE `rili`
(
    `rili_id`        bigint UNSIGNED                                                NOT NULL AUTO_INCREMENT COMMENT '主键',
    `type`           int                                                            NOT NULL COMMENT '类型 0会议 1任务',
    `name`           varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci  NOT NULL COMMENT '标题',
    `status`         varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci    NOT NULL COMMENT '状态 0待开始 1进行中  2结束',
    `remarks`        varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL     DEFAULT NULL COMMENT '备注',
    `start_time`     datetime                                                       NOT NULL,
    `end_time`       datetime                                                       NOT NULL,
    `create_by`      bigint UNSIGNED                                                NOT NULL COMMENT '创建人id',
    `create_time`    datetime                                                       NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
    `delete_flag`    int                                                            NOT NULL DEFAULT 0,
    `file_list`      json                                                           NULL,
    `five_remind_is` int                                                            NULL     DEFAULT NULL COMMENT '0',
    `ten_remind_is`  int                                                            NULL     DEFAULT NULL COMMENT '0',
    PRIMARY KEY (`rili_id`) USING BTREE
) ENGINE = InnoDB
  AUTO_INCREMENT = 13
  CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci COMMENT = '日历 会议 任务'
  ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for rili_conmment
-- ----------------------------
DROP TABLE IF EXISTS `rili_conmment`;
CREATE TABLE `rili_conmment`
(
    `rili_conmment_id` bigint UNSIGNED                                                NOT NULL AUTO_INCREMENT COMMENT '主键',
    `rili_id`          bigint                                                         NOT NULL,
    `content`          varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '内容',
    `create_type`      varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci  NOT NULL COMMENT '类型 0:用户  1:应用',
    `create_by`        bigint UNSIGNED                                                NOT NULL COMMENT '创建人id',
    `create_time`      datetime                                                       NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
    `delete_flag`      int                                                            NOT NULL DEFAULT 0,
    PRIMARY KEY (`rili_conmment_id`) USING BTREE
) ENGINE = InnoDB
  AUTO_INCREMENT = 149
  CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci
  ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for rili_user
-- ----------------------------
DROP TABLE IF EXISTS `rili_user`;
CREATE TABLE `rili_user`
(
    `rili_user_id` bigint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
    `rili_id`      bigint          NOT NULL,
    `user_id`      bigint UNSIGNED NOT NULL,
    PRIMARY KEY (`rili_user_id`) USING BTREE
) ENGINE = InnoDB
  AUTO_INCREMENT = 43
  CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci
  ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role`
(
    `id`          bigint UNSIGNED                                               NOT NULL AUTO_INCREMENT COMMENT '主键',
    `name`        varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
    `code`        varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '角色编码',
    `sort`        int UNSIGNED                                                  NOT NULL DEFAULT 0 COMMENT '排序',
    `remarks`     varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL     DEFAULT NULL COMMENT '备注',
    `disabled`    int UNSIGNED                                                  NOT NULL DEFAULT 0 COMMENT '状态 0启用 1禁用',
    `create_time` datetime                                                      NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `create_by`   bigint UNSIGNED                                               NOT NULL COMMENT '创建人id',
    `update_time` datetime                                                      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `update_by`   bigint UNSIGNED                                               NOT NULL COMMENT '更新人',
    `delete_flag` int UNSIGNED                                                  NOT NULL DEFAULT 0 COMMENT '删除 0不删除 1删除',
    PRIMARY KEY (`id`) USING BTREE,
    UNIQUE INDEX `role_1` (`code` ASC, `delete_flag` ASC) USING BTREE
) ENGINE = InnoDB
  AUTO_INCREMENT = 10
  CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci COMMENT = '角色;'
  ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for role_module
-- ----------------------------
DROP TABLE IF EXISTS `role_module`;
CREATE TABLE `role_module`
(
    `id`          bigint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
    `role_id`     bigint UNSIGNED NOT NULL,
    `module_id`   bigint UNSIGNED NOT NULL,
    `create_time` datetime        NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `create_by`   bigint UNSIGNED NOT NULL COMMENT '创建人id',
    PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB
  AUTO_INCREMENT = 693
  CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci COMMENT = '角色-权限;'
  ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for system_config
-- ----------------------------
DROP TABLE IF EXISTS `system_config`;
CREATE TABLE `system_config`
(
    `id`          bigint UNSIGNED                                                NOT NULL AUTO_INCREMENT COMMENT '主键',
    `key`         varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci  NOT NULL COMMENT '配置key',
    `value`       varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL     DEFAULT NULL COMMENT '值',
    `remarks`     varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci  NULL     DEFAULT NULL,
    `type`        int                                                            NOT NULL COMMENT '字典 system_config_type',
    `update_by`   bigint UNSIGNED                                                NOT NULL COMMENT '更新人id',
    `update_time` datetime                                                       NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `delete_flag` int                                                            NOT NULL DEFAULT 0,
    `create_by`   bigint UNSIGNED                                                NOT NULL COMMENT '创建人id',
    `create_time` datetime                                                       NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (`id`) USING BTREE,
    UNIQUE INDEX `system_config_1` (`key` ASC, `delete_flag` ASC) USING BTREE
) ENGINE = InnoDB
  AUTO_INCREMENT = 7
  CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci COMMENT = '系统配置表'
  ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for table
-- ----------------------------
DROP TABLE IF EXISTS `table`;
CREATE TABLE `table`
(
    `table_id`          bigint UNSIGNED                                                NOT NULL AUTO_INCREMENT COMMENT '表id',
    `code`              varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci  NOT NULL COMMENT '表名',
    `desc`              varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL     DEFAULT NULL COMMENT '表描述',
    `index_list`        json                                                           NULL COMMENT '索引列表',
    `database_board_id` bigint UNSIGNED                                                NOT NULL COMMENT '数据库画板id',
    `y`                 varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci  NOT NULL DEFAULT '0' COMMENT '坐标',
    `x`                 varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci  NOT NULL DEFAULT '0' COMMENT '坐标',
    `create_time`       datetime                                                       NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `create_by`         bigint UNSIGNED                                                NOT NULL COMMENT '创建人id',
    `update_time`       datetime                                                       NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `update_by`         bigint UNSIGNED                                                NOT NULL COMMENT '更新人',
    `delete_flag`       int UNSIGNED                                                   NOT NULL DEFAULT 0 COMMENT '删除 0不删除 1删除',
    `shape_type`        varchar(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci    NOT NULL COMMENT '图形类型',
    `combo_table_id`    bigint                                                         NULL     DEFAULT NULL COMMENT '图组的id',
    `fill_color`        varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci  NULL     DEFAULT NULL COMMENT '填充颜色',
    `engine_type`       varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci  NOT NULL DEFAULT 'InnoDB' COMMENT '引擎类型',
    `remarks`           text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci          NULL COMMENT '业务描述',
    PRIMARY KEY (`table_id`) USING BTREE,
    UNIQUE INDEX `table_1` (`code` ASC, `database_board_id` ASC, `delete_flag` ASC) USING BTREE COMMENT '面板的表名要唯一'
) ENGINE = InnoDB
  AUTO_INCREMENT = 1365
  CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci COMMENT = '表'
  ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for table_field
-- ----------------------------
DROP TABLE IF EXISTS `table_field`;
CREATE TABLE `table_field`
(
    `table_field_id`      bigint UNSIGNED                                                NOT NULL AUTO_INCREMENT COMMENT '表字段id',
    `table_id`            bigint UNSIGNED                                                NOT NULL COMMENT '表id',
    `database_board_id`   bigint UNSIGNED                                                NOT NULL COMMENT '数据库画板id',
    `code`                varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci  NOT NULL COMMENT '字段名',
    `desc`                varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '字段描述',
    `type`                varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci  NOT NULL COMMENT '字段类型',
    `length`              int UNSIGNED                                                   NULL DEFAULT 0 COMMENT '长度',
    `decimal`             int UNSIGNED                                                   NULL DEFAULT NULL COMMENT '小数点长度',
    `flag_not_null`       int UNSIGNED                                                   NULL DEFAULT NULL COMMENT '是否为空',
    `flag_key`            int UNSIGNED                                                   NULL DEFAULT NULL COMMENT '是否为主键',
    `default_value`       varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci  NULL DEFAULT NULL COMMENT '默认值',
    `flag_auto_increment` int UNSIGNED                                                   NULL DEFAULT NULL COMMENT '是否自动递增',
    `flag_unsigned`       int UNSIGNED                                                   NULL DEFAULT NULL COMMENT '是否无符号 0否 1是无符号',
    PRIMARY KEY (`table_field_id`) USING BTREE
) ENGINE = InnoDB
  AUTO_INCREMENT = 133111
  CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci COMMENT = '表字段'
  ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for talk
-- ----------------------------
DROP TABLE IF EXISTS `talk`;
CREATE TABLE `talk`
(
    `talk_id`     bigint UNSIGNED                                               NOT NULL AUTO_INCREMENT COMMENT '主键',
    `type`        varchar(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci   NOT NULL COMMENT '类型 0个人对话  1群聊 2应用通知',
    `create_by`   bigint UNSIGNED                                               NOT NULL COMMENT '创建人id',
    `create_time` datetime                                                      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `delete_flag` int                                                           NOT NULL DEFAULT 0,
    `title`       varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL     DEFAULT NULL COMMENT '对话标题，群使用',
    PRIMARY KEY (`talk_id`) USING BTREE
) ENGINE = InnoDB
  AUTO_INCREMENT = 10
  CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci COMMENT = '对话表'
  ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for talk_msg
-- ----------------------------
DROP TABLE IF EXISTS `talk_msg`;
CREATE TABLE `talk_msg`
(
    `talk_msg_id` bigint UNSIGNED                                                NOT NULL AUTO_INCREMENT COMMENT '主键',
    `talk_id`     bigint                                                         NULL     DEFAULT NULL,
    `status`      varchar(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci    NULL     DEFAULT NULL COMMENT '状态：0未读  1已读',
    `type`        varchar(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci    NOT NULL COMMENT '类型 0text  1file',
    `source_type` varchar(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci    NOT NULL,
    `source_id`   bigint UNSIGNED                                                NOT NULL COMMENT '发送消息的id',
    `target_type` varchar(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci    NOT NULL,
    `target_id`   bigint UNSIGNED                                                NOT NULL COMMENT '接收消息的id',
    `create_time` datetime                                                       NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `read_time`   datetime                                                       NULL     DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '看消息的时间',
    `delete_flag` int                                                            NOT NULL DEFAULT 0,
    `delete_time` datetime                                                       NULL     DEFAULT NULL COMMENT '删除消息的时间',
    `text`        varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL     DEFAULT NULL COMMENT '文本消息',
    `file`        json                                                           NULL COMMENT '文件消息',
    PRIMARY KEY (`talk_msg_id`) USING BTREE,
    INDEX `talk_msg_1` (`talk_id` ASC) USING BTREE,
    INDEX `talk_msg_2` (`target_id` ASC) USING BTREE
) ENGINE = InnoDB
  AUTO_INCREMENT = 5770
  CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci COMMENT = '聊天内容'
  ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for talk_user
-- ----------------------------
DROP TABLE IF EXISTS `talk_user`;
CREATE TABLE `talk_user`
(
    `talk_user_id` bigint UNSIGNED                                             NOT NULL AUTO_INCREMENT COMMENT '主键',
    `talk_id`      bigint                                                      NOT NULL COMMENT '对话id',
    `type`         varchar(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '类型 0用户 1应用',
    `user_id`      bigint UNSIGNED                                             NOT NULL COMMENT '用户id',
    `show_is`      varchar(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '0：不显示  1显示   相当于用户的聊天框中是否显示这个聊天',
    `update_time`  bigint                                                      NOT NULL COMMENT '以这个时间来进行对话列表的排序',
    PRIMARY KEY (`talk_user_id`) USING BTREE,
    INDEX `talk_user_1` (`talk_id` ASC) USING BTREE,
    INDEX `talk_user_2` (`user_id` ASC) USING BTREE
) ENGINE = InnoDB
  AUTO_INCREMENT = 30
  CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci COMMENT = '对话人员表'
  ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for task
-- ----------------------------
DROP TABLE IF EXISTS `task`;
CREATE TABLE `task`
(
    `task_id`      bigint UNSIGNED                                                NOT NULL AUTO_INCREMENT COMMENT '主键',
    `user_id`      bigint                                                         NOT NULL COMMENT '任务所属用户',
    `type`         int                                                            NOT NULL COMMENT '类型 0任务 1里程碑 2项目',
    `name`         varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci  NOT NULL COMMENT '标题',
    `remarks`      varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL     DEFAULT NULL COMMENT '备注',
    `start_time`   datetime                                                       NOT NULL COMMENT '开始时间',
    `end_time`     datetime                                                       NOT NULL COMMENT '结束时间',
    `progress`     int                                                            NOT NULL DEFAULT 0 COMMENT '进度',
    `dependencies` json                                                           NULL COMMENT '依赖的id',
    `create_by`    bigint UNSIGNED                                                NOT NULL COMMENT '创建人id',
    `create_time`  datetime                                                       NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
    `update_by`    bigint UNSIGNED                                                NOT NULL COMMENT '更新人id',
    `update_time`  datetime                                                       NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `delete_flag`  int                                                            NOT NULL DEFAULT 0,
    `sort`         int                                                            NOT NULL DEFAULT 0 COMMENT '排序',
    `file_list`    json                                                           NULL COMMENT '附件',
    PRIMARY KEY (`task_id`) USING BTREE,
    INDEX `task_1` (`sort` ASC) USING BTREE
) ENGINE = InnoDB
  AUTO_INCREMENT = 19
  CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci
  ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for version
-- ----------------------------
DROP TABLE IF EXISTS `version`;
CREATE TABLE `version`
(
    `version_id` int                                                           NOT NULL,
    `version`    varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '版本',
    `status`     varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '状态',
    `error_log`  longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci     NULL,
    PRIMARY KEY (`version_id`) USING BTREE
) ENGINE = InnoDB
  CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci
  ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for work_log
-- ----------------------------
DROP TABLE IF EXISTS `work_log`;
CREATE TABLE `work_log`
(
    `work_log_id`      bigint UNSIGNED                                                NOT NULL AUTO_INCREMENT COMMENT '主键',
    `hours`            decimal(10, 2)                                                 NOT NULL COMMENT '工时',
    `day`              date                                                           NOT NULL COMMENT '哪天',
    `project_issue_id` bigint                                                         NOT NULL,
    `project_id`       bigint                                                         NOT NULL,
    `create_by`        bigint UNSIGNED                                                NOT NULL COMMENT '创建人id',
    `create_time`      datetime                                                       NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `update_by`        bigint UNSIGNED                                                NOT NULL COMMENT '更新人id',
    `update_time`      datetime                                                       NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `delete_flag`      int                                                            NOT NULL DEFAULT 0,
    `sort`             int                                                            NOT NULL DEFAULT 0 COMMENT '排序',
    `remarks`          varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL     DEFAULT NULL COMMENT '备注',
    `file_list`        json                                                           NULL COMMENT '附件',
    PRIMARY KEY (`work_log_id`) USING BTREE
) ENGINE = InnoDB
  AUTO_INCREMENT = 14
  CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci COMMENT = '工时'
  ROW_FORMAT = DYNAMIC;
