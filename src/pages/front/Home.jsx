const Home = () => {
  return (
    <main>
      <section className="index-banner">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 d-flex align-items-start flex-column">
              <h2 className="fs-5 fw-bold text-primary bg-white rounded-1 p-2 d-inline-block mb-4 ">
                ZOBAA 旅行推薦平台
              </h2>
              <h1 className="fw-bold text-primary text-start">
                <span className="d-block d-lg-inline">用旅行，</span>
                <span> 收藏世界的樣子 </span>
              </h1>

              <p className="text-primary fs-6 text-start">
                ZOBAA
                整合熱門景點推薦、即時優惠、獨家行程，從比價到訂購，一次完成你的完美出遊計畫。
              </p>
            </div>

            <div className="col-lg-5">
              <form className="position-relative">
                <span className="material-icons-outlined align-bottom position-relative position-absolute top-50 start-0 translate-middle-y ps-4 text-neutral-60">
                  search
                </span>
                <input
                  type="search"
                  className="form-control rounded-3 py-4 ps-10"
                  id="navbar-lg-search"
                  placeholder="搜尋景點、地點或城市"
                />

                <a className="btn btn-primary position-absolute flex-shrink-0 top-50 start-70 translate-middle-y">
                  開始探索旅程
                </a>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
