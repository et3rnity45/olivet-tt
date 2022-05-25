const MEDIA_PROVIDER = import.meta.env.VITE_MEDIA_PROVIDER;
const getMediaUrl = (link: string): string => {
	return `${MEDIA_PROVIDER}/${link}`;
};

export default getMediaUrl;
