import { AddMedia } from "@Mutations/media";
import getMediaUrl from "@Utils/mediaUrl";
import { client } from "../index";

const uploadCallback = async (file: File): Promise<unknown> => {
  const response = await client.mutate({
    mutation: AddMedia,
    variables: { file },
  });
  console.log(response);
  return new Promise((resolve) => {
    resolve({
      data: {
        link: getMediaUrl(response.data.addMedia),
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
    uploadCallback,
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
