import _ from "../../../cradova/index.js";

const imgsty = { width: "100px", borderRadius: "20%", margin: "auto" };
const img = _("img", {
  src: "../assets/cradova.png",
  style: imgsty,
});
const header = _.w(
  _("div", {style: {margin: "30px auto"}},
    img,
  _`h3| Cradova`
  ,
  _`h3| Build apps that feels native`,
  
  _("a| Visit Docs", {href: "www.github.com/fridaycandour/cradova"})
  ),
  _`hr`,
  _`p.paragraph|
  Cradova is a web frame work you can use to build web apps and PWAs, 
  it is focused on giving a PWAs a native framework ecosystem.`,
  _`p.paragraph| We are taking PWAs to the next level.`,
);
const examples = new _.Screen("about", header);

export default examples;
