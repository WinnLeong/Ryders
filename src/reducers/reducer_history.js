import React from 'react';
import { Rating } from 'react-native-elements';

export default () => {
  return [
    {
      status: 'Complete',
      date: '08 Nov 2018 5:40PM',
      location: 'Bayan Lepas',
      destination: 'Suntech Penang',
      ratings: (
        <Rating
          imageSize={25}
          readonly
          startingValue={4}
          style={{ marginTop: 10, alignItems: 'flex-start' }}
        />
      )
    },
    {
      status: 'Cancelled',
      date: '15 Sep 2018 4:31PM',
      location: 'Bayan Lepas',
      destination: 'Queensbay Mall'
      //ratings: ''
    },
    {
      status: 'Complete',
      date: '21 Aug 2018 5:52PM',
      location: 'Bayan Lepas',
      destination: 'Suntech Penang',
      ratings: (
        <Rating
          imageSize={25}
          readonly
          startingValue={3}
          style={{ marginTop: 10, alignItems: 'flex-start' }}
        />
      )
    }
  ];
};
