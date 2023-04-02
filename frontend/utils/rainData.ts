type RainData = {
    [key: string]: {
      prob: number;
      volume: number;
    }[];
};
  
export const RAIN_DATA: RainData = {
    "paris": [
        {
            "prob" : 0.6,
            "volume": 56.7
        },
        {
            "prob" : 0.5,
            "volume": 46.6
        },
        {
            "prob" : 0.5,
            "volume": 50.5
        },
        {
            "prob" : 0.5,
            "volume": 54.6
        },
        {
            "prob" : 0.6,
            "volume": 65.5
        },
        {
            "prob" : 0.5,
            "volume": 58.5
        },
        {
            "prob" : 0.5,
            "volume": 62.3
        },
        {
            "prob" : 0.5,
            "volume": 60.3
        },
        {
            "prob" : 0.5,
            "volume": 52.9
        },
        {
            "prob" : 0.5,
            "volume": 54.7
        },
        {
            "prob" : 0.6,
            "volume": 60.4
        },
        {
            "prob" : 0.6,
            "volume": 60.7
        }

    ],
    "miami": [
        {
            "prob" : 0.5,
            "volume": 52.6
        },
        {
            "prob" : 0.6,
            "volume": 61.0
        },
        {
            "prob" : 0.6,
            "volume": 75.7
        },
        {
            "prob" : 0.6,
            "volume": 91.9
        },
        {
            "prob" : 0.6,
            "volume": 129.8
        },
        {
            "prob" : 0.7,
            "volume": 234.0
        },
        {
            "prob" : 0.8,
            "volume": 144.4
        },
        {
            "prob" : 0.8,
            "volume": 166.6
        },
        {
            "prob" : 0.7,
            "volume": 183.4
        },
        {
            "prob" : 0.6,
            "volume": 113.3
        },
        {
            "prob" : 0.5,
            "volume": 68.1
        },
        {
            "prob" : 0.5,
            "volume": 56.2
        }

    ],
    "rio_de_janeiro": [
        {
            "prob" : 0.5,
            "volume": 141.1
        },
        {
            "prob" : 0.5,
            "volume": 119.5
        },
        {
            "prob" : 0.5,
            "volume": 117.5
        },
        {
            "prob" : 0.5,
            "volume": 96.3
        },
        {
            "prob" : 0.5,
            "volume": 69.5
        },
        {
            "prob" : 0.4,
            "volume": 50.4
        },
        {
            "prob" : 0.4,
            "volume": 49.5
        },
        {
            "prob" : 0.4,
            "volume": 52.1
        },
        {
            "prob" : 0.4,
            "volume": 76.5
        },
        {
            "prob" : 0.5,
            "volume": 105.9
        },
        {
            "prob" : 0.5,
            "volume": 112.3
        },
        {
            "prob" : 0.5,
            "volume": 128.5
        }
    ]
}