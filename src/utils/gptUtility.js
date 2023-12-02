import axios from "axios";

const getAIResult = async (prompt) => {
  try {
    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta3/models/text-bison-001:generateText?key=AIzaSyDSOamwYUa8IJ_28qt3gouLBpTzXR7_w0M",
      {
        prompt: {
          text: prompt,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data?.candidates[0].output;
  } catch (error) {
    console.error("Error making Axios request:", error);
  }
};

export default getAIResult;
