let requestCount = 0;
let lastResetTime = Date.now();

export async function POST(req, res) {
  try {
    const currentTime = Date.now();
    console.log(lastResetTime, requestCount)


    if (currentTime - lastResetTime > 1000) {
      requestCount = 0;
      lastResetTime = currentTime;
    }
  
    if (requestCount >= 50) {
      return new Response(JSON.stringify({ message: 'Too many requests' }), { status: 429 });
    }
  
    requestCount++;
  
    const { index } = await req.json();
  
    const delay = Math.floor(Math.random() * 1000) + 1;
  
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(new Response(JSON.stringify({ index }), { status: 200 }));
      }, delay);
    });
  } catch {
    return new Response(JSON.stringify({ message: 'something went wrong' }), { status: 404 });
  }
}
