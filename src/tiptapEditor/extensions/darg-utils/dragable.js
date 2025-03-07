import { Extension } from "@tiptap/core";
import { NodeSelection, Plugin, PluginKey } from "@tiptap/pm/state";
import { Fragment, Slice } from "@tiptap/pm/model";
// import { EditorView } from "@tiptap/pm/view";
import { serializeForClipboard } from "./clipboard-serializer";

/**
 * GlobalDragHandleOptions
 *
 * The options for the global drag handle.
 *
 * @typedef {Object} GlobalDragHandleOptions
 * @property {number} dragHandleWidth - The width of the drag handle
 * @property {number} scrollTreshold - The treshold for scrolling
 * @property {string} [dragHandleSelector] - The css selector to query for the drag handle. (eg: '.custom-handle'). If handle element is found, that element will be used as drag handle. If not, a default handle will be created
 * @property {string[]} excludedTags - Tags to be excluded for drag handle
 * @property {string[]} customNodes - Custom nodes to be included for drag handle
 */

function absoluteRect(node) {
  const data = node.getBoundingClientRect();
  const modal = node.closest('[role="dialog"]');

  if (modal && window.getComputedStyle(modal).transform !== "none") {
    const modalRect = modal.getBoundingClientRect();

    return {
      top: data.top - modalRect.top,
      left: data.left - modalRect.left,
      width: data.width,
    };
  }
  return {
    top: data.top,
    left: data.left,
    width: data.width,
  };
}

function nodeDOMAtCoords(coords, view) {
  let pos = view.posAtCoords({ left: coords.x - 50, top: coords.y });
  if (pos) {
    const resolvePos = view.state.doc.resolve(pos.pos);

    if (resolvePos !== null) {
      console.log(view.nodeDOM(resolvePos.pos));
      return { node: view.nodeDOM(resolvePos.pos), pos: resolvePos.pos };
    }
  }
  return null;
}

export function DragHandlePlugin(options) {
  let listType = "";
  function handleDragStart(event, view) {
    view.focus();

    if (!event.dataTransfer) return;

    const nodeInfo = nodeDOMAtCoords(
      {
        x: event.clientX + 50,
        y: event.clientY,
      },
      view
    );

    let node = nodeInfo.node;
    let draggedNodePos = nodeInfo.pos;

    let selection = view.state.selection;
    selection = NodeSelection.create(view.state.doc, draggedNodePos);
    view.dispatch(view.state.tr.setSelection(selection));

    const slice = view.state.selection.content();
    const { dom, text } = serializeForClipboard(view, slice);

    event.dataTransfer.clearData();
    event.dataTransfer.setData("text/html", dom.innerHTML);
    event.dataTransfer.setData("text/plain", text);
    event.dataTransfer.effectAllowed = "copyMove";

    event.dataTransfer.setDragImage(node, 0, 0);

    view.dragging = { slice, move: event.ctrlKey };
  }

  let dragHandleElement = null;

  function hideDragHandle() {
    if (dragHandleElement) {
      dragHandleElement.classList.add("hide");
    }
  }

  function showDragHandle() {
    if (dragHandleElement) {
      dragHandleElement.classList.remove("hide");
    }
  }

  function hideHandleOnEditorOut(event) {
    if (event.target instanceof Element) {
      // Check if the relatedTarget class is still inside the editor
      const relatedTarget = event.relatedTarget;
      const isInsideEditor =
        relatedTarget &&
        (relatedTarget.classList.contains("tiptap") ||
          relatedTarget.classList.contains("drag-handle"));

      if (isInsideEditor) return;
    }
    hideDragHandle();
  }

  return new Plugin({
    key: new PluginKey(options.pluginKey),
    view: (view) => {
      const handleBySelector = options.dragHandleSelector
        ? document.querySelector(options.dragHandleSelector)
        : null;
      dragHandleElement = handleBySelector ?? document.createElement("div");
      dragHandleElement.draggable = true;
      dragHandleElement.dataset.dragHandle = "";
      dragHandleElement.classList.add("drag-handle");

      function onDragHandleDragStart(e) {
        handleDragStart(e, view);
      }

      dragHandleElement.addEventListener("dragstart", onDragHandleDragStart);

      function onDragHandleDrag(e) {
        hideDragHandle();
        let scrollY = window.scrollY;
        if (e.clientY < options.scrollTreshold) {
          window.scrollTo({ top: scrollY - 30, behavior: "smooth" });
        } else if (window.innerHeight - e.clientY < options.scrollTreshold) {
          window.scrollTo({ top: scrollY + 30, behavior: "smooth" });
        }
      }

      dragHandleElement.addEventListener("drag", onDragHandleDrag);

      hideDragHandle();

      if (!handleBySelector) {
        view &&
          view.dom &&
          view.dom.parentElement &&
          view.dom.parentElement.appendChild(dragHandleElement);
      }
      view &&
        view.dom &&
        view.dom.parentElement &&
        view.dom.parentElement.addEventListener(
          "mouseout",
          hideHandleOnEditorOut
        );

      return {
        destroy: () => {
          if (!handleBySelector) {
            dragHandleElement &&
              typeof dragHandleElement.remove === "function" &&
              dragHandleElement.remove();
          }
          dragHandleElement &&
            dragHandleElement.removeEventListener("drag", onDragHandleDrag);
          dragHandleElement &&
            dragHandleElement.removeEventListener(
              "dragstart",
              onDragHandleDragStart
            );
          dragHandleElement = null;
          view &&
            view.dom &&
            view.dom.parentElement &&
            view.dom.parentElement.removeEventListener(
              "mouseout",
              hideHandleOnEditorOut
            );
        },
      };
    },
    props: {
      handleDOMEvents: {
        mousemove: (view, event) => {
          if (!view.editable) {
            return;
          }

          const nodeInfo = nodeDOMAtCoords(
            {
              x: event.clientX + 50,
              y: event.clientY,
            },
            view
          );
          console.log("🚀 ~ DragHandlePlugin ~ nodeInfo:", nodeInfo);

          if (!nodeInfo) {
            return;
          }

          let node = nodeInfo.node;

          if (node == "undefined" || node == null) {
            hideDragHandle();
            return;
          }

          // const notDragging = node && node.closest(".not-draggable");
          // const excludedTagList = options.excludedTags
          //   .concat(["ol", "ul"])
          //   .join(", ");

          if (!(node instanceof Element)) {
            hideDragHandle();
            return;
          }

          const compStyle = window.getComputedStyle(node);
          const parsedLineHeight = parseInt(compStyle.lineHeight, 10);
          const lineHeight = isNaN(parsedLineHeight)
            ? parseInt(compStyle.fontSize) * 1.2
            : parsedLineHeight;
          const paddingTop = parseInt(compStyle.paddingTop, 10);

          const rect = absoluteRect(node);

          rect.top += (lineHeight - 24) / 2;
          rect.top += paddingTop;
          // Li markers
          if (node.matches("ul:not([data-type=taskList]) li, ol li")) {
            rect.left -= options.dragHandleWidth;
          }
          rect.width = options.dragHandleWidth;

          if (!dragHandleElement) return;

          dragHandleElement.style.left = `${150}px`;
          dragHandleElement.style.top = `${rect.top}px`;
          showDragHandle();
        },
        keydown: () => {
          hideDragHandle();
        },
        mousewheel: () => {
          hideDragHandle();
        },
        // dragging class is used for CSS
        dragstart: (view) => {
          view.dom.classList.add("dragging");
        },
        drop: (view, event) => {
          view.dom.classList.remove("dragging");
          hideDragHandle();
          let droppedNode = null;
          const dropPos = view.posAtCoords({
            left: event.clientX,
            top: event.clientY,
          });

          if (!dropPos) return;

          if (view.state.selection instanceof NodeSelection) {
            droppedNode = view.state.selection.node;
          }
          if (!droppedNode) return;

          const resolvedPos = view.state.doc.resolve(dropPos.pos);

          const isDroppedInsideList =
            resolvedPos.parent.type.name === "listItem";

          // If the selected node is a list item and is not dropped inside a list, we need to wrap it inside <ol> tag otherwise ol list items will be transformed into ul list item when dropped
          if (
            view.state.selection instanceof NodeSelection &&
            view.state.selection.node.type.name === "listItem" &&
            !isDroppedInsideList &&
            listType == "OL"
          ) {
            const newList =
              view.state.schema.nodes.orderedList &&
              view.state.schema.nodes.orderedList.createAndFill(
                null,
                droppedNode
              );
            const slice = new Slice(Fragment.from(newList), 0, 0);
            view.dragging = { slice, move: event.ctrlKey };
          }
        },
        dragend: (view) => {
          view.dom.classList.remove("dragging");
        },
      },
    },
  });
}

const GlobalDragHandle = Extension.create({
  name: "globalDragHandle",

  addOptions() {
    return {
      dragHandleWidth: 20,
      scrollTreshold: 100,
      excludedTags: [],
      customNodes: [],
    };
  },

  addProseMirrorPlugins() {
    return [
      DragHandlePlugin({
        pluginKey: "globalDragHandle",
        dragHandleWidth: this.options.dragHandleWidth,
        scrollTreshold: this.options.scrollTreshold,
        dragHandleSelector: this.options.dragHandleSelector,
        excludedTags: this.options.excludedTags,
        customNodes: this.options.customNodes,
      }),
    ];
  },
});

export default GlobalDragHandle;
