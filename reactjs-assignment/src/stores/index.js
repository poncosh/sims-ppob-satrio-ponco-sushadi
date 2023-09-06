import { configureStore } from "@reduxjs/toolkit";
import contentSlicer from "./contents/slicers/contentSlicer";

export const store = configureStore({
  reducer: {
    content: contentSlicer,
  },
});
