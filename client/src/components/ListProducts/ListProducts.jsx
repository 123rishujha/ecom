import ProductCard from "../ProductCard/ProductCard";

const ListProducts = ({ products,currentPage,perPage }) => {
  // console.log("length",products);
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
        width: "100%",
        height: "fit-content",
        margin: "auto",
      }}
    >
      {products.filter((_,i)=> i>=(currentPage-1)*perPage && i < currentPage*perPage ).map((elem) => {
        return <ProductCard key={elem._id} {...elem} />;
      })}
    </div>
  );
};

export default ListProducts;
