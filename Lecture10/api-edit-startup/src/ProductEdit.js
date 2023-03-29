import React from "react";

export default function ProductEdit() {
  return (
    <div>
      <header class="container-fluid">
        <nav>
          <ul>
            <li>
              <strong>API Backend</strong>
            </li>
          </ul>
          <ul>
            <li>Home</li>
            <li>Products</li>
            <li>Categories</li>
          </ul>
        </nav>
      </header>
      <article id="article">
        <h2>Products</h2>
        <p>
          <section id="tables">
            <figure>
              <table role="grid">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Category</th>
                    <th scope="col">ID</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Cell</td>
                    <td>Cell</td>
                    <td>Cell</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Cell</td>
                    <td>Cell</td>
                    <td>Cell</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>Cell</td>
                    <td>Cell</td>
                    <td>Cell</td>
                  </tr>
                </tbody>
              </table>
            </figure>
          </section>
        </p>
        <footer>
          <small>(CC) Høyskolen Kristiania 2023</small>
        </footer>
      </article>
    </div>
  );
}
