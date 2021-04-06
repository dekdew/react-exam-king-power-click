import { Table, Space, Button, Typography } from "antd";
import { memo, useCallback, useState } from "react";
import { useRegisterContext } from "../stores/RegisterContext";
import DeleteModal from "./DeleteModal";
import EditDrawer from "./EditDrawer";

const RegisterTable = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSelectedDeleteModalOpen, setIsSelectedDeleteModalOpen] = useState(
    false
  );
  const [selectedData, setSelectedData] = useState<any>();
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const { registerData, deleteById, deleteSelected } = useRegisterContext();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const handleOpenDeleteModal = useCallback((data: any) => {
    setIsDeleteModalOpen(true);
    setSelectedData(data);
  }, []);

  const handleCloseDeleteModal = useCallback((key: any) => {
    setIsDeleteModalOpen(false);
  }, []);

  const handleOpenSelectedDeleteModal = useCallback((data: any) => {
    setIsSelectedDeleteModalOpen(true);
  }, []);

  const handleCloseSelectedDeleteModal = useCallback((key: any) => {
    setIsSelectedDeleteModalOpen(false);
  }, []);

  const handleDelete = useCallback(async () => {
    await deleteById(selectedData?.key);

    setIsDeleteModalOpen(false);
  }, [deleteById, selectedData?.key]);

  const handleSelectedDelete = useCallback(async () => {
    await deleteSelected(selectedRowKeys);

    setIsSelectedDeleteModalOpen(false);
  }, [deleteSelected, selectedRowKeys]);

  const handleOpenEditDrawer = useCallback((data: any) => {
    setIsEditDrawerOpen(true);
    setSelectedData(data);
  }, []);

  const handleCloseEditDrawer = useCallback((key: any) => {
    setIsEditDrawerOpen(false);
  }, []);

  const onSelectChange = useCallback((keys: any) => {
    setSelectedRowKeys(keys);
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "firstName",
      key: "firstName",
      render: (text: any, row: any) => (
        <>
          {text} {row.lastName}
        </>
      ),
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Mobile Phone",
      dataIndex: "mobilePhone",
      key: "mobilePhone",
      render: (mobilePhone: any) => (
        <>
          +{mobilePhone?.code}
          {mobilePhone?.phone}
        </>
      ),
    },
    {
      title: "Nationality",
      dataIndex: "nationality",
      key: "nationality",
    },
    {
      dataIndex: "key",
      key: "key",
      render: (id: any, row: any) => (
        <Space size="small">
          <Button
            type="link"
            onClick={() => {
              handleOpenEditDrawer(row);
            }}
          >
            Edit
          </Button>
          <Button
            danger
            type="link"
            onClick={() => {
              handleOpenDeleteModal(row);
            }}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Button
        onClick={handleOpenSelectedDeleteModal}
        danger
        disabled={!selectedRowKeys?.length}
      >
        Delete
      </Button>
      <Typography.Text style={{ marginLeft: "10px" }}>
        {selectedRowKeys?.length} selected row
        {selectedRowKeys?.length > 1 ? "s" : ""}
      </Typography.Text>
      <Table
        rowSelection={{
          type: "checkbox",
          onChange: onSelectChange,
          selectedRowKeys: selectedRowKeys,
        }}
        columns={columns}
        dataSource={registerData}
        style={{ marginTop: "20px" }}
      />

      <DeleteModal
        visible={isDeleteModalOpen}
        onOk={handleDelete}
        onCancel={handleCloseDeleteModal}
        text={`${selectedData?.title} ${selectedData?.firstName} ${selectedData?.lastName}`}
      />

      <DeleteModal
        visible={isSelectedDeleteModalOpen}
        onOk={handleSelectedDelete}
        onCancel={handleCloseSelectedDeleteModal}
        text={`${selectedRowKeys?.length} selected row${
          selectedRowKeys?.length > 1 ? "s" : ""
        }`}
      />

      <EditDrawer
        data={selectedData}
        visible={isEditDrawerOpen}
        onClose={handleCloseEditDrawer}
      />
    </>
  );
};

export default memo(RegisterTable);
