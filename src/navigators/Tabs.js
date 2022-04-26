import _ from "../../cradova/index.js";

const div = _("div.tab", { stateID: "downTab" });
const p = _("p");
const a = _("a");
const icon = _("img", {
  style: {
    width: "24px",
    height: "24px",
  },
});

export default function TabBar() {
  const tabcolor = window.location.pathname === "/" ? "green" : "#23bbff";
  return div(
    a(
      {
        href: "/",
        stateID: "tab1",
      },
      icon({ src: "../../assets/time.svg" }),
      p({ text: "home" })
    ),
    a(
      {
        href: "/examples",
        stateID: "tab2",
      },
      icon({ src: "../../assets/Share.png" }),
      p({ text: "about" })
    ),
  );
}

_.css(".tab", {
  border: "2px #23bbff solid", 
  display: "flex",
  width: "100%",
  "max-height": "44px",
  "align-items": "center",
  "justify-content": "space-evenly",
  position: "absolute",
  bottom: "0px",
  "background-color": "#23bbff",
  padding: "0px",
  "border-top-left-radius": "20px",
  "border-top-right-radius": "20px",
});
_.css(".tab a", {
  display: "flex",
  width: "15%",
  height: "96%",
  margin: "auto",
  color: "white",
  "flex-direction": "column",
  "align-items": "center",
  "justify-content": "center",
  "border-radius": "10px",
});

_.css(".tab a p", {
  "font-size": "13px",
  "font-weight": "600",
});

_.media(
  "min-width: 790px",
  [
    ".tab",
    {
      "flex-direction": "column",
      width: "52px",
      height: "100vh",
      "max-height": "100%",
      top: "0px",
      "border-top-left-radius": "0px",
      "border-top-right-radius": "20px",
      "border-bottom-right-radius": "20px",
    },
  ],
  [
    ".tab a",
    {
      width: "52px",
      height: "100vh",
      "max-height": "100%",
    },
  ],
  [
    ".tab a p",
    {
      display: "none !important",
    },
  ]
);
