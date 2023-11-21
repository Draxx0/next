const Post = ({
  params,
  searchQuery,
}: {
  params: {
    slug: string;
  };
  searchQuery: {
    q: string;
  };
}) => {
  return <div>{params.slug}</div>;
};

export default Post;
