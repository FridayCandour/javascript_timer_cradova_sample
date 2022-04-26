import _ from "../../../cradova/index.js";

const container = _("div.container")
const div = _("div")
const home = new _.Screen(
  "Cradova App",
  _.w(
   _`h2| Javascript timer app`,
    container(
      div({ class: "time", stateID: "time" },
        _`span#hour| 23`,
        _`span| :`,
        _`span#minute| 59`,
        _`span| :`,
      _`span#second| 59`
      )
    ),
    _("div.ball1", {stateID: "ball1"}),
    _("div.ball2", {stateID: "ball2"}),
    _("div.ball3", {stateID: "ball3"})
  )
);

export default home;
