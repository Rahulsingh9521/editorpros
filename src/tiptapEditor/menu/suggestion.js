import { VueRenderer } from "@tiptap/vue-3";
import tippy from "tippy.js";

import CommandsList from "./CommandsList.vue";

export default {
  items: ({ query }) => {
    // console.log("🚀 ~ file: suggestion.js ~ line 6 ~ items: ~ query");
    const user = [
      {
        title: "Heading 1",
        command: ({ editor, range }) => {
          editor
            .chain()
            .focus()
            .deleteRange(range)
            .setNode("heading", { level: 1 })
            .run();
        },
      },
      {
        title: "Heading 2",
        command: ({ editor, range }) => {
          editor
            .chain()
            .focus()
            .deleteRange(range)
            .setNode("heading", { level: 2 })
            .run();
        },
      },
      {
        title: "Bold",
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).setMark("bold").run();
        },
      },
      {
        title: "Italic",
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).setMark("italic").run();
        },
      },
      {
        title: "code",
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).setCodeBlock().run();
        },
      },
      {
        title: "table",
        command: ({ editor, range }) => {
          editor
            .chain()
            .focus()
            .deleteRange(range)
            .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
            .run();
        },
      },
    ];

    const selectedUser = user
      .filter((item) =>
        item.title.toLowerCase().startsWith(query.toLowerCase())
      )
      .slice(0, 10);

    // console.log("🚀 ~ selectedUser:", selectedUser);

    if (selectedUser.length === 0) {
      return [];
    } else {
      return selectedUser;
    }
  },

  render: () => {
    let component;
    let popup;

    return {
      onStart: (props) => {
        // console.log("props", props);
        component = new VueRenderer(CommandsList, {
          // using vue 2:
          // parent: this,
          // propsData: props,
          props,
          editor: props.editor,
        });

        console.log("component", component);

        if (!props.clientRect) {
          return;
        }

        // console.log("🚀 ~ component:", props.editor);

        popup = tippy("body", {
          getReferenceClientRect: props.clientRect,
          appendTo: () => document.body,
          content: component.element,
          showOnCreate: true,
          interactive: true,
          trigger: "manual",
          placement: "top-start",
        });
      },

      onUpdate(props) {
        // console.log("🚀 ~ component:");
        component.updateProps(props);
        console.log("🚀 ~ onUpdate ~ props:", props);

        if (!props.clientRect) {
          return;
        }

        popup[0].setProps({
          getReferenceClientRect: props.clientRect,
        });
      },

      onKeyDown(props) {
        // console.log("🚀 ~ component:");
        if (props.event.key === "Escape") {
          popup[0].hide();

          return true;
        }

        return component.ref?.onKeyDown(props);
      },

      onExit() {
        console.log("🚀 ~ onexit:");
        popup[0].destroy();
        component.destroy();
      },
    };
  },
};
