import { memo } from "react";
import { Modal } from "antd";

interface DeleteModalProps {
  text?: any;
  visible?: boolean;
  onOk?: any;
  onCancel?: any;
}

const DeleteModal = ({ text, visible, onOk, onCancel }: DeleteModalProps) => {
  return (
    <Modal
      title={`Delete`}
      destroyOnClose
      maskClosable={false}
      closable={false}
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
      okText="Delete"
    >
      Do you want to delete <b>{text}</b> ?
    </Modal>
  );
};

export default memo(DeleteModal);
