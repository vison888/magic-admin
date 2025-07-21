declare namespace API {
  type protoAddResourceReq = {
    /** 资源名称 */
    name?: string;
    /** 资源类型 "api"-接口 "menu"-菜单 "rule"-规则 */
    type?: string;
    /** 资源内容 */
    content?: string;
  };

  type protoAddResourceResp = {
    /** 返回码 */
    code?: number;
    /** 返回信息 */
    msg?: string;
    /** 资源ID */
    id?: string;
  };

  type protoAPIPermissionsReq = {
    /** 用户ID */
    token?: string;
    /** api地址 */
    api?: string;
  };

  type protoAPIPermissionsResp = {
    code?: number;
    msg?: string;
    /** 权限使能 */
    enable?: boolean;
    /** 用户id */
    user_id?: string;
    /** 角色标识 */
    role_codes?: string[];
    /** 应用标识 */
    app_code?: string;
    /** http状态 */
    http_status?: number;
    /** 是否是白名单 */
    is_white?: boolean;
  };

  type protoApiWhiteList = {
    /** id */
    id?: string;
    /** 接口名称 */
    name?: string;
    /** 接口路径 */
    path?: string;
    /** 创建时间 */
    create_time?: string;
    /** 创建人 */
    create_username?: string;
  };

  type protoApiWhiteListAddReq = {
    /** 接口名称 */
    name?: string;
    /** 接口地址 */
    path?: string;
  };

  type protoApiWhiteListAddResp = {
    code?: number;
    msg?: string;
    id?: string;
  };

  type protoApiWhiteListDelReq = {
    id?: string;
  };

  type protoApiWhiteListDelResp = {
    code?: number;
    msg?: string;
    id?: string;
  };

  type protoApiWhiteListPageReq = {
    /** 第几页，从1开始 */
    page_index?: number;
    /** 每页多少条 */
    page_size?: number;
    /** 接口名称 */
    name?: string;
  };

  type protoApiWhiteListPageResp = {
    code?: number;
    msg?: string;
    total?: number;
    list?: protoApiWhiteList[];
  };

  type protoApiWhiteListRefreshReq = {};

  type protoApiWhiteListRefreshResp = {
    code?: number;
    msg?: string;
  };

  type protoApiWhiteListUpdateReq = {
    id?: string;
    /** 接口名称 */
    name?: string;
    /** 接口地址 */
    path?: string;
  };

  type protoApiWhiteListUpdateResp = {
    code?: number;
    msg?: string;
    id?: string;
  };

  type protoApp = {
    /** 应用ID */
    id?: string;
    /** 应用标识 */
    code?: string;
    /** 应用名称 */
    name?: string;
    /** 应用描述 */
    describe?: string;
    /** 创建人 */
    create_user?: string;
    /** 创建人 */
    create_username?: string;
    /** 创建时间 */
    create_time?: string;
  };

  type protoAppAddReq = {
    /** 应用标识 */
    code?: string;
    /** 应用名称 */
    name?: string;
    /** 应用描述 */
    describe?: string;
  };

  type protoAppAddResp = {
    code?: number;
    msg?: string;
    id?: string;
  };

  type protoAppDelReq = {
    /** 应用id */
    id?: string;
  };

  type protoAppDelResp = {
    code?: number;
    msg?: string;
  };

  type protoAppGetReq = {
    /** 应用id */
    id?: string;
  };

  type protoAppGetResp = {
    code?: number;
    msg?: string;
    App?: protoApp;
  };

  type protoAppPageReq = {
    /** 第几页，从1开始 */
    page_index?: number;
    /** 每页多少条 */
    page_size?: number;
    /** 应用名称 模糊查询 */
    name?: string;
  };

  type protoAppPageResp = {
    code?: number;
    msg?: string;
    total?: number;
    list?: protoApp[];
  };

  type protoAppUpdateReq = {
    /** 应用id */
    id?: string;
    /** 应用名称 */
    name?: string;
    /** 应用标识 */
    code?: string;
    /** 应用描述 */
    describe?: string;
  };

  type protoAppUpdateResp = {
    code?: number;
    msg?: string;
  };

  type protoDelTokenReq = {
    /** 用户ID */
    user_id?: string;
    /** 用户角色 */
    role_code?: string;
    /** 应用code */
    app_code?: string;
    /** token */
    token?: string;
  };

  type protoDelTokenResp = {
    code?: number;
    msg?: string;
  };

  type protoForgetPasswordReq = {
    email?: string;
    verification_code?: string;
    password?: string;
  };

  type protoForgetPasswordResp = {
    code?: number;
    msg?: string;
  };

  type protoGenTokenReq = {
    /** 用户id */
    user_id?: string;
    /** 角色code */
    role_code?: string;
    /** 应用标识 */
    app_code?: string;
    /** token到期时间，单位：秒(非必填,默认七天) */
    expiry?: string;
  };

  type protoGenTokenResp = {
    code?: number;
    msg?: string;
    /** 返回token */
    token?: string;
  };

  type protoInspectReq = {
    /** token字符串 */
    token?: string;
  };

  type protoInspectResp = {
    code?: number;
    msg?: string;
    /** 应用code */
    app_code?: string;
    /** 是否已存在 */
    is_exist?: boolean;
    user?: protoUser;
  };

  type protoLinkUserRolesReq = {
    /** 用户ID */
    user_id?: string;
    /** 角色标识列表 */
    role_codes?: string[];
  };

  type protoLoginByEmailReq = {
    /** 用户邮箱 */
    email?: string;
    /** 验证码 */
    Password?: string;
    /** 应用code */
    app_code?: string;
    /** 角色 */
    role_code?: string;
    /** 账号过期时间，单位：秒(非必填,默认七天) */
    expiry?: string;
  };

  type protoLoginByEmailResp = {
    code?: number;
    msg?: string;
    /** 用户id */
    user_id?: string;
    /** 角色标识 */
    role_codes?: string[];
    /** token */
    token?: string;
  };

  type protoLoginByPhoneReq = {
    /** 用户手机号 */
    phone?: string;
    /** 验证码 */
    verify_code?: string;
    /** 应用code */
    app_code?: string;
    /** 角色 */
    role_code?: string;
    /** 账号过期时间，单位：秒(非必填,默认七天) */
    expiry?: string;
  };

  type protoLoginByPhoneResp = {
    code?: number;
    msg?: string;
    /** 用户id */
    user_id?: string;
    /** 角色标识 */
    role_codes?: string[];
    /** token */
    token?: string;
  };

  type protoLoginReq = {
    /** 用户名 */
    account?: string;
    /** 用户密码 */
    password?: string;
    /** 角色 */
    role_code?: string;
    /** 应用code */
    app_code?: string;
    /** 账号过期时间，单位：秒(非必填,默认七天) */
    expiry?: string;
  };

  type protoLoginResp = {
    code?: number;
    msg?: string;
    /** 用户id */
    user_id?: string;
    /** 角色标识 */
    role_codes?: string[];
    /** token */
    token?: string;
  };

  type protoLogoutReq = {};

  type protoLogoutResp = {
    code?: number;
    msg?: string;
  };

  type protoPermission = {
    id?: string;
    /** 角色id */
    role_id?: string;
    /** 角色名称 */
    role_name?: string;
    /** 应用id */
    app_id?: string;
    /** 应用名称 */
    app_name?: string;
    /** 资源类型  "api"-接口 "menu"-菜单 "rule"-规则 */
    resource_type?: string;
    /** 资源内容 json格式:[{"resource_id":"1","value":"xxx"}] */
    resources?: string;
    /** 创建时间 */
    create_time?: string;
    /** 资源展开的json内容 */
    resources_json?: string;
  };

  type protoPermissionAddReq = {
    /** 角色id */
    role_id?: string;
    /** 应用id */
    app_id?: string;
    /** 资源类型  "api"-接口 "menu"-菜单 "rule"-规则 */
    resource_type?: string;
    /** 资源内容 json格式:[{"resource_id":"1","value":"xxx"}] */
    resources?: string;
  };

  type protoPermissionAddResp = {
    code?: number;
    msg?: string;
    /** 权限id */
    id?: string;
  };

  type protoPermissionDelReq = {
    /** 权限id */
    id?: string;
  };

  type protoPermissionDelResp = {
    code?: number;
    msg?: string;
  };

  type protoPermissionGetMenuReq = {
    app_code?: string;
  };

  type protoPermissionGetMenuResp = {
    code?: number;
    msg?: string;
    /** 菜单详情 */
    menu?: string;
  };

  type protoPermissionGetReq = {
    /** 权限id */
    id?: string;
  };

  type protoPermissionGetResp = {
    code?: number;
    msg?: string;
    item?: protoPermission;
  };

  type protoPermissionPageReq = {
    /** 第几页，从1开始 */
    page_index?: number;
    /** 每页多少条 */
    page_size?: number;
    /** 角色id */
    role_id?: string;
    /** 应用id */
    app_id?: string;
  };

  type protoPermissionPageResp = {
    code?: number;
    msg?: string;
    total?: number;
    list?: protoPermission[];
  };

  type protoPermissionUpdateReq = {
    /** 权限id */
    id?: string;
    /** 角色Id */
    role_id?: string;
    /** 应用id */
    app_id?: string;
    /** 资源内容 json格式:[{"resource_id":"1","value":"xxx"}] */
    resources?: string;
  };

  type protoPermissionUpdateResp = {
    code?: number;
    msg?: string;
  };

  type protoRefreshTokenReq = {
    token?: string;
  };

  type protoRefreshTokenResp = {
    code?: number;
    msg?: string;
    /** token字符串 */
    token?: string;
  };

  type protoRequest = {
    id?: string;
  };

  type protoResource = {
    /** 资源ID */
    id?: string;
    /** 资源名称 */
    name?: string;
    /** 资源类型  "api"-接口 "menu"-菜单 "rule"-规则 */
    type?: string;
    /** 资源内容 */
    content?: string;
    /** 资源属性 */
    property?: string;
    /** 父级资源 */
    parent_id?: string;
    /** 创建时间 */
    create_time?: string;
    /** 更新时间 */
    update_time?: string;
  };

  type protoResourceGetResp = {
    /** 返回码 */
    code?: number;
    /** 返回信息 */
    msg?: string;
    item?: protoResource;
  };

  type protoResourcePageReq = {
    /** 第几页，从1开始 */
    page_index?: number;
    /** 每页多少条 */
    page_size?: number;
    /** 资源类型  "api"-接口 "menu"-菜单 "rule"-规则 */
    type?: string;
    /** 资源名称 模糊查询 */
    name?: string;
    /** 资源内容 模糊查询 */
    content?: string;
  };

  type protoResourcePageResp = {
    code?: number;
    msg?: string;
    total?: number;
    list?: protoResource[];
  };

  type protoResourceRuleTypeReq = {};

  type protoResourceRuleTypeResp = {
    code?: number;
    msg?: string;
    list?: string[];
  };

  type protoResponse = {
    /** 返回码 */
    code?: number;
    /** 返回信息 */
    msg?: string;
  };

  type protoRole = {
    /** 角色ID */
    id?: string;
    /** 角色标识 */
    code?: string;
    /** 角色名称 */
    name?: string;
    /** 创建人id */
    create_user?: string;
    /** 创建人 */
    create_username?: string;
    /** 创建时间 */
    create_time?: string;
  };

  type protoRoleAddReq = {
    /** 角色标识 */
    code?: string;
    /** 角色名称 */
    name?: string;
  };

  type protoRoleAddResp = {
    code?: number;
    msg?: string;
    id?: string;
  };

  type protoRoleDelReq = {
    /** 角色id */
    id?: string;
  };

  type protoRoleDelResp = {
    code?: number;
    msg?: string;
  };

  type protoRoleGetReq = {
    /** 角色id */
    id?: string;
  };

  type protoRoleGetResp = {
    code?: number;
    msg?: string;
    role?: protoRole;
  };

  type protoRoleListByCodeReq = {
    /** 应用标识 */
    app_code?: string;
    /** 角色标识 */
    role_codes?: string[];
  };

  type protoRoleListByCodeResp = {
    code?: number;
    msg?: string;
    items?: protoRole[];
  };

  type protoRoleListReq = {
    /** 应用标识 */
    app_code?: string;
  };

  type protoRoleListResp = {
    code?: number;
    msg?: string;
    items?: protoRole[];
  };

  type protoRolePageReq = {
    /** 第几页，从1开始 */
    page_index?: number;
    /** 每页多少条 */
    page_size?: number;
    /** 角色名称 模糊查询 */
    name?: string;
  };

  type protoRolePageResp = {
    code?: number;
    msg?: string;
    total?: number;
    list?: protoRole[];
  };

  type protoRoleUpdateReq = {
    /** 角色id */
    id?: string;
    /** 角色名称 */
    name?: string;
    /** 角色名称 */
    code?: string;
  };

  type protoRoleUpdateResp = {
    code?: number;
    msg?: string;
  };

  type protoUnlinkUserRolesReq = {
    /** 用户ID */
    user_id?: string;
    /** 角色标识列表 */
    role_codes?: string[];
  };

  type protoUpdatePasswordReq = {
    /** 用户ID */
    user_id?: string;
    /** 当密码 */
    cur_password?: string;
    /** 新密码 */
    new_password?: string;
  };

  type protoUpdatePasswordResp = {
    code?: number;
    msg?: string;
  };

  type protoUpdateResourceReq = {
    /** 资源ID */
    id?: string;
    /** 资源名称 */
    name?: string;
    /** 资源内容 */
    content?: string;
  };

  type protoUser = {
    /** 用户id */
    id?: string;
    /** 账号 */
    account?: string;
    /** 密码 */
    password?: string;
    /** 昵称 */
    nick_name?: string;
    /** 手机号 */
    phone?: string;
    /** 密码 */
    email?: string;
    /** 创建时间 */
    create_time?: string;
    /** 创建用户 */
    create_username?: string;
    /** 创建用户Id */
    create_user?: string;
    /** 角色标识 */
    role_code?: string[];
  };

  type protoUserAddReq = {
    item?: protoUser;
    /** 应用标识 */
    app_code?: string;
  };

  type protoUserAddResp = {
    code?: number;
    msg?: string;
    id?: string;
  };

  type protoUserDelReq = {
    /** 用户id */
    id?: string;
    /** 应用CODE，不为空时清理该用户在该应用下的角色 */
    app_code?: string;
  };

  type protoUserDelResp = {
    code?: number;
    msg?: string;
  };

  type protoUserGetReq = {
    /** 用户id */
    id?: string;
    /** 应用标识 */
    app_code?: string;
  };

  type protoUserGetResp = {
    code?: number;
    msg?: string;
    item?: protoUser;
  };

  type protoUserPageBySqlReq = {
    /** 第几页，从1开始 */
    page_index?: number;
    /** 每页多少条 */
    page_size?: number;
    /** 排序 */
    order_key?: string;
    /** 排序方式:升序false(默认)|降序true */
    desc?: boolean;
    /** 筛选条件 account like %%张%% and user_id in not ("1") */
    filter?: string;
    /** 应用标识 */
    app_code?: string;
  };

  type protoUserPageBySqlResp = {
    code?: number;
    msg?: string;
    total?: number;
    list?: protoUser[];
  };

  type protoUserPageReq = {
    /** 第几页，从1开始 */
    page_index?: number;
    /** 每页多少条 */
    page_size?: number;
    /** 排序 */
    order_key?: string;
    /** 排序方式:升序false(默认)|降序true */
    desc?: boolean;
    /** 应用code */
    app_code?: string;
    /** 账户名 */
    account?: string;
    /** 昵称 */
    nick_name?: string;
    /** 手机号 */
    phone?: string;
    /** 密码 */
    email?: string;
    /** 创建人 */
    create_user?: string;
    /** 角色 */
    role_codes?: string[];
  };

  type protoUserPageResp = {
    code?: number;
    msg?: string;
    total?: number;
    list?: protoUser[];
  };

  type protoUserUpdateReq = {
    Item?: protoUser;
    /** 应用标识 */
    app_code?: string;
  };

  type protoUserUpdateResp = {
    code?: number;
    msg?: string;
    id?: string;
  };

  type protoVerificationCodeReq = {
    /** 发送对象 */
    object?: string;
    /** 验证方式 1-手机 2-邮箱 */
    method?: number;
    /** 应用code */
    app_code?: string;
  };

  type protoVerifyPasswordReq = {
    user_id?: string;
    password?: string;
  };

  type protoVerifyPasswordResp = {
    code?: number;
    msg?: string;
  };
}
