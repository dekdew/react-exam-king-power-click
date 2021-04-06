import { Layout, Card } from "antd";
import { Content } from "antd/lib/layout/layout";
import styled from "styled-components";
import RegisterForm from "./Components/RegisterForm";
import RegisterTable from "./Components/RegisterTable";
import { RegisterContextProvider } from "./stores/RegisterContext";

const ContentStyle = styled(Content)`
  min-height: 100vh;
  max-width: 1024px;
  margin: 0 auto;
  padding: 30px;
`;

const CardStyle = styled(Card)`
  width: 100%;
  border-radius: 10px;
  box-shadow: 0px 0px 30px -30px black;
  padding: 10px;
  margin: 30px 0;
`;

const App = () => {
  return (
    <Layout>
      <ContentStyle>
        <RegisterContextProvider>
          <CardStyle>
            <RegisterForm />
          </CardStyle>

          <CardStyle>
            <RegisterTable />
          </CardStyle>
        </RegisterContextProvider>
      </ContentStyle>
    </Layout>
  );
};

export default App;
