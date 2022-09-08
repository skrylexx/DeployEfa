/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from "@ioc:Adonis/Core/Route";
import { fetch } from "undici";

// function escapeHtml(text: string): string {
//   var map = {
//     "&": "&amp;",
//     "<": "&lt;",
//     ">": "&gt;",
//     '"': "&quot;",
//     "'": "&#039;",
//   };

//   return text.replace(/[&<>"']/g, function (m) {
//     return map[m];
//   });
// }

Route.get("/", async ({ view, request }) => {
  const allData = request.all();
  if (allData.q == undefined) return view.render("welcome", { datas: [] });
  const { q } = request.all() ?? "bitcoin";
  const url = `https://gnews.io/api/v4/search?q=${q}&lang=fr&max=20&country=fr&sortby=relevance&token=943c6ea25801e2dd81bca4003c5f6d88`;

  const res = await fetch(url);
  const datas = await res.json();
  console.log(datas, url);

  return view.render("welcome", { datas: datas.articles });
});
