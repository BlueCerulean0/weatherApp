export default function getAutoLocation() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      async (success) => {
        const { latitude, longitude } = success.coords;
        console.log(latitude, longitude);
        try {
          const autoCityname = await getAutoCityName(latitude, longitude);
          resolve(autoCityname);
        } catch (err) {
          reject(err);
        }
      },
      (error) => {
        console.error(error);
        reject(error);
      }
    );
  });
}

async function getAutoCityName(latitude, longitude) {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
  );
  const data = await response.json();
  const address = data.display_name;
  return address;
}

