export class drawioUtils {
  iframe = null;
  iframeUrl = "https://www.draw.io/?embed=1&ui=atlas&spin=1&proto=json";
  iframeStyle = {
    width: "100%",
    height: "100%",
    border: "none",
    overflow: "hidden",
  };
  drawioData = null;

  constructor(urlData) {
    this.drawioData = this.getElementData(urlData);
  }

  createFrame(url, style) {
    let frame = document.createElement("iframe");
    frame.setAttribute("src", url);
    frame.setAttribute("style", style);
    frame.setAttribute("frameborder", "0");

    return frame;
  }

  getElementData(elem) {
    let name = elem.nodeName.toLowerCase();

    if (name === "svg") {
      return elem.getAttribute("content");
    } else if (name === "img") {
      return elem.getAttribute("src");
    } else {
      return elem.getAttribute("data");
    }
  }

  editElement() {
    let iframeLoded = new Promise((res) => {
      this.iframe = this.createFrame(this.iframeUrl, this.iframeStyle);
      let parentElement = document.querySelector("#DrawIoParent");
      parentElement.appendChild(this.iframe);

      res();
    });

    iframeLoded.then(() => {
      window.addEventListener("message", this.messageListener);
    });
  }

  handleMessage(msg) {
    if (msg.event == "init") {
      this.iframe.contentWindow.postMessage(
        JSON.stringify({
          action: "load",
          autosave: 1,
          saveAndExit: 1,
          xml: this.drawioData,
        }),
        "*"
      );
    } else if (msg.event == "autosave") {
      this.save(msg.xml, true, this.startElement);
    } else if (msg.event == "export") {
      this.setElementData(this.startElement, msg.data);
      this.stopEditing(msg);
      this.xml = null;
    } else if (msg.event == "save") {
      this.save(msg.xml, false, this.startElement);
      this.xml = msg.xml;

      if (msg.exit) {
        msg.event = "exit";
      } else {
        this.setStatus("allChangesSaved", false);
      }
    } else if (msg.event == "quite") {
      this.stopEditing(msg);
      this.setStatus("allChangesSaved", false);
    }

    if (msg.event == "exit") {
      if (this.xml != null) {
        this.postMessage({
          action: "export",
          format: this.format,
          xml: this.xml,
          spinKey: "export",
        });
      } else {
        if (msg.modified == null || msg.modified) {
          this.save(msg.xml, false, this.startElement);
        }

        this.stopEditing(msg);
      }
    }
  }

  // using inline function due to context passing
  messaesListener = (event) => {
    let iframe = document.getElementById("DrawIoParent").firstChild;

    if (
      iframe != null &&
      event.source == iframe.contentWindow &&
      event.data.length > 0
    ) {
      let msg = JSON.parse(event.data);

      if (msg.event == "init") {
        iframe.contentWindow.postMessage(
          JSON.stringify({
            action: "load",
            autosave: 1,
            saveAndExit: 1,
            xml: this.drawioData,
          }),
          "*"
        );
      } else if (msg.event == "autosave") {
        const svg = msg.data;

        let payload = {
          dataUrl: svg,
        };

        this.$store.commit("setDrawIoImageChange", payload);

        window.removeEventListener("message", this.messaesListener);
        let parentElement = document.querySelector("#DrawIoParent");
        document.body.removeChild(parentElement);
      } else if (msg.event == "save") {
        this.xml = msg.xml;

        if (msg.exit) {
          iframe.contentWindow.postMessage(
            JSON.stringify({
              action: "export",
              xml: this.xml,
              spinKey: "xmlsvg",
            }),
            "*"
          );
        }
      } else if (msg.event == "exit") {
        window.removeEventListener("message", this.messaesListener);
        let parentElement = document.querySelector("#DrawIoParent");
        document.body.removeChild(parentElement);
      }
    }
  };
}
