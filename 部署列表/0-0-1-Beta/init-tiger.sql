/*
 Navicat Premium Data Transfer

 Source Server         : 001beta
 Source Server Type    : MySQL
 Source Server Version : 80030 (8.0.30)
 Source Host           : 14.103.135.182:13306
 Source Schema         : tiger

 Target Server Type    : MySQL
 Target Server Version : 80030 (8.0.30)
 File Encoding         : 65001

 Date: 10/03/2025 13:41:35
*/

SET NAMES utf8mb4;
CREATE DATABASE IF NOT EXISTS tiger
    DEFAULT CHARACTER SET utf8mb4
    DEFAULT COLLATE utf8mb4_0900_ai_ci;
-- 切换到新创建的数据库
USE tiger;

SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for account
-- ----------------------------
DROP TABLE IF EXISTS `account`;
CREATE TABLE `account`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键',
  `account` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '账号',
  `nick_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT 'nickName',
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '头像',
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password_strength` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'weak' COMMENT 'weak  medium  strong',
  `type` int UNSIGNED NOT NULL COMMENT '类型:0前台  1后台',
  `disabled` int UNSIGNED NOT NULL DEFAULT 0 COMMENT '状态0 启用 1禁用',
  `remarks` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '备注',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `create_by` bigint NOT NULL COMMENT '创建人id',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `update_by` bigint UNSIGNED NOT NULL COMMENT '更新人',
  `delete_flag` int UNSIGNED NOT NULL DEFAULT 0 COMMENT '删除 0不删除 1删除',
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '邮箱',
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '手机号',
  `openid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT 'openid',
  `flag_login_out` int NOT NULL DEFAULT 0 COMMENT '是否退出登录 0未退出 1退出',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `account_1`(`account` ASC, `delete_flag` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 20021 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '账号;' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of account
-- ----------------------------
INSERT INTO `account` VALUES (1, 'admin-devops', 'admin', 'bbefb2a3c528474789f4b5692998808c.jpg', '{bcrypt}$2a$10$4Xp0vKX5urlh8FUwv/8kAusI7pa2E32K0DlEFFBxw77kv6Blic9QG', 'strong', 1, 0, '备注1213', '2022-11-08 18:28:04', 1, '2025-03-10 12:03:40', 1, 0, '976747663@qq.com', '1521388888', NULL, 0);
INSERT INTO `account` VALUES (20020, '小虎', '小虎', NULL, '{bcrypt}$2a$10$rrCqpRRA9XWlnD1vqmysxeCW/2LSksNW2rRlHFX5DzaqMt9yajraW', 'weak', 1, 0, NULL, '2025-03-10 12:01:54', 1, '2025-03-10 12:03:33', 1, 0, 'xiaohu@qq.com', '11111111111', NULL, 1);

-- ----------------------------
-- Table structure for account_dept
-- ----------------------------
DROP TABLE IF EXISTS `account_dept`;
CREATE TABLE `account_dept`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `account_id` bigint UNSIGNED NOT NULL COMMENT '账号id',
  `dept_id` bigint UNSIGNED NOT NULL COMMENT '部门id',
  `owner` int UNSIGNED NOT NULL DEFAULT 0 COMMENT '职责0员工 1负责人',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `create_by` bigint UNSIGNED NOT NULL COMMENT '创建人id',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `update_by` bigint UNSIGNED NOT NULL COMMENT '更新人',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `account_dept_1`(`account_id` ASC, `dept_id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 106 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '账号-部门;' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of account_dept
-- ----------------------------

-- ----------------------------
-- Table structure for account_role
-- ----------------------------
DROP TABLE IF EXISTS `account_role`;
CREATE TABLE `account_role`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `account_id` bigint UNSIGNED NOT NULL,
  `role_id` bigint UNSIGNED NOT NULL,
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `create_by` bigint UNSIGNED NOT NULL COMMENT '创建人id',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `account_role_1`(`account_id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 20146 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '账号-角色;' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of account_role
-- ----------------------------
INSERT INTO `account_role` VALUES (20144, 1, 1, '2025-02-23 10:51:59', 1);
INSERT INTO `account_role` VALUES (20145, 20020, 1, '2025-03-10 12:01:54', 1);

-- ----------------------------
-- Table structure for ai_chat
-- ----------------------------
DROP TABLE IF EXISTS `ai_chat`;
CREATE TABLE `ai_chat`  (
  `ai_chat_id` bigint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '标题',
  `type` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '类型',
  `create_by` bigint UNSIGNED NOT NULL COMMENT '创建人id',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `update_by` bigint UNSIGNED NOT NULL COMMENT '更新人id',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `delete_flag` int NOT NULL DEFAULT 0,
  `sort` int NOT NULL DEFAULT 0 COMMENT '排序',
  `remarks` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`ai_chat_id`) USING BTREE,
  INDEX `ai_chat_1`(`update_time` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 35 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of ai_chat
-- ----------------------------

-- ----------------------------
-- Table structure for ai_chat_msg
-- ----------------------------
DROP TABLE IF EXISTS `ai_chat_msg`;
CREATE TABLE `ai_chat_msg`  (
  `ai_chat_msg_id` bigint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `ai_chat_id` bigint NOT NULL,
  `type` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '类型 0text  1file',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
  `delete_flag` int NOT NULL DEFAULT 0,
  `delete_time` datetime NULL DEFAULT NULL COMMENT '删除消息的时间',
  `text` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL COMMENT '文本消息',
  `file` json NULL COMMENT '文件消息',
  `biz_type` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '类型 0用户 1ai的pipeline',
  `biz_id` bigint NOT NULL DEFAULT 0 COMMENT '用户id 或者...',
  `status` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '进行中，成功，失败',
  `tokens` bigint NOT NULL DEFAULT 0,
  PRIMARY KEY (`ai_chat_msg_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 256 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of ai_chat_msg
-- ----------------------------

-- ----------------------------
-- Table structure for ai_chat_user
-- ----------------------------
DROP TABLE IF EXISTS `ai_chat_user`;
CREATE TABLE `ai_chat_user`  (
  `ai_chat_user_id` bigint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `ai_chat_id` bigint NOT NULL COMMENT '聊天框id',
  `biz_type` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '类型 0用户 1ai的pipeline',
  `biz_id` bigint NOT NULL DEFAULT 0 COMMENT '用户id 或者...',
  `model` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '模型',
  `system_prompt` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  `ai_pipeline_id` bigint NULL DEFAULT NULL,
  `audio_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `voice` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `live_portrait` json NULL,
  PRIMARY KEY (`ai_chat_user_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 52 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of ai_chat_user
-- ----------------------------

-- ----------------------------
-- Table structure for ai_model
-- ----------------------------
DROP TABLE IF EXISTS `ai_model`;
CREATE TABLE `ai_model`  (
  `ai_model_id` bigint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `belong` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '通义千问  豆包',
  `type` json NOT NULL COMMENT '类型 文本  图片 文本和图片 ',
  `sort` int NOT NULL DEFAULT 0 COMMENT '排序',
  `remarks` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '备注',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `context_length` bigint NOT NULL COMMENT '上下文长度',
  `max_input` bigint NOT NULL COMMENT '最大输入',
  `max_output` bigint NOT NULL COMMENT '最大输出',
  PRIMARY KEY (`ai_model_id`) USING BTREE,
  UNIQUE INDEX `ai_model_1`(`code` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of ai_model
-- ----------------------------

-- ----------------------------
-- Table structure for ai_pipeline
-- ----------------------------
DROP TABLE IF EXISTS `ai_pipeline`;
CREATE TABLE `ai_pipeline`  (
  `ai_pipeline_id` bigint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `type` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '类型',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '名称',
  `remarks` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '备注',
  `create_by` bigint UNSIGNED NOT NULL COMMENT '创建人id',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `update_by` bigint UNSIGNED NOT NULL COMMENT '更新人id',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `delete_flag` int NOT NULL DEFAULT 0,
  `sort` int NOT NULL DEFAULT 0 COMMENT '排序',
  PRIMARY KEY (`ai_pipeline_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = 'ai流程' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of ai_pipeline
-- ----------------------------

-- ----------------------------
-- Table structure for ai_pipeline_edge
-- ----------------------------
DROP TABLE IF EXISTS `ai_pipeline_edge`;
CREATE TABLE `ai_pipeline_edge`  (
  `ai_pipeline_edge_id` bigint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `ai_pipeline_id` bigint NOT NULL,
  `source` bigint NOT NULL,
  `target` bigint NOT NULL,
  PRIMARY KEY (`ai_pipeline_edge_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 50 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of ai_pipeline_edge
-- ----------------------------

-- ----------------------------
-- Table structure for ai_pipeline_point
-- ----------------------------
DROP TABLE IF EXISTS `ai_pipeline_point`;
CREATE TABLE `ai_pipeline_point`  (
  `ai_pipeline_point_id` bigint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `ai_pipeline_id` bigint NOT NULL,
  `type` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '类型',
  `remarks` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '备注',
  `x` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `y` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `model` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `is_history` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `system_prompt` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `user_prompt` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`ai_pipeline_point_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 57 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of ai_pipeline_point
-- ----------------------------

-- ----------------------------
-- Table structure for ai_pipeline_point_var
-- ----------------------------
DROP TABLE IF EXISTS `ai_pipeline_point_var`;
CREATE TABLE `ai_pipeline_point_var`  (
  `ai_pipeline_point_var_id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `ai_pipeline_point_id` bigint NOT NULL COMMENT '主键',
  `ai_pipeline_id` bigint NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `type` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '类型',
  `remarks` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '备注',
  `category` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `related_id` json NULL,
  `related_var_id` bigint NULL DEFAULT NULL,
  `related_point_id` bigint NULL DEFAULT NULL,
  `default_value` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  `parent_id` bigint NOT NULL DEFAULT 0,
  PRIMARY KEY (`ai_pipeline_point_var_id`) USING BTREE,
  UNIQUE INDEX `ai_pipeline_point_var_1`(`ai_pipeline_point_id` ASC, `name` ASC, `category` ASC) USING BTREE,
  INDEX `ai_pipeline_point_var_2`(`ai_pipeline_id` ASC) USING BTREE,
  INDEX `ai_pipeline_point_var_3`(`ai_pipeline_point_id` ASC) USING BTREE,
  INDEX `ai_pipeline_point_var_4`(`category` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 157 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '节点参数表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of ai_pipeline_point_var
-- ----------------------------

-- ----------------------------
-- Table structure for application
-- ----------------------------
DROP TABLE IF EXISTS `application`;
CREATE TABLE `application`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '应用名称',
  `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '唯一编码',
  `token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'sso 登录认证的令牌',
  `remarks` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '备注',
  `sort` int NOT NULL DEFAULT 0,
  `disabled` int NOT NULL DEFAULT 0,
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `create_by` bigint UNSIGNED NOT NULL COMMENT '创建人id',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `update_by` bigint UNSIGNED NOT NULL COMMENT '更新人',
  `delete_flag` int UNSIGNED NOT NULL DEFAULT 0 COMMENT '删除 0不删除 1删除',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `application_1`(`code` ASC) USING BTREE,
  UNIQUE INDEX `application_2`(`token` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '应用;' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of application
-- ----------------------------
INSERT INTO `application` VALUES (1, 'devops', 'devops', '12dsfesf', 'ddd123', 0, 0, '2022-11-14 16:06:12', 1, '2023-07-08 10:01:16', 1, 0);
INSERT INTO `application` VALUES (2, '电商系统', 'shop', 'c66f28c6df774844940447eb94ca5240', '213', 1, 0, '2022-11-14 16:37:46', 1, '2022-12-01 13:51:40', 1, 0);

-- ----------------------------
-- Table structure for database_board
-- ----------------------------
DROP TABLE IF EXISTS `database_board`;
CREATE TABLE `database_board`  (
  `database_board_id` bigint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '名称',
  `remarks` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '备注',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `create_by` bigint UNSIGNED NOT NULL COMMENT '创建人id',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `update_by` bigint UNSIGNED NOT NULL COMMENT '更新人',
  `delete_flag` int UNSIGNED NOT NULL DEFAULT 0 COMMENT '删除 0不删除 1删除',
  `zoom` decimal(10, 5) NOT NULL DEFAULT 1.00000 COMMENT '缩放比例',
  `pointx` decimal(10, 5) NOT NULL DEFAULT 0.00000 COMMENT '中心点x',
  `pointy` decimal(10, 5) NOT NULL DEFAULT 0.00000 COMMENT '中心点y',
  PRIMARY KEY (`database_board_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '数据库画板' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of database_board
-- ----------------------------

-- ----------------------------
-- Table structure for database_board_edge
-- ----------------------------
DROP TABLE IF EXISTS `database_board_edge`;
CREATE TABLE `database_board_edge`  (
  `database_board_edge_id` bigint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `database_board_id` bigint NOT NULL COMMENT '数据库画板id',
  `source` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `source_handle` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `target` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `target_handle` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`database_board_edge_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '连线' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of database_board_edge
-- ----------------------------

-- ----------------------------
-- Table structure for database_config
-- ----------------------------
DROP TABLE IF EXISTS `database_config`;
CREATE TABLE `database_config`  (
  `database_config_id` bigint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '库名称',
  `type` int UNSIGNED NOT NULL COMMENT '库类型',
  `ip` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '连接地址',
  `port` int UNSIGNED NOT NULL COMMENT '端口号',
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '用户名',
  `password` varchar(555) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '密码',
  `remarks` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '备注',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `create_by` bigint UNSIGNED NOT NULL COMMENT '创建人id',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `update_by` bigint UNSIGNED NOT NULL COMMENT '更新人',
  `delete_flag` int UNSIGNED NOT NULL DEFAULT 0 COMMENT '删除 0不删除 1删除',
  PRIMARY KEY (`database_config_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '数据库配置' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of database_config
-- ----------------------------

-- ----------------------------
-- Table structure for dept
-- ----------------------------
DROP TABLE IF EXISTS `dept`;
CREATE TABLE `dept`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '部门名称',
  `disabled` int UNSIGNED NOT NULL DEFAULT 0 COMMENT '状态 0启用 1禁用',
  `parent_id` bigint UNSIGNED NOT NULL DEFAULT 0,
  `remarks` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '备注',
  `sort` int UNSIGNED NOT NULL DEFAULT 0 COMMENT '排序',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `create_by` bigint UNSIGNED NOT NULL COMMENT '创建人id',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `update_by` bigint UNSIGNED NOT NULL COMMENT '更新人',
  `delete_flag` int UNSIGNED NOT NULL DEFAULT 0 COMMENT '删除 0不删除 1删除',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 25 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '部门;' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of dept
-- ----------------------------

-- ----------------------------
-- Table structure for dic
-- ----------------------------
DROP TABLE IF EXISTS `dic`;
CREATE TABLE `dic`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '字典类型编码',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '字典名称',
  `remarks` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '备注',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `create_by` bigint UNSIGNED NOT NULL COMMENT '创建人id',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `update_by` bigint UNSIGNED NOT NULL COMMENT '更新人',
  `delete_flag` int UNSIGNED NOT NULL DEFAULT 0 COMMENT '删除 0不删除 1删除',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `dic_1`(`code` ASC, `delete_flag` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 28 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '字典;' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of dic
-- ----------------------------
INSERT INTO `dic` VALUES (2, 'pipeline_plugin_type', '插件-资源类型', '插件类型', '2022-12-07 18:23:45', 1, '2023-12-18 15:41:29', 1, 0);
INSERT INTO `dic` VALUES (3, 'pipeline_plugin_source', '插件-插件来源', '插件来源', '2022-12-07 18:50:33', 1, '2023-01-31 09:20:54', 1, 0);
INSERT INTO `dic` VALUES (4, 'pipeline_build_status', '流水线构建状态', NULL, '2022-12-14 20:17:02', 1, '2022-12-14 20:17:02', 1, 0);
INSERT INTO `dic` VALUES (5, 'file_source_type', '文件存储类型', NULL, '2022-12-14 21:07:44', 1, '2022-12-14 21:07:44', 1, 0);
INSERT INTO `dic` VALUES (6, 'other_account_type', '三方账号类型', NULL, '2022-12-14 21:17:33', 1, '2022-12-14 21:17:33', 1, 0);
INSERT INTO `dic` VALUES (7, 'pipeline_use_status', '流水线使用状态', NULL, '2023-01-06 17:48:10', 1, '2023-01-06 17:48:10', 1, 0);
INSERT INTO `dic` VALUES (8, 'pipeline_script_type', '插件-插件脚本类型', NULL, '2023-01-31 09:17:07', 1, '2023-01-31 09:21:16', 1, 0);
INSERT INTO `dic` VALUES (9, 'pipeline_param_type', '插件(流水线)参数类型', NULL, '2023-01-31 10:22:23', 1, '2023-01-31 10:23:04', 1, 0);
INSERT INTO `dic` VALUES (12, 'process_point_type', '流程-节点类型', NULL, '2023-03-25 10:23:24', 1, '2023-03-25 10:23:24', 1, 0);
INSERT INTO `dic` VALUES (13, 'process_instance_status', '流程-状态', '流程实例的状态', '2023-05-23 10:14:31', 1, '2024-07-12 08:38:55', 1, 0);
INSERT INTO `dic` VALUES (15, 'menu-type', '菜单类型', NULL, '2023-11-24 09:13:40', 1, '2023-11-24 09:13:40', 1, 0);
INSERT INTO `dic` VALUES (16, 'system_config_type', '系统配置参数的类型', '系统配置参数的类型 给系统使用', '2024-01-04 08:40:30', 1, '2024-01-04 08:40:45', 1, 0);
INSERT INTO `dic` VALUES (17, 'ifFlag', '是否', NULL, '2024-01-04 11:56:10', 1, '2024-01-04 11:56:10', 1, 0);
INSERT INTO `dic` VALUES (18, 'database_type', '数据库类型', '数据库类型', '2024-01-06 17:16:51', 1, '2024-01-06 17:16:51', 1, 0);
INSERT INTO `dic` VALUES (19, 'Mysql_type', 'Mysql字段类型', 'Mysql字段类型', '2024-01-14 13:48:59', 1, '2024-01-14 13:48:59', 1, 0);
INSERT INTO `dic` VALUES (20, 'mysql_index_type', 'Mysql索引的类型', 'Mysql索引的类型', '2024-01-31 16:09:06', 1, '2024-01-31 16:09:06', 1, 0);
INSERT INTO `dic` VALUES (21, 'mysql_index_fun', 'Mysql索引的方法', NULL, '2024-01-31 16:09:40', 1, '2024-01-31 16:09:40', 1, 0);
INSERT INTO `dic` VALUES (22, 'mysql_table_type', 'Mysql表引擎类型', 'Mysql表引擎类型', '2024-03-07 10:25:59', 1, '2024-03-07 10:25:59', 1, 0);
INSERT INTO `dic` VALUES (23, 'process_instance_point_status', '流程-节点状态', '流程实例的节点中的审批状态', '2024-07-12 08:39:37', 1, '2024-07-12 08:39:37', 1, 0);
INSERT INTO `dic` VALUES (24, 'project_type', '项目-类型', NULL, '2024-09-13 08:53:06', 1, '2024-09-13 08:53:06', 1, 0);
INSERT INTO `dic` VALUES (25, 'issue-type', 'issue-类型', NULL, '2024-10-09 11:16:26', 1, '2024-10-09 11:16:26', 1, 0);
INSERT INTO `dic` VALUES (26, 'qwen-text', '千问-文本模型', '文本聊天模型', '2024-12-06 09:12:31', 1, '2024-12-06 09:12:31', 1, 0);
INSERT INTO `dic` VALUES (27, 'chat-model', '对话模型', 'ai对话框可直接选择的模型', '2025-01-06 10:06:27', 1, '2025-01-06 10:06:27', 1, 0);

-- ----------------------------
-- Table structure for dic_value
-- ----------------------------
DROP TABLE IF EXISTS `dic_value`;
CREATE TABLE `dic_value`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `dic_id` bigint UNSIGNED NOT NULL,
  `value` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '字典值',
  `label` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '字典标签名称',
  `color` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `remarks` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `disabled` int NOT NULL DEFAULT 0,
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `create_by` bigint UNSIGNED NOT NULL COMMENT '创建人id',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `update_by` bigint UNSIGNED NOT NULL COMMENT '更新人',
  `delete_flag` int UNSIGNED NOT NULL DEFAULT 0 COMMENT '删除 0不删除 1删除',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `dic_value_1`(`dic_id` ASC, `value` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 131 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '字典详情;' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of dic_value
-- ----------------------------
INSERT INTO `dic_value` VALUES (1, 2, '1', '测试类', NULL, '1', 0, '2022-12-08 10:38:00', 1, '2023-09-12 07:52:12', 1, 0);
INSERT INTO `dic_value` VALUES (2, 3, '2', '系统内置', NULL, '内置插件不可修改', 0, '2022-12-08 13:42:24', 1, '2023-09-12 07:52:12', 1, 0);
INSERT INTO `dic_value` VALUES (3, 2, '3', '资源下载类', NULL, NULL, 0, '2022-12-08 16:45:07', 1, '2023-09-12 07:52:12', 1, 0);
INSERT INTO `dic_value` VALUES (4, 2, '4', '代码检查类', NULL, NULL, 0, '2022-12-08 16:45:18', 1, '2023-09-12 07:52:12', 1, 0);
INSERT INTO `dic_value` VALUES (5, 2, '5', '编译打包类', NULL, NULL, 0, '2022-12-08 16:45:32', 1, '2023-09-12 07:52:12', 1, 0);
INSERT INTO `dic_value` VALUES (6, 2, '6', '其他类', NULL, NULL, 0, '2022-12-08 16:46:17', 1, '2023-09-12 07:52:12', 1, 0);
INSERT INTO `dic_value` VALUES (7, 4, '7', '队列中', NULL, '点击构建 就会进入构建队列中', 0, '2022-12-14 20:17:52', 1, '2023-09-12 07:52:12', 1, 0);
INSERT INTO `dic_value` VALUES (8, 4, '8', '构建中', NULL, NULL, 0, '2022-12-14 20:18:33', 1, '2023-09-12 07:52:12', 1, 0);
INSERT INTO `dic_value` VALUES (9, 4, '9', '流程审批中', NULL, NULL, 0, '2022-12-14 20:18:53', 1, '2023-09-12 07:52:12', 1, 0);
INSERT INTO `dic_value` VALUES (10, 5, '10', '肉包系统', NULL, NULL, 0, '2022-12-14 21:08:12', 1, '2023-09-12 07:52:12', 1, 0);
INSERT INTO `dic_value` VALUES (11, 5, '11', '阿里云sso', NULL, NULL, 0, '2022-12-14 21:08:21', 1, '2023-09-12 07:52:12', 1, 0);
INSERT INTO `dic_value` VALUES (12, 5, '12', '七牛云存储', NULL, NULL, 1, '2022-12-14 21:08:42', 1, '2023-09-12 07:52:12', 1, 0);
INSERT INTO `dic_value` VALUES (13, 6, '13', 'git', NULL, NULL, 0, '2022-12-14 21:18:00', 1, '2023-09-12 07:52:12', 1, 0);
INSERT INTO `dic_value` VALUES (14, 6, '14', '其他', NULL, NULL, 0, '2022-12-14 21:18:26', 1, '2023-09-12 07:52:13', 1, 0);
INSERT INTO `dic_value` VALUES (15, 7, '15', '使用中', NULL, '有构建中的记录', 0, '2023-01-06 17:50:22', 1, '2023-09-12 07:52:13', 1, 0);
INSERT INTO `dic_value` VALUES (16, 7, '16', '闲置', NULL, NULL, 0, '2023-01-06 17:50:41', 1, '2023-09-12 07:52:13', 1, 0);
INSERT INTO `dic_value` VALUES (17, 8, '17', 'shell', NULL, NULL, 0, '2023-01-31 09:17:27', 1, '2023-09-12 07:52:13', 1, 0);
INSERT INTO `dic_value` VALUES (18, 8, '18', 'bat', NULL, NULL, 0, '2023-01-31 09:17:35', 1, '2023-09-12 07:52:13', 1, 0);
INSERT INTO `dic_value` VALUES (19, 3, '19', '自定义', NULL, '自定义插件 可修改', 0, '2023-01-31 09:23:30', 1, '2023-09-12 07:52:13', 1, 0);
INSERT INTO `dic_value` VALUES (20, 9, '20', '文件', NULL, NULL, 0, '2023-01-31 10:24:05', 1, '2023-09-12 07:52:13', 1, 0);
INSERT INTO `dic_value` VALUES (21, 9, '21', '下拉多选框', NULL, NULL, 0, '2023-01-31 10:24:14', 1, '2023-09-12 07:52:13', 1, 0);
INSERT INTO `dic_value` VALUES (22, 9, '22', '下拉单选', NULL, NULL, 0, '2023-01-31 10:24:22', 1, '2023-09-12 07:52:13', 1, 0);
INSERT INTO `dic_value` VALUES (23, 9, '23', '文本域', NULL, NULL, 0, '2023-01-31 10:24:31', 1, '2023-09-12 07:52:13', 1, 0);
INSERT INTO `dic_value` VALUES (24, 9, '24', '密码文本框', NULL, NULL, 0, '2023-01-31 10:24:40', 1, '2023-09-12 07:52:13', 1, 0);
INSERT INTO `dic_value` VALUES (25, 9, '25', '文本框', NULL, NULL, 0, '2023-01-31 10:24:49', 1, '2023-09-12 07:52:13', 1, 0);
INSERT INTO `dic_value` VALUES (26, 9, '26', '账号', NULL, NULL, 0, '2023-01-31 10:24:57', 1, '2023-09-12 07:52:13', 1, 0);
INSERT INTO `dic_value` VALUES (27, 4, '27', '构建成功', NULL, NULL, 0, '2023-02-02 11:22:26', 1, '2023-09-12 07:52:13', 1, 0);
INSERT INTO `dic_value` VALUES (28, 4, '28', '构建失败', NULL, NULL, 0, '2023-02-02 11:22:36', 1, '2023-09-12 07:52:13', 1, 0);
INSERT INTO `dic_value` VALUES (29, 4, '29', '错误-跳过', NULL, NULL, 0, '2023-02-20 15:42:23', 1, '2023-09-12 07:52:13', 1, 0);
INSERT INTO `dic_value` VALUES (30, 4, '30', '强制终止', NULL, NULL, 0, '2023-02-21 18:58:36', 1, '2023-09-12 07:52:13', 1, 0);
INSERT INTO `dic_value` VALUES (31, 12, '31', '开始', NULL, '开始节点', 0, '2023-03-25 10:25:44', 1, '2023-09-12 07:52:13', 1, 0);
INSERT INTO `dic_value` VALUES (32, 12, '32', '结束', NULL, '结束节点', 0, '2023-03-25 10:26:07', 1, '2023-09-12 07:52:13', 1, 0);
INSERT INTO `dic_value` VALUES (33, 12, '33', '审批', NULL, '审批节点', 0, '2023-03-25 10:26:26', 1, '2023-09-12 07:52:13', 1, 0);
INSERT INTO `dic_value` VALUES (34, 12, '34', '流水线', NULL, '流水线节点', 0, '2023-03-25 10:26:54', 1, '2023-09-12 07:52:13', 1, 0);
INSERT INTO `dic_value` VALUES (35, 12, '35', '判断', NULL, '判断节点', 0, '2023-03-25 10:27:19', 1, '2023-09-12 07:52:14', 1, 0);
INSERT INTO `dic_value` VALUES (36, 12, '36', '连接线', NULL, '连接线', 0, '2023-03-26 12:24:08', 1, '2023-09-12 07:52:14', 1, 0);
INSERT INTO `dic_value` VALUES (37, 13, '1', '审批中', '#78b9da', NULL, 0, '2023-05-23 10:15:34', 1, '2024-07-12 08:49:19', 1, 0);
INSERT INTO `dic_value` VALUES (38, 13, '2', '拒绝', '#d94561', NULL, 0, '2023-05-23 10:16:06', 1, '2024-07-12 08:49:37', 1, 0);
INSERT INTO `dic_value` VALUES (39, 13, '3', '同意', '#43b66b', NULL, 0, '2023-05-23 10:16:16', 1, '2024-07-12 08:50:02', 1, 0);
INSERT INTO `dic_value` VALUES (40, 13, '4', '撤回', '#999191', NULL, 0, '2023-05-23 10:19:44', 1, '2024-07-12 08:50:06', 1, 0);
INSERT INTO `dic_value` VALUES (41, 2, '41', '部署类型', NULL, NULL, 0, '2023-07-07 17:49:33', 1, '2023-09-12 07:52:14', 1, 0);
INSERT INTO `dic_value` VALUES (45, 15, '0', '目录', '#a5d886', '菜单目录', 0, '2023-11-24 09:14:01', 1, '2023-11-24 09:15:11', 1, 0);
INSERT INTO `dic_value` VALUES (46, 15, '1', '菜单', '#9ae0d4', '菜单', 0, '2023-11-24 09:14:13', 1, '2023-11-24 09:15:11', 1, 0);
INSERT INTO `dic_value` VALUES (47, 15, '2', '按钮', '#4d7ec2', '按钮 一般做权限使用', 0, '2023-11-24 09:14:27', 1, '2023-11-24 09:15:11', 1, 0);
INSERT INTO `dic_value` VALUES (48, 15, '3', '独立页面', '#9a8181', '单独的页面', 0, '2023-11-24 09:14:42', 1, '2023-11-29 07:51:53', 1, 0);
INSERT INTO `dic_value` VALUES (49, 16, '0', '开放', '#A5D886', NULL, 0, '2024-01-04 08:41:03', 1, '2024-01-04 08:41:03', 1, 0);
INSERT INTO `dic_value` VALUES (50, 16, '1', '登录的用户可获取	', '#93c4c5', NULL, 0, '2024-01-04 08:41:29', 1, '2024-01-04 08:41:29', 1, 0);
INSERT INTO `dic_value` VALUES (51, 16, '2', '只可后端服务代码使用', '#47a7db', NULL, 0, '2024-01-04 08:41:54', 1, '2024-01-04 08:41:54', 1, 0);
INSERT INTO `dic_value` VALUES (52, 17, '0', '否', '#98d886', NULL, 0, '2024-01-04 11:56:34', 1, '2024-01-04 11:57:37', 1, 0);
INSERT INTO `dic_value` VALUES (53, 17, '1', '是', '#86b8d8', NULL, 0, '2024-01-04 11:56:47', 1, '2024-01-04 11:57:44', 1, 0);
INSERT INTO `dic_value` VALUES (54, 18, '0', 'Mysql', '#A5D886', NULL, 0, '2024-01-06 17:17:03', 1, '2024-01-06 17:17:55', 1, 0);
INSERT INTO `dic_value` VALUES (55, 18, '1', 'PostgreSQL', '#A5D886', NULL, 0, '2024-01-06 17:17:48', 1, '2024-01-06 17:17:48', 1, 0);
INSERT INTO `dic_value` VALUES (58, 19, 'bigint', 'bigint', '#d3e7c6', NULL, 0, '2024-01-06 17:17:48', 1, '2024-06-21 16:39:31', 1, 0);
INSERT INTO `dic_value` VALUES (59, 19, 'binary', 'binary', '#A5D886', NULL, 0, '2024-01-06 17:17:48', 1, '2024-02-28 18:59:20', 1, 0);
INSERT INTO `dic_value` VALUES (60, 19, 'bit', 'bit', '#A5D886', NULL, 0, '2024-01-06 17:17:48', 1, '2024-02-28 18:59:20', 1, 0);
INSERT INTO `dic_value` VALUES (61, 19, 'blob', 'blob', '#A5D886', NULL, 0, '2024-01-06 17:17:48', 1, '2024-02-28 18:59:20', 1, 0);
INSERT INTO `dic_value` VALUES (62, 19, 'char', 'char', '#A5D886', NULL, 0, '2024-01-06 17:17:48', 1, '2024-02-28 18:59:20', 1, 0);
INSERT INTO `dic_value` VALUES (63, 19, 'date', 'date', '#A5D886', NULL, 0, '2024-01-06 17:17:48', 1, '2024-02-28 18:59:20', 1, 0);
INSERT INTO `dic_value` VALUES (64, 19, 'datetime', 'datetime', '#A5D886', NULL, 0, '2024-01-06 17:17:48', 1, '2024-02-28 18:59:20', 1, 0);
INSERT INTO `dic_value` VALUES (65, 19, 'decimal', 'decimal', '#A5D886', NULL, 0, '2024-01-06 17:17:48', 1, '2024-02-28 18:59:20', 1, 0);
INSERT INTO `dic_value` VALUES (66, 19, 'double', 'double', '#A5D886', NULL, 0, '2024-01-06 17:17:48', 1, '2024-02-28 18:59:20', 1, 0);
INSERT INTO `dic_value` VALUES (67, 19, 'enum', 'enum', '#A5D886', NULL, 0, '2024-01-06 17:17:48', 1, '2024-02-28 18:59:20', 1, 0);
INSERT INTO `dic_value` VALUES (68, 19, 'float', 'float', '#A5D886', NULL, 0, '2024-01-06 17:17:48', 1, '2024-02-28 18:59:20', 1, 0);
INSERT INTO `dic_value` VALUES (69, 19, 'geometry', 'geometry', '#A5D886', NULL, 0, '2024-01-06 17:17:48', 1, '2024-02-28 18:59:20', 1, 0);
INSERT INTO `dic_value` VALUES (70, 19, 'geometrycollection', 'geometrycollection', '#A5D886', NULL, 0, '2024-01-06 17:17:48', 1, '2024-02-28 18:59:20', 1, 0);
INSERT INTO `dic_value` VALUES (71, 19, 'int', 'int', '#A5D886', NULL, 0, '2024-01-06 17:17:48', 1, '2024-02-28 18:59:20', 1, 0);
INSERT INTO `dic_value` VALUES (72, 19, 'integer', 'integer', '#A5D886', NULL, 0, '2024-01-06 17:17:48', 1, '2024-02-28 18:59:20', 1, 0);
INSERT INTO `dic_value` VALUES (73, 19, 'json', 'json', '#A5D886', NULL, 0, '2024-01-06 17:17:48', 1, '2024-02-28 18:59:20', 1, 0);
INSERT INTO `dic_value` VALUES (74, 19, 'linestring', 'linestring', '#A5D886', NULL, 0, '2024-01-06 17:17:48', 1, '2024-02-28 18:59:20', 1, 0);
INSERT INTO `dic_value` VALUES (75, 19, 'longblob', 'longblob', '#A5D886', NULL, 0, '2024-01-06 17:17:48', 1, '2024-02-28 18:59:20', 1, 0);
INSERT INTO `dic_value` VALUES (76, 19, 'longtext', 'longtext', '#A5D886', NULL, 0, '2024-01-06 17:17:48', 1, '2024-02-28 18:59:20', 1, 0);
INSERT INTO `dic_value` VALUES (77, 19, 'mediumblob', 'mediumblob', '#A5D886', NULL, 0, '2024-01-06 17:17:48', 1, '2024-02-28 18:59:20', 1, 0);
INSERT INTO `dic_value` VALUES (78, 19, 'mediumint', 'mediumint', '#A5D886', NULL, 0, '2024-01-06 17:17:48', 1, '2024-02-28 18:59:20', 1, 0);
INSERT INTO `dic_value` VALUES (79, 19, 'mediumtext', 'mediumtext', '#A5D886', NULL, 0, '2024-01-06 17:17:48', 1, '2024-02-28 18:59:20', 1, 0);
INSERT INTO `dic_value` VALUES (80, 19, 'multilinestring', 'multilinestring', '#A5D886', NULL, 0, '2024-01-06 17:17:48', 1, '2024-02-28 18:59:20', 1, 0);
INSERT INTO `dic_value` VALUES (81, 19, 'multipoint', 'multipoint', '#A5D886', NULL, 0, '2024-01-06 17:17:48', 1, '2024-02-28 18:59:20', 1, 0);
INSERT INTO `dic_value` VALUES (82, 19, 'multipolygon', 'multipolygon', '#A5D886', NULL, 0, '2024-01-06 17:17:48', 1, '2024-02-28 18:59:20', 1, 0);
INSERT INTO `dic_value` VALUES (83, 19, 'numeric', 'numeric', '#A5D886', NULL, 0, '2024-01-06 17:17:48', 1, '2024-02-28 18:59:20', 1, 0);
INSERT INTO `dic_value` VALUES (84, 19, 'point', 'point', '#A5D886', NULL, 0, '2024-01-06 17:17:48', 1, '2024-02-28 18:59:20', 1, 0);
INSERT INTO `dic_value` VALUES (85, 19, 'polygon', 'polygon', '#A5D886', NULL, 0, '2024-01-06 17:17:48', 1, '2024-02-28 18:59:20', 1, 0);
INSERT INTO `dic_value` VALUES (86, 19, 'real', 'real', '#A5D886', NULL, 0, '2024-01-06 17:17:48', 1, '2024-02-28 18:59:20', 1, 0);
INSERT INTO `dic_value` VALUES (87, 19, 'set', 'set', '#A5D886', NULL, 0, '2024-01-06 17:17:48', 1, '2024-02-28 18:59:20', 1, 0);
INSERT INTO `dic_value` VALUES (88, 19, 'smallint', 'smallint', '#A5D886', NULL, 0, '2024-01-06 17:17:48', 1, '2024-02-28 18:59:20', 1, 0);
INSERT INTO `dic_value` VALUES (89, 19, 'text', 'text', '#A5D886', NULL, 0, '2024-01-06 17:17:48', 1, '2024-02-28 18:59:20', 1, 0);
INSERT INTO `dic_value` VALUES (90, 19, 'time', 'time', '#A5D886', NULL, 0, '2024-01-06 17:17:48', 1, '2024-02-28 18:59:20', 1, 0);
INSERT INTO `dic_value` VALUES (91, 19, 'timestamp', 'timestamp', '#A5D886', NULL, 0, '2024-01-06 17:17:48', 1, '2024-02-28 18:59:20', 1, 0);
INSERT INTO `dic_value` VALUES (92, 19, 'tinyblob', 'tinyblob', '#A5D886', NULL, 0, '2024-01-06 17:17:48', 1, '2024-02-28 18:59:20', 1, 0);
INSERT INTO `dic_value` VALUES (93, 19, 'tinyint', 'tinyint', '#A5D886', NULL, 0, '2024-01-06 17:17:48', 1, '2024-02-28 18:59:20', 1, 0);
INSERT INTO `dic_value` VALUES (94, 19, 'tinytext', 'tinytext', '#A5D886', NULL, 0, '2024-01-06 17:17:48', 1, '2024-02-28 18:59:20', 1, 0);
INSERT INTO `dic_value` VALUES (95, 19, 'varbinary', 'varbinary', '#A5D886', NULL, 0, '2024-01-06 17:17:48', 1, '2024-02-28 18:59:20', 1, 0);
INSERT INTO `dic_value` VALUES (96, 19, 'varchar', 'varchar', '#A5D886', NULL, 0, '2024-01-06 17:17:48', 1, '2024-02-28 18:59:20', 1, 0);
INSERT INTO `dic_value` VALUES (97, 19, 'year', 'year', '#A5D886', NULL, 0, '2024-01-06 17:17:48', 1, '2024-02-28 18:59:20', 1, 0);
INSERT INTO `dic_value` VALUES (98, 20, 'FULLTEXT', 'FULLTEXT', '#A5D886', NULL, 0, '2024-01-31 16:12:16', 1, '2024-02-01 18:18:32', 1, 0);
INSERT INTO `dic_value` VALUES (99, 20, 'NORMAL', 'NORMAL', '#A5D886', NULL, 0, '2024-01-31 16:12:30', 1, '2024-02-01 18:18:37', 1, 0);
INSERT INTO `dic_value` VALUES (100, 20, 'SPATIAL', 'SPATIAL', '#A5D886', NULL, 0, '2024-01-31 16:12:39', 1, '2024-02-01 18:18:41', 1, 0);
INSERT INTO `dic_value` VALUES (101, 20, 'UNIQUE', 'UNIQUE', '#A5D886', NULL, 0, '2024-01-31 16:12:47', 1, '2024-02-01 18:18:45', 1, 0);
INSERT INTO `dic_value` VALUES (102, 21, 'BTREE', 'BTREE', '#A5D886', NULL, 0, '2024-01-31 16:13:05', 1, '2024-02-01 18:18:17', 1, 0);
INSERT INTO `dic_value` VALUES (103, 21, 'HASH', 'HASH', '#A5D886', NULL, 0, '2024-01-31 16:13:15', 1, '2024-02-01 18:18:23', 1, 0);
INSERT INTO `dic_value` VALUES (105, 21, '12', '1', '#A5D886', '2', 0, '2024-01-31 19:31:21', 1, '2024-02-01 18:18:04', 1, 105);
INSERT INTO `dic_value` VALUES (106, 22, 'ARCHIVE', 'ARCHIVE', '#A5D886', NULL, 0, '2024-03-07 10:26:15', 1, '2024-03-07 10:26:15', 1, 0);
INSERT INTO `dic_value` VALUES (107, 22, 'BLACKHOLE', 'BLACKHOLE', '#A5D886', 'BLACKHOLE', 0, '2024-03-07 10:26:23', 1, '2024-03-07 10:26:23', 1, 0);
INSERT INTO `dic_value` VALUES (108, 22, 'CSV', 'CSV', '#A5D886', NULL, 0, '2024-03-07 10:26:28', 1, '2024-03-07 10:26:28', 1, 0);
INSERT INTO `dic_value` VALUES (109, 22, 'InnoDB', 'InnoDB', '#A5D886', NULL, 0, '2024-03-07 10:26:34', 1, '2024-03-07 10:26:34', 1, 0);
INSERT INTO `dic_value` VALUES (110, 22, 'MEMORY', 'MEMORY', '#A5D886', NULL, 0, '2024-03-07 10:26:39', 1, '2024-03-07 10:26:39', 1, 0);
INSERT INTO `dic_value` VALUES (111, 22, 'MRG MYISAM', 'MRG MYISAM', '#A5D886', NULL, 0, '2024-03-07 10:26:45', 1, '2024-03-07 10:26:45', 1, 0);
INSERT INTO `dic_value` VALUES (112, 22, 'MyISAM', 'MyISAM', '#A5D886', NULL, 0, '2024-03-07 10:26:51', 1, '2024-03-07 10:26:51', 1, 0);
INSERT INTO `dic_value` VALUES (113, 22, 'PERFORMANCE SCHEMA', 'PERFORMANCE SCHEMA', '#A5D886', NULL, 0, '2024-03-07 10:26:57', 1, '2024-03-07 10:26:57', 1, 0);
INSERT INTO `dic_value` VALUES (114, 23, '0', '待进行', '#d8b486', NULL, 0, '2024-07-12 13:50:39', 1, '2024-07-12 13:50:52', 1, 0);
INSERT INTO `dic_value` VALUES (115, 23, '1', '进行中', '#86afd8', NULL, 0, '2024-07-12 13:51:08', 1, '2024-07-12 13:51:08', 1, 0);
INSERT INTO `dic_value` VALUES (116, 23, '2', '已通过', '#A5D886', NULL, 0, '2024-07-12 13:51:19', 1, '2024-07-12 13:51:19', 1, 0);
INSERT INTO `dic_value` VALUES (117, 23, '3', '已拒绝', '#e4698b', NULL, 0, '2024-07-12 13:51:32', 1, '2024-07-12 13:51:32', 1, 0);
INSERT INTO `dic_value` VALUES (118, 23, '4', '已抄送', '#A5D886', NULL, 0, '2024-07-18 17:07:21', 1, '2024-07-18 17:07:21', 1, 0);
INSERT INTO `dic_value` VALUES (119, 23, '5', '任一通过被忽视', 'rgb(158,230,114)', '节点的审批类型是 任一通过', 0, '2024-08-25 20:45:02', 1, '2024-08-25 20:45:02', 1, 0);
INSERT INTO `dic_value` VALUES (120, 24, '0', '软件', '#A5D886', NULL, 0, '2024-09-13 08:54:19', 1, '2024-09-13 08:54:19', 1, 0);
INSERT INTO `dic_value` VALUES (121, 24, '1', '硬件', '#A5D886', NULL, 0, '2024-09-13 08:54:27', 1, '2024-09-13 08:54:27', 1, 0);
INSERT INTO `dic_value` VALUES (122, 25, '1', '任务', 'rgb(134,157,216)', NULL, 0, '2024-10-09 11:17:16', 1, '2024-10-09 11:17:16', 1, 0);
INSERT INTO `dic_value` VALUES (123, 25, '2', 'bug', 'rgb(226,80,83)', NULL, 0, '2024-10-09 11:17:38', 1, '2024-10-09 11:17:38', 1, 0);
INSERT INTO `dic_value` VALUES (124, 26, 'qwq-32b-preview', '通义千问-QwQ-32B-Preview', '#A5D886', NULL, 0, '2024-12-06 09:19:53', 1, '2024-12-06 09:19:53', 1, 0);
INSERT INTO `dic_value` VALUES (125, 26, 'qwen-max', '通义千问-Max', '#A5D886', NULL, 0, '2024-12-06 09:20:18', 1, '2024-12-06 09:20:18', 1, 0);
INSERT INTO `dic_value` VALUES (126, 26, 'qwen-plus', '通义千问-Plus', '#A5D886', NULL, 0, '2024-12-06 09:20:40', 1, '2024-12-06 09:20:40', 1, 0);
INSERT INTO `dic_value` VALUES (127, 27, 'qwen-max', '通义千问-Max', '#A5D886', NULL, 0, '2024-12-06 09:20:18', 1, '2024-12-06 09:20:18', 1, 0);
INSERT INTO `dic_value` VALUES (128, 27, 'qwen-plus', '通义千问-Plus', '#A5D886', NULL, 0, '2024-12-06 09:20:40', 1, '2024-12-06 09:20:40', 1, 0);
INSERT INTO `dic_value` VALUES (129, 27, 'qwq-32b-preview', '通义千问-QwQ-32B-Preview', '#A5D886', NULL, 0, '2024-12-06 09:19:53', 1, '2024-12-06 09:19:53', 1, 0);

-- ----------------------------
-- Table structure for do_log
-- ----------------------------
DROP TABLE IF EXISTS `do_log`;
CREATE TABLE `do_log`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `path` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '请求路径',
  `method` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '方法类型',
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL COMMENT '内容',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `create_by` bigint UNSIGNED NOT NULL COMMENT '创建人id',
  `type` int UNSIGNED NULL DEFAULT 0 COMMENT '类型',
  `referer` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT 'referer',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 80 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '操作日志;' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of do_log
-- ----------------------------

-- ----------------------------
-- Table structure for doc
-- ----------------------------
DROP TABLE IF EXISTS `doc`;
CREATE TABLE `doc`  (
  `doc_id` bigint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '文档id',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `remarks` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '备注',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `create_by` bigint NOT NULL COMMENT '创建人id',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `update_by` bigint NOT NULL COMMENT '更新人',
  `delete_flag` int UNSIGNED NOT NULL DEFAULT 0 COMMENT '删除 0不删除 1删除',
  PRIMARY KEY (`doc_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '文档' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of doc
-- ----------------------------

-- ----------------------------
-- Table structure for doc_tree
-- ----------------------------
DROP TABLE IF EXISTS `doc_tree`;
CREATE TABLE `doc_tree`  (
  `doc_tree_id` bigint NOT NULL AUTO_INCREMENT COMMENT '文档树id',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '名称',
  `doc_id` bigint NOT NULL COMMENT '文档id',
  `parent_id` bigint NOT NULL COMMENT '父级id',
  `parent_path` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '父级路径 ,1,2,',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `create_by` bigint NOT NULL COMMENT '创建人id',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `update_by` bigint NOT NULL COMMENT '更新人',
  `sort` int NOT NULL DEFAULT 0 COMMENT '排序 小到大',
  `delete_flag` int UNSIGNED NOT NULL DEFAULT 0 COMMENT '删除 0不删除 1删除',
  `type` int NOT NULL COMMENT '0文档 1excel',
  PRIMARY KEY (`doc_tree_id`) USING BTREE,
  INDEX `doc_tree_1`(`parent_id` ASC) USING BTREE,
  INDEX `doc_tree_2`(`doc_id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 75 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '文档目录' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of doc_tree
-- ----------------------------

-- ----------------------------
-- Table structure for doc_tree_content
-- ----------------------------
DROP TABLE IF EXISTS `doc_tree_content`;
CREATE TABLE `doc_tree_content`  (
  `doc_tree_id` bigint NOT NULL,
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `create_by` bigint UNSIGNED NOT NULL COMMENT '创建人id',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `update_by` bigint UNSIGNED NOT NULL COMMENT '更新人',
  `delete_flag` int UNSIGNED NOT NULL DEFAULT 0 COMMENT '删除 0不删除 1删除',
  `doc_id` bigint NOT NULL,
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`doc_tree_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '文档树内容' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of doc_tree_content
-- ----------------------------

-- ----------------------------
-- Table structure for file_store
-- ----------------------------
DROP TABLE IF EXISTS `file_store`;
CREATE TABLE `file_store`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '文件id',
  `file_key` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '文件唯一标识',
  `file_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '文件名',
  `file_size` bigint NOT NULL COMMENT '文件大小',
  `mime_type` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '' COMMENT '文件格式',
  `checksum` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '' COMMENT '文件指纹',
  `store_type` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '' COMMENT '存储类型',
  `store_id` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '' COMMENT '存储仓库ID',
  `store_path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '存储路径',
  `create_by` bigint NOT NULL DEFAULT 0 COMMENT '创建人',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `delete_flag` int UNSIGNED NOT NULL DEFAULT 0 COMMENT '删除标记;0:未删除 1:已删除',
  `delete_by` bigint NOT NULL DEFAULT 0 COMMENT '删除人',
  `delete_time` bigint NOT NULL DEFAULT 0 COMMENT '删除时间',
  `suffix` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'other' COMMENT '文件后缀,没有后缀的文件都是 other',
  `biz_type` int NOT NULL DEFAULT 0 COMMENT ' 0:公开   其他数字根据具体的枚举进行类型判断',
  `biz_id` bigint NOT NULL COMMENT '相关的业务id',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 375 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '文件存储' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of file_store
-- ----------------------------

-- ----------------------------
-- Table structure for machine
-- ----------------------------
DROP TABLE IF EXISTS `machine`;
CREATE TABLE `machine`  (
  `machine_id` bigint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `type` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '类型 0linux',
  `create_by` bigint UNSIGNED NOT NULL COMMENT '创建人id',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `update_by` bigint UNSIGNED NOT NULL COMMENT '更新人id',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `delete_flag` int NOT NULL DEFAULT 0,
  `sort` int NOT NULL DEFAULT 0 COMMENT '排序',
  `remarks` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '备注',
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `is_online` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '是否在线 0不在线 1在线',
  `host` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `port` int NOT NULL,
  `init_dir` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`machine_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '机器表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of machine
-- ----------------------------

-- ----------------------------
-- Table structure for machine_task
-- ----------------------------
DROP TABLE IF EXISTS `machine_task`;
CREATE TABLE `machine_task`  (
  `machine_task_id` bigint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `machine_id` bigint NOT NULL COMMENT '机器id',
  `status` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '状态',
  `type` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '类型',
  `create_by` bigint NOT NULL,
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
  `delete_flag` int NOT NULL DEFAULT 0,
  `remote_path` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `local_path` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `local_zip_path` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `error_log` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  `start_time` datetime NULL DEFAULT NULL,
  `end_time` datetime NULL DEFAULT NULL,
  `is_file` int NULL DEFAULT NULL,
  PRIMARY KEY (`machine_task_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 18 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '机器任务表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of machine_task
-- ----------------------------

-- ----------------------------
-- Table structure for md5log
-- ----------------------------
DROP TABLE IF EXISTS `md5log`;
CREATE TABLE `md5log`  (
  `md5log` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`md5log`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of md5log
-- ----------------------------

-- ----------------------------
-- Table structure for message
-- ----------------------------
DROP TABLE IF EXISTS `message`;
CREATE TABLE `message`  (
  `message_id` bigint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `type` varchar(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '类型',
  `status` varchar(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '状态',
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '' COMMENT '标题',
  `msg` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '' COMMENT '消息内容',
  `create_by` bigint UNSIGNED NOT NULL COMMENT '创建人id',
  `remarks` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '备注',
  `biz_id` bigint NOT NULL DEFAULT 0 COMMENT '相关业务id',
  `to_account_id` bigint NOT NULL COMMENT '接收消息人',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `update_by` bigint UNSIGNED NOT NULL COMMENT '更新人id',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `delete_flag` int NOT NULL DEFAULT 0,
  PRIMARY KEY (`message_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '消息表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of message
-- ----------------------------

-- ----------------------------
-- Table structure for module
-- ----------------------------
DROP TABLE IF EXISTS `module`;
CREATE TABLE `module`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '名称',
  `application_id` bigint UNSIGNED NOT NULL,
  `disabled` int UNSIGNED NOT NULL DEFAULT 0 COMMENT '状态0开启 1禁用',
  `parent_id` bigint UNSIGNED NOT NULL DEFAULT 0,
  `icon` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '图标',
  `permission` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '权限标识',
  `component` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '组件',
  `sort` int UNSIGNED NOT NULL DEFAULT 0 COMMENT '排序',
  `route_url` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '路由地址',
  `type` int UNSIGNED NOT NULL COMMENT '0目录 1菜单 2按钮',
  `ext_flag` int NOT NULL DEFAULT 0 COMMENT '是否外链 0非 1是',
  `show_flag` int NOT NULL DEFAULT 0 COMMENT '是否显示 0非 1是',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `create_by` bigint UNSIGNED NOT NULL COMMENT '创建人id',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `update_by` bigint UNSIGNED NOT NULL COMMENT '更新人',
  `delete_flag` int UNSIGNED NOT NULL DEFAULT 0 COMMENT '删除 0不删除 1删除',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 147 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '模块权限;' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of module
-- ----------------------------
INSERT INTO `module` VALUES (1, '角色管理', 1, 0, 2, NULL, 'role', '/system/role/index.tsx', 1, '', 1, 0, 1, '2022-11-14 16:53:55', 1, '2024-06-21 15:21:22', 1, 0);
INSERT INTO `module` VALUES (2, '系统设置', 1, 0, 0, NULL, 'system', '/', 50, NULL, 0, 0, 1, '2022-11-14 18:14:27', 1, '2024-06-21 15:10:13', 1, 0);
INSERT INTO `module` VALUES (3, '管理员管理', 1, 0, 2, NULL, 'account', '/system/account/index.tsx', 0, NULL, 1, 0, 1, '2022-11-14 19:49:36', 1, '2024-08-08 11:06:30', 1, 0);
INSERT INTO `module` VALUES (4, '新增', 1, 0, 3, NULL, 'account:add', '/', 0, NULL, 2, 0, 0, '2022-11-14 20:04:43', 1, '2024-11-30 16:36:58', 1, 4);
INSERT INTO `module` VALUES (5, '编辑', 1, 0, 1, NULL, 'role:edit', '/', 0, NULL, 2, 0, 1, '2022-11-14 20:11:47', 1, '2024-10-24 11:44:39', 1, 0);
INSERT INTO `module` VALUES (6, '操作', 1, 0, 3, NULL, 'account:edit', '/', 0, NULL, 2, 0, 0, '2022-11-15 18:19:15', 1, '2024-11-30 16:37:58', 1, 0);
INSERT INTO `module` VALUES (8, '查询', 1, 0, 3, NULL, 'account:list', '/', 1, NULL, 2, 0, 0, '2022-11-22 17:31:56', 8, '2024-11-30 16:37:43', 1, 0);
INSERT INTO `module` VALUES (9, '删除', 1, 0, 3, NULL, 'account:del', '/', 0, NULL, 2, 0, 0, '2022-11-22 17:57:45', 8, '2024-11-30 16:37:18', 1, 0);
INSERT INTO `module` VALUES (10, '更新', 1, 1, 1, NULL, 'edit', NULL, 1, NULL, 2, 0, 0, '2022-11-22 18:38:50', 8, '2024-06-21 15:08:16', 8, 1);
INSERT INTO `module` VALUES (11, '部门管理', 1, 0, 2, NULL, 'dept', '/system/dept/index.tsx', 1, NULL, 1, 0, 1, '2022-11-22 18:40:29', 8, '2025-02-23 11:08:24', 1, 0);
INSERT INTO `module` VALUES (12, '应用管理', 1, 0, 2, NULL, 'application', '/system/application/index.tsx', 1, NULL, 1, 0, 1, '2022-11-22 18:46:18', 8, '2024-06-21 15:56:40', 1, 0);
INSERT INTO `module` VALUES (13, '菜单管理', 1, 0, 2, NULL, 'menu', '/system/menu/index.tsx', 1, NULL, 1, 0, 1, '2022-11-22 18:55:05', 8, '2024-06-21 15:10:28', 1, 0);
INSERT INTO `module` VALUES (14, '修改密码', 1, 1, 2, NULL, 'system:password', '/demo/system/password/index', 3, NULL, 1, 0, 1, '2022-11-22 18:56:34', 8, '2024-06-21 15:08:16', 1, 14);
INSERT INTO `module` VALUES (15, '欢迎1', 1, 1, 0, NULL, 'welcome', '/welcome/Welcome', 0, NULL, 1, 0, 1, '2022-11-22 18:59:34', 8, '2024-06-21 15:08:16', 1, 15);
INSERT INTO `module` VALUES (16, '个人信息', 1, 0, 2, NULL, 'accountDetail', '/system/accountDetail/index.tsx', 0, NULL, 1, 0, 1, '2022-11-29 16:31:58', 8, '2024-06-21 18:07:39', 1, 0);
INSERT INTO `module` VALUES (17, '外链测试', 1, 1, 0, NULL, NULL, NULL, 100, NULL, 0, 0, 1, '2022-11-29 17:33:35', 8, '2024-06-21 15:08:16', 8, 17);
INSERT INTO `module` VALUES (18, '外部链接内部打开', 1, 1, 17, NULL, '', 'external-link', 1, 'http://192.168.137.222:3100/#/2/13', 1, 0, 1, '2022-11-29 17:35:12', 8, '2024-06-21 15:08:16', 8, 0);
INSERT INTO `module` VALUES (19, '外部链接外部打开', 1, 1, 17, NULL, NULL, 'external-link', 1, 'http://192.168.137.222:3100/#/2/13', 1, 1, 1, '2022-11-29 17:35:50', 8, '2024-06-21 15:08:16', 8, 0);
INSERT INTO `module` VALUES (20, 'CICD', 1, 0, 0, NULL, 'pipelineM', '/', 20, NULL, 0, 0, 1, '2022-12-01 14:54:26', 1, '2024-10-24 11:18:47', 1, 0);
INSERT INTO `module` VALUES (21, '流水线', 1, 0, 20, NULL, 'pipeline', '/pipeline/pipeline/index.tsx', 1, NULL, 1, 0, 1, '2022-12-01 14:57:03', 1, '2024-08-01 20:47:46', 1, 0);
INSERT INTO `module` VALUES (22, '插件', 1, 0, 20, NULL, 'plugin', '/pipeline/plugin/index.tsx', 2, NULL, 1, 0, 1, '2022-12-01 14:57:48', 1, '2024-08-01 20:47:52', 1, 0);
INSERT INTO `module` VALUES (23, '执行机', 1, 0, 20, NULL, 'node', '/pipeline/node/index.tsx', 3, NULL, 1, 0, 1, '2022-12-01 14:59:53', 1, '2024-08-01 20:47:57', 1, 0);
INSERT INTO `module` VALUES (24, '流程', 1, 1, 0, NULL, 'process', '/process', 21, NULL, 0, 0, 1, '2022-12-01 15:04:32', 1, '2024-06-21 15:08:16', 1, 24);
INSERT INTO `module` VALUES (25, '审批列表', 1, 1, 24, NULL, '/Welcome', '/Welcome', 1, NULL, 1, 0, 1, '2022-12-01 15:05:31', 1, '2024-06-21 15:08:16', 1, 25);
INSERT INTO `module` VALUES (26, '流程定义', 1, 1, 24, NULL, '/Welcome', '/Welcome', 2, NULL, 1, 0, 1, '2022-12-01 15:06:25', 1, '2024-06-21 15:08:16', 1, 26);
INSERT INTO `module` VALUES (27, '项目工程', 1, 1, 0, NULL, NULL, NULL, 24, NULL, 0, 0, 1, '2022-12-01 15:10:12', 1, '2024-06-21 15:08:16', 1, 27);
INSERT INTO `module` VALUES (28, '环境管理', 1, 1, 27, NULL, NULL, '/dashboard/analysis/index', 1, NULL, 1, 0, 1, '2022-12-01 15:13:19', 1, '2024-06-21 15:08:16', 1, 28);
INSERT INTO `module` VALUES (29, '项目工程', 1, 1, 27, NULL, NULL, '/dashboard/analysis/index', 2, NULL, 1, 0, 1, '2022-12-01 15:14:05', 1, '2024-06-21 15:08:16', 1, 29);
INSERT INTO `module` VALUES (30, '软件环境', 1, 1, 27, NULL, NULL, '/dashboard/analysis/index', 3, NULL, 1, 0, 1, '2022-12-01 15:14:35', 1, '2024-06-21 15:08:16', 1, 30);
INSERT INTO `module` VALUES (31, '需求', 1, 1, 27, NULL, NULL, '/dashboard/analysis/index', 4, NULL, 1, 0, 1, '2022-12-01 15:14:57', 1, '2024-06-21 15:08:16', 1, 31);
INSERT INTO `module` VALUES (32, 'k8s', 1, 1, 0, NULL, NULL, NULL, 25, NULL, 0, 0, 1, '2022-12-01 15:23:27', 1, '2024-06-21 15:08:16', 1, 32);
INSERT INTO `module` VALUES (33, '集群管理', 1, 1, 32, NULL, NULL, '/dashboard/analysis/index', 1, NULL, 1, 0, 1, '2022-12-01 15:39:14', 1, '2024-06-21 15:08:16', 1, 33);
INSERT INTO `module` VALUES (34, '资源模板', 1, 1, 32, NULL, NULL, '/dashboard/analysis/index', 2, NULL, 1, 0, 1, '2022-12-01 15:41:34', 1, '2024-06-21 15:08:16', 1, 34);
INSERT INTO `module` VALUES (35, '资源管理', 1, 1, 32, NULL, NULL, '/dashboard/analysis/index', 3, NULL, 1, 0, 1, '2022-12-01 15:42:05', 1, '2024-06-21 15:08:16', 1, 35);
INSERT INTO `module` VALUES (36, '发布列表', 1, 1, 27, NULL, NULL, '/dashboard/analysis/index', 5, NULL, 1, 0, 1, '2022-12-01 15:43:10', 1, '2024-06-21 15:08:16', 1, 36);
INSERT INTO `module` VALUES (37, '流水线账号', 1, 1, 20, NULL, 'account', '/pipeline/otherAccount/index.tsx', 4, NULL, 1, 0, 0, '2022-12-01 15:45:07', 1, '2024-12-01 13:15:55', 1, 0);
INSERT INTO `module` VALUES (38, '软件管理', 1, 1, 27, NULL, NULL, '/dashboard/analysis/index', 2, NULL, 1, 0, 1, '2022-12-02 17:41:15', 1, '2024-06-21 15:08:16', 1, 38);
INSERT INTO `module` VALUES (39, '字典管理', 1, 0, 2, NULL, 'dic', '/system/dic/index.tsx', 7, NULL, 1, 0, 1, '2022-12-07 13:57:20', 1, '2024-06-21 15:56:49', 1, 0);
INSERT INTO `module` VALUES (40, '表单定义', 1, 1, 24, NULL, '/Welcome', '/Welcome', 3, NULL, 1, 0, 1, '2022-12-08 17:52:49', 1, '2024-06-21 15:08:16', 1, 40);
INSERT INTO `module` VALUES (41, 'docker镜像列表', 1, 1, 2, NULL, NULL, '/dashboard/analysis/index', 10, '', 1, 1, 1, '2022-12-14 09:08:27', 1, '2024-06-21 15:08:16', 1, 41);
INSERT INTO `module` VALUES (42, '数据备注管理', 1, 1, 20, NULL, 'pipeline:data', '/dashboard/analysis/index', 7, NULL, 1, 0, 1, '2022-12-14 21:15:28', 1, '2024-06-21 15:08:16', 1, 42);
INSERT INTO `module` VALUES (43, '三方存储管理', 1, 1, 2, NULL, NULL, '/dashboard/analysis/index', 11, NULL, 1, 0, 1, '2022-12-14 21:26:26', 1, '2024-06-21 15:08:16', 1, 43);
INSERT INTO `module` VALUES (44, '知识库', 1, 1, 0, NULL, 'knowledge', '/knowledge', 26, NULL, 0, 0, 1, '2023-03-28 08:16:52', 1, '2024-06-21 15:08:16', 1, 44);
INSERT INTO `module` VALUES (45, '文档库', 1, 1, 44, NULL, NULL, '/dashboard/analysis/index', 1, NULL, 1, 0, 1, '2023-03-28 08:20:01', 1, '2024-06-21 15:08:16', 1, 45);
INSERT INTO `module` VALUES (46, '文件库', 1, 1, 44, NULL, NULL, '/dashboard/analysis/index', 2, NULL, 1, 0, 1, '2023-03-28 08:20:38', 1, '2024-06-21 15:08:16', 1, 46);
INSERT INTO `module` VALUES (47, 'test', 1, 1, 0, NULL, 'test', NULL, 101, NULL, 0, 0, 0, '2023-07-09 16:28:53', 1, '2024-06-21 15:08:16', 1, 47);
INSERT INTO `module` VALUES (48, 'test', 1, 1, 0, NULL, 'test', NULL, 12222, NULL, 0, 0, 0, '2023-07-09 16:52:52', 1, '2024-06-21 15:08:16', 1, 48);
INSERT INTO `module` VALUES (49, '订单', 2, 1, 0, NULL, 'order', NULL, 0, NULL, 0, 0, 0, '2023-07-09 17:01:30', 1, '2024-06-21 15:08:16', 1, 0);
INSERT INTO `module` VALUES (50, '商品', 2, 1, 0, NULL, 'goods', NULL, 0, NULL, 0, 0, 0, '2023-07-09 17:06:33', 1, '2024-06-21 15:08:16', 1, 0);
INSERT INTO `module` VALUES (51, '重置密码', 1, 0, 3, NULL, 'account:restPwd', '/', 0, NULL, 2, 0, 0, '2023-07-14 16:43:12', 1, '2024-11-30 16:37:33', 1, 0);
INSERT INTO `module` VALUES (52, '流水线构建列表', 1, 1, 20, NULL, 'pipeline:pipelineBuild', '/pipeline/pipelineBuild', 0, NULL, 1, 0, 0, '2023-08-23 09:01:27', 1, '2024-06-21 15:08:16', 1, 52);
INSERT INTO `module` VALUES (53, '系统参数配置', 1, 0, 2, NULL, 'systemConfig', '/system/systemConfig/index.tsx', 8, NULL, 1, 0, 1, '2023-11-24 09:16:19', 1, '2024-06-21 15:56:52', 1, 0);
INSERT INTO `module` VALUES (54, '构建页面', 1, 1, 0, NULL, 'pipeline:pipelinebuild', '/pipelineBuild', 0, NULL, 3, 0, 0, '2023-11-24 09:22:35', 1, '2024-09-13 08:46:33', 1, 54);
INSERT INTO `module` VALUES (55, '独立页面', 1, 1, 0, NULL, 'alone', '/alone', 0, NULL, 3, 0, 1, '2023-11-24 09:37:01', 1, '2024-09-13 08:46:37', 1, 55);
INSERT INTO `module` VALUES (56, '数据设计', 1, 0, 0, NULL, 'database', '/', 25, NULL, 0, 0, 1, '2024-01-06 12:13:02', 1, '2025-02-12 11:38:03', 1, 0);
INSERT INTO `module` VALUES (57, '数据库', 1, 0, 56, NULL, 'databaseConfig', '/database/databaseConfig/index.tsx', 0, NULL, 1, 0, 1, '2024-01-06 12:15:50', 1, '2024-06-22 09:01:06', 1, 0);
INSERT INTO `module` VALUES (58, '画板', 1, 0, 56, NULL, 'databaseBoard', '/database/databaseBoard/index.tsx', 0, NULL, 1, 0, 1, '2024-01-07 09:15:43', 1, '2024-06-22 09:01:41', 1, 0);
INSERT INTO `module` VALUES (59, '知识库', 1, 0, 0, NULL, 'doc', '/doc/index.tsx', 1, NULL, 1, 0, 1, '2024-05-11 15:20:04', 1, '2024-08-26 19:23:02', 1, 0);
INSERT INTO `module` VALUES (60, 'ceshi', 1, 1, 0, NULL, 'ste', '/testAa', 0, NULL, 1, 0, 1, '2024-05-11 19:24:45', 1, '2024-06-21 15:08:16', 1, 60);
INSERT INTO `module` VALUES (61, '审批', 1, 0, 0, NULL, 'approval', '/', 10, NULL, 0, 0, 1, '2024-06-16 17:32:56', 1, '2024-08-08 15:48:15', 1, 0);
INSERT INTO `module` VALUES (62, '审批设置', 1, 0, 61, NULL, 'approvalSet', '/flow/process/process/index.tsx', 0, NULL, 1, 0, 1, '2024-06-16 17:34:37', 1, '2024-06-22 13:19:38', 1, 0);
INSERT INTO `module` VALUES (63, '我的审批', 1, 0, 61, NULL, 'myProcess', '/flow/process/myProcess/index.tsx', 0, NULL, 1, 0, 1, '2024-07-09 08:30:58', 1, '2024-07-09 08:30:58', 1, 0);
INSERT INTO `module` VALUES (64, '重置大小', 1, 0, 65, NULL, 'test', '/test/resize/index.tsx', 0, NULL, 1, 0, 1, '2024-07-26 10:15:35', 1, '2024-08-06 09:53:27', 1, 0);
INSERT INTO `module` VALUES (65, '测试案例', 1, 1, 0, NULL, 'test', '/', 9, NULL, 0, 0, 1, '2024-08-06 09:53:02', 1, '2025-03-10 11:11:28', 1, 0);
INSERT INTO `module` VALUES (66, 'useMOmo', 1, 0, 65, NULL, 'useMOmo', '/test/useMemo/index.tsx', 0, NULL, 1, 0, 1, '2024-08-06 09:54:08', 1, '2024-08-06 09:54:08', 1, 0);
INSERT INTO `module` VALUES (67, '测试聊天', 1, 0, 65, NULL, 'testChat', '/test/chat/index.tsx', 0, NULL, 1, 0, 1, '2024-08-08 08:30:18', 1, '2024-08-08 08:30:38', 1, 0);
INSERT INTO `module` VALUES (68, '通讯', 1, 0, 0, NULL, 'chat', '/system/chat/index.tsx', 0, NULL, 1, 0, 1, '2024-08-08 15:47:21', 1, '2024-08-08 15:48:01', 1, 0);
INSERT INTO `module` VALUES (69, '视口', 1, 0, 65, NULL, 'observer', '/test/observer/index.tsx', 0, NULL, 1, 0, 1, '2024-08-17 10:16:39', 1, '2024-08-17 10:16:39', 1, 0);
INSERT INTO `module` VALUES (70, '日历', 1, 0, 0, NULL, 'rili', '/rili/index.tsx', 0, NULL, 1, 0, 1, '2024-08-28 18:25:24', 1, '2024-12-20 11:59:15', 1, 0);
INSERT INTO `module` VALUES (71, '表格测试', 1, 0, 65, NULL, 'tableTest', '/test/table/index.tsx', 0, NULL, 1, 0, 1, '2024-08-29 09:02:44', 1, '2024-08-29 09:02:44', 1, 0);
INSERT INTO `module` VALUES (72, '甘特图', 1, 0, 65, NULL, 'gantetu', '/test/gantetu/index.tsx', 0, NULL, 1, 0, 1, '2024-09-06 20:12:11', 1, '2024-09-06 20:12:11', 1, 0);
INSERT INTO `module` VALUES (73, '任务', 1, 0, 0, NULL, 'task', '/task/index.tsx', 0, NULL, 1, 0, 1, '2024-09-08 11:31:47', 1, '2024-09-08 11:31:47', 1, 0);
INSERT INTO `module` VALUES (74, '表单', 1, 0, 65, NULL, 'form', '/test/form/index.tsx', 0, NULL, 1, 0, 1, '2024-09-09 08:45:15', 1, '2024-09-10 08:35:33', 1, 0);
INSERT INTO `module` VALUES (75, '项目', 1, 0, 0, NULL, 'projectM', '/', 0, NULL, 0, 0, 1, '2024-09-13 08:45:54', 1, '2024-10-22 08:41:57', 1, 0);
INSERT INTO `module` VALUES (76, '项目', 1, 0, 75, NULL, 'project', '/project/project/index.tsx', 0, NULL, 1, 0, 1, '2024-09-13 08:48:18', 1, '2024-09-13 08:48:18', 1, 0);
INSERT INTO `module` VALUES (77, 'issues', 1, 0, 75, NULL, 'issues', '/project/issues/index.tsx', 3, NULL, 1, 0, 1, '2024-10-09 09:09:50', 1, '2024-10-09 13:18:03', 1, 0);
INSERT INTO `module` VALUES (78, '版本', 1, 0, 75, NULL, 'release', '/project/release/index.tsx', 1, NULL, 1, 0, 1, '2024-10-09 13:17:54', 1, '2024-10-09 13:18:43', 1, 0);
INSERT INTO `module` VALUES (79, '工时', 1, 0, 75, NULL, 'worklog', '/project/workLog/index.tsx', 0, NULL, 1, 0, 1, '2024-10-15 10:44:39', 1, '2024-10-22 16:32:23', 1, 0);
INSERT INTO `module` VALUES (80, '查看其他人的权限', 1, 0, 79, NULL, 'worklog:selectOther', '/', 0, NULL, 2, 0, 1, '2024-10-15 17:07:39', 1, '2024-10-15 17:07:39', 1, 0);
INSERT INTO `module` VALUES (81, '编辑', 1, 0, 76, NULL, 'project:edit', '/', 0, NULL, 2, 0, 1, '2024-10-22 08:39:09', 1, '2024-10-22 08:42:12', 1, 0);
INSERT INTO `module` VALUES (82, '删除', 1, 0, 76, NULL, 'project:del', '/', 0, NULL, 2, 0, 1, '2024-10-22 08:42:36', 1, '2024-10-22 08:42:36', 1, 0);
INSERT INTO `module` VALUES (83, '人员', 1, 0, 76, NULL, 'project:permission', '/', 0, NULL, 2, 0, 1, '2024-10-22 08:43:22', 1, '2024-10-22 08:43:22', 1, 0);
INSERT INTO `module` VALUES (84, '查询', 1, 0, 76, NULL, 'project:list', '/', 0, NULL, 2, 0, 1, '2024-10-22 14:36:55', 1, '2024-10-22 14:36:55', 1, 0);
INSERT INTO `module` VALUES (85, '定义表单', 1, 0, 76, NULL, 'project:form', '/', 0, NULL, 2, 0, 1, '2024-10-22 14:38:35', 1, '2024-10-22 14:38:35', 1, 0);
INSERT INTO `module` VALUES (86, '查询', 1, 0, 79, NULL, 'worklog:list', '/', 0, NULL, 2, 0, 1, '2024-10-22 16:32:13', 1, '2024-10-22 16:32:13', 1, 0);
INSERT INTO `module` VALUES (87, '编辑', 1, 0, 79, NULL, 'worklog:edit', '/', 0, NULL, 2, 0, 1, '2024-10-22 19:42:24', 1, '2025-01-02 18:25:45', 1, 87);
INSERT INTO `module` VALUES (88, '查询', 1, 0, 78, NULL, 'release:list', '/', 0, NULL, 2, 0, 1, '2024-10-24 10:45:50', 1, '2024-10-24 10:45:50', 1, 0);
INSERT INTO `module` VALUES (89, '编辑', 1, 0, 78, NULL, 'release:edit', '/', 0, NULL, 2, 0, 1, '2024-10-24 10:49:30', 1, '2024-10-24 10:49:42', 1, 0);
INSERT INTO `module` VALUES (90, '删除', 1, 0, 78, NULL, 'release:del', '/', 0, NULL, 2, 0, 1, '2024-10-24 10:50:29', 1, '2025-01-02 18:28:57', 1, 90);
INSERT INTO `module` VALUES (91, '定义表单', 1, 0, 78, NULL, 'release:form', '/', 0, NULL, 2, 0, 1, '2024-10-24 10:51:27', 1, '2024-10-24 10:51:37', 1, 0);
INSERT INTO `module` VALUES (92, '查询', 1, 0, 77, NULL, 'issue:list', '/', 0, NULL, 2, 0, 1, '2024-10-24 10:52:48', 1, '2025-01-03 09:40:37', 1, 92);
INSERT INTO `module` VALUES (93, '编辑', 1, 0, 77, NULL, 'issue:edit', '/', 0, NULL, 2, 0, 1, '2024-10-24 10:53:07', 1, '2025-01-03 09:41:12', 1, 93);
INSERT INTO `module` VALUES (94, '删除', 1, 0, 77, NULL, 'issue:del', '/', 0, NULL, 2, 0, 1, '2024-10-24 10:53:29', 1, '2025-01-03 09:41:10', 1, 94);
INSERT INTO `module` VALUES (95, '定义表单', 1, 0, 77, NULL, 'issue:form', '/', 0, NULL, 2, 0, 1, '2024-10-24 10:54:03', 1, '2024-10-24 10:54:03', 1, 0);
INSERT INTO `module` VALUES (96, '查询', 1, 0, 59, NULL, 'doc:list', '/', 0, NULL, 2, 0, 1, '2024-10-24 10:55:29', 1, '2024-10-24 10:55:29', 1, 0);
INSERT INTO `module` VALUES (97, '管理员设置', 1, 0, 59, NULL, 'doc:admin:setting', '/', 0, NULL, 2, 0, 1, '2024-10-24 11:01:11', 1, '2024-10-24 11:01:11', 1, 0);
INSERT INTO `module` VALUES (98, '编辑', 1, 0, 59, NULL, 'doc:edit', '/', 0, NULL, 2, 0, 1, '2024-10-24 11:01:41', 1, '2024-10-24 11:01:41', 1, 0);
INSERT INTO `module` VALUES (99, '删除', 1, 0, 59, NULL, 'doc:del', '/', 0, NULL, 2, 0, 1, '2024-10-24 11:03:35', 1, '2024-10-24 11:03:35', 1, 0);
INSERT INTO `module` VALUES (100, '查询', 1, 0, 62, NULL, 'approvalSet:list', '/', 0, NULL, 2, 0, 1, '2024-10-24 11:07:31', 1, '2024-10-24 11:07:31', 1, 0);
INSERT INTO `module` VALUES (101, '编辑', 1, 0, 62, NULL, 'approvalSet:edit', '/', 0, NULL, 2, 0, 1, '2024-10-24 11:07:47', 1, '2024-10-24 11:07:47', 1, 0);
INSERT INTO `module` VALUES (102, '删除', 1, 0, 62, NULL, 'approvalSet:del', '/', 0, NULL, 2, 0, 1, '2024-10-24 11:07:57', 1, '2024-10-24 11:07:57', 1, 0);
INSERT INTO `module` VALUES (103, '查询', 1, 0, 21, NULL, 'pipeline:list', '/', 0, NULL, 2, 0, 1, '2024-10-24 11:18:35', 1, '2024-10-24 11:18:35', 1, 0);
INSERT INTO `module` VALUES (104, '新建', 1, 0, 21, NULL, 'pipeline:add', '/', 0, NULL, 2, 0, 1, '2024-10-24 11:19:31', 1, '2024-10-24 11:19:31', 1, 0);
INSERT INTO `module` VALUES (105, '查询', 1, 0, 22, NULL, 'plugin:list', '/', 0, NULL, 2, 0, 1, '2024-10-24 11:21:44', 1, '2024-10-24 11:21:44', 1, 0);
INSERT INTO `module` VALUES (106, '编辑', 1, 0, 22, NULL, 'plugin:edit', '/', 0, NULL, 2, 0, 1, '2024-10-24 11:22:03', 1, '2024-10-24 11:22:03', 1, 0);
INSERT INTO `module` VALUES (107, '删除', 1, 0, 22, NULL, 'plugin:del', '/', 0, NULL, 2, 0, 1, '2024-10-24 11:22:16', 1, '2024-10-24 11:22:16', 1, 0);
INSERT INTO `module` VALUES (108, '查询', 1, 0, 23, NULL, 'node:list', '/', 0, NULL, 2, 0, 1, '2024-10-24 11:23:24', 1, '2024-10-24 11:23:24', 1, 0);
INSERT INTO `module` VALUES (109, '编辑', 1, 0, 23, NULL, 'node:edit', '/', 0, NULL, 2, 0, 1, '2024-10-24 11:23:41', 1, '2024-10-24 11:23:41', 1, 0);
INSERT INTO `module` VALUES (110, '删除', 1, 0, 23, NULL, 'node:del', '/', 0, NULL, 2, 0, 1, '2024-10-24 11:23:54', 1, '2024-10-24 11:23:54', 1, 0);
INSERT INTO `module` VALUES (111, '查询', 1, 0, 57, NULL, 'databaseConfig:list', '/', 0, NULL, 2, 0, 1, '2024-10-24 11:25:30', 1, '2024-10-24 11:25:30', 1, 0);
INSERT INTO `module` VALUES (112, '编辑', 1, 0, 57, NULL, 'databaseConfig:edit', '/', 0, NULL, 2, 0, 1, '2024-10-24 11:25:47', 1, '2024-10-24 11:25:47', 1, 0);
INSERT INTO `module` VALUES (113, '删除', 1, 0, 57, NULL, 'databaseConfig:del', '/', 0, NULL, 2, 0, 1, '2024-10-24 11:25:59', 1, '2024-10-24 11:25:59', 1, 0);
INSERT INTO `module` VALUES (114, '查询', 1, 0, 58, NULL, 'databaseBoard:list', '/', 0, NULL, 2, 0, 1, '2024-10-24 11:26:40', 1, '2024-10-24 11:26:40', 1, 0);
INSERT INTO `module` VALUES (115, '操作', 1, 0, 58, NULL, 'databaseBoard:edit', '/', 0, NULL, 2, 0, 1, '2024-10-24 11:27:02', 1, '2024-12-01 10:46:24', 1, 0);
INSERT INTO `module` VALUES (116, '查询', 1, 0, 1, NULL, 'role:list', '/', 0, NULL, 2, 0, 1, '2024-10-24 11:44:55', 1, '2024-10-24 11:45:31', 1, 0);
INSERT INTO `module` VALUES (117, '查询', 1, 0, 11, NULL, 'dept:list', '/', 0, NULL, 2, 0, 1, '2024-10-24 11:48:37', 1, '2024-10-24 11:48:37', 1, 0);
INSERT INTO `module` VALUES (118, '编辑', 1, 0, 11, NULL, 'dept:edit', '/', 0, NULL, 2, 0, 1, '2024-10-24 11:48:59', 1, '2024-10-24 11:48:59', 1, 0);
INSERT INTO `module` VALUES (119, '删除', 1, 0, 11, NULL, 'dept:del', '/', 0, NULL, 2, 0, 1, '2024-10-24 11:49:13', 1, '2024-10-24 11:49:13', 1, 0);
INSERT INTO `module` VALUES (120, '查询', 1, 0, 12, NULL, 'application:list', '/', 0, NULL, 2, 0, 1, '2024-10-24 11:51:30', 1, '2024-10-24 11:51:30', 1, 0);
INSERT INTO `module` VALUES (121, '编辑', 1, 0, 12, NULL, 'application:edit', '/', 0, NULL, 2, 0, 1, '2024-10-24 11:51:44', 1, '2024-10-24 11:51:44', 1, 0);
INSERT INTO `module` VALUES (122, '查询', 1, 0, 13, NULL, 'menu:list', '/', 0, NULL, 2, 0, 1, '2024-10-24 11:52:12', 1, '2024-10-24 11:52:12', 1, 0);
INSERT INTO `module` VALUES (123, '编辑', 1, 0, 13, NULL, 'menu:edit', '/', 0, NULL, 2, 0, 1, '2024-10-24 11:52:28', 1, '2024-10-24 11:52:28', 1, 0);
INSERT INTO `module` VALUES (124, '删除', 1, 0, 13, NULL, 'menu:del', '/', 0, NULL, 2, 0, 1, '2024-10-24 11:52:38', 1, '2024-10-24 11:52:38', 1, 0);
INSERT INTO `module` VALUES (125, '查询', 1, 0, 39, NULL, 'dic:list', '/', 0, NULL, 2, 0, 1, '2024-10-24 11:53:08', 1, '2024-10-24 11:53:08', 1, 0);
INSERT INTO `module` VALUES (126, '编辑', 1, 0, 39, NULL, 'dic:edit', '/', 0, NULL, 2, 0, 1, '2024-10-24 11:53:23', 1, '2024-10-24 11:53:23', 1, 0);
INSERT INTO `module` VALUES (127, '删除', 1, 0, 39, NULL, 'dic:del', '/', 0, NULL, 2, 0, 1, '2024-10-24 11:53:34', 1, '2024-10-24 11:53:34', 1, 0);
INSERT INTO `module` VALUES (128, '查询', 1, 0, 53, NULL, 'systemConfig:list', '/', 0, NULL, 2, 0, 1, '2024-10-24 11:54:12', 1, '2024-10-24 11:54:12', 1, 0);
INSERT INTO `module` VALUES (129, '编辑', 1, 0, 53, NULL, 'systemConfig:edit', '/', 0, NULL, 2, 0, 1, '2024-10-24 11:54:25', 1, '2024-10-24 11:54:25', 1, 0);
INSERT INTO `module` VALUES (130, '删除', 1, 0, 53, NULL, 'systemConfig:del', '/', 0, NULL, 2, 0, 1, '2024-10-24 11:54:40', 1, '2024-10-24 11:54:40', 1, 0);
INSERT INTO `module` VALUES (131, '跳板机', 1, 0, 0, NULL, 'machineP', '/', 21, NULL, 0, 0, 1, '2024-11-13 11:59:45', 1, '2025-02-12 11:36:51', 1, 0);
INSERT INTO `module` VALUES (132, '机器管理', 1, 0, 131, NULL, 'machine', '/machine/machine/index.tsx', 0, NULL, 1, 0, 1, '2024-11-13 12:01:23', 1, '2024-11-13 12:01:23', 1, 0);
INSERT INTO `module` VALUES (133, '删除', 1, 0, 58, NULL, 'databaseBoard:del', '/', 0, NULL, 2, 0, 1, '2024-12-01 10:46:58', 1, '2024-12-01 10:46:58', 1, 0);
INSERT INTO `module` VALUES (134, '查看', 1, 0, 132, NULL, 'machine:list', '/', 0, NULL, 2, 0, 1, '2024-12-01 11:31:57', 1, '2024-12-01 11:31:57', 1, 0);
INSERT INTO `module` VALUES (135, '操作', 1, 0, 132, NULL, 'machine:edit', '/', 0, NULL, 2, 0, 1, '2024-12-01 11:32:23', 1, '2024-12-01 11:32:23', 1, 0);
INSERT INTO `module` VALUES (136, '删除', 1, 0, 132, NULL, 'machine:del', '/', 0, NULL, 2, 0, 1, '2024-12-01 11:32:45', 1, '2024-12-01 11:32:45', 1, 0);
INSERT INTO `module` VALUES (137, '权限', 1, 0, 132, NULL, 'machine:permission', '/', 0, NULL, 2, 0, 1, '2024-12-01 11:33:17', 1, '2024-12-01 11:33:17', 1, 0);
INSERT INTO `module` VALUES (138, 'AI', 1, 0, 0, NULL, 'AIP', '/', 26, NULL, 0, 0, 1, '2024-12-01 15:08:42', 1, '2024-12-01 15:08:42', 1, 0);
INSERT INTO `module` VALUES (139, '工作流', 1, 0, 138, NULL, 'aiPipeline', '/ai/aiPipeline/index.tsx', 0, NULL, 1, 0, 1, '2024-12-01 15:09:38', 1, '2024-12-01 16:19:09', 1, 0);
INSERT INTO `module` VALUES (140, '聊天', 1, 0, 138, NULL, 'aiChat', '/ai/aiChat/index.tsx', 0, NULL, 1, 0, 1, '2024-12-20 11:47:20', 1, '2024-12-20 11:47:20', 1, 0);
INSERT INTO `module` VALUES (141, '删除', 1, 0, 78, NULL, 'release:del', '/', 0, NULL, 2, 0, 1, '2025-01-02 18:29:33', 1, '2025-01-02 18:29:33', 1, 0);
INSERT INTO `module` VALUES (142, '查询', 1, 0, 77, NULL, 'issue:list', '/', 0, NULL, 2, 0, 1, '2025-01-03 09:41:05', 1, '2025-01-03 09:41:05', 1, 0);
INSERT INTO `module` VALUES (143, '编辑', 1, 0, 21, NULL, 'pipeline:edit', '/', 0, NULL, 2, 0, 1, '2025-01-03 10:29:42', 1, '2025-01-03 10:29:42', 1, 0);
INSERT INTO `module` VALUES (144, '删除', 1, 0, 21, NULL, 'pipeline:del', '/', 0, NULL, 2, 0, 1, '2025-01-03 10:30:04', 1, '2025-01-03 10:30:04', 1, 0);
INSERT INTO `module` VALUES (145, '权限', 1, 0, 21, NULL, 'pipeline:permission', '/', 0, NULL, 2, 0, 1, '2025-01-03 10:30:28', 1, '2025-01-03 10:30:28', 1, 0);
INSERT INTO `module` VALUES (146, '模型管理', 1, 0, 138, NULL, 'aiModel', '/ai/aiModel/index.tsx', 0, NULL, 1, 0, 1, '2025-01-09 14:20:42', 1, '2025-01-09 14:20:42', 1, 0);

-- ----------------------------
-- Table structure for other_account
-- ----------------------------
DROP TABLE IF EXISTS `other_account`;
CREATE TABLE `other_account`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `type` int UNSIGNED NOT NULL COMMENT '三方账号类型 字典',
  `account_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '账号名称',
  `account_password` varchar(555) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '账号密码',
  `remarks` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '备注',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `create_by` bigint UNSIGNED NOT NULL COMMENT '创建人id',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `update_by` bigint UNSIGNED NOT NULL COMMENT '更新人',
  `delete_flag` int UNSIGNED NOT NULL DEFAULT 0 COMMENT '删除 0不删除 1删除',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '三方账号表;' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of other_account
-- ----------------------------

-- ----------------------------
-- Table structure for pipeline
-- ----------------------------
DROP TABLE IF EXISTS `pipeline`;
CREATE TABLE `pipeline`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '名称',
  `use_status` int UNSIGNED NOT NULL DEFAULT 16 COMMENT '使用状态 看字典',
  `last_build_total_time` int UNSIGNED NULL DEFAULT NULL COMMENT '上次构建时长',
  `last_build_status` int UNSIGNED NULL DEFAULT NULL COMMENT '上次构建状态 看字典',
  `disabled` int UNSIGNED NOT NULL DEFAULT 0 COMMENT '启用禁用状态 0启用 1禁用',
  `pipeline_group_id` bigint UNSIGNED NOT NULL DEFAULT 1 COMMENT '组id',
  `soft_ids` json NULL COMMENT '软件ids',
  `pipeline_node_label` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '执行机label',
  `docker_flag` int UNSIGNED NOT NULL COMMENT '是否使用镜像0不用用 1用',
  `docker_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '镜像名称',
  `docker_param` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL COMMENT '镜像参数',
  `parallel` int UNSIGNED NOT NULL DEFAULT 0 COMMENT '是否允许并行构建1允许 0不允许',
  `timer` int UNSIGNED NOT NULL DEFAULT 1 COMMENT '是否开启定时触发 1开启 0不开启',
  `timer_cron` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '定时表达式',
  `email` int UNSIGNED NOT NULL DEFAULT 0 COMMENT '是否发送邮件1发送 0不发送',
  `email_user` json NULL COMMENT '发送邮件的用户id数组',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `create_by` int UNSIGNED NOT NULL COMMENT '创建人id',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `update_by` int UNSIGNED NOT NULL COMMENT '更新人',
  `delete_flag` int UNSIGNED NOT NULL DEFAULT 0 COMMENT '删除 0不删除 1删除',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 19 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '流水线;' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of pipeline
-- ----------------------------

-- ----------------------------
-- Table structure for pipeline_build
-- ----------------------------
DROP TABLE IF EXISTS `pipeline_build`;
CREATE TABLE `pipeline_build`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `pipeline_id` bigint UNSIGNED NOT NULL COMMENT '流水线id',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '名称',
  `build_start_time` datetime NULL DEFAULT NULL COMMENT '构建开始时间',
  `build_end_time` datetime NULL DEFAULT NULL COMMENT '构建结束时间',
  `build_status` int UNSIGNED NULL DEFAULT NULL COMMENT '构建状态 看字典',
  `soft_ids` json NULL COMMENT '软件ids',
  `pipeline_node_id` bigint UNSIGNED NULL DEFAULT NULL COMMENT '执行机id',
  `pipeline_node_label` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '执行机label',
  `docker_flag` int UNSIGNED NOT NULL COMMENT '是否使用镜像0用 1不用',
  `docker_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '镜像名称',
  `docker_param` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL COMMENT '镜像参数',
  `parallel` int UNSIGNED NOT NULL DEFAULT 0 COMMENT '是否允许并行构建1允许 0不允许',
  `email` int UNSIGNED NOT NULL DEFAULT 0 COMMENT '是否发送邮件1发送 0不发送',
  `email_user` json NULL COMMENT '发送邮件的用户id数组',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `create_by` bigint UNSIGNED NOT NULL COMMENT '创建人id',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `update_by` bigint UNSIGNED NOT NULL COMMENT '更新人',
  `delete_flag` int UNSIGNED NOT NULL DEFAULT 0 COMMENT '删除 0不删除 1删除',
  `workspace_path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '工作目录',
  `log` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  `param_file_status` int NOT NULL DEFAULT 0 COMMENT '参数文件状态 0未上传 1正在上传 2已上传 3上传失败',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `pipeline_build_1`(`delete_flag` ASC, `build_status` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 198 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '流水线构建记录;' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of pipeline_build
-- ----------------------------

-- ----------------------------
-- Table structure for pipeline_build_data
-- ----------------------------
DROP TABLE IF EXISTS `pipeline_build_data`;
CREATE TABLE `pipeline_build_data`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `pipeline_id` bigint UNSIGNED NOT NULL COMMENT '流水线id',
  `pipeline_build_id` bigint UNSIGNED NOT NULL COMMENT '构建记录id',
  `pipeline_build_stage_id` bigint UNSIGNED NOT NULL COMMENT '流水线构建记录阶段id',
  `pipeline_build_step_id` bigint UNSIGNED NOT NULL COMMENT '流水线构建记录步骤id',
  `tag` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '数据标签',
  `data` json NOT NULL COMMENT '回传的数据',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `delete_flag` int UNSIGNED NOT NULL DEFAULT 0 COMMENT '删除 0不删除 1删除',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '构建数据表;' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of pipeline_build_data
-- ----------------------------

-- ----------------------------
-- Table structure for pipeline_build_data_config
-- ----------------------------
DROP TABLE IF EXISTS `pipeline_build_data_config`;
CREATE TABLE `pipeline_build_data_config`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `tag` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '数据标签',
  `data` json NOT NULL COMMENT '数据',
  `delete_flag` int UNSIGNED NOT NULL DEFAULT 0 COMMENT '删除 0不删除 1删除',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '名称',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '构建数据配置表表;' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of pipeline_build_data_config
-- ----------------------------

-- ----------------------------
-- Table structure for pipeline_build_file
-- ----------------------------
DROP TABLE IF EXISTS `pipeline_build_file`;
CREATE TABLE `pipeline_build_file`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `pipeline_id` bigint UNSIGNED NOT NULL COMMENT '流水线id',
  `pipeline_build_id` bigint UNSIGNED NOT NULL COMMENT '构建记录id',
  `file_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '文件名称',
  `file_size` bigint NOT NULL COMMENT '文件大小',
  `file_md5` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT 'md5值',
  `file_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '文件类型',
  `file_path` varchar(555) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '文件路径',
  `source_type` int UNSIGNED NOT NULL COMMENT '文件存储类型 字典表',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `delete_flag` int UNSIGNED NOT NULL DEFAULT 0 COMMENT '删除 0不删除 1删除',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '构建记录归档文件表;' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of pipeline_build_file
-- ----------------------------

-- ----------------------------
-- Table structure for pipeline_build_node_mapping
-- ----------------------------
DROP TABLE IF EXISTS `pipeline_build_node_mapping`;
CREATE TABLE `pipeline_build_node_mapping`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `pipeline_build_id` bigint UNSIGNED NOT NULL COMMENT '构建记录id',
  `pipeline_node_id` bigint UNSIGNED NOT NULL COMMENT '执行机id',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '构建中job和node的关系' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of pipeline_build_node_mapping
-- ----------------------------

-- ----------------------------
-- Table structure for pipeline_build_param
-- ----------------------------
DROP TABLE IF EXISTS `pipeline_build_param`;
CREATE TABLE `pipeline_build_param`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `pipeline_id` bigint UNSIGNED NOT NULL COMMENT '流水线id',
  `pipeline_build_id` bigint UNSIGNED NOT NULL COMMENT '流水线构建id',
  `pipeline_plugin_detail_id` bigint UNSIGNED NOT NULL COMMENT '插件详情id',
  `pipeline_plugin_id` bigint UNSIGNED NOT NULL COMMENT '插件id',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '名称',
  `key_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '编码 供后面引用',
  `type` int UNSIGNED NOT NULL COMMENT '类型 看字典',
  `optional` json NULL COMMENT '可选值',
  `value` varchar(5000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '默认值',
  `desc` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL COMMENT '描述',
  `not_null` int NOT NULL DEFAULT 0 COMMENT '0可为空 1不可为空',
  `edit_flag` int UNSIGNED NOT NULL DEFAULT 0 COMMENT '是否可编辑 0 可编辑 1不编辑',
  `sort` int NULL DEFAULT 0 COMMENT '排序',
  `date_type` int NOT NULL DEFAULT 0 COMMENT '时间插件类型',
  `unit` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '数组单位',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1203 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '流水线构建记录全局参数;' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of pipeline_build_param
-- ----------------------------

-- ----------------------------
-- Table structure for pipeline_build_runtime_param
-- ----------------------------
DROP TABLE IF EXISTS `pipeline_build_runtime_param`;
CREATE TABLE `pipeline_build_runtime_param`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `key_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '变量名称',
  `key_value` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '变量值',
  `pipeline_build_id` bigint NOT NULL,
  `pipeline_build_stage_id` bigint NOT NULL,
  `pipeline_build_step_id` bigint NOT NULL,
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '构建运行时step回传给服务的变量;' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of pipeline_build_runtime_param
-- ----------------------------

-- ----------------------------
-- Table structure for pipeline_build_source_change
-- ----------------------------
DROP TABLE IF EXISTS `pipeline_build_source_change`;
CREATE TABLE `pipeline_build_source_change`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `pipeline_id` bigint UNSIGNED NOT NULL COMMENT '流水线id',
  `pipeline_build_id` bigint UNSIGNED NOT NULL COMMENT '构建记录id',
  `data` json NOT NULL COMMENT '回传的数据',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `delete_flag` int UNSIGNED NOT NULL DEFAULT 0 COMMENT '删除 0不删除 1删除',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '构建记录代码变更数据表;' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of pipeline_build_source_change
-- ----------------------------

-- ----------------------------
-- Table structure for pipeline_build_stage
-- ----------------------------
DROP TABLE IF EXISTS `pipeline_build_stage`;
CREATE TABLE `pipeline_build_stage`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `pipeline_build_id` bigint UNSIGNED NOT NULL COMMENT '构建记录id',
  `pipeline_id` bigint UNSIGNED NOT NULL COMMENT '流水线id',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '名称',
  `build_start_time` datetime NULL DEFAULT NULL COMMENT '构建开始时间',
  `build_end_time` datetime NULL DEFAULT NULL COMMENT '构建结束时间',
  `build_status` int UNSIGNED NULL DEFAULT NULL COMMENT '构建状态 看字典',
  `node_default` int UNSIGNED NOT NULL DEFAULT 0 COMMENT '是否使用默认执行机 1 使用默认 0不使用默认',
  `node_label` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '执行机label',
  `node_id` bigint UNSIGNED NULL DEFAULT NULL COMMENT '执行机id',
  `docker_flag` int UNSIGNED NOT NULL DEFAULT 1 COMMENT '是否使用镜像1用 0不用',
  `docker_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '镜像名称',
  `docker_param` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '镜像参数',
  `parent_id` bigint UNSIGNED NOT NULL DEFAULT 0 COMMENT '父id',
  `sort` int NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 800 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '流水线构建记录阶段表;' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of pipeline_build_stage
-- ----------------------------

-- ----------------------------
-- Table structure for pipeline_build_step
-- ----------------------------
DROP TABLE IF EXISTS `pipeline_build_step`;
CREATE TABLE `pipeline_build_step`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `pipeline_id` bigint UNSIGNED NOT NULL COMMENT '流水线id',
  `pipeline_build_id` bigint UNSIGNED NOT NULL COMMENT '构建记录id',
  `pipeline_build_stage_id` bigint UNSIGNED NOT NULL COMMENT '构建记录阶段id',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '名称',
  `build_start_time` datetime NULL DEFAULT NULL COMMENT '构建开始时间',
  `build_end_time` datetime NULL DEFAULT NULL COMMENT '构建结束时间',
  `build_status` int UNSIGNED NULL DEFAULT NULL COMMENT '构建状态 看字典',
  `pipeline_plugin_detail_id` bigint UNSIGNED NOT NULL COMMENT '插件详情id',
  `pipeline_plugin_id` bigint UNSIGNED NOT NULL COMMENT '插件id',
  `error_stop` int UNSIGNED NOT NULL COMMENT '错误是否退出 0 不退 1退',
  `script` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL COMMENT '脚本',
  `sort` int NOT NULL DEFAULT 0,
  `error_log_md5` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 885 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '流水线构建记录步骤表;' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of pipeline_build_step
-- ----------------------------

-- ----------------------------
-- Table structure for pipeline_build_step_param
-- ----------------------------
DROP TABLE IF EXISTS `pipeline_build_step_param`;
CREATE TABLE `pipeline_build_step_param`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `pipeline_id` bigint UNSIGNED NOT NULL COMMENT '流水线id',
  `pipeline_build_id` bigint UNSIGNED NOT NULL COMMENT '构建记录id',
  `pipeline_build_stage_id` bigint UNSIGNED NOT NULL COMMENT '流水线构建记录阶段id',
  `pipeline_build_step_id` bigint UNSIGNED NOT NULL COMMENT '流水线构建记录步骤id',
  `pipeline_plugin_detail_id` bigint UNSIGNED NOT NULL COMMENT '插件详情id',
  `pipeline_plugin_id` bigint UNSIGNED NOT NULL COMMENT '插件id',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '名称',
  `key_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '编码 供后面引用',
  `type` int UNSIGNED NOT NULL COMMENT '类型 看字典',
  `optional` json NULL COMMENT '可选值',
  `value` varchar(5000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '默认值',
  `desc` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL COMMENT '描述',
  `not_null` int NOT NULL DEFAULT 0 COMMENT '0可为空 1不可为空',
  `scope` int UNSIGNED NOT NULL COMMENT '作用域0局部 1全局',
  `edit_flag` int UNSIGNED NOT NULL DEFAULT 0 COMMENT '是否可编辑 0 可编辑 1不编辑',
  `sort` int NULL DEFAULT 0 COMMENT '排序',
  `date_type` int NOT NULL DEFAULT 0 COMMENT '时间插件类型',
  `unit` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '数组单位',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 365 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '流水线构建记录步骤参数表;' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of pipeline_build_step_param
-- ----------------------------

-- ----------------------------
-- Table structure for pipeline_group
-- ----------------------------
DROP TABLE IF EXISTS `pipeline_group`;
CREATE TABLE `pipeline_group`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '组名称',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `create_by` bigint UNSIGNED NOT NULL COMMENT '创建人id',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `update_by` bigint UNSIGNED NOT NULL COMMENT '更新人',
  `delete_flag` int UNSIGNED NOT NULL DEFAULT 0 COMMENT '删除 0不删除 1删除',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '流水线分组表;' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of pipeline_group
-- ----------------------------

-- ----------------------------
-- Table structure for pipeline_node
-- ----------------------------
DROP TABLE IF EXISTS `pipeline_node`;
CREATE TABLE `pipeline_node`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '名称',
  `work_dir` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '工作目录',
  `desc` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL COMMENT '描述',
  `status` int UNSIGNED NOT NULL DEFAULT 0 COMMENT '状态 0未连接 1已连接',
  `disabled` int UNSIGNED NULL DEFAULT NULL COMMENT '0启用 1禁用  控制node是否可以连接server',
  `error_log` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL COMMENT '连接错误日志',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `create_by` bigint UNSIGNED NOT NULL COMMENT '创建人id',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `update_by` bigint UNSIGNED NOT NULL COMMENT '更新人',
  `delete_flag` int UNSIGNED NOT NULL DEFAULT 0 COMMENT '删除 0不删除 1删除',
  `token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `label` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `work_num` int NOT NULL DEFAULT 5 COMMENT '并行任务数量',
  `priority` int NOT NULL DEFAULT 0 COMMENT '优先级 默认0  值越大优先级越高',
  `ip` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '执行机表;' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of pipeline_node
-- ----------------------------

-- ----------------------------
-- Table structure for pipeline_param
-- ----------------------------
DROP TABLE IF EXISTS `pipeline_param`;
CREATE TABLE `pipeline_param`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键',
  `pipeline_id` bigint UNSIGNED NOT NULL COMMENT '流水线id',
  `pipeline_plugin_detail_id` bigint UNSIGNED NOT NULL DEFAULT 0 COMMENT '插件详情id',
  `pipeline_plugin_id` bigint UNSIGNED NOT NULL DEFAULT 0 COMMENT '插件id',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '名称',
  `key_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '编码 供后面引用',
  `type` int UNSIGNED NOT NULL COMMENT '类型 看字典',
  `optional` json NULL COMMENT '可选值',
  `value` varchar(5000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '默认值',
  `desc` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL COMMENT '描述',
  `not_null` int NOT NULL DEFAULT 0 COMMENT '0可为空 1不可为空',
  `edit_flag` int UNSIGNED NOT NULL DEFAULT 0 COMMENT '是否可编辑 0 可编辑 1不编辑',
  `sort` int NULL DEFAULT 0 COMMENT '排序',
  `date_type` int NOT NULL DEFAULT 0 COMMENT '时间插件类型',
  `unit` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '数组单位',
  `scope` int UNSIGNED NULL DEFAULT NULL COMMENT '作用域 1全局 当为空的时候 是手动添加的全局参数',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 865 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '流水线全局参数;' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of pipeline_param
-- ----------------------------

-- ----------------------------
-- Table structure for pipeline_permission
-- ----------------------------
DROP TABLE IF EXISTS `pipeline_permission`;
CREATE TABLE `pipeline_permission`  (
  `pipeline_permission_id` bigint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `pipeline_id` bigint NOT NULL,
  `type` int NOT NULL COMMENT '类型 0人 1部门 2角色',
  `biz_id` bigint NOT NULL COMMENT '对应的id',
  PRIMARY KEY (`pipeline_permission_id`) USING BTREE,
  UNIQUE INDEX `project_permission_1`(`pipeline_id` ASC, `type` ASC, `biz_id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '流水线权限' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of pipeline_permission
-- ----------------------------

-- ----------------------------
-- Table structure for pipeline_plugin
-- ----------------------------
DROP TABLE IF EXISTS `pipeline_plugin`;
CREATE TABLE `pipeline_plugin`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '插件名称',
  `type` int UNSIGNED NOT NULL COMMENT '插件类型 看字典',
  `source` int UNSIGNED NOT NULL COMMENT '来源 看字典',
  `desc` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL COMMENT '描述',
  `number` int UNSIGNED NOT NULL COMMENT '版本号',
  `script_type` int UNSIGNED NOT NULL COMMENT '脚本类型 看字典',
  `script` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '脚本',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `create_by` bigint UNSIGNED NOT NULL COMMENT '创建人id',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `update_by` bigint UNSIGNED NOT NULL COMMENT '更新人',
  `delete_flag` int UNSIGNED NOT NULL DEFAULT 0 COMMENT '删除 0不删除 1删除',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 26 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '流水线插件;' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of pipeline_plugin
-- ----------------------------

-- ----------------------------
-- Table structure for pipeline_plugin_detail
-- ----------------------------
DROP TABLE IF EXISTS `pipeline_plugin_detail`;
CREATE TABLE `pipeline_plugin_detail`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '插件名称',
  `type` int UNSIGNED NOT NULL COMMENT '插件类型 看字典',
  `source` int UNSIGNED NOT NULL COMMENT '来源 看字典',
  `desc` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL COMMENT '描述',
  `number` int UNSIGNED NOT NULL COMMENT '版本号',
  `script_type` int UNSIGNED NOT NULL COMMENT '脚本类型 看字典',
  `script` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '脚本',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `create_by` bigint UNSIGNED NOT NULL COMMENT '创建人id',
  `pipeline_plugin_id` bigint UNSIGNED NOT NULL COMMENT '流水线插件id',
  `delete_flag` int UNSIGNED NOT NULL DEFAULT 0 COMMENT '删除 0不删除 1删除',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 117 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '流水线插件;' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of pipeline_plugin_detail
-- ----------------------------

-- ----------------------------
-- Table structure for pipeline_plugin_param
-- ----------------------------
DROP TABLE IF EXISTS `pipeline_plugin_param`;
CREATE TABLE `pipeline_plugin_param`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `pipeline_plugin_detail_id` bigint UNSIGNED NOT NULL COMMENT '插件详情id',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '名称',
  `key_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '编码 供后面引用',
  `type` int UNSIGNED NOT NULL COMMENT '类型 看字典',
  `scope` int UNSIGNED NOT NULL COMMENT '作用域0局部 1全局',
  `optional` json NULL COMMENT '可选值',
  `value` varchar(5000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '默认值',
  `desc` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL COMMENT '描述',
  `not_null` int NOT NULL DEFAULT 0 COMMENT '0可为空 1不可为空',
  `edit_flag` int UNSIGNED NOT NULL DEFAULT 0 COMMENT '是否可编辑 0 可编辑 1不编辑',
  `sort` int NULL DEFAULT 0 COMMENT '排序',
  `date_type` int NOT NULL DEFAULT 0 COMMENT '时间插件类型',
  `unit` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '数组单位',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 255 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '插件参数;' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of pipeline_plugin_param
-- ----------------------------

-- ----------------------------
-- Table structure for pipeline_stage
-- ----------------------------
DROP TABLE IF EXISTS `pipeline_stage`;
CREATE TABLE `pipeline_stage`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `pipeline_id` bigint UNSIGNED NOT NULL COMMENT '流水线id',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '名称',
  `node_default` int UNSIGNED NOT NULL DEFAULT 0 COMMENT '是否使用默认执行机 0 使用默认 1不使用默认',
  `node_label` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '执行机label',
  `docker_flag` int UNSIGNED NOT NULL DEFAULT 1 COMMENT '是否使用镜像0用 1不用',
  `docker_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '镜像名称',
  `docker_param` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '镜像参数',
  `parent_id` bigint UNSIGNED NOT NULL DEFAULT 0 COMMENT '父id',
  `disabled` int UNSIGNED NOT NULL DEFAULT 0 COMMENT '0启用 1禁用',
  `sort` int NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 935 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '流水线阶段;' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of pipeline_stage
-- ----------------------------

-- ----------------------------
-- Table structure for pipeline_step
-- ----------------------------
DROP TABLE IF EXISTS `pipeline_step`;
CREATE TABLE `pipeline_step`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `pipeline_id` bigint UNSIGNED NOT NULL COMMENT '流水线id',
  `pipeline_stage_id` bigint UNSIGNED NOT NULL COMMENT '流水线阶段id',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '名称',
  `disabled` int UNSIGNED NOT NULL DEFAULT 0 COMMENT '0启用 1禁用',
  `pipeline_plugin_detail_id` bigint UNSIGNED NOT NULL COMMENT '插件详情id',
  `pipeline_plugin_id` bigint UNSIGNED NOT NULL COMMENT '插件id',
  `error_stop` int UNSIGNED NOT NULL COMMENT '错误是否退出 0 不退 1退',
  `script` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL COMMENT '脚本',
  `sort` int NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 782 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '流水线步骤;' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of pipeline_step
-- ----------------------------

-- ----------------------------
-- Table structure for pipeline_step_param
-- ----------------------------
DROP TABLE IF EXISTS `pipeline_step_param`;
CREATE TABLE `pipeline_step_param`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `pipeline_id` bigint UNSIGNED NOT NULL COMMENT '流水线id',
  `pipeline_stage_id` bigint UNSIGNED NOT NULL COMMENT '流水线阶段id',
  `pipeline_step_id` bigint UNSIGNED NOT NULL COMMENT '流水线步骤id',
  `pipeline_plugin_detail_id` bigint UNSIGNED NOT NULL COMMENT '插件详情id',
  `pipeline_plugin_id` bigint UNSIGNED NOT NULL COMMENT '插件id',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '名称',
  `key_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '编码 供后面引用',
  `type` int UNSIGNED NOT NULL COMMENT '类型 看字典',
  `optional` json NULL COMMENT '可选值',
  `value` varchar(5000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '默认值',
  `desc` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL COMMENT '描述',
  `not_null` int NOT NULL DEFAULT 0 COMMENT '0可为空 1不可为空',
  `scope` int UNSIGNED NOT NULL COMMENT '作用域0局部 1全局',
  `edit_flag` int UNSIGNED NOT NULL DEFAULT 0 COMMENT '是否可编辑 0 可编辑 1不编辑',
  `sort` int NULL DEFAULT 0 COMMENT '排序',
  `date_type` int NOT NULL DEFAULT 0 COMMENT '时间插件类型',
  `unit` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '数组单位',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 510 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '流水线步骤参数;' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of pipeline_step_param
-- ----------------------------

-- ----------------------------
-- Table structure for process
-- ----------------------------
DROP TABLE IF EXISTS `process`;
CREATE TABLE `process`  (
  `process_id` bigint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '流程名称',
  `version` int UNSIGNED NOT NULL DEFAULT 0 COMMENT '版本号',
  `process_version_id` bigint UNSIGNED NOT NULL COMMENT '具体版本id',
  `disabled` int NOT NULL DEFAULT 1 COMMENT '0启用 1禁用',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `create_by` bigint UNSIGNED NOT NULL COMMENT '创建人id',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `update_by` bigint UNSIGNED NOT NULL COMMENT '更新人',
  `delete_flag` int UNSIGNED NOT NULL DEFAULT 0 COMMENT '删除 0不删除 1删除',
  `remarks` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`process_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 24 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '流程表;' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of process
-- ----------------------------

-- ----------------------------
-- Table structure for process_instance
-- ----------------------------
DROP TABLE IF EXISTS `process_instance`;
CREATE TABLE `process_instance`  (
  `process_instance_id` bigint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `process_id` bigint UNSIGNED NOT NULL,
  `process_version_id` bigint UNSIGNED NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '标题 默认流程名称加发起人名称',
  `status` int UNSIGNED NOT NULL COMMENT '状态',
  `process_point_id` bigint UNSIGNED NULL DEFAULT NULL COMMENT '当前节点id',
  `process_point_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '当前节点名称',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `create_by` bigint UNSIGNED NOT NULL COMMENT '发起人id',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
  `update_by` bigint UNSIGNED NOT NULL COMMENT '更新人',
  `delete_flag` int UNSIGNED NOT NULL DEFAULT 0 COMMENT '删除 0不删除 1删除',
  `end_time` datetime NULL DEFAULT NULL COMMENT '结束时间',
  PRIMARY KEY (`process_instance_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 34 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '流程发起实例' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of process_instance
-- ----------------------------

-- ----------------------------
-- Table structure for process_instance_approval_people
-- ----------------------------
DROP TABLE IF EXISTS `process_instance_approval_people`;
CREATE TABLE `process_instance_approval_people`  (
  `process_instance_approval_people_id` bigint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `process_instance_point_id` bigint UNSIGNED NOT NULL COMMENT '流程节点id',
  `process_instance_id` bigint UNSIGNED NOT NULL COMMENT '流程实例id',
  `status` varchar(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '审批结果 同意/已办理 拒绝/拒办',
  `account_id` bigint UNSIGNED NOT NULL COMMENT '账号id',
  `dept_ids` json NULL COMMENT '部门id 快照',
  `role_ids` json NULL COMMENT '角色id 快照',
  `reason` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '审批意见',
  `end_time` datetime NULL DEFAULT NULL COMMENT '结束时间',
  PRIMARY KEY (`process_instance_approval_people_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 95 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '流程实例审批人列表;' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of process_instance_approval_people
-- ----------------------------

-- ----------------------------
-- Table structure for process_instance_point
-- ----------------------------
DROP TABLE IF EXISTS `process_instance_point`;
CREATE TABLE `process_instance_point`  (
  `process_instance_point_id` bigint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `process_instance_id` bigint UNSIGNED NOT NULL COMMENT '流程实例id',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '节点名称',
  `type` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '节点类型 看字典',
  `approve_condition` int UNSIGNED NOT NULL DEFAULT 0 COMMENT '审批通过条件 0：一人通过即可 1:全部通过才行',
  `pipeline_id` bigint UNSIGNED NOT NULL DEFAULT 0 COMMENT '流水线id 当是流水线节点的时候 使用',
  `pipeline_pass_condition` int UNSIGNED NOT NULL DEFAULT 0 COMMENT '0成功才可通过 1执行完成即可通过',
  `script` json NULL COMMENT '判断脚本',
  `role_ids` json NULL COMMENT '角色ids',
  `dept_ids` json NULL COMMENT '指定部门id列表',
  `user_ids` json NULL COMMENT '指定人员id列表',
  `remarks` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '备注',
  `status` varchar(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '状态 待开始 审批中 拒绝 通过 排他',
  `end_time` datetime NULL DEFAULT NULL COMMENT '结束时间',
  PRIMARY KEY (`process_instance_point_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 234 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '流程发起实例节点表;' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of process_instance_point
-- ----------------------------

-- ----------------------------
-- Table structure for process_instance_point_form
-- ----------------------------
DROP TABLE IF EXISTS `process_instance_point_form`;
CREATE TABLE `process_instance_point_form`  (
  `process_instance_point_form_id` bigint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `process_instance_id` bigint UNSIGNED NOT NULL COMMENT '流程id',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '名称',
  `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '表单编码 用来后面的引用',
  `process_instance_point_id` bigint UNSIGNED NOT NULL COMMENT '审批节点id',
  PRIMARY KEY (`process_instance_point_form_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 34 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '流程实例节点定义的表单表;' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of process_instance_point_form
-- ----------------------------

-- ----------------------------
-- Table structure for process_instance_point_form_field
-- ----------------------------
DROP TABLE IF EXISTS `process_instance_point_form_field`;
CREATE TABLE `process_instance_point_form_field`  (
  `process_instance_point_form_field_id` bigint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `process_instance_id` bigint UNSIGNED NOT NULL COMMENT '流程id',
  `process_instance_point_form_id` bigint UNSIGNED NOT NULL COMMENT '表单id',
  `process_instance_point_id` bigint UNSIGNED NOT NULL COMMENT '审批节点id',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '名称',
  `key_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '编码 供后面引用',
  `type` int UNSIGNED NOT NULL COMMENT '类型 看字典',
  `optional` json NULL COMMENT '可选值',
  `value` varchar(5000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '默认值',
  `desc` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL COMMENT '描述',
  `edit_flag` int UNSIGNED NOT NULL DEFAULT 0 COMMENT '是否可编辑 0 可编辑 1不编辑',
  `not_null` int NOT NULL DEFAULT 0 COMMENT '0可为空 1不可为空',
  `sort` int NULL DEFAULT 0 COMMENT '排序',
  `date_type` int NOT NULL DEFAULT 0 COMMENT '时间插件类型',
  `unit` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '数组单位',
  PRIMARY KEY (`process_instance_point_form_field_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 184 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '流程节点定义的表单字段表;' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of process_instance_point_form_field
-- ----------------------------

-- ----------------------------
-- Table structure for process_instance_point_relation
-- ----------------------------
DROP TABLE IF EXISTS `process_instance_point_relation`;
CREATE TABLE `process_instance_point_relation`  (
  `process_instance_point_relation_id` bigint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `process_instance_id` bigint UNSIGNED NOT NULL COMMENT '流程id',
  `source` bigint NOT NULL,
  `target` bigint NOT NULL,
  PRIMARY KEY (`process_instance_point_relation_id`) USING BTREE,
  UNIQUE INDEX `process_point_relation_1`(`source` ASC, `target` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 223 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '流程节点表关系' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of process_instance_point_relation
-- ----------------------------

-- ----------------------------
-- Table structure for process_point
-- ----------------------------
DROP TABLE IF EXISTS `process_point`;
CREATE TABLE `process_point`  (
  `process_point_id` bigint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `process_id` bigint UNSIGNED NOT NULL COMMENT '流程id',
  `process_version_id` bigint UNSIGNED NOT NULL COMMENT '流程版本号id',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '节点名称',
  `type` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '节点类型 看字典',
  `approve_condition` int UNSIGNED NOT NULL DEFAULT 0 COMMENT '审批通过条件 0：一人通过即可 1:全部通过才行',
  `pipeline_id` bigint UNSIGNED NOT NULL DEFAULT 0 COMMENT '流水线id 当是流水线节点的时候 使用',
  `pipeline_pass_condition` int UNSIGNED NOT NULL DEFAULT 0 COMMENT '0成功才可通过 1执行完成即可通过',
  `script` json NULL COMMENT '判断脚本',
  `role_ids` json NULL COMMENT '角色ids',
  `dept_ids` json NULL COMMENT '指定部门id列表',
  `user_ids` json NULL COMMENT '指定人员id列表',
  `remarks` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`process_point_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 546 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '流程节点表;' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of process_point
-- ----------------------------

-- ----------------------------
-- Table structure for process_point_form
-- ----------------------------
DROP TABLE IF EXISTS `process_point_form`;
CREATE TABLE `process_point_form`  (
  `process_point_form_id` bigint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `process_id` bigint UNSIGNED NOT NULL COMMENT '流程id',
  `process_version_id` bigint UNSIGNED NOT NULL COMMENT '流程版本号id',
  `process_point_id` bigint UNSIGNED NOT NULL COMMENT '审批节点id',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '名称',
  `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '表单编码 用来后面的引用',
  `edit` int UNSIGNED NOT NULL DEFAULT 0 COMMENT '设置值类型 0当前节点审批人 1 所有节点审批人',
  PRIMARY KEY (`process_point_form_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 39 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '流程节点定义的表单表;' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of process_point_form
-- ----------------------------

-- ----------------------------
-- Table structure for process_point_form_field
-- ----------------------------
DROP TABLE IF EXISTS `process_point_form_field`;
CREATE TABLE `process_point_form_field`  (
  `process_point_form_field_id` bigint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `process_id` bigint UNSIGNED NOT NULL COMMENT '流程id',
  `process_version_id` bigint UNSIGNED NOT NULL COMMENT '流程版本号id',
  `process_point_id` bigint UNSIGNED NOT NULL COMMENT '审批节点id',
  `process_point_form_id` bigint UNSIGNED NOT NULL COMMENT '表单id',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '名称',
  `key_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '编码 供后面引用',
  `type` int UNSIGNED NOT NULL COMMENT '类型 看字典',
  `optional` json NULL COMMENT '可选值',
  `value` varchar(5000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '默认值',
  `desc` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL COMMENT '描述',
  `edit_flag` int UNSIGNED NOT NULL DEFAULT 0 COMMENT '是否可编辑 0 可编辑 1不编辑',
  `not_null` int NOT NULL DEFAULT 0 COMMENT '0可为空 1不可为空',
  `sort` int NULL DEFAULT 0 COMMENT '排序',
  `date_type` int NOT NULL DEFAULT 0 COMMENT '时间插件类型',
  `unit` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '数组单位',
  PRIMARY KEY (`process_point_form_field_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 237 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '流程节点定义的表单字段表;' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of process_point_form_field
-- ----------------------------

-- ----------------------------
-- Table structure for process_point_pipeline_param
-- ----------------------------
DROP TABLE IF EXISTS `process_point_pipeline_param`;
CREATE TABLE `process_point_pipeline_param`  (
  `process_point_pipeline_param_id` bigint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `process_id` bigint UNSIGNED NOT NULL COMMENT '流程id',
  `process_version_id` bigint UNSIGNED NOT NULL COMMENT '流程版本号id',
  `process_point_id` bigint UNSIGNED NOT NULL COMMENT '审批节点id',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '名称',
  `key_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '流水线那边全局变量的key_name',
  `type` int UNSIGNED NOT NULL COMMENT '类型 看字典',
  `optional` json NULL COMMENT '可选值',
  `value` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '触发流水线此参数的值 当此值为空的时候 使用流水线设置的默认值;此值可以输入$表达式 例如 ${form1.code1} 这就表示form1表单的code1字段值',
  `desc` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL COMMENT '描述',
  `not_null` int NOT NULL DEFAULT 0 COMMENT '0可为空 1不可为空',
  `sort` int NOT NULL DEFAULT 0,
  PRIMARY KEY (`process_point_pipeline_param_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '流程节点流水线参数表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of process_point_pipeline_param
-- ----------------------------

-- ----------------------------
-- Table structure for process_point_relation
-- ----------------------------
DROP TABLE IF EXISTS `process_point_relation`;
CREATE TABLE `process_point_relation`  (
  `process_point_relation_id` bigint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `process_id` bigint UNSIGNED NOT NULL COMMENT '流程id',
  `process_version_id` bigint UNSIGNED NOT NULL COMMENT '流程版本号id',
  `source` bigint NOT NULL,
  `target` bigint NOT NULL,
  PRIMARY KEY (`process_point_relation_id`) USING BTREE,
  UNIQUE INDEX `process_point_relation_1`(`source` ASC, `target` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 641 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '流程节点表关系' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of process_point_relation
-- ----------------------------

-- ----------------------------
-- Table structure for process_version
-- ----------------------------
DROP TABLE IF EXISTS `process_version`;
CREATE TABLE `process_version`  (
  `process_version_id` bigint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `process_id` bigint UNSIGNED NOT NULL COMMENT '流程id',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '流程名称',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `create_by` bigint UNSIGNED NOT NULL COMMENT '创建人id',
  `version` int UNSIGNED NOT NULL DEFAULT 0 COMMENT '版本号',
  `flag_submit` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '0' COMMENT '提交人范围',
  `dept_ids` json NULL COMMENT '指定部门id列表',
  `user_ids` json NULL COMMENT '指定人员id列表',
  `flag_use` varchar(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '0' COMMENT '0未使用 1使用中',
  PRIMARY KEY (`process_version_id`) USING BTREE,
  UNIQUE INDEX `process_version_1`(`process_id` ASC, `version` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 58 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '流程版本表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of process_version
-- ----------------------------

-- ----------------------------
-- Table structure for project
-- ----------------------------
DROP TABLE IF EXISTS `project`;
CREATE TABLE `project`  (
  `project_id` bigint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `type` int NOT NULL COMMENT '类型 ',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '项目名称',
  `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '项目编码',
  `status` varchar(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '状态 0使用中 1归档',
  `plan_start_date` datetime NULL DEFAULT NULL COMMENT '计划开始日期',
  `plan_end_date` datetime NULL DEFAULT NULL COMMENT '计划结束日期',
  `start_date` datetime NULL DEFAULT NULL COMMENT '实际开始日期',
  `end_date` datetime NULL DEFAULT NULL COMMENT '实际结束日期',
  `remarks` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '描述',
  `head_user_id` bigint NOT NULL DEFAULT 0 COMMENT '负责人id',
  `reporter_user_id` bigint NOT NULL DEFAULT 0 COMMENT '报告人id',
  `create_by` bigint UNSIGNED NOT NULL COMMENT '创建人id',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `delete_flag` int NOT NULL DEFAULT 0,
  `file_list` json NULL COMMENT '附件',
  PRIMARY KEY (`project_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '项目' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of project
-- ----------------------------

-- ----------------------------
-- Table structure for project_application
-- ----------------------------
DROP TABLE IF EXISTS `project_application`;
CREATE TABLE `project_application`  (
  `project_application_id` bigint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `tag` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '' COMMENT '标签',
  `sort` int NOT NULL DEFAULT 0 COMMENT '排序',
  `remarks` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '备注',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '名称',
  `create_by` bigint UNSIGNED NOT NULL COMMENT '创建人id',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `delete_flag` int NOT NULL DEFAULT 0,
  `head_user_id` bigint NULL DEFAULT 0 COMMENT '责任人',
  PRIMARY KEY (`project_application_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '项目的应用' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of project_application
-- ----------------------------

-- ----------------------------
-- Table structure for project_custom_field
-- ----------------------------
DROP TABLE IF EXISTS `project_custom_field`;
CREATE TABLE `project_custom_field`  (
  `project_custom_field_id` bigint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `biz_type` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '类型 0项目 1版本 2issue ',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '名称',
  `key_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '编码 供后面引用',
  `type` int UNSIGNED NOT NULL COMMENT '类型 看字典',
  `optional` json NULL COMMENT '可选值',
  `value` varchar(5000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '默认值',
  `desc` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL COMMENT '描述',
  `not_null` int NOT NULL DEFAULT 0 COMMENT '0可为空 1不可为空',
  `date_type` int NOT NULL DEFAULT 0 COMMENT '时间插件类型',
  `unit` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '数组单位',
  `sort` int NOT NULL DEFAULT 0 COMMENT '排序',
  `delete_flag` int NOT NULL DEFAULT 0,
  PRIMARY KEY (`project_custom_field_id`) USING BTREE,
  UNIQUE INDEX `project_custom_field_1`(`biz_type` ASC, `key_name` ASC, `delete_flag` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 23 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '项目的自定义字段' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of project_custom_field
-- ----------------------------

-- ----------------------------
-- Table structure for project_custom_value
-- ----------------------------
DROP TABLE IF EXISTS `project_custom_value`;
CREATE TABLE `project_custom_value`  (
  `project_custom_value_id` bigint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `biz_type` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '类型 0项目 1版本 2issue ',
  `biz_id` bigint NOT NULL COMMENT '对应的业务id',
  `project_custom_field_id` bigint NOT NULL,
  `value` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '创建人id',
  PRIMARY KEY (`project_custom_value_id`) USING BTREE,
  UNIQUE INDEX `project_custom_value_1`(`biz_type` ASC, `biz_id` ASC, `project_custom_field_id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 69 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of project_custom_value
-- ----------------------------

-- ----------------------------
-- Table structure for project_issue
-- ----------------------------
DROP TABLE IF EXISTS `project_issue`;
CREATE TABLE `project_issue`  (
  `project_issue_id` bigint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `project_id` bigint NOT NULL,
  `project_release_id` bigint NOT NULL DEFAULT 0 COMMENT '版本id',
  `type` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '类型',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '项目名称',
  `status` varchar(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '状态 0使用中 1归档',
  `plan_start_date` datetime NULL DEFAULT NULL COMMENT '计划开始日期',
  `plan_end_date` datetime NULL DEFAULT NULL COMMENT '计划结束日期',
  `start_date` datetime NULL DEFAULT NULL COMMENT '实际开始日期',
  `end_date` datetime NULL DEFAULT NULL COMMENT '实际结束日期',
  `remarks` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '描述',
  `head_user_id` bigint NOT NULL DEFAULT 0 COMMENT '负责人id',
  `reporter_user_id` bigint NOT NULL DEFAULT 0 COMMENT '报告人id',
  `priority` int NOT NULL DEFAULT 0 COMMENT '优先级 0一般 1重要  2紧急',
  `create_by` bigint UNSIGNED NOT NULL COMMENT '创建人id',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `delete_flag` int NOT NULL DEFAULT 0,
  `sort` int NOT NULL DEFAULT 0 COMMENT '排序',
  `file_list` json NULL COMMENT '附件',
  PRIMARY KEY (`project_issue_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of project_issue
-- ----------------------------

-- ----------------------------
-- Table structure for project_permission
-- ----------------------------
DROP TABLE IF EXISTS `project_permission`;
CREATE TABLE `project_permission`  (
  `project_permission_id` bigint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `biz_type` int NOT NULL DEFAULT 0,
  `biz_type_id` bigint NOT NULL,
  `type` int NOT NULL COMMENT '类型 0人 1部门 2角色',
  `type_id` bigint NOT NULL COMMENT '对应的id',
  PRIMARY KEY (`project_permission_id`) USING BTREE,
  UNIQUE INDEX `project_permission_1`(`biz_type` ASC, `biz_type_id` ASC, `type` ASC, `type_id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 35 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of project_permission
-- ----------------------------

-- ----------------------------
-- Table structure for project_release
-- ----------------------------
DROP TABLE IF EXISTS `project_release`;
CREATE TABLE `project_release`  (
  `project_release_id` bigint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `project_id` bigint NOT NULL,
  `status` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '状态 0待开始 1冲刺中 2已发布',
  `sort` int NOT NULL DEFAULT 0 COMMENT '排序',
  `version` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '版本号',
  `remarks` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '备注',
  `progress` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '进度',
  `create_by` bigint UNSIGNED NOT NULL COMMENT '创建人id',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `delete_flag` int NOT NULL DEFAULT 0,
  `file_list` json NULL COMMENT '附件',
  PRIMARY KEY (`project_release_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '版本' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of project_release
-- ----------------------------

-- ----------------------------
-- Table structure for provinces
-- ----------------------------
DROP TABLE IF EXISTS `provinces`;
CREATE TABLE `provinces`  (
  `id` bigint NOT NULL COMMENT '城市id',
  `city_name` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '城市名称',
  `parent_id` bigint NOT NULL COMMENT '父级id',
  `short_name` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '简称',
  `depth` int NOT NULL COMMENT '层级',
  `city_code` varchar(4) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '城市编码',
  `zip_code` varchar(6) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '邮编',
  `merger_name` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '拼接名称',
  `longitude` varchar(16) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '经度',
  `latitude` varchar(16) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '纬度',
  `pinyin` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `if_use` int(1) UNSIGNED ZEROFILL NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci COMMENT = '省市' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of provinces
-- ----------------------------

-- ----------------------------
-- Table structure for rili
-- ----------------------------
DROP TABLE IF EXISTS `rili`;
CREATE TABLE `rili`  (
  `rili_id` bigint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `type` int NOT NULL COMMENT '类型 0会议 1任务',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '标题',
  `status` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '状态 0待开始 1进行中  2结束',
  `remarks` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '备注',
  `start_time` datetime NOT NULL,
  `end_time` datetime NOT NULL,
  `create_by` bigint UNSIGNED NOT NULL COMMENT '创建人id',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
  `delete_flag` int NOT NULL DEFAULT 0,
  `file_list` json NULL,
  `five_remind_is` int NULL DEFAULT NULL COMMENT '0',
  `ten_remind_is` int NULL DEFAULT NULL COMMENT '0',
  PRIMARY KEY (`rili_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '日历 会议 任务' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of rili
-- ----------------------------

-- ----------------------------
-- Table structure for rili_conmment
-- ----------------------------
DROP TABLE IF EXISTS `rili_conmment`;
CREATE TABLE `rili_conmment`  (
  `rili_conmment_id` bigint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `rili_id` bigint NOT NULL,
  `content` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '内容',
  `create_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '类型 0:用户  1:应用',
  `create_by` bigint UNSIGNED NOT NULL COMMENT '创建人id',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
  `delete_flag` int NOT NULL DEFAULT 0,
  PRIMARY KEY (`rili_conmment_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 149 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of rili_conmment
-- ----------------------------

-- ----------------------------
-- Table structure for rili_user
-- ----------------------------
DROP TABLE IF EXISTS `rili_user`;
CREATE TABLE `rili_user`  (
  `rili_user_id` bigint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `rili_id` bigint NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  PRIMARY KEY (`rili_user_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 43 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of rili_user
-- ----------------------------

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '角色编码',
  `sort` int UNSIGNED NOT NULL DEFAULT 0 COMMENT '排序',
  `remarks` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '备注',
  `disabled` int UNSIGNED NOT NULL DEFAULT 0 COMMENT '状态 0启用 1禁用',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `create_by` bigint UNSIGNED NOT NULL COMMENT '创建人id',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `update_by` bigint UNSIGNED NOT NULL COMMENT '更新人',
  `delete_flag` int UNSIGNED NOT NULL DEFAULT 0 COMMENT '删除 0不删除 1删除',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `role_1`(`code` ASC, `delete_flag` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '角色;' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of role
-- ----------------------------
INSERT INTO `role` VALUES (1, 'admin', 'admin', 0, '备注', 0, '2022-11-08 18:59:40', 1, '2023-07-13 12:23:31', 1, 0);

-- ----------------------------
-- Table structure for role_module
-- ----------------------------
DROP TABLE IF EXISTS `role_module`;
CREATE TABLE `role_module`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `role_id` bigint UNSIGNED NOT NULL,
  `module_id` bigint UNSIGNED NOT NULL,
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `create_by` bigint UNSIGNED NOT NULL COMMENT '创建人id',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 846 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '角色-权限;' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of role_module
-- ----------------------------
INSERT INTO `role_module` VALUES (743, 1, 2, '2025-02-23 11:01:21', 1);
INSERT INTO `role_module` VALUES (744, 1, 1, '2025-02-23 11:01:21', 1);
INSERT INTO `role_module` VALUES (745, 1, 76, '2025-02-23 11:01:21', 1);
INSERT INTO `role_module` VALUES (746, 1, 75, '2025-02-23 11:01:21', 1);
INSERT INTO `role_module` VALUES (747, 1, 79, '2025-02-23 11:01:21', 1);
INSERT INTO `role_module` VALUES (748, 1, 65, '2025-02-23 11:01:21', 1);
INSERT INTO `role_module` VALUES (749, 1, 61, '2025-02-23 11:01:21', 1);
INSERT INTO `role_module` VALUES (750, 1, 77, '2025-02-23 11:01:21', 1);
INSERT INTO `role_module` VALUES (751, 1, 78, '2025-02-23 11:01:21', 1);
INSERT INTO `role_module` VALUES (752, 1, 59, '2025-02-23 11:01:21', 1);
INSERT INTO `role_module` VALUES (753, 1, 62, '2025-02-23 11:01:21', 1);
INSERT INTO `role_module` VALUES (754, 1, 20, '2025-02-23 11:01:21', 1);
INSERT INTO `role_module` VALUES (755, 1, 21, '2025-02-23 11:01:21', 1);
INSERT INTO `role_module` VALUES (756, 1, 22, '2025-02-23 11:01:21', 1);
INSERT INTO `role_module` VALUES (757, 1, 23, '2025-02-23 11:01:21', 1);
INSERT INTO `role_module` VALUES (758, 1, 131, '2025-02-23 11:01:21', 1);
INSERT INTO `role_module` VALUES (759, 1, 132, '2025-02-23 11:01:21', 1);
INSERT INTO `role_module` VALUES (760, 1, 56, '2025-02-23 11:01:21', 1);
INSERT INTO `role_module` VALUES (761, 1, 57, '2025-02-23 11:01:21', 1);
INSERT INTO `role_module` VALUES (762, 1, 58, '2025-02-23 11:01:21', 1);
INSERT INTO `role_module` VALUES (763, 1, 138, '2025-02-23 11:01:21', 1);
INSERT INTO `role_module` VALUES (764, 1, 3, '2025-02-23 11:01:21', 1);
INSERT INTO `role_module` VALUES (765, 1, 11, '2025-02-23 11:01:21', 1);
INSERT INTO `role_module` VALUES (766, 1, 12, '2025-02-23 11:01:21', 1);
INSERT INTO `role_module` VALUES (767, 1, 13, '2025-02-23 11:01:21', 1);
INSERT INTO `role_module` VALUES (768, 1, 39, '2025-02-23 11:01:21', 1);
INSERT INTO `role_module` VALUES (769, 1, 53, '2025-02-23 11:01:21', 1);
INSERT INTO `role_module` VALUES (770, 1, 16, '2025-02-23 11:01:21', 1);
INSERT INTO `role_module` VALUES (771, 1, 5, '2025-02-23 11:01:21', 1);
INSERT INTO `role_module` VALUES (772, 1, 68, '2025-02-23 11:01:21', 1);
INSERT INTO `role_module` VALUES (773, 1, 70, '2025-02-23 11:01:21', 1);
INSERT INTO `role_module` VALUES (774, 1, 73, '2025-02-23 11:01:21', 1);
INSERT INTO `role_module` VALUES (775, 1, 81, '2025-02-23 11:01:21', 1);
INSERT INTO `role_module` VALUES (776, 1, 82, '2025-02-23 11:01:21', 1);
INSERT INTO `role_module` VALUES (777, 1, 83, '2025-02-23 11:01:21', 1);
INSERT INTO `role_module` VALUES (778, 1, 84, '2025-02-23 11:01:21', 1);
INSERT INTO `role_module` VALUES (779, 1, 85, '2025-02-23 11:01:21', 1);
INSERT INTO `role_module` VALUES (780, 1, 80, '2025-02-23 11:01:21', 1);
INSERT INTO `role_module` VALUES (781, 1, 64, '2025-02-23 11:01:21', 1);
INSERT INTO `role_module` VALUES (782, 1, 66, '2025-02-23 11:01:21', 1);
INSERT INTO `role_module` VALUES (783, 1, 67, '2025-02-23 11:01:21', 1);
INSERT INTO `role_module` VALUES (784, 1, 69, '2025-02-23 11:01:21', 1);
INSERT INTO `role_module` VALUES (785, 1, 71, '2025-02-23 11:01:21', 1);
INSERT INTO `role_module` VALUES (786, 1, 72, '2025-02-23 11:01:21', 1);
INSERT INTO `role_module` VALUES (787, 1, 74, '2025-02-23 11:01:21', 1);
INSERT INTO `role_module` VALUES (788, 1, 63, '2025-02-23 11:01:21', 1);
INSERT INTO `role_module` VALUES (789, 1, 95, '2025-02-23 11:01:21', 1);
INSERT INTO `role_module` VALUES (790, 1, 142, '2025-02-23 11:01:21', 1);
INSERT INTO `role_module` VALUES (791, 1, 88, '2025-02-23 11:01:21', 1);
INSERT INTO `role_module` VALUES (792, 1, 89, '2025-02-23 11:01:21', 1);
INSERT INTO `role_module` VALUES (793, 1, 91, '2025-02-23 11:01:21', 1);
INSERT INTO `role_module` VALUES (794, 1, 141, '2025-02-23 11:01:21', 1);
INSERT INTO `role_module` VALUES (795, 1, 86, '2025-02-23 11:01:21', 1);
INSERT INTO `role_module` VALUES (796, 1, 96, '2025-02-23 11:01:21', 1);
INSERT INTO `role_module` VALUES (797, 1, 97, '2025-02-23 11:01:21', 1);
INSERT INTO `role_module` VALUES (798, 1, 98, '2025-02-23 11:01:21', 1);
INSERT INTO `role_module` VALUES (799, 1, 99, '2025-02-23 11:01:21', 1);
INSERT INTO `role_module` VALUES (800, 1, 100, '2025-02-23 11:01:21', 1);
INSERT INTO `role_module` VALUES (801, 1, 101, '2025-02-23 11:01:21', 1);
INSERT INTO `role_module` VALUES (802, 1, 102, '2025-02-23 11:01:21', 1);
INSERT INTO `role_module` VALUES (803, 1, 103, '2025-02-23 11:01:21', 1);
INSERT INTO `role_module` VALUES (804, 1, 104, '2025-02-23 11:01:21', 1);
INSERT INTO `role_module` VALUES (805, 1, 143, '2025-02-23 11:01:21', 1);
INSERT INTO `role_module` VALUES (806, 1, 144, '2025-02-23 11:01:21', 1);
INSERT INTO `role_module` VALUES (807, 1, 145, '2025-02-23 11:01:21', 1);
INSERT INTO `role_module` VALUES (808, 1, 105, '2025-02-23 11:01:21', 1);
INSERT INTO `role_module` VALUES (809, 1, 106, '2025-02-23 11:01:21', 1);
INSERT INTO `role_module` VALUES (810, 1, 107, '2025-02-23 11:01:21', 1);
INSERT INTO `role_module` VALUES (811, 1, 108, '2025-02-23 11:01:21', 1);
INSERT INTO `role_module` VALUES (812, 1, 109, '2025-02-23 11:01:21', 1);
INSERT INTO `role_module` VALUES (813, 1, 110, '2025-02-23 11:01:21', 1);
INSERT INTO `role_module` VALUES (814, 1, 134, '2025-02-23 11:01:21', 1);
INSERT INTO `role_module` VALUES (815, 1, 135, '2025-02-23 11:01:21', 1);
INSERT INTO `role_module` VALUES (816, 1, 136, '2025-02-23 11:01:21', 1);
INSERT INTO `role_module` VALUES (817, 1, 137, '2025-02-23 11:01:21', 1);
INSERT INTO `role_module` VALUES (818, 1, 111, '2025-02-23 11:01:21', 1);
INSERT INTO `role_module` VALUES (819, 1, 112, '2025-02-23 11:01:21', 1);
INSERT INTO `role_module` VALUES (820, 1, 113, '2025-02-23 11:01:21', 1);
INSERT INTO `role_module` VALUES (821, 1, 114, '2025-02-23 11:01:21', 1);
INSERT INTO `role_module` VALUES (822, 1, 115, '2025-02-23 11:01:21', 1);
INSERT INTO `role_module` VALUES (823, 1, 133, '2025-02-23 11:01:21', 1);
INSERT INTO `role_module` VALUES (824, 1, 139, '2025-02-23 11:01:21', 1);
INSERT INTO `role_module` VALUES (825, 1, 140, '2025-02-23 11:01:21', 1);
INSERT INTO `role_module` VALUES (826, 1, 146, '2025-02-23 11:01:21', 1);
INSERT INTO `role_module` VALUES (827, 1, 116, '2025-02-23 11:01:21', 1);
INSERT INTO `role_module` VALUES (828, 1, 6, '2025-02-23 11:01:21', 1);
INSERT INTO `role_module` VALUES (829, 1, 9, '2025-02-23 11:01:21', 1);
INSERT INTO `role_module` VALUES (830, 1, 51, '2025-02-23 11:01:21', 1);
INSERT INTO `role_module` VALUES (831, 1, 8, '2025-02-23 11:01:21', 1);
INSERT INTO `role_module` VALUES (832, 1, 117, '2025-02-23 11:01:21', 1);
INSERT INTO `role_module` VALUES (833, 1, 118, '2025-02-23 11:01:21', 1);
INSERT INTO `role_module` VALUES (834, 1, 119, '2025-02-23 11:01:21', 1);
INSERT INTO `role_module` VALUES (835, 1, 120, '2025-02-23 11:01:21', 1);
INSERT INTO `role_module` VALUES (836, 1, 121, '2025-02-23 11:01:21', 1);
INSERT INTO `role_module` VALUES (837, 1, 122, '2025-02-23 11:01:21', 1);
INSERT INTO `role_module` VALUES (838, 1, 123, '2025-02-23 11:01:21', 1);
INSERT INTO `role_module` VALUES (839, 1, 124, '2025-02-23 11:01:21', 1);
INSERT INTO `role_module` VALUES (840, 1, 125, '2025-02-23 11:01:21', 1);
INSERT INTO `role_module` VALUES (841, 1, 126, '2025-02-23 11:01:21', 1);
INSERT INTO `role_module` VALUES (842, 1, 127, '2025-02-23 11:01:21', 1);
INSERT INTO `role_module` VALUES (843, 1, 128, '2025-02-23 11:01:21', 1);
INSERT INTO `role_module` VALUES (844, 1, 129, '2025-02-23 11:01:21', 1);
INSERT INTO `role_module` VALUES (845, 1, 130, '2025-02-23 11:01:21', 1);

-- ----------------------------
-- Table structure for system_config
-- ----------------------------
DROP TABLE IF EXISTS `system_config`;
CREATE TABLE `system_config`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `key` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '配置key',
  `value` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '值',
  `remarks` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `type` int NOT NULL COMMENT '字典 system_config_type',
  `update_by` bigint UNSIGNED NOT NULL COMMENT '更新人id',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `delete_flag` int NOT NULL DEFAULT 0,
  `create_by` bigint UNSIGNED NOT NULL COMMENT '创建人id',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `system_config_1`(`key` ASC, `delete_flag` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '系统配置表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of system_config
-- ----------------------------
INSERT INTO `system_config` VALUES (1, 'server_host', 'http://localhost', '此系统地址前缀\n', 0, 1, '2025-03-10 11:10:36', 0, 0, '2025-03-10 11:10:36');
INSERT INTO `system_config` VALUES (2, 'server_port', '1083', '本服务的端口号', 0, 1, '2024-04-09 09:16:27', 0, 1, '2024-04-09 09:16:27');
INSERT INTO `system_config` VALUES (3, 'doc_host', 'http://localhost:5173', '文档的地址前缀', 0, 1, '2024-05-11 17:19:53', 0, 1, '2024-05-11 17:19:53');
INSERT INTO `system_config` VALUES (4, '1', '213', '23', 0, 8, '2025-03-10 11:10:47', 4, 8, '2025-03-10 11:10:47');
INSERT INTO `system_config` VALUES (6, 'ali_model_key', NULL, '调用阿里大模型的key', 2, 1, '2025-03-10 10:57:00', 0, 1, '2025-03-10 10:57:00');

-- ----------------------------
-- Table structure for table
-- ----------------------------
DROP TABLE IF EXISTS `table`;
CREATE TABLE `table`  (
  `table_id` bigint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '表id',
  `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '表名',
  `desc` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '表描述',
  `index_list` json NULL COMMENT '索引列表',
  `database_board_id` bigint UNSIGNED NOT NULL COMMENT '数据库画板id',
  `y` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '0' COMMENT '坐标',
  `x` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '0' COMMENT '坐标',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `create_by` bigint UNSIGNED NOT NULL COMMENT '创建人id',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `update_by` bigint UNSIGNED NOT NULL COMMENT '更新人',
  `delete_flag` int UNSIGNED NOT NULL DEFAULT 0 COMMENT '删除 0不删除 1删除',
  `shape_type` varchar(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '图形类型',
  `combo_table_id` bigint NULL DEFAULT NULL COMMENT '图组的id',
  `fill_color` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '填充颜色',
  `engine_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'InnoDB' COMMENT '引擎类型',
  `remarks` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL COMMENT '业务描述',
  PRIMARY KEY (`table_id`) USING BTREE,
  UNIQUE INDEX `table_1`(`code` ASC, `database_board_id` ASC, `delete_flag` ASC) USING BTREE COMMENT '面板的表名要唯一'
) ENGINE = InnoDB AUTO_INCREMENT = 1365 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of table
-- ----------------------------

-- ----------------------------
-- Table structure for table_field
-- ----------------------------
DROP TABLE IF EXISTS `table_field`;
CREATE TABLE `table_field`  (
  `table_field_id` bigint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '表字段id',
  `table_id` bigint UNSIGNED NOT NULL COMMENT '表id',
  `database_board_id` bigint UNSIGNED NOT NULL COMMENT '数据库画板id',
  `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '字段名',
  `desc` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '字段描述',
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '字段类型',
  `length` int UNSIGNED NULL DEFAULT 0 COMMENT '长度',
  `decimal` int UNSIGNED NULL DEFAULT NULL COMMENT '小数点长度',
  `flag_not_null` int UNSIGNED NULL DEFAULT NULL COMMENT '是否为空',
  `flag_key` int UNSIGNED NULL DEFAULT NULL COMMENT '是否为主键',
  `default_value` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '默认值',
  `flag_auto_increment` int UNSIGNED NULL DEFAULT NULL COMMENT '是否自动递增',
  `flag_unsigned` int UNSIGNED NULL DEFAULT NULL COMMENT '是否无符号 0否 1是无符号',
  PRIMARY KEY (`table_field_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 133111 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '表字段' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of table_field
-- ----------------------------

-- ----------------------------
-- Table structure for talk
-- ----------------------------
DROP TABLE IF EXISTS `talk`;
CREATE TABLE `talk`  (
  `talk_id` bigint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `type` varchar(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '类型 0个人对话  1群聊 2应用通知',
  `create_by` bigint UNSIGNED NOT NULL COMMENT '创建人id',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `delete_flag` int NOT NULL DEFAULT 0,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '对话标题，群使用',
  PRIMARY KEY (`talk_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '对话表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of talk
-- ----------------------------
INSERT INTO `talk` VALUES (10, '0', 1, '2025-03-10 12:02:12', 0, '');

-- ----------------------------
-- Table structure for talk_msg
-- ----------------------------
DROP TABLE IF EXISTS `talk_msg`;
CREATE TABLE `talk_msg`  (
  `talk_msg_id` bigint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `talk_id` bigint NULL DEFAULT NULL,
  `status` varchar(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '状态：0未读  1已读',
  `type` varchar(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '类型 0text  1file',
  `source_type` varchar(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `source_id` bigint UNSIGNED NOT NULL COMMENT '发送消息的id',
  `target_type` varchar(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `target_id` bigint UNSIGNED NOT NULL COMMENT '接收消息的id',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `read_time` datetime NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '看消息的时间',
  `delete_flag` int NOT NULL DEFAULT 0,
  `delete_time` datetime NULL DEFAULT NULL COMMENT '删除消息的时间',
  `text` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '文本消息',
  `file` json NULL COMMENT '文件消息',
  PRIMARY KEY (`talk_msg_id`) USING BTREE,
  INDEX `talk_msg_1`(`talk_id` ASC) USING BTREE,
  INDEX `talk_msg_2`(`target_id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5772 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '聊天内容' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of talk_msg
-- ----------------------------
INSERT INTO `talk_msg` VALUES (5770, 10, '1', '0', '0', 1, '0', 20020, '2025-03-10 12:02:42', '2025-03-10 12:02:42', 0, NULL, '你好小虎', NULL);
INSERT INTO `talk_msg` VALUES (5771, 10, '1', '0', '0', 1, '0', 1, '2025-03-10 12:02:19', '2025-03-10 12:02:19', 0, NULL, '你好小虎', NULL);

-- ----------------------------
-- Table structure for talk_user
-- ----------------------------
DROP TABLE IF EXISTS `talk_user`;
CREATE TABLE `talk_user`  (
  `talk_user_id` bigint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `talk_id` bigint NOT NULL COMMENT '对话id',
  `type` varchar(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '类型 0用户 1应用',
  `user_id` bigint UNSIGNED NOT NULL COMMENT '用户id',
  `show_is` varchar(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '0：不显示  1显示   相当于用户的聊天框中是否显示这个聊天',
  `update_time` bigint NOT NULL COMMENT '以这个时间来进行对话列表的排序',
  PRIMARY KEY (`talk_user_id`) USING BTREE,
  INDEX `talk_user_1`(`talk_id` ASC) USING BTREE,
  INDEX `talk_user_2`(`user_id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 32 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '对话人员表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of talk_user
-- ----------------------------
INSERT INTO `talk_user` VALUES (30, 10, '0', 1, '1', 1741579339383);
INSERT INTO `talk_user` VALUES (31, 10, '0', 20020, '1', 1741579339383);

-- ----------------------------
-- Table structure for task
-- ----------------------------
DROP TABLE IF EXISTS `task`;
CREATE TABLE `task`  (
  `task_id` bigint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `user_id` bigint NOT NULL COMMENT '任务所属用户',
  `type` int NOT NULL COMMENT '类型 0任务 1里程碑 2项目',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '标题',
  `remarks` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '备注',
  `start_time` datetime NOT NULL COMMENT '开始时间',
  `end_time` datetime NOT NULL COMMENT '结束时间',
  `progress` int NOT NULL DEFAULT 0 COMMENT '进度',
  `dependencies` json NULL COMMENT '依赖的id',
  `create_by` bigint UNSIGNED NOT NULL COMMENT '创建人id',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
  `update_by` bigint UNSIGNED NOT NULL COMMENT '更新人id',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `delete_flag` int NOT NULL DEFAULT 0,
  `sort` int NOT NULL DEFAULT 0 COMMENT '排序',
  `file_list` json NULL COMMENT '附件',
  PRIMARY KEY (`task_id`) USING BTREE,
  INDEX `task_1`(`sort` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 19 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of task
-- ----------------------------

-- ----------------------------
-- Table structure for version
-- ----------------------------
DROP TABLE IF EXISTS `version`;
CREATE TABLE `version`  (
  `version_id` int NOT NULL,
  `version` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '版本',
  `status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '状态',
  `error_log` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  PRIMARY KEY (`version_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of version
-- ----------------------------

-- ----------------------------
-- Table structure for work_log
-- ----------------------------
DROP TABLE IF EXISTS `work_log`;
CREATE TABLE `work_log`  (
  `work_log_id` bigint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `hours` decimal(10, 2) NOT NULL COMMENT '工时',
  `day` date NOT NULL COMMENT '哪天',
  `project_issue_id` bigint NOT NULL,
  `project_id` bigint NOT NULL,
  `create_by` bigint UNSIGNED NOT NULL COMMENT '创建人id',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `update_by` bigint UNSIGNED NOT NULL COMMENT '更新人id',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `delete_flag` int NOT NULL DEFAULT 0,
  `sort` int NOT NULL DEFAULT 0 COMMENT '排序',
  `remarks` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '备注',
  `file_list` json NULL COMMENT '附件',
  PRIMARY KEY (`work_log_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '工时' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of work_log
-- ----------------------------

SET FOREIGN_KEY_CHECKS = 1;
