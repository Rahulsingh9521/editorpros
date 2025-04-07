import { Plugin } from "prosemirror-state";
import { Decoration, DecorationSet } from "prosemirror-view";
import Image from "@tiptap/extension-image";
import "../style/imageUpload.scss";

let uploadFn;
let imagePrview = "";

const UplodImage = Image.extend({
  name: "uploadImage",
  onCreate() {
    if (typeof this.options.uploadFn !== "function") {
      return;
    }
    uploadFn = this.options.uploadFn;
  },
  addOptions() {
    return {
      ...this.parent?.(),
      uploadFn: async () => {
        return "";
      },
      inline: false,
    };
  },
  addProsMirrorPlugins() {
    return [placeholderPlugin];
  },
  addCommands() {
    return {
      ...this.parent?.(),
      addImage: () => () => {
        let fileHolder = document.createElement("input");
        fileHolder.setAttribute("type", "file");
        fileHolder.setAttribute("accept", "image/*");
        fileHolder.setAttribute("style", "visibility:hidden");

        document.body.appendChild(fileHolder);

        const view = this.editor.view;
        const schema = this.editor.schema;

        fileHolder.addEventListener("change", (e) => {
          if (
            view.state.selection.$from.parent.inlineContent &&
            e.target?.files?.length
          ) {
            startImageUpload(view, e.target.files[0], schema);
          }
          view.focus();
        });

        fileHolder.click();
        return true;
      },
    };
  },
});

const placeholderPlugin = new Plugin({
  state: {
    init() {
      return DecorationSet.empty;
    },
    apply(tr, set) {
      // Adjust decoration position to changes made by the transaction
      set = set.map(tr.mapping, tr.doc);

      // See if the transaction adds or removes any placeholders
      let action = tr.getMeta(this);

      if (action && action.add) {
        let widget = document.createElement("div");
        let img = document.createElement("img");

        widget.classList.value = "image-upload-placeholder";
        img.src = imagePrview;
        widget.appendChild(img);

        let deco = Decoration.widget(action.add.pos, widget, {
          id: action.add.id,
        });

        set = set.add(tr.doc, [deco]);
      } else if (action && action.remove) {
        set = set.remove(
          set.find(undefined, undefined, (spec) => {
            return spec.id === action.remove.id;
          })
        );
      }

      return set;
    },
    props: {
      decorations(state) {
        return this.getState(state);
      },
      handleDOMEvents: {
        drop: (view, event) => {
          const hasfiles =
            event.dataTransfer &&
            event.dataTransfer.files &&
            event.dataTransfer.files.length;

          if (!hasfiles) {
            return;
          }

          event.preventDefault();
        },
      },
    },
  },
});

function findPlaceholder(state, id) {
  let decos = placeholderPlugin.getState(state);
  let found = decos?.find(undefined, undefined, (spec) => spec.id === id);

  return found?.length ? found[0] : null;
}

function startImageUpload(view, file, schema) {
  imagePrview = URL.createObjectURL(file);

  // A fresh object to act as the ID for this upload
  let id = {};
  // Replace the selection with a placeholder
  let tr = view.state.tr;

  if (!tr.selection.empty) {
    tr.deleteSelection();
  }

  tr.setMeta(placeholderPlugin, { add: { id, pos: tr.selection.from } });
  view.dispatch(tr);

  uploadFn(file).then((url) => {
    let pos = findPlaceholder(view.state, id);
    // If the content around the placeholder has been deleted, dorp
    // the image

    if (pos == null) return;

    //Otherwise, insert it at the placeholder's position, add remove
    // the placeholder

    view.dispatch(
      view.state.tr
        .replaceWith(pos, pos, schema.nodes.uploadImage.create({ src: url }))
        .setMeta(placeholderPlugin, { remove: { id } })
    ),
      (e) => {
        console.log(e);
        view.dispatch(tr);
      };
  });
}

export default UplodImage;
