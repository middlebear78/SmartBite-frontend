import { configureStore } from "@reduxjs/toolkit";
import questionnaireReducer from ".//QuestionnaireSlice";
import cameraReducer from ".//CameraSlice";

export const store = configureStore({
  reducer: {
    Questionnaire: questionnaireReducer,
    Camera: cameraReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
