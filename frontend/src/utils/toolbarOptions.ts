// eslint-disable-next-line @typescript-eslint/no-unused-vars
const uploadCallback = (): Promise<unknown> => {
  return new Promise((resolve) => {
    resolve({
      data: {
        link: "https://s3.eu-west-3.amazonaws.com/images.olivet-tt.fr/7cbb3cd2-bbb9-4367-8728-9f6bdfba7a33-1280x720.png",
      },
    });
  });
};

const toolbarOptions = {
  options: [
    "inline",
    "blockType",
    "fontSize",
    "list",
    "textAlign",
    "link",
    "embedded",
    "emoji",
    "image",
    "remove",
    "history",
  ],
  inline: {
    inDropdown: false,
    options: ["bold", "italic", "underline", "strikethrough"],
  },
  blockType: {
    inDropdown: true,
    options: ["Normal", "H2", "H3", "H4", "H5", "H6", "Blockquote", "Code"],
  },
  image: {
    urlEnabled: true,
    uploadEnabled: true,
    alignmentEnabled: true,
    uploadCallback: undefined,
    previewImage: true,
    inputAccept: "image/jpeg,image/jpg,image/png",
    alt: { present: false, mandatory: false },
    defaultSize: {
      height: "auto",
      width: "auto",
    },
  },
};

export default toolbarOptions;
