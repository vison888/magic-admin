import { Button, Modal, Typography } from 'antd';
import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

const { Text } = Typography;

const ShowJson: React.FC<{
  info: any;
}> = ({ info }) => {
  const [visible, setVisible] = useState(false);
  const onOpen = () => setVisible(true);
  const onClose = () => setVisible(false);

  // 格式化JSON字符串
  const formatJson = (jsonString: string) => {
    try {
      const parsed = JSON.parse(jsonString);
      return JSON.stringify(parsed, null, 2);
    } catch (error) {
      return jsonString;
    }
  };

  return (
    <>
      <Button
        type="link"
        onClick={onOpen}
        style={{ padding: 0, height: 'auto' }}
      >
        查看详情
      </Button>

      <Modal
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>JSON 数据详情</span>
            {info.name && (
              <Text type="secondary" style={{ fontSize: '14px' }}>
                ({info.name})
              </Text>
            )}
          </div>
        }
        open={visible}
        onCancel={onClose}
        footer={[
          <Button key="close" onClick={onClose}>
            关闭
          </Button>,
        ]}
        width={800}
        bodyStyle={{
          maxHeight: '600px',
          overflow: 'auto',
          padding: '16px',
        }}
      >
        <div
          style={{
            background: '#f8f9fa',
            border: '1px solid #e9ecef',
            borderRadius: '6px',
            padding: '16px',
          }}
        >
          <SyntaxHighlighter
            language="json"
            style={tomorrow}
            customStyle={{
              margin: 0,
              background: 'transparent',
              fontSize: '13px',
              lineHeight: '1.5',
            }}
            showLineNumbers={true}
            wrapLines={true}
          >
            {formatJson(info.content)}
          </SyntaxHighlighter>
        </div>
      </Modal>
    </>
  );
};

export default ShowJson;
