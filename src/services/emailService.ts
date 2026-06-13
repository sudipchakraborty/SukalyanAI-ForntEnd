export async function sendContactEmail(
  data: any
) {
  const response = await fetch(
    "http://localhost:3000/api/contact",
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify(data),
    }
  );

  return await response.json();
}
