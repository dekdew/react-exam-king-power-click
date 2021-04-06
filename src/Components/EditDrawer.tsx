import { Card, Drawer } from "antd";
import { Content } from "antd/lib/layout/layout";
import { memo } from "react";
import styled from "styled-components";
import RegisterForm from "./RegisterForm";

interface EditDrawerProps {
  data?: any;
  visible?: boolean;
  onClose?: any;
}

const ContentStyle = styled(Content)`
  max-width: 1024px;
  margin: 0 auto;
  padding: 0 30px;
`;

const CardStyle = styled(Card)`
  width: 100%;
  border-radius: 10px;
  box-shadow: 0px 0px 30px -30px black;
  padding: 10px;
`;

const EditDrawer = ({ data, visible, onClose }: EditDrawerProps) => {
  return (
    <Drawer
      destroyOnClose
      visible={visible}
      onClose={onClose}
      placement="bottom"
      height="100vh"
      bodyStyle={{ backgroundColor: "#f0f2f5" }}
      title="Edit"
    >
      <ContentStyle>
        <CardStyle>
          <RegisterForm defaultValue={data} onUpdated={onClose} />
        </CardStyle>
      </ContentStyle>
    </Drawer>
  );
};

export default memo(EditDrawer);
