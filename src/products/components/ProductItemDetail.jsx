export const ProductItemDetail = ({ photo, price, title, category }) => {
  return (
    <>
      <div className="grid items-center">
        <div className="mx-auto my-10">
          <div className="bg-white shadow-md rounded-lg w-full dark:bg-gray-800 dark:border-gray-700">
            <img
              className="rounded-t-lg p-8 h-[500px] w-full"
              src={photo}
              alt={title}
            />
            <div className="px-5 pb-5">
              <h3 className="text-gray-900 font-semibold text-xl tracking-tight dark:text-white">
                {category}
              </h3>
              <h3 className="text-gray-900 font-semibold text-xl tracking-tight dark:text-white mt-2">
                {title}
              </h3>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                  ${price}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
