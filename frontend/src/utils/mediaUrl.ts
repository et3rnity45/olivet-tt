const MEDIA_PROVIDER = "https://s3.eu-west-3.amazonaws.com/images.olivet-tt.fr";
const getMediaUrl = (link: string): string => {
  return `${MEDIA_PROVIDER}/${link}`;
};

export default getMediaUrl;
