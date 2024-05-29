import React from 'react';
import { useRouter } from 'next/router';
import "../../src/Banner.css";
import InfoIcon from "@mui/icons-material/Info";
import Game from '../../src/components/Game';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const GamePage: React.FC = () => {
  const router = useRouter();
  const { level } = router.query;

  if (!level || Array.isArray(level)) {
    return <p>Invalid level</p>;
  }

  return (
    <div>
      <div className="banner">
        <div className="back-icon">
          <ArrowBackIcon />
        </div>
        <div className="banner-content">Doublet</div>
        <div className="info-icon">
          <InfoIcon />
        </div>
      </div>
      <Game level={parseInt(level as string, 10)} />
    </div>
  );
}

export default GamePage;
