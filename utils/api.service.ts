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

const ApiService = {
  getAll,
};

export default ApiService;
