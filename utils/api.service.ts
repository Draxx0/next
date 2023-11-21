const getAll = async <T>({ path }: { path: string }): Promise<T[]> => {
  try {
    const response = await fetch(`http://localhost:3000/api/${path}`);

    if (!response.ok) throw new Error("Error fetching data");

    const jsonResponse = await response.json();

    return jsonResponse.data as T[];
  } catch (error) {
    throw error;
  }
};

const getOne = async <T>({
  path,
  id,
}: {
  path: string;
  id: string;
}): Promise<T> => {
  try {
    const response = await fetch(`http://localhost:3000/api/${path}/${id}`);

    if (!response.ok) throw new Error("Error fetching data");

    const jsonResponse = await response.json();

    return jsonResponse.data as T;
  } catch (error) {
    throw error;
  }
};

const post = async <T>({
  path,
  body,
}: {
  path: string;
  body: T;
}): Promise<void> => {
  try {
    await fetch(`http://localhost:3000/api/${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  } catch (error) {
    throw error;
  }
};

const dlt = async ({
  path,
  id,
}: {
  path: string;
  id: string;
}): Promise<void> => {
  try {
    await fetch(`http://localhost:3000/api/${path}/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    throw error;
  }
};

const update = async <T>({
  path,
  id,
  body,
}: {
  path: string;
  id: string;
  body: T;
}): Promise<void> => {
  try {
    await fetch(`http://localhost:3000/api/${path}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  } catch (error) {
    throw error;
  }
};

const ApiService = {
  getAll,
  getOne,
  post,
  dlt,
  update,
};

export default ApiService;
