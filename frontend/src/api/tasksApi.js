const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

async function handleResponse(response) {
  if (response.ok) {
    if (response.status === 204) {
      return null;
    }
    return response.json();
  }

  let message = "Request failed.";
  try {
    const errorBody = await response.json();
    if (errorBody?.message) {
      message = errorBody.message;
    }
  } catch (error) {
    // Ignore JSON parsing errors and return default message.
  }

  throw new Error(message);
}

export async function fetchTasks() {
  const response = await fetch(`${API_BASE_URL}/tasks`);
  return handleResponse(response);
}

export async function createTask(payload) {
  const response = await fetch(`${API_BASE_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return handleResponse(response);
}

export async function updateTaskStatus(taskId, status) {
  const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });

  return handleResponse(response);
}

export async function deleteTask(taskId) {
  const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
    method: "DELETE",
  });

  return handleResponse(response);
}
