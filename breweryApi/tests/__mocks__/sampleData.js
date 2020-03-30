const mockResponse = () => {
  const res = {};
  res.write = jest.fn().mockReturnValue(res);
  res.flushHeaders = jest.fn().mockReturnValue(res);
  return res;
};

const sampleData = {
  users: [
    {
      id: '123',
      res: mockResponse(),
    },
  ],
  beers: {
    '1': {
      id: '1',
      name: 'Pilsner',
      minTemp: 4,
      maxTemp: 6,
    },
  },
  containers: {
    '1': {
      id: 1,
      name: 'Pilsner',
      beerId: '1',
      temperature: 5,
      tempInRange: true,
    },
  },
};

module.exports = sampleData;
