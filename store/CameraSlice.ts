import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialCameraState = {
  showFlashIcon: false,
  isFlashOn: false,
};

const cameraSlice = createSlice({
  name: "camera",
  initialState: initialCameraState,
  reducers: {
    setShowFlashIcon: (state, action: PayloadAction<boolean>) => {
      state.showFlashIcon = action.payload;
    },
    setIsFlashOn: (state, action: PayloadAction<boolean>) => {
      state.isFlashOn = action.payload;
    },
  },
});

export const { setIsFlashOn, setShowFlashIcon } = cameraSlice.actions;
export default cameraSlice.reducer;
