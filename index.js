import _ from "./cradova/index.js";
import home from "./src/Screens/Home/index.js";
import examples from "./src/Screens/examples/index.js";
import TabBar from "./src/navigators/Tabs.js";
import timer from "./src/timer.js";

/**
 * adding navigation
 */

home.addChild(TabBar );
examples.addChild(TabBar );

// hidding the drawer if it was open
// appling style behaviour to tha bottom tabs

home.onActivate((html) => {
  _.dispatch(
    {
      style: {
        backgroundColor: "#1796ff",
        color: "#1796ff",
        paddingTop: "5px",
      },
    },
    "tab1"
  );
    timer()
});
examples.onActivate((html) => {
  _.dispatch(
    {
      style: {
        backgroundColor: "#1796ff",
        color: "#1796ff",
        paddingTop: "5px",
      },
    },
    "tab2"
  );
});

/**
 * Router setup.
 */

_.Router.route("/", () => home.Activate());
_.Router.route("/examples", () => examples.Activate());
