// src/services/apiService.ts

const API_BASE_URL = "http://localhost:3000";

export async function post(
  endpoint: string,
  data: any
) {
  const response = await fetch(
    `${API_BASE_URL}${endpoint}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  return await response.json();
}