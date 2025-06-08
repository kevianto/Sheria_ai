const API_BASE_URL =
  import.meta.env.VITE_APP_API_URL || "http://localhost:5000"; // Configure your backend URL

export class ApiError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = "ApiError";
  }
}

export const chatApi = {
  async sendMessage(message: string): Promise<string> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: message.trim(), // <-- changed from 'message' to 'question'
          context: "kenyan_constitution", // you can remove this if backend doesn't expect it
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new ApiError(
          errorData.error || `HTTP error! status: ${response.status}`,
          response.status
        );
      }

      const data = await response.json();
      return data.answer; // assuming your backend returns { answer: "..." }
    } catch (error) {
      // Handle or rethrow error here
      throw error;
    }
  },
};
