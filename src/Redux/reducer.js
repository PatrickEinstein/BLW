import { createSlice } from "@reduxjs/toolkit";

export const auth = createSlice({
  name: "auth",
  initialState: {
    loggedInUser: {},
    typeofProfilePage: "Create",
    openModal: false,
    openModal2: false,
    selectedRecipee: {},
    productid: 0,
    opensnackbar: false,
    message: "",
    selectedBlog: {},
  },
  reducers: {
    selectedProductId: (state, action) => {
      state.productid = action.payload;
    },
    setselectedRecipee: (state, action) => {
      state.selectedRecipee = action.payload;
    },
    setselectedBlog: (state, action) => {
      state.selectedBlog = action.payload;
    },
    toggleopenModal: (state, action) => {
      state.openModal = !state.openModal;
    },
    toggleopenModal2: (state, action) => {
      state.openModal2 = !state.openModal2;
    },
    setLoggedInUser: (state, action) => {
      state.loggedInUser = action.payload;
    },
    setProfileIndex: (state, action) => {
      state.typeofProfilePage = action.payload;
    },
    setSnackBarOpen: (state, action) => {
      state.opensnackbar = action.payload;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
  },
});

export const {
  setselectedBlog,
  setSnackBarOpen,
  setMessage,
  selectedProductId,
  toggleopenModal2,
  setSignedUpUser,
  setLoggedInUser,
  setProfileIndex,
  toggleopenModal,
  setselectedRecipee,
} = auth.actions;

export default auth.reducer;
