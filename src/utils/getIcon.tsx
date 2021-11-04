import {
  Instagram, Facebook, Telegram, Twitter, LinkedIn, Web,
} from '@mui/icons-material';

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'instagram':
      return <Instagram />;
    case 'facebook':
      return <Facebook />;
    case 'telegram':
      return <Telegram />;
    case 'twitter':
      return <Twitter />;
    case 'linkedin':
      return <LinkedIn />;
    case 'website':
      return <Web />;
    default:
      return null;
  }
};

export default getIcon;
