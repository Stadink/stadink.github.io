import { connectToMongoDB } from './routes/mongoConfig.js';

async function addImageUrls() {
  // Array of image objects with names and URLs
  const images = [
    {
      "name": "dalle/05082024-1005.png",
      "url": "https://storage.googleapis.com/server-e4273.appspot.com/dalle/05082024-1005.png"
    },
    {
      "name": "dalle/05082024-1006.png",
      "url": "https://storage.googleapis.com/server-e4273.appspot.com/dalle/05082024-1006.png"
    },
    {
      "name": "dalle/05082024-1008.png",
      "url": "https://storage.googleapis.com/server-e4273.appspot.com/dalle/05082024-1008.png"
    },
    {
      "name": "dalle/05082024-1011.png",
      "url": "https://storage.googleapis.com/server-e4273.appspot.com/dalle/05082024-1011.png"
    },
    {
      "name": "dalle/05082024-1012.png",
      "url": "https://storage.googleapis.com/server-e4273.appspot.com/dalle/05082024-1012.png"
    },
    {
      "name": "dalle/05082024-1402.png",
      "url": "https://storage.googleapis.com/server-e4273.appspot.com/dalle/05082024-1402.png"
    },
    {
      "name": "dalle/05082024-1403.png",
      "url": "https://storage.googleapis.com/server-e4273.appspot.com/dalle/05082024-1403.png"
    },
    {
      "name": "dalle/05082024-1406.png",
      "url": "https://storage.googleapis.com/server-e4273.appspot.com/dalle/05082024-1406.png"
    },
    {
      "name": "dalle/05082024-1407.png",
      "url": "https://storage.googleapis.com/server-e4273.appspot.com/dalle/05082024-1407.png"
    },
    {
      "name": "dalle/05082024-1408.png",
      "url": "https://storage.googleapis.com/server-e4273.appspot.com/dalle/05082024-1408.png"
    },
    {
      "name": "dalle/05082024-1410.png",
      "url": "https://storage.googleapis.com/server-e4273.appspot.com/dalle/05082024-1410.png"
    },
    {
      "name": "dalle/05082024-1411.png",
      "url": "https://storage.googleapis.com/server-e4273.appspot.com/dalle/05082024-1411.png"
    },
    {
      "name": "dalle/05082024-1413.png",
      "url": "https://storage.googleapis.com/server-e4273.appspot.com/dalle/05082024-1413.png"
    },
    {
      "name": "dalle/05082024-1414.png",
      "url": "https://storage.googleapis.com/server-e4273.appspot.com/dalle/05082024-1414.png"
    },
    {
      "name": "dalle/05082024-1415.png",
      "url": "https://storage.googleapis.com/server-e4273.appspot.com/dalle/05082024-1415.png"
    },
    {
      "name": "dalle/05082024-1433-img-S9S0hQ6rxr6JHkHdDZSe4z6c.png",
      "url": "https://storage.googleapis.com/server-e4273.appspot.com/dalle/05082024-1433-img-S9S0hQ6rxr6JHkHdDZSe4z6c.png"
    },
    {
      "name": "dalle/05082024-1441-img-S9S0hQ6rxr6JHkHdDZSe4z6c.png",
      "url": "https://storage.googleapis.com/server-e4273.appspot.com/dalle/05082024-1441-img-S9S0hQ6rxr6JHkHdDZSe4z6c.png"
    },
    {
      "name": "dalle/05082024-1442-f9f9367f-6da6-441b-a722-f3411e6a1249.webp",
      "url": "https://storage.googleapis.com/server-e4273.appspot.com/dalle/05082024-1442-f9f9367f-6da6-441b-a722-f3411e6a1249.webp"
    },
    {
      "name": "dalle/05082024-2218.png",
      "url": "https://storage.googleapis.com/server-e4273.appspot.com/dalle/05082024-2218.png"
    },
    {
      "name": "dalle/05082024-2219.png",
      "url": "https://storage.googleapis.com/server-e4273.appspot.com/dalle/05082024-2219.png"
    },
    {
      "name": "dalle/05082024-2223.png",
      "url": "https://storage.googleapis.com/server-e4273.appspot.com/dalle/05082024-2223.png"
    },
    {
      "name": "dalle/05082024-2225.png",
      "url": "https://storage.googleapis.com/server-e4273.appspot.com/dalle/05082024-2225.png"
    },
    {
      "name": "dalle/05082024-2229.png",
      "url": "https://storage.googleapis.com/server-e4273.appspot.com/dalle/05082024-2229.png"
    },
    {
      "name": "dalle/05082024-2230.png",
      "url": "https://storage.googleapis.com/server-e4273.appspot.com/dalle/05082024-2230.png"
    },
    {
      "name": "dalle/05082024-2231.png",
      "url": "https://storage.googleapis.com/server-e4273.appspot.com/dalle/05082024-2231.png"
    },
    {
      "name": "dalle/06082024-0758.png",
      "url": "https://storage.googleapis.com/server-e4273.appspot.com/dalle/06082024-0758.png"
    },
    {
      "name": "dalle/07082024-0827.png",
      "url": "https://storage.googleapis.com/server-e4273.appspot.com/dalle/07082024-0827.png"
    },
    {
      "name": "dalle/07082024-0859.png",
      "url": "https://storage.googleapis.com/server-e4273.appspot.com/dalle/07082024-0859.png"
    },
    {
      "name": "dalle/07082024-1229.png",
      "url": "https://storage.googleapis.com/server-e4273.appspot.com/dalle/07082024-1229.png"
    },
    {
      "name": "dalle/07082024-1305.png",
      "url": "https://storage.googleapis.com/server-e4273.appspot.com/dalle/07082024-1305.png"
    },
    {
      "name": "dalle/07082024-1406.png",
      "url": "https://storage.googleapis.com/server-e4273.appspot.com/dalle/07082024-1406.png"
    },
    {
      "name": "dalle/07082024-2339.png",
      "url": "https://storage.googleapis.com/server-e4273.appspot.com/dalle/07082024-2339.png"
    },
    {
      "name": "dalle/07082024-2342.png",
      "url": "https://storage.googleapis.com/server-e4273.appspot.com/dalle/07082024-2342.png"
    },
    {
      "name": "dalle/07082024-2344.png",
      "url": "https://storage.googleapis.com/server-e4273.appspot.com/dalle/07082024-2344.png"
    },
    {
      "name": "dalle/07082024-2345.png",
      "url": "https://storage.googleapis.com/server-e4273.appspot.com/dalle/07082024-2345.png"
    },
    {
      "name": "dalle/07082024-2346.png",
      "url": "https://storage.googleapis.com/server-e4273.appspot.com/dalle/07082024-2346.png"
    },
    {
      "name": "dalle/07082024-2349.png",
      "url": "https://storage.googleapis.com/server-e4273.appspot.com/dalle/07082024-2349.png"
    },
    {
      "name": "dalle/07082024-2351.png",
      "url": "https://storage.googleapis.com/server-e4273.appspot.com/dalle/07082024-2351.png"
    },
    {
      "name": "dalle/07082024-2353.png",
      "url": "https://storage.googleapis.com/server-e4273.appspot.com/dalle/07082024-2353.png"
    },
    {
      "name": "dalle/07082024-2354.png",
      "url": "https://storage.googleapis.com/server-e4273.appspot.com/dalle/07082024-2354.png"
    },
    {
      "name": "dalle/07082024-2355.png",
      "url": "https://storage.googleapis.com/server-e4273.appspot.com/dalle/07082024-2355.png"
    },
    {
      "name": "dalle/07082024-2356.png",
      "url": "https://storage.googleapis.com/server-e4273.appspot.com/dalle/07082024-2356.png"
    },
    {
      "name": "dalle/07082024-2357.png",
      "url": "https://storage.googleapis.com/server-e4273.appspot.com/dalle/07082024-2357.png"
    },
    {
      "name": "dalle/07082024-2359.png",
      "url": "https://storage.googleapis.com/server-e4273.appspot.com/dalle/07082024-2359.png"
    },
    {
      "name": "dalle/08082024-0000.png",
      "url": "https://storage.googleapis.com/server-e4273.appspot.com/dalle/08082024-0000.png"
    },
    {
      "name": "dalle/08082024-0001.png",
      "url": "https://storage.googleapis.com/server-e4273.appspot.com/dalle/08082024-0001.png"
    },
    {
      "name": "dalle/08082024-0003.png",
      "url": "https://storage.googleapis.com/server-e4273.appspot.com/dalle/08082024-0003.png"
    },
    {
      "name": "dalle/09082024-0038.png",
      "url": "https://storage.googleapis.com/server-e4273.appspot.com/dalle/09082024-0038.png"
    },
    {
      "name": "dalle/09082024-0119.png",
      "url": "https://storage.googleapis.com/server-e4273.appspot.com/dalle/09082024-0119.png"
    },
    {
      "name": "dalle/09082024-0120.png",
      "url": "https://storage.googleapis.com/server-e4273.appspot.com/dalle/09082024-0120.png"
    },
    {
      "name": "dalle/10082024-0056.png",
      "url": "https://storage.googleapis.com/server-e4273.appspot.com/dalle/10082024-0056.png"
    },
    {
      "name": "dalle/10082024-1337.png",
      "url": "https://storage.googleapis.com/server-e4273.appspot.com/dalle/10082024-1337.png"
    },
    {
      "name": "dalle/10082024-1340.png",
      "url": "https://storage.googleapis.com/server-e4273.appspot.com/dalle/10082024-1340.png"
    },
    {
      "name": "dalle/10082024-2350.png",
      "url": "https://storage.googleapis.com/server-e4273.appspot.com/dalle/10082024-2350.png"
    },
    {
      "name": "dalle/10082024-2351.png",
      "url": "https://storage.googleapis.com/server-e4273.appspot.com/dalle/10082024-2351.png"
    },
    {
      "name": "dalle/10082024-2353.png",
      "url": "https://storage.googleapis.com/server-e4273.appspot.com/dalle/10082024-2353.png"
    },
    {
      "name": "dalle/11082024-0054.png",
      "url": "https://storage.googleapis.com/server-e4273.appspot.com/dalle/11082024-0054.png"
    },
    {
      "name": "dalle/12082024-1113.png",
      "url": "https://storage.googleapis.com/server-e4273.appspot.com/dalle/12082024-1113.png"
    },
    {
      "name": "dalle/13062024-0146-attractive-dust-attracting-dust.webp",
      "url": "https://storage.googleapis.com/server-e4273.appspot.com/dalle/13062024-0146-attractive-dust-attracting-dust.webp"
    },
    {
      "name": "dalle/13062024-0151-13062024-0146.png",
      "url": "https://storage.googleapis.com/server-e4273.appspot.com/dalle/13062024-0151-13062024-0146.png"
    },
    {
      "name": "dalle/13062024-0152.png",
      "url": "https://storage.googleapis.com/server-e4273.appspot.com/dalle/13062024-0152.png"
    },
    {
      "name": "dalle/13082024-0028.png",
      "url": "https://storage.googleapis.com/server-e4273.appspot.com/dalle/13082024-0028.png"
    },
    {
      "name": "dalle/13082024-0031.png",
      "url": "https://storage.googleapis.com/server-e4273.appspot.com/dalle/13082024-0031.png"
    },
    {
      "name": "dalle/13082024-1636.png",
      "url": "https://storage.googleapis.com/server-e4273.appspot.com/dalle/13082024-1636.png"
    },
    {
      "name": "dalle/13082024-2023-IMG_20240813_222258_484.jpg",
      "url": "https://storage.googleapis.com/server-e4273.appspot.com/dalle/13082024-2023-IMG_20240813_222258_484.jpg"
    },
    {
      "name": "dalle/14082024-0518.png",
      "url": "https://storage.googleapis.com/server-e4273.appspot.com/dalle/14082024-0518.png"
    },
    {
      "name": "dalle/14082024-0543.png",
      "url": "https://storage.googleapis.com/server-e4273.appspot.com/dalle/14082024-0543.png"
    },
    {
      "name": "dalle/15082024-0204.png",
      "url": "https://storage.googleapis.com/server-e4273.appspot.com/dalle/15082024-0204.png"
    },
    {
      "name": "dalle/1714339348810-a big nice cosmic scenery.png",
      "url": "https://storage.googleapis.com/server-e4273.appspot.com/dalle/1714339348810-a big nice cosmic scenery.png"
    },
    {
      "name": "dalle/26042024-1404.png",
      "url": "https://storage.googleapis.com/server-e4273.appspot.com/dalle/26042024-1404.png"
    },
    {
      "name": "dalle/26042024-1447.png",
      "url": "https://storage.googleapis.com/server-e4273.appspot.com/dalle/26042024-1447.png"
    },
    {
      "name": "dalle/26042024-1604.png",
      "url": "https://storage.googleapis.com/server-e4273.appspot.com/dalle/26042024-1604.png"
    },
    {
      "name": "dalle/26042024-1609.png",
      "url": "https://storage.googleapis.com/server-e4273.appspot.com/dalle/26042024-1609.png"
    },
    {
      "name": "dalle/26042024-1612.png",
      "url": "https://storage.googleapis.com/server-e4273.appspot.com/dalle/26042024-1612.png"
    },
    {
      "name": "dalle/26042024-1621.png",
      "url": "https://storage.googleapis.com/server-e4273.appspot.com/dalle/26042024-1621.png"
    },
    {
      "name": "dalle/26042024-1633.png",
      "url": "https://storage.googleapis.com/server-e4273.appspot.com/dalle/26042024-1633.png"
    },
    {
      "name": "dalle/26042024-1640.png",
      "url": "https://storage.googleapis.com/server-e4273.appspot.com/dalle/26042024-1640.png"
    },
    {
      "name": "dalle/26042024-1655.png",
      "url": "https://storage.googleapis.com/server-e4273.appspot.com/dalle/26042024-1655.png"
    },
    {
      "name": "dalle/26042024-1656.png",
      "url": "https://storage.googleapis.com/server-e4273.appspot.com/dalle/26042024-1656.png"
    },
    {
      "name": "dalle/26042024-1658.png",
      "url": "https://storage.googleapis.com/server-e4273.appspot.com/dalle/26042024-1658.png"
    },
    {
      "name": "dalle/26042024-1701.png",
      "url": "https://storage.googleapis.com/server-e4273.appspot.com/dalle/26042024-1701.png"
    },
    {
      "name": "dalle/26042024-1705.png",
      "url": "https://storage.googleapis.com/server-e4273.appspot.com/dalle/26042024-1705.png"
    },
    {
      "name": "dalle/26042024-1706.png",
      "url": "https://storage.googleapis.com/server-e4273.appspot.com/dalle/26042024-1706.png"
    },
    {
      "name": "dalle/26042024-1707.png",
      "url": "https://storage.googleapis.com/server-e4273.appspot.com/dalle/26042024-1707.png"
    },
    {
      "name": "dalle/26042024-1708.png",
      "url": "https://storage.googleapis.com/server-e4273.appspot.com/dalle/26042024-1708.png"
    },
    {
      "name": "dalle/26042024-1715.png",
      "url": "https://storage.googleapis.com/server-e4273.appspot.com/dalle/26042024-1715.png"
    },
    {
      "name": "dalle/26042024-1725.png",
      "url": "https://storage.googleapis.com/server-e4273.appspot.com/dalle/26042024-1725.png"
    },
    {
      "name": "dalle/26042024-1726.png",
      "url": "https://storage.googleapis.com/server-e4273.appspot.com/dalle/26042024-1726.png"
    },
    {
      "name": "dalle/26042024-1727.png",
      "url": "https://storage.googleapis.com/server-e4273.appspot.com/dalle/26042024-1727.png"
    },
    {
      "name": "dalle/26042024-1728.png",
      "url": "https://storage.googleapis.com/server-e4273.appspot.com/dalle/26042024-1728.png"
    },
    {
      "name": "dalle/26042024-1733.png",
      "url": "https://storage.googleapis.com/server-e4273.appspot.com/dalle/26042024-1733.png"
    },
    {
      "name": "dalle/26042024-1734.png",
      "url": "https://storage.googleapis.com/server-e4273.appspot.com/dalle/26042024-1734.png"
    },
    {
      "name": "dalle/26042024-1735.png",
      "url": "https://storage.googleapis.com/server-e4273.appspot.com/dalle/26042024-1735.png"
    },
    {
      "name": "dalle/26042024-1736.png",
      "url": "https://storage.googleapis.com/server-e4273.appspot.com/dalle/26042024-1736.png"
    },
    {
      "name": "dalle/26042024-1923.png",
      "url": "https://storage.googleapis.com/server-e4273.appspot.com/dalle/26042024-1923.png"
    },
    {
      "name": "dalle/26042024-1924.png",
      "url": "https://storage.googleapis.com/server-e4273.appspot.com/dalle/26042024-1924.png"
    },
    {
      "name": "dalle/27042024-1237.png",
      "url": "https://storage.googleapis.com/server-e4273.appspot.com/dalle/27042024-1237.png"
    },
    {
      "name": "dalle/28042024-0908.png",
      "url": "https://storage.googleapis.com/server-e4273.appspot.com/dalle/28042024-0908.png"
    },
    {
      "name": "dalle/28042024-0910.png",
      "url": "https://storage.googleapis.com/server-e4273.appspot.com/dalle/28042024-0910.png"
    },
    {
      "name": "dalle/28042024-0950.png",
      "url": "https://storage.googleapis.com/server-e4273.appspot.com/dalle/28042024-0950.png"
    },
    {
      "name": "dalle/28042024-0951.png",
      "url": "https://storage.googleapis.com/server-e4273.appspot.com/dalle/28042024-0951.png"
    },
    {
      "name": "dalle/28042024-1257.png",
      "url": "https://storage.googleapis.com/server-e4273.appspot.com/dalle/28042024-1257.png"
    },
    {
      "name": "dalle/28042024-2211-file-Irfyrgy4pZYibj1ktamJVqcm.webp",
      "url": "https://storage.googleapis.com/server-e4273.appspot.com/dalle/28042024-2211-file-Irfyrgy4pZYibj1ktamJVqcm.webp"
    },
    {
      "name": "dalle/28042024-2215-file-u6sbGT7VvWzY5Wq0XYqKyLAm.webp",
      "url": "https://storage.googleapis.com/server-e4273.appspot.com/dalle/28042024-2215-file-u6sbGT7VvWzY5Wq0XYqKyLAm.webp"
    },
    {
      "name": "dalle/28042024-2223-file-Huy2ozZuuoPtTP0KBdHetTuV.webp",
      "url": "https://storage.googleapis.com/server-e4273.appspot.com/dalle/28042024-2223-file-Huy2ozZuuoPtTP0KBdHetTuV.webp"
    },
    {
      "name": "dalle/28042024-2224-file-YJJExO1qXCEv4skRqGR0wlHf.webp",
      "url": "https://storage.googleapis.com/server-e4273.appspot.com/dalle/28042024-2224-file-YJJExO1qXCEv4skRqGR0wlHf.webp"
    },
    {
      "name": "dalle/28042024-2233-file-eHr72zTRe211O2kdDhCxcsPK.webp",
      "url": "https://storage.googleapis.com/server-e4273.appspot.com/dalle/28042024-2233-file-eHr72zTRe211O2kdDhCxcsPK.webp"
    },
    {
      "name": "dalle/28042024-2234-file-awJ75CJ1ltuAMCReQ8rDqZe1.webp",
      "url": "https://storage.googleapis.com/server-e4273.appspot.com/dalle/28042024-2234-file-awJ75CJ1ltuAMCReQ8rDqZe1.webp"
    }
  ]

  try {
    const db = await connectToMongoDB();
    const collection = db.collection('visionBoard');

    for (const image of images) {
      // Extract the date and time from the filename
      const dateString = image.name.match(/(\d{8})-(\d{4})/);
      if (dateString) {
        const [fullMatch, datePart, timePart] = dateString;
        const year = datePart.slice(4, 8);
        const month = datePart.slice(2, 4);
        const day = datePart.slice(0, 2);
        const hour = timePart.slice(0, 2);
        const minute = timePart.slice(2, 4);

        // Build the base timestamp without seconds/milliseconds
        const baseTimestamp = new Date(`${year}-${month}-${day}T${hour}:${minute}:00Z`);

        // Define a time range (1 minute before and after the base timestamp)
        const lowerBound = new Date(baseTimestamp);
        lowerBound.setSeconds(-59);

        const upperBound = new Date(baseTimestamp);
        upperBound.setSeconds(59);

        // Find and update the document with a matching timestamp within the range
        const result = await collection.updateOne(
          {
            timestamp: { $gte: lowerBound, $lte: upperBound }
          },
          { $set: { url: image.url } }
        );

        if (result.matchedCount > 0) {
          console.log(`Updated document with timestamp near ${baseTimestamp.toISOString()}`);
        } else {
          console.log(`No document found with timestamp near ${baseTimestamp.toISOString()}`);
        }
      }
    }
  } catch (error) {
    console.error("Error updating documents: ", error);
  }
}

addImageUrls().catch(console.error);
