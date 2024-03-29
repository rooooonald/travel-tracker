export const DUMMY_TRIPS = [
  {
    tripId: "1",
    title: "Happy trip",
    dateFrom: new Date("2024-03-19").getTime(),
    dateTo: new Date("2024-03-21").getTime(),
    countries: ["JP", "KR"],
    cities: [
      { name: "Osaka", country: "JP" },
      { name: "Seoul", country: "KR" },
    ],
    flightsDepart: [
      {
        airline: "HK Express",
        flightNumber: "UO832",
        from: {
          airport: "HKG",
          terminal: 1,
          departureTime: "2024-03-19T12:00",
        },
        to: {
          airport: "KIX",
          terminal: 1,
          arrivalTime: "2024-03-19T15:00",
        },
      },
      {
        airline: "Peach Airline",
        flightNumber: "MM063",
        from: {
          airport: "KIX",
          terminal: 1,
          departureTime: "2024-03-19T16:00",
        },
        to: {
          airport: "ICN",
          terminal: 1,
          arrivalTime: "2024-03-19T21:00",
        },
      },
      {
        airline: "HK Express",
        flightNumber: "UO833",
        from: {
          airport: "HKG",
          terminal: 1,
          departureTime: "2024-03-19T12:00",
        },
        to: {
          airport: "KIX",
          terminal: 1,
          arrivalTime: "2024-03-19T15:00",
        },
      },
    ],
    flightsReturn: [
      {
        airline: "Peach Airline",
        flightNumber: "MM063",
        from: {
          airport: "KIX",
          terminal: 1,
          departureTime: "2024-03-21T16:00",
        },
        to: {
          airport: "HKG",
          terminal: 1,
          arrivalTime: "2024-03-21T18:00",
        },
      },
    ],
    itinerary: [
      {
        day: 1,
        date: new Date("2024-03-19").getTime(),
        accommodation: {
          hotelName: "Big Hotel",
          address: "75 Ann Street",
          pricePerNight: 300,
          bookingRef: "N63SDF2A",
          links: [{ title: "Official Page", url: "www.google.com" }],
        },
        visitPlaces: [
          {
            category: "sightseeing",
            name: "Tokyo Tower",
            address: "123 Tokyo Street",
            arrivalTime: "12:00",
            stayTime: 120,
            bookingRef: "",
            links: [
              { title: "Official", url: "www.google.com" },
              { title: "Restaurants nearby", url: "www.livescore.com" },
            ],
            transportTo: [
              {
                method: "train",
                from: "Shibuya Stn",
                to: "Namba Stn",
                departTime: "12:00",
                arrivalTime: "15:00",
                fare: 3.5,
                links: [
                  { title: "Official train", url: "www.google.com" },
                  {
                    title: "how to go to the train station",
                    url: "www.livescore.com",
                  },
                ],
              },
              {
                method: "bus",
                from: "Namba Bus Terminal",
                to: "Gojo Bus Terminal",
                departTime: "15:40",
                arrivalTime: "16:40",
                fare: 2.5,
                links: [
                  { title: "Official bus", url: "www.google.com" },
                  {
                    title: "how to go to the bus station",
                    url: "www.livescore.com",
                  },
                ],
              },
            ],
          },
          {
            category: "shopping",
            name: "Shibuya",
            address: "123 Tokyo Street",
            arrivalTime: "12:00",
            stayTime: 120,
            bookingRef: "",
            links: [
              { title: "Official", url: "www.google.com" },
              { title: "Restaurants nearby", url: "www.livescore.com" },
            ],
            transportTo: [
              {
                method: "bus",
                from: "Shibuya Stn",
                to: "Namba Stn",
                departTime: "12:00",
                arrivalTime: "15:00",
                fare: 3.5,
                links: [
                  { title: "Official train", url: "www.google.com" },
                  {
                    title: "how to go to the train station",
                    url: "www.livescore.com",
                  },
                ],
              },
              {
                method: "walk",
                from: "Namba Bus Terminal",
                to: "Gojo Bus Terminal",
                departTime: "15:40",
                arrivalTime: "16:40",
                fare: 0,
                links: [
                  { title: "Official bus", url: "www.google.com" },
                  {
                    title: "how to go to the bus station",
                    url: "www.livescore.com",
                  },
                ],
              },
            ],
          },
          {
            category: "dining",
            name: "Tonkatsu",
            address: "123 Tokyo Street",
            arrivalTime: "12:00",
            stayTime: 120,
            bookingRef: "",
            links: [
              { title: "Official", url: "www.google.com" },
              { title: "Restaurants nearby", url: "www.livescore.com" },
            ],
            transportTo: [
              {
                method: "bus",
                from: "Shibuya Stn",
                to: "Namba Stn",
                departTime: "12:00",
                arrivalTime: "15:00",
                fare: 3.5,
                links: [
                  { title: "Official train", url: "www.google.com" },
                  {
                    title: "how to go to the train station",
                    url: "www.livescore.com",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        day: 2,
        date: new Date("2024-03-20").getTime(),
        accommodation: null,
        visitPlaces: [
          {
            category: "sightseeing",
            name: "Tokyo Tower",
            address: "123 Tokyo Street",
            arrivalTime: "12:00",
            stayTime: 120,
            bookingRef: "",
            links: [
              { title: "Official", url: "www.google.com" },
              { title: "Restaurants nearby", url: "www.livescore.com" },
            ],
            transportTo: [
              {
                method: "train",
                from: "Shibuya Stn",
                to: "Namba Stn",
                departTime: "12:00",
                arrivalTime: "15:00",
                fare: 3.5,
                links: [
                  { title: "Official train", url: "www.google.com" },
                  {
                    title: "how to go to the train station",
                    url: "www.livescore.com",
                  },
                ],
              },
              {
                method: "bus",
                from: "Namba Bus Terminal",
                to: "Gojo Bus Terminal",
                departTime: "15:40",
                arrivalTime: "16:40",
                fare: 2.5,
                links: [
                  { title: "Official bus", url: "www.google.com" },
                  {
                    title: "how to go to the bus station",
                    url: "www.livescore.com",
                  },
                ],
              },
            ],
          },
          {
            category: "sightseeing",
            name: "Tokyo Tower",
            address: "123 Tokyo Street",
            arrivalTime: "12:00",
            stayTime: 120,
            bookingRef: "",
            links: [
              { title: "Official", url: "www.google.com" },
              { title: "Restaurants nearby", url: "www.livescore.com" },
            ],
            transportTo: [
              {
                method: "train",
                from: "Shibuya Stn",
                to: "Namba Stn",
                departTime: "12:00",
                arrivalTime: "15:00",
                fare: 3.5,
                links: [
                  { title: "Official train", url: "www.google.com" },
                  {
                    title: "how to go to the train station",
                    url: "www.livescore.com",
                  },
                ],
              },
              {
                method: "bus",
                from: "Namba Bus Terminal",
                to: "Gojo Bus Terminal",
                departTime: "15:40",
                arrivalTime: "16:40",
                fare: 2.5,
                links: [
                  { title: "Official bus", url: "www.google.com" },
                  {
                    title: "how to go to the bus station",
                    url: "www.livescore.com",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        day: 3,
        date: new Date("2024-03-21").getTime(),
        accommodation: null,
        visitPlaces: [
          {
            category: "sightseeing",
            name: "Tokyo Tower",
            address: "123 Tokyo Street",
            arrivalTime: "12:00",
            stayTime: 120,
            bookingRef: "",
            links: [
              { title: "Official", url: "www.google.com" },
              { title: "Restaurants nearby", url: "www.livescore.com" },
            ],
            transportTo: [
              {
                method: "train",
                from: "Shibuya Stn",
                to: "Namba Stn",
                departTime: "12:00",
                arrivalTime: "15:00",
                fare: 3.5,
                links: [
                  { title: "Official train", url: "www.google.com" },
                  {
                    title: "how to go to the train station",
                    url: "www.livescore.com",
                  },
                ],
              },
              {
                method: "bus",
                from: "Namba Bus Terminal",
                to: "Gojo Bus Terminal",
                departTime: "15:40",
                arrivalTime: "16:40",
                fare: 2.5,
                links: [
                  { title: "Official bus", url: "www.google.com" },
                  {
                    title: "how to go to the bus station",
                    url: "www.livescore.com",
                  },
                ],
              },
            ],
          },
          {
            category: "sightseeing",
            name: "Tokyo Tower",
            address: "123 Tokyo Street",
            arrivalTime: "12:00",
            stayTime: 120,
            bookingRef: "",
            links: [
              { title: "Official", url: "www.google.com" },
              { title: "Restaurants nearby", url: "www.livescore.com" },
            ],
            transportTo: [
              {
                method: "train",
                from: "Shibuya Stn",
                to: "Namba Stn",
                departTime: "12:00",
                arrivalTime: "15:00",
                fare: 3.5,
                links: [
                  { title: "Official train", url: "www.google.com" },
                  {
                    title: "how to go to the train station",
                    url: "www.livescore.com",
                  },
                ],
              },
              {
                method: "bus",
                from: "Namba Bus Terminal",
                to: "Gojo Bus Terminal",
                departTime: "15:40",
                arrivalTime: "16:40",
                fare: 2.5,
                links: [
                  { title: "Official bus", url: "www.google.com" },
                  {
                    title: "how to go to the bus station",
                    url: "www.livescore.com",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];
