import { Query } from "@/types";

const getAll = async <T>({
  path,
  query,
}: {
  path: string;
  query?: Query;
}): Promise<T[]> => {
  try {
    const { orderBy, categoryId } = query ?? {
      orderBy: "desc",
      categoryId: "",
    };

    const urlWithCategoryId = `http://localhost:3000/api/${path}?orderBy=${orderBy}&categoryId=${categoryId}`;
    const urlWithoutCategoryId = `http://localhost:3000/api/${path}?orderBy=${orderBy}`;

    const response = await fetch(
      categoryId ? urlWithCategoryId : urlWithoutCategoryId
    );

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
  query,
}: {
  path: string;
  id: string;
  query?: Query;
}): Promise<T> => {
  try {
    const { orderBy } = query ?? { orderBy: "desc" };

    const response = await fetch(
      `http://localhost:3000/api/${path}/${id}?orderBy=${orderBy}`
    );

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
