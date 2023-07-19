const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const timeoutResolve = function (s) {
  return new Promise(function (resolve, _) {
    setTimeout(function () {
      resolve("Waiting API");
    }, s * 1000);
  });
};

export const AJAX = async function (url, postData = undefined) {
  try {
    const fetchAPI = postData
      ? fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        })
      : fetch(url);

    const res = await Promise.race([fetchAPI, timeout(10)]);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};
