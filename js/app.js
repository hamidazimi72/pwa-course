if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("sw.js")
    .then((register) => {
      console.log("service worker registeration completed successfully!");
    })
    .catch((err) => {
      console.log(err);
    });
} else {
  console.log("مرورگر شما از service worker پشتیبانی نمیکند");
}
