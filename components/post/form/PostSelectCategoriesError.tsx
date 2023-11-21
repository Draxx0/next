const PostSelectCategoriesError = ({ error }: { error: Error }) => {
  return (
    <div className="w-full border border-red-600 py-2 px-1">
      <p>{error.message}</p>
    </div>
  );
};

export default PostSelectCategoriesError;
