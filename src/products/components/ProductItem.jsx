export const ProductItem = ({ photo, price, title }) => {
  return (
    <>
      <div className="mx-auto px-5">
        <div className="max-w-xs cursor-pointer rounded-lg bg-white p-2 shadow duration-150 hover:scale-105 hover:shadow-md">
          <img
            className="w-full rounded-lg object-cover object-center"
            src={photo}
            alt={title}
          />
          <p className="my-4 pl-4 font-bold text-gray-500">{title}</p>
          <p className="mb-4 ml-4 text-xl font-semibold text-gray-800">
            {price}
          </p>
        </div>
      </div>
    </>
  );
};
