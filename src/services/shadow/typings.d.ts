declare namespace API {
  type messagingMessage = {
    id?: string;
    context_id?: string;
    pk?: string;
    sn?: string;
    topic?: string;
    /** model、raw */
    transform?: string;
    /** mqtt coap ws */
    protocol?: string;
    /** 供应商 */
    supplier?: string;
    payload?: string;
    /** Unix timestamp in millisecond */
    created?: string;
  };

  type protoForwardingPropertiesReq = {
    /** 空代表所有 */
    pks?: string[];
    /** 空代表所有 */
    sns?: string[];
    /** 空代表所有 */
    codes?: string[];
  };

  type protoForwardingPropertiesResp = {
    code?: number;
    msg?: string;
    list?: protoForwardingProperty[];
  };

  type protoForwardingProperty = {
    sn?: string;
    property_map?: Record<string, any>;
  };

  type protoForwardingPropertyItem = {
    value?: string;
    update_time?: string;
  };

  type protoForwardingPublishMsgReq = {
    sn?: string;
    context_id?: string;
    msg_type?: string;
    code?: string;
    topic?: string;
    use_topic?: boolean;
    payload?: string;
    /** 毫秒超时 */
    timeout?: number;
  };

  type protoForwardingPublishMsgResp = {
    code?: number;
    msg?: string;
    m?: messagingMessage;
  };

  type protoForwardingServiceReplyReq = {
    sn?: string;
    /** 空为异步请求 */
    context_id?: string;
    code?: string;
    payload?: string;
  };

  type protoForwardingServiceReplyResp = {
    code?: number;
    msg?: string;
  };

  type protoForwardingServiceReq = {
    sn?: string;
    /** 空为异步请求 */
    context_id?: string;
    code?: string;
    payload?: string;
    /** 毫秒超时 */
    timeout?: number;
  };

  type protoForwardingServiceResp = {
    code?: number;
    msg?: string;
    m?: messagingMessage;
  };

  type protoForwardingSetPropertiesReq = {
    sn?: string;
    /** 空为异步请求 */
    context_id?: string;
    payload?: string;
    /** 毫秒超时 */
    timeout?: number;
  };

  type protoForwardingSetPropertiesResp = {
    code?: number;
    msg?: string;
    m?: messagingMessage;
  };

  type protoForwardingSetPropertyReq = {
    sn?: string;
    /** 空为异步请求 */
    context_id?: string;
    code?: string;
    payload?: string;
    /** 毫秒超时 */
    timeout?: number;
  };

  type protoForwardingSetPropertyResp = {
    code?: number;
    msg?: string;
    m?: messagingMessage;
  };

  type protoForwardingWatchReq = {
    context_id?: string;
    /** 空代表所有 */
    pks?: string[];
    /** 空代表所有 */
    sns?: string[];
    msg_types?: protoMSGTYPE[];
    /** 空代表所有 */
    codes?: string[];
  };

  type protoForwardingWatchResp = {
    code?: number;
    msg?: string;
    m?: messagingMessage;
  };

  type protoMsgLog = {
    pk?: string;
    sn?: string;
    content?: string;
    topic?: string;
    log_type?: string;
    dir?: string;
    create_time?: string;
    msg_id?: string;
    context_id?: string;
    result?: string;
    code?: string;
  };

  type protoMsgLogPageReq = {
    /** 第几页，从1开始 */
    page_index?: number;
    /** 每页多少条 */
    page_size?: number;
    /** 产品Key */
    pk?: string;
    sn?: string;
    log_types?: string[];
    topics?: string[];
    msg_id?: string;
    context_id?: string;
    dir?: string;
    start_time?: string;
    end_time?: string;
    code?: string;
  };

  type protoMsgLogPageResp = {
    code?: number;
    msg?: string;
    total?: number;
    items?: protoMsgLog[];
  };

  type protoMSGTYPE = 'PROPERTY' | 'PROPERTY_REPLY' | 'EVENT' | 'SERVICE' | 'SERVICE_REPLY';

  type protoShadow = {
    /** 影子id */
    id?: string;
    /** 产品pk */
    pk?: string;
    /** 影子sn */
    sn?: string;
    /** 后端生成 */
    group?: number;
    /** 影子数据 */
    shadow?: string;
  };

  type protoShadowAddReq = {
    /** 影子sn */
    sn?: string;
    /** 产品pk */
    pk?: string;
  };

  type protoShadowAddResp = {
    code?: number;
    msg?: string;
    id?: string;
  };

  type protoShadowDelReq = {
    /** 影子id */
    id?: string;
  };

  type protoShadowDelResp = {
    code?: number;
    msg?: string;
    id?: string;
  };

  type protoShadowGetReq = {
    /** 影子id */
    id?: string;
  };

  type protoShadowGetResp = {
    code?: number;
    msg?: string;
    item?: protoShadow;
  };

  type protoShadowListReq = {};

  type protoShadowListResp = {
    code?: number;
    msg?: string;
    items?: protoShadow[];
  };

  type protoShadowPageReq = {
    /** 第几页，从1开始 */
    page_index?: number;
    /** 每页多少条 */
    page_size?: number;
  };

  type protoShadowPageResp = {
    code?: number;
    msg?: string;
    total?: number;
    items?: protoShadow[];
  };

  type protoShadowUpdateReq = {
    /** 影子id */
    id?: string;
  };

  type protoShadowUpdateResp = {
    code?: number;
    msg?: string;
    id?: string;
  };
}
