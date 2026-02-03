// import { useEffect, useState } from 'react';
// import axios from 'axios';

// export const useProducts = () => {
//   const [data, setData] = useState([]);
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(false);

//   const fetchProducts = async (pageNumber = 1) => {
//     setLoading(true);
//     const res = await axios.get(
//       `https://api.example.com/products?page=${pageNumber}&limit=10`
//     );
//     setData((prev) => [...prev, ...res.data.data]);
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   return {
//     data,
//     loading,
//     loadMore: () => fetchProducts(page + 1),
//   };
// };
