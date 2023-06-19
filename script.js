tinymce.init({
  selector: '#editor',
  plugins: "code preview powerpaste link styles image save template pageembed textcolor",
  toolbar: "undo redo | styles | formats | tinydrive | save | imagetools | textcolor | code | bold italic | image | AskChatGPT",
  content_style:
    "div.answer { font-family: Consolas,monaco,monospace;  background-color: #012300; color: white; padding: 10px; overflow: auto; }",

  setup: (editor) => {
    editor.ui.registry.addButton("AskChatGPT", {
      text: "TextAI",
      icon: "highlight-bg-color",
      tooltip: "Highlight a prompt and click this button to query ChatGPT",
      enabled: true,
      onAction: (_) => {
      fetch('config.json')      
        const selection = tinymce.activeEditor.selection.getContent();
        console.log(selection);
        const ChatGPT = {
          model: "text-davinci-003",
          prompt: selection,
          temperature: 0,
          max_tokens: 1000
        };
        fetch("https://api.openai.com/v1/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer YOUR-API-KEY`
          },
          body: JSON.stringify(ChatGPT)
        })
          .then((res) => res.json())
          .then((data) => {
            var reply = data.choices[0].text;
            console.log(reply);
            editor.dom.add(tinymce.activeEditor.getBody(), "div", { class: "answer" }, reply );
            editor.selection.select(tinyMCE.activeEditor.getBody(), true);
            editor.selection.collapse();
            editor.focus();
          })
          .catch((error) => {
            console.log("something went wrong");
          });
      }
    });
  }
});
