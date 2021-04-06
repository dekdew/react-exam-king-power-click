import { notification } from "antd";
import {
  useState,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useCallback,
} from "react";

interface registerDataProps {
  key: any;
  title: "Mr." | "Mrs." | "Ms.";
  firstName: string;
  lastName: string;
  birthday: Date;
  nationality: string;
  citizenId: string;
  gender: "Male" | "Female" | "Unisex";
  mobilePhone: string;
  passportNo?: string;
  expectedSalary: number;
}

const RegisterContext = createContext(null);

const RegisterContextProvider = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  const [registerData, setRegisterData] = useState<registerDataProps[]>([]);
  const asyncLocalStorage = useMemo(() => {
    return {
      setItem: async (key: any, value: any) => {
        await Promise.resolve();
        localStorage.setItem(key, value);
      },
      getItem: async (key: any) => {
        await Promise.resolve();
        return localStorage.getItem(key);
      },
    };
  }, []);

  const register = useCallback(
    (data: any) => {
      const newData = [...registerData, data];

      try {
        asyncLocalStorage
          .setItem("registerData", JSON.stringify(newData))
          .then(() => {
            setRegisterData(newData);

            notification.success({
              message: "Data saved successfully.",
            });
          });
      } catch (err) {
        console.log(err);
      }
    },
    [asyncLocalStorage, registerData]
  );

  const deleteById = useCallback(
    (id: any) => {
      const filterData = registerData.filter(function (obj) {
        return obj?.key !== id;
      });
      const newData = [...filterData];

      try {
        asyncLocalStorage
          .setItem("registerData", JSON.stringify(newData))
          .then(() => {
            setRegisterData(newData);

            notification.success({
              message: "Data deleted successfully.",
            });
          });
      } catch (err) {
        console.log(err);
      }
    },
    [asyncLocalStorage, registerData]
  );

  const deleteSelected = useCallback(
    (keys: any) => {
      const filterData = registerData.filter(function (obj) {
        return !keys.includes(obj?.key);
      });
      const newData = [...filterData];

      try {
        asyncLocalStorage
          .setItem("registerData", JSON.stringify(newData))
          .then(() => {
            setRegisterData(newData);

            notification.success({
              message: "Data deleted successfully.",
            });
          });
      } catch (err) {
        console.log(err);
      }
    },
    [asyncLocalStorage, registerData]
  );

  const updateById = useCallback(
    (id: any, newObjData: any) => {
      const objIndex = registerData.findIndex((obj) => obj?.key === id);
      let newData = [...registerData];
      newData[objIndex] = newObjData;

      try {
        asyncLocalStorage
          .setItem("registerData", JSON.stringify([...newData]))
          .then(() => {
            setRegisterData([...newData]);

            notification.success({
              message: "Data deleted successfully.",
            });
          });
      } catch (err) {
        console.log(err);
      }
    },
    [asyncLocalStorage, registerData]
  );

  const stores: any = {
    registerData,
    setRegisterData,
    asyncLocalStorage,
    register,
    deleteById,
    deleteSelected,
    updateById,
  };

  useEffect(() => {
    asyncLocalStorage.getItem("registerData").then((data: any) => {
      setRegisterData(JSON.parse(data) || []);
    });
  }, [asyncLocalStorage]);

  return (
    <RegisterContext.Provider value={stores}>
      {children}
    </RegisterContext.Provider>
  );
};

const useRegisterContext = () => {
  const context = useContext(RegisterContext);
  if (context === undefined) {
    throw new Error("Error context undefined");
  }
  return context as any;
};
export { RegisterContextProvider, useRegisterContext };
