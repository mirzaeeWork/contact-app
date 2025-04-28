import { apiInstance } from "./config";

export const callApi = async ({ dispatch, api, defaultData,message }) => {
  dispatch({ type: "REQUEST" });
  try {
    const data = await api(defaultData);
    dispatch({ type: "SUCCESS", payload: {data,message} });
  } catch (error) {
    dispatch({ type: "ERROR", payload: error.message });
  }
};

export const getAllUsers = () => apiInstance.get("/users");

export const addUser = (newUser) => apiInstance.post("/users", newUser);

export const editUser = (user) => apiInstance.put(`/users/${user.id}`, user);

export const deleteUser = (id) => apiInstance.delete(`/users/${id}`);

export const deleteUsers = (ids) =>
  Promise.all(ids.map((id) => apiInstance.delete(`/users/${id}`)));

export const searchUsers = (users, query) => {
  const filtered = users.filter(({ firstName, lastName, email }) =>
    [firstName, lastName, email].some((field) =>
      field.toLowerCase().includes(query.toLowerCase())
    )
  );
  return filtered;
};
