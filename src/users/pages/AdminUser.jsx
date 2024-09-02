import { useEffect, useState, useRef } from "react";
import {
  Space,
  Table,
  Popconfirm,
  Input,
  Modal,
  Form,
  Input as AntdInput,
  Select,
  Button,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import {
  usersDelete,
  usersGet,
  usersGetAll,
  usersPut,
} from "../../controllers"; // Asegúrate de tener usersUpdate en controllers

const { Option } = Select;

export const AdminUser = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userSession, setUserSession] = useState({
    _id: "",
    username: "",
    email: "",
    photo: false,
    role: "",
  });
  const [usersList, setUsersList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [form] = Form.useForm();

  // Columns for the Table
  const columns = [
    {
      title: "Name",
      dataIndex: "username",
      key: "username",
      editable: true,
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        // clearFilters,
      }) => (
        <div style={{ padding: 8 }}>
          <Input
            autoFocus
            placeholder="Escribe aquí"
            onPressEnter={() => confirm()}
            onBlur={() => confirm()}
            value={selectedKeys[0]}
            onChange={(e) => {
              setSelectedKeys(e.target.value ? [e.target.value] : []);
              confirm({ closeDropdown: false });
            }}
            style={{ width: 188, marginBottom: 8, display: "block" }}
          />
        </div>
      ),
      filterIcon: () => <SearchOutlined />,
      onFilter: (value, record) =>
        record.username.toLowerCase().includes(value.toLowerCase()),
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (text) => {
        const roles = {
          1: "Normal",
          2: "Administrador",
          3: "Premium",
        };
        return <span>{roles[text + 1]}</span>;
      },
    },
    {
      title: "Acciones",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <FiEdit
            onClick={() => openEditModal(record)}
            style={{ cursor: "pointer", marginRight: 8 }}
          />
          <Popconfirm
            title="Seguro deseas borrarlo?"
            onConfirm={() => deleteUser(record._id)}
          >
            <FiTrash2 style={{ cursor: "pointer" }} />
          </Popconfirm>
        </div>
      ),
    },
  ];

  // Open the modal with user data for editing
  const openEditModal = (user) => {
    setCurrentUser(user);
    form.setFieldsValue({
      username: user.username,
      email: user.email,
      role: user.role + 1,
    });
    setIsModalVisible(true);
  };

  // Handle form submission
  const handleOk = async () => {
    const values = form.getFieldsValue();
    const response = await usersPut(currentUser._id, values);
    console.log(response);

    if (response.statusCode === 200) {
      handleUserOnline(); // Refresh the user list
      setIsModalVisible(false); // Close the modal
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Delete specific user
  const deleteUser = async (id) => {
    const response = await usersDelete(`${id}`);
    if (response.statusCode === 200) {
      handleUserOnline();
    }
  };

  // Fetch user session and user list
  const handleUserOnline = async () => {
    const responseUsers = await usersGetAll("/");
    setUsersList(responseUsers.response);

    const response = await usersGet("/");
    if (response.statusCode === 200) {
      setUserSession((prevState) => {
        const updatedFields = Object.keys(prevState).reduce((acc, key) => {
          if (key in response.response) {
            acc[key] = response.response[key];
          }
          return acc;
        }, {});

        return {
          ...prevState,
          ...updatedFields,
        };
      });
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    handleUserOnline();
  }, []);

  const myRef = useRef(null);

  return (
    <div ref={myRef}>
      <Table columns={columns} dataSource={usersList} rowKey="_id" />

      <Modal
        title="Editar Usuario"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Guardar"
        cancelText="Cancelar"
      >
        <Form form={form} layout="vertical" name="user_edit_form">
          <Form.Item
            name="username"
            label="Nombre de Usuario"
            rules={[
              {
                required: true,
                message: "Por favor ingresa el nombre de usuario!",
              },
            ]}
          >
            <AntdInput />
          </Form.Item>
          <Form.Item
            name="email"
            label="Correo Electrónico"
            rules={[
              {
                required: true,
                message: "Por favor ingresa el correo electrónico!",
              },
            ]}
          >
            <AntdInput />
          </Form.Item>
          <Form.Item
            name="role"
            label="Rol"
            rules={[
              { required: true, message: "Por favor selecciona el rol!" },
            ]}
          >
            <Select>
              <Option value={1}>Normal</Option>
              <Option value={3}>Premium</Option>
              <Option value={2}>Administrador</Option>
            </Select>
          </Form.Item>
          {/* Agrega otros campos de formulario según sea necesario */}
        </Form>
      </Modal>
    </div>
  );
};
