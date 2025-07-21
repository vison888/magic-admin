
import { ProFormTextArea,ProFormText,ModalForm} from '@ant-design/pro-components';
import { Button, } from 'antd';
import { useState } from 'react';

const FORMITEM_LAYOUT = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
  };

const LAYOUT_TYPE_HORIZONTAL = 'horizontal';

const ShowJson: React.FC<{
    info: any;
  }> = ({info}) => {
    const [visible, setVisible] = useState(false);
    const onOpen = () => setVisible(true);
    const onClose = () => setVisible(false);

    return (
        <ModalForm
        initialValues={
            {
                name:info.name,
                content:JSON.stringify(JSON.parse(info.content as string), null,2)
            }
        }
        width={550}
        title={"json数据"}
        trigger={
          <Button
            type='link'
            onClick={() => {
              onOpen();
            }}
          >
        查看详情
          </Button>
        }
        open={visible}
        modalProps={{
          onCancel: () => {
            onClose()
          },
        }}
        {...FORMITEM_LAYOUT}
        layout={LAYOUT_TYPE_HORIZONTAL}
        onFinish={async ()=> {onClose()}}
      >
        {info.name !== "" && (
        <ProFormText
            readonly
            name="name"
            width="md"
            label="名称"
        />
        )}


       {/* <div style={{border:'10px solid'}}> */}
       <ProFormTextArea 
            readonly
            bordered
            name="content"
            width="md"
            label="详细内容"
            fieldProps={{
              autoSize: true,
            }}
        />
        {/* </div>/ */}
      </ModalForm>
    
    );
};

export default ShowJson;
