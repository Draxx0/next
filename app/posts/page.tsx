const fetchPosts = async () => {
  const response = await fetch("http://localhost:3000/api/posts");
  const data = await response.json();
  console.log(data);
  return data.data;
};
const PostListPage = async () => {
  const postsList = await fetchPosts();

  return (
    // <div>
    //   {postsList &&
    //     postsList.map((post: any, index: number) => (
    //       <h2 key={index}>{post.title}</h2>
    //     ))}
    // </div>
    <></>
  );
};

export default PostListPage;
