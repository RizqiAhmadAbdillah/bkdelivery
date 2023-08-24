import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  user: {
    id: 0,
    email: "",
    username: "",
    password: "",
    role: "",
  },
};

function getStoredAuthState() {
  const storedToken = localStorage.getItem("token");
  const storedUserString = localStorage.getItem("user");
  if (storedToken) {
    return {
      token: storedToken,
      user: JSON.parse(storedUserString),
    };
  } else {
    return { ...initialState };
  }
}

export const authSlice = createSlice({
  name: "auth",
  initialState: getStoredAuthState(),
  reducers: {
    setToken(state, action) {
      const token = action.payload;
      state.token = token;
      localStorage.setItem("token", token);
    },
    setUser(state, action) {
      const { id, email, username, role } = action.payload;
      state.user.id = id;
      state.user.email = email;
      state.user.username = username;
      state.user.role = role;
      localStorage.setItem(
        "user",
        JSON.stringify({ id, email, username, role })
      );
    },
    resetAuthData() {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return { ...initialState };
    },
  },
});

export const { setToken, setUser, resetAuthData } = authSlice.actions;
export default authSlice.reducer;
