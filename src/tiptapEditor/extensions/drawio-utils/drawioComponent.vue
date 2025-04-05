<template>
    <NodeViewWrapper>
      <div class="drawio-container">
        <!-- Show 'Create Diagram' button initially -->
        <button v-if="!node.attrs.isCreated & !isEditing" class="drawio-btn" @click="openDrawioIframe">
          Create Diagram
        </button>
  
        <!-- Show 'Edit Diagram' button and Image when created -->
        <div v-if="node.attrs.isCreated & !isEditing">
          <button class="drawio-btn edit-btn" @click="openDrawioIframe">
            Edit Diagram
          </button>
          <img :src="node.attrs.url" v-if="node.attrs.url" class="drawio-img" />
        </div>
  
        <!-- Embedded Draw.io Iframe (only shown when editing) -->
        <div v-if="isEditing" class="iframe-wrapper">
          <iframe
            ref="drawioIframe"
            class="drawio-iframe"
            src="https://embed.diagrams.net/?embed=1&libraries=1&ui=sketch&spin=1&modified=unsavedChanges&proto=json"
          ></iframe>
        </div>
      </div>
    </NodeViewWrapper>
  </template>
  
  <script>
  import { nodeViewProps, NodeViewWrapper } from "@tiptap/vue-3";
  
  export default {
    components: {
      NodeViewWrapper,
    },
    props: nodeViewProps,
    data() {
      return {
        isEditing: false, // Controls whether the iframe is visible,
        xml: null,
        url: null,
      };
    },
    methods: {
      openDrawioIframe() {
        this.isEditing = true; // Show the iframe
        
  
        // this.$nextTick(() => {

            let dataDon = new Promise((resolve) => {
                let dummySVG  = `
                <svg 
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  version="1.1"
                  width="121px" 
                  height="61px"    
              ></svg>`;
  
              if(this.url){
                  dummySVG = atob(this.url.substring(this.url.indexOf(",") + 1));
              }
              
              
              let drawioData = new DOMParser().parseFromString(dummySVG, "text/html").body.firstChild;
              console.log("🚀 ~ this.$nextTick ~ this.node.attrs.url:", dummySVG)
              console.log("🚀 ~ this.$nextTick ~ this.node.attrs.url:", drawioData)
              resolve(drawioData);
            });
        //     let dummySVG  = `
        //   <svg 
        //     xmlns="http://www.w3.org/2000/svg"
        //     xmlns:xlink="http://www.w3.org/1999/xlink"
        //     version="1.1"
        //     width="121px" 
        //     height="61px"    
        // ></svg>`;

        // if(this.url){
        //     dummySVG = atob(this.url.substring(this.url.indexOf(",") + 1));
        // }
        
        
        // let drawioData = new DOMParser().parseFromString(dummySVG, "text/html").body.firstChild;
        // console.log("🚀 ~ this.$nextTick ~ this.node.attrs.url:", dummySVG)
        // console.log("🚀 ~ this.$nextTick ~ this.node.attrs.url:", drawioData)


            dataDon.then((drawioData) => {
            
            const iframe = this.$refs.drawioIframe;
    
            // Handle messages from Draw.io
            const messageListener = (event) => {
                if (event.source === iframe.contentWindow) {
                const message = JSON.parse(event.data);

                if(message.event === "init") {
                    iframe.contentWindow.postMessage(JSON.stringify(
                        { 
                            action: "load",
                            autosave: 1,
                            saveAndExit: 1,
                            xml: drawioData
                        }),
                        '*'
                    );
                }
                else if(message.event === "export") {
                    // console.log("🚀 ~ messageListener ~ message:", message, message.data)
                    const svg = message.data;
                    this.url = svg;
    
                    // Update node attributes with the saved diagram
                    this.updateAttributes({
                    url: svg,
                    isCreated: true,
                    });
    
                    this.isEditing = false; // Hide the iframe
                    window.removeEventListener("message", messageListener);
                }
                else if(message.event === "save"){
                    this.xml = message.xml;
                    // console.log("🚀 ~ messageListener ~ message:", message, message.data)

                    if(message.exit){
                        iframe.contentWindow.postMessage(JSON.stringify(
                            { 
                                action: "export",
                                xml: this.xml,
                                format: "xmlsvg",
                            }),
                            '*'
                        );
                    }

                }
                else if (message.event === "exit") {
                    // console.log("🚀 ~ messageListener ~ message:", message)
                    const xml = message.xml;
                    const svg = message.svg;
                    const base64 = `data:image/svg+xml;base64,${btoa(svg)}`;
    
                    // Update node attributes with the saved diagram
                    this.updateAttributes({
                    url: base64,
                    drawioData: xml,
                    isCreated: true,
                    });
    
                    this.isEditing = false; // Hide the iframe
                    window.removeEventListener("message", messageListener);
                }
                }
            };

            window.addEventListener("message", messageListener);

        });
        // });
      },
    },
  };
  </script>
  
  <style scoped>
  .drawio-container {
    text-align: center;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .drawio-btn {
    background: #007bff;
    color: white;
    border: none;
    padding: 8px 12px;
    font-size: 14px;
    cursor: pointer;
    border-radius: 4px;
    margin-bottom: 10px;
  }
  
  .edit-btn {
    background: #28a745;
  }
  
  .drawio-img {
    width: 100%;
    max-width: 500px;
    height: auto;
    border: 1px solid #ccc;
    margin-top: 5px;
  }
  
  .iframe-wrapper {
    margin-top: 10px;
    position: relative;
  }
  
  .drawio-iframe {
    width: 100%;
    height: 400px;
    border: 1px solid #ccc;
  }
  </style>
  