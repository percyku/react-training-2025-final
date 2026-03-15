import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "bootstrap";
import Loading from "../../components/Loading";
import PicModal from "../../components/PicModal";
import { createAsyncAddCart } from "../../slice/cartSlice";
import { createAsyncGetProduct } from "../../slice/productSlice";

const SingleProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const isProductLoading = useSelector((state) => state.product.isLoading);
  const isCartLoading = useSelector((state) => state.cart.isLoading);
  const product = useSelector((state) => state.product.product);

  const modalRefPic = useRef(null);
  const myModalPic = useRef(null);
  const [photoUrl, setPhotoUrl] = useState(
    "https://images.unsplash.com/photo-1594322436404-5a0526db4d13?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bm90JTIwZm91bmR8ZW58MHx8MHx8fDA%3D",
  );

  useEffect(() => {
    dispatch(createAsyncGetProduct(id));

    myModalPic.current = new Modal(modalRefPic.current);
  }, [id]);

  const handleAddCart = (id, qty = 1) => {
    dispatch(createAsyncAddCart({ id, qty }));
  };
  const getSinglePic = (url) => {
    setPhotoUrl(url);
    if (photoUrl !== "") {
      myModalPic.current.show();
    }
  };

  return (
    <div className="margin-top cart-bg ">
      <Loading isLoading={isProductLoading || isCartLoading} />
      <PicModal modalRef={modalRefPic} photoUrl={photoUrl} />

      {product ? (
        <div className="row">
          <div className="col-md-7">
            <div className="card mb-3">
              <img
                src={product.imageUrl}
                className="img-cover"
                alt={`${product.title}_旅遊主圖`}
                onClick={() => getSinglePic(product.imageUrl)}
              />
            </div>
          </div>

          <div className="col-md-5">
            <div className="card mb-3">
              <div className="card-body">
                <div className="row ">
                  <div className="col-md-6 ">
                    <h5 className="card-title">
                      {product.title}
                      <span className="badge bg-primary ms-2">
                        {product.category}
                      </span>
                    </h5>
                    <p className="card-text">商品描述：{product.description}</p>
                    <p className="card-text">商品內容：{product.content}</p>
                    <div className="d-flex mb-3">
                      <p className="card-text text-secondary">
                        <del>{product.origin_price}</del>
                      </p>
                      元 / {product.price} 元
                    </div>

                    <button
                      className="btn btn-primary d-md-none"
                      disabled={isCartLoading || isProductLoading}
                      onClick={() => handleAddCart(product.id)}
                    >
                      立即購買
                    </button>
                  </div>
                  <div className="col-md-6  d-none d-md-flex justify-content-md-end ">
                    <button
                      className="btn btn-primary h-25"
                      disabled={isCartLoading || isProductLoading}
                      onClick={() => handleAddCart(product.id)}
                    >
                      立即購買
                    </button>
                  </div>
                </div>

                <h5 className="mt-3">更多圖片：</h5>

                <div className="d-flex flex-wrap">
                  <div className="row">
                    {product.imagesUrl?.map((url, index) => (
                      <div className="col-4 mt-3" key={index}>
                        <img
                          src={url}
                          className="images img-cover"
                          width="80%"
                          height="80"
                          alt={`旅遊更多圖片_${index + 1}`}
                          onClick={() => getSinglePic(url)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>沒有可用的產品資料。</div>
      )}
    </div>
  );
};

export default SingleProduct;
