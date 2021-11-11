const MEDIA_PROVIDER = process.env.REACT_APP_MEDIA_PROVIDER;
const getMediaUrl = (link: string): string => {
  return `${MEDIA_PROVIDER}/${link}`;
};

export default getMediaUrl;
