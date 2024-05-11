import React from 'react';
import { Progress } from 'antd';
import { Typography } from 'antd';

const { Text } = Typography;

interface Props {
  maxSupply: number;
  totalMinted: number;
}

const MintedProgressAntD: React.FC<Props> = ({ maxSupply, totalMinted }) => {
  const percentage = Math.floor((totalMinted * 100) / maxSupply);

  return (
    <div>
      <Text className='text-white' strong>Total Minted</Text>
      <Text className="text-opacity-75 block mt-1 mb-2 text-white">
        {`${percentage}% (${totalMinted}/${maxSupply})`}
      </Text>
      <Progress
        percent={percentage}
        strokeColor={percentage > 50 ? '#4CAF50' : '#FF5722'}
        showInfo={false}
        trailColor="#D9D9D9"
      />
    </div>
  );
};

export default MintedProgressAntD;
