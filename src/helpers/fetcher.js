const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;

// function to get data
export const fetchToGetData = async (endPoint, id) => {
  try {
    const headers = {
      apikey: supabaseKey,
      "Content-Type": "application/json",
    };
    if (id) {
      headers["Accept"] = "application/vnd.pgrst.object+json";
    }
    const response = await fetch(
      `${supabaseUrl}/rest/v1/${endPoint}${id ? `?id=eq.${id}` : ""}`,
      { headers }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (e) {
    console.error("Fetch error:", e);
    throw e;
  }
};
// function to post data
export const fetchToPostData = async (endPoint, formData) => {
  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/${endPoint}`, {
      method: "POST",
      headers: {
        apikey: supabaseKey,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      console.error("erroe", response.status);
    }
  } catch (error) {
    console.error("error", error);
  }
};
// function to update data
export const fetchToUpdateData = async (endPoint, formData, articleID) => {
  try {
    const response = await fetch(
      `${supabaseUrl}/rest/v1/${endPoint}?id=eq.${articleID}`,
      {
        method: "PUT",
        headers: {
          apikey: supabaseKey,
          "Content-Type": "application/json",
          Prefer: "return=representation",
        },
        body: JSON.stringify(formData),
      }
    );
    if (!response.ok) {
      console.error("erroe", response.status);
    }
  } catch (error) {
    console.error("error", error);
  }
};
// function to delete data
export const fetchToDeleteData = async (endPoint, id) => {
  try {
    const response = await fetch(
      `${supabaseUrl}/rest/v1/${endPoint}?id=eq.${id}`,
      {
        method: "DELETE",
        headers: {
          apikey: supabaseKey,
        },
      }
    );
    if (!response.ok) {
      console.error("erroe", response.status);
    }
  } catch (error) {
    console.error("error", error);
  }
};
