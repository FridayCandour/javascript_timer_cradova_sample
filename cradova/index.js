/*         _____
 *        /     \
 *       /   /\  \
 *      /   /  \__\
 *     /   /    _    _
 *    /   /    (_)  (_)
 *   (    \    ___ 
 *    \    \  /  /
 *     \    \/  /
 *      \      /
 *       \____/
 * 
 *   Cradova FrameWork
 *   
 *     @version 1.0.0
 * 
        @licence Apache v2

 @publisher : Friday Candour;
 @project : Cradova Framework;
 @copyright-lincense :  Apache v2;
 email > fridaymaxtour@gmail.com
 github > www.github.com/FridayCandour
 telegram > @uiedbooker


                                  Apache License
                           Version 2.0, January 2004
                        http://www.apache.org/licenses/
 
 
 *
 * Copyright 2022 Friday Candour. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * 
 * YOU SHOULD GET A COPY OF THE APACHE LICENSE V 2.0 IF IT DOESN'T ALREADY COME WITH THIS Framework 
*/

import css from "./scripts/css.js";
import w from "./scripts/widget.js";
import Init from "./scripts/init.js";
import swipe from "./scripts/swipe.js";
import media from "./scripts/media.js";
import Store from "./scripts/store.js";
import Router from "./scripts/Router.js";
import Screen from "./scripts/Screen.js";
import JSONDB from "./scripts/JsonDB.js";
import Speaker from "./scripts/speaker.js";
import animate from "./scripts/animate.js";
import fs from "./scripts/file-system.js";
import ls from "./scripts/localStorage.js";
import dispatch from "./scripts/dispatcher.js";
import fullScreen from "./scripts/fullscreen.js";
import metrics from "./scripts/Metrics.js";

("use strict");

/**
 * Creates new HTML element
 *
 *
 *  @example
 * format for static  _`p| am a p tag`  // or _`p.class| am a p tag` or _`p#id| am a p tag` or _`p.class#id| am a p tag`
 *
 * format for dynamic _(
 *  "p| am a p tag" // or "p.class| am a p tag" or "p#id| am a p tag" or "p.class#id| am a p tag"
 * , {
 * //props like
 * text: "am a p tag",
 * style: {
 * color: "blue"
 * }
 * },
 *
 * // place other children here like span
 * _`span| am a span tag like so`, // this is a static child
 * _("span| am a span tag like so", {style: {color: "brown"}}) // this is a dynamic child
 * )
 * @param  {...any} element_initials
 * @returns function | HTMLElement
 *
 * // static elements cannot be given props nor children nor state but dynamic can
 *
 * // and static are useful too
 */

const _ = (...element_initials) => {
  let properties,
    childrens = [];
  if (
    typeof element_initials[1] == "object" &&
    !(element_initials[1] instanceof HTMLElement)
  ) {
    properties = element_initials[1];
    if (element_initials.length > 2) {
      childrens = element_initials.slice(2, element_initials.length);
    }
  } else {
    if (
      element_initials[1] instanceof HTMLElement ||
      typeof element_initials[1] === "function"
    ) {
      childrens = element_initials.slice(1, element_initials.length);
    }
  }

  if (typeof element_initials[0] === "string") {
    element_initials = element_initials[0];
  }
  // cleaning
  for (let i = 0; i < childrens.length; i++) {
    if (
      !(childrens[i] instanceof HTMLElement) &&
      typeof childrens[i] !== "function"
    ) {
      throw new Error(
        "cradova err invalid children list, should be a html element from cradova  " +
          childrens[i]
      );
    }
  }

  function identify(element_initials) {
    if (typeof element_initials !== "object") {
      element_initials = [element_initials];
    }
    let tag, className, ID;
    const [el, innerValue] = element_initials[0].split("|");

    if (el.indexOf("#") > -1) {
      ID = el.split("#")[1];
      tag = el.split("#")[0];
      className = ID.split(".")[1];
      if (className) {
        ID = ID.split(".")[0];
      }
    }

    if (el.indexOf(".") > -1) {
      if (!className) {
        className = el.split(".")[1];
        tag = el.split(".")[0];
        let locID = className.split("#")[1];
        if (locID) {
          className = className.split("#")[0];
        }
      }
    }

    if (tag === "") {
      tag = "div";
    }
    if (!tag && tag !== "") {
      tag = el;
    }

    element_initials = { tag, className, ID, innerValue };

    /**
     * params [incoming]:any elements and props object
     * @returns HTML element
     *
     */

    return (...incoming) => {
      let childrens2rd, props, text;

      for (let i = 0; i < incoming.length; i++) {
        if (
          typeof incoming[i] === "function" ||
          incoming[i] instanceof HTMLElement
        ) {
          if (Array.isArray(childrens2rd)) {
            childrens2rd.push(incoming[i]);
          } else {
            childrens2rd = [incoming[i]];
          }
          continue;
        }
        //
        if (
          !(incoming[i] instanceof HTMLElement) &&
          typeof incoming[i] === "object"
        ) {
          props = incoming[i];
          continue;
        }
        if (typeof incoming[i] === "string") {
          text = incoming[i];
          continue;
        }
        //
        if (childrens && childrens[0]) {
          if (childrens2rd) {
            childrens2rd.push(...childrens);
          } else {
            childrens2rd = childrens;
          }
          continue;
        }
      }

      const element = document.createElement(element_initials.tag);
      if (element_initials.className) {
        element.className = element_initials.className;
      }

      if (element_initials.ID) {
        element.id = element_initials.ID;
      }
      if (element_initials.innerValue) {
        element.append(element_initials.innerValue);
      }

      for (const prop in properties) {
        if (prop === "style") {
          for (const [k, v] of Object.entries(properties[prop])) {
            element.style[k] = v;
          }
          continue;
        }
        if (prop === "class") {
          element.classList.add(properties[prop]);
          continue;
        }
        if (prop === "text") {
          element.innerText = properties[prop];
          continue;
        }
        element[prop] = properties[prop];
      }

      //
      // dynamic props
      //

      if (props && typeof props === "object" && !Array.isArray(props)) {
        for (const prop in props) {
          if (prop === "style") {
            for (const [k, v] of Object.entries(props[prop])) {
              element.style[k] = v;
            }
            continue;
          }
          if (prop === "text") {
            element.innerText = props[prop];
            continue;
          }
          if (prop === "class") {
            element.classList.add(props[prop]);
            continue;
          }
         if (prop === "fullscreen") {
          if (properties[prop]) {
            fullScreen(element).set();
          } else {
            fullScreen(element).exist();
          }
          continue;
        }
          element[prop] = props[prop];
        }
      }
      if (childrens2rd && childrens2rd[0]) {
        for (let i = 0; i < childrens2rd.length; i++) {
          if (typeof childrens2rd[i] === "function") {
            element.append(childrens2rd[i](props));
            continue;
          }
          element.append(childrens2rd[i]);
        }
      }
      if (text) {
        element.append(text);
      }
      if (element.stateID) {
        // adding cradova dynamic signature
        element.classList.add("cra_child_doc");
      }
      return element;
    };
  }
  if (element_initials[0].raw) {
    element_initials = identify(element_initials[0].raw);
  } else {
    element_initials = identify(element_initials);
  }

  return element_initials;
};

_.register = (name) => {
  for (const key in name) {
    _[key] = name[key];
  }
};

/**
 * registering added methods to the cradova object _
 *
 * these can be safely destructured to use alone
 */
_.register({
  w,
  css,
  Init,
  media,
  swipe,
  Store,
  JSONDB,
  Screen,
  Router,
  LS: ls,
  FS: fs,
  Speaker,
  metrics,
  animate,
  dispatch,
  App: window.app,
  globalState: { state: {}, stateID: "" },
});

_.Init();
window._ = _;

export default _;

/**
 * 
 Registering ServiceWorker
 *
 *  */
window.addEventListener("load", async () => {
  if ("serviceWorker" in navigator) {
    await navigator.serviceWorker
      .register("service-worker.js")
      .then(function (registration) {
        // Registration was successful
        console.log(
          `Service Worker registration successful. Scope: ${registration.scope}

comment this line out at nodemodules/cradova/index.js line 394`
        );
      })
      .catch((err) => console.log(err));
  }
});
