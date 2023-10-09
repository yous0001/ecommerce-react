import React from "react";

export default function Footer() {
  return (
    <footer className="bg-main-light py-5">
      <div className="container">
        <h2>Get the fresh cart App</h2>
        <p>
          we will send, you alink open it on your phone to download the app.
        </p>
        <div className="row">
            <div className="col-md-9">
          <input type="text" className="form-control" placeholder="Email:" /></div>
          <div className="col-md-3">
          <button className="btn form-btn form-control">share link</button></div>
        </div>
      </div>
    </footer>
  );
}
