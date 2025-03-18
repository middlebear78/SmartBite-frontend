import axios from "axios";
import { API_BASE_URL } from "@env";

export const uploadImageForAnalysis = async (imagePath: string) => {
  try {
    const fileName = imagePath.split("/").pop();

    // ✅ Log the image path before sending
    console.log("🖼️ Image Path:", imagePath);
    console.log("📤 Sending image to:", API_BASE_URL);

    const formData = new FormData();
    formData.append("image", {
      uri: imagePath.startsWith("file://") ? imagePath : `file://${imagePath}`,
      type: "image/jpeg",
      name: fileName,
    });

    // ✅ Log FormData (This may not display correctly in logs)
    console.log("📄 FormData:", formData);

    // ✅ Send request
    const response = await axios.post(
      `${API_BASE_URL}/analyze-food/`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log("✅ Response from backend:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error uploading image:", error);
    throw error;
  }
};
