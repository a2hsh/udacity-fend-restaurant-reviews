//This file is responsible for controlling our service worker
//first, if browser doesn't support service workers, it shouldn't be registered
//otherwise, create an object that controls the service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => new ServiceWorkerController());
}

//Creating our service worker controller object
let ServiceWorkerController = function() {
  this._register();
};

ServiceWorkerController.prototype._register = function() {
  //Check if the browser supports service workers
  if (!navigator.serviceWorker) return;
  //register our new service worker if not registered already
  navigator.serviceWorker.register('./sw.js').then(reg => {
    console.log(`Service Worker ${reg.scope} has been registered successfully.`);
    //listen to the service worker's updatefound event, and queue the new service worker for update
    reg.addEventListener('updatefound', () => {
      const newWorker = reg.installing;
      this._track(newWorker);
    });

    //if our service worker is installing, track its status.
    //if it's waiting, inform the user to update.
    if (reg.installing) this._track(reg.installing);
    if (reg.waiting) this._update(reg.waiting);
  }).catch(error => console.log('Service Worker registration failed: ', error));

  //In a service worker took over a page, perform a page reload
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    window.location.reload();
  });
};

//this function tracks our service worker which is beeing installed
ServiceWorkerController.prototype._track = function(worker) {
  //we will add an event to listen to any state changes in the service worker
  worker.addEventListener('statechange', () => {
    //if the service worker is waiting, ask the user to update
    if (worker.state == 'waiting') this._update(worker);
  });
};

//finally, everything lead to this moment, or not!
//ask the user to update the page for the new service worker to take over
ServiceWorkerController.prototype._update = function(worker) {
  if (!confirm('New update is available! Reload the page?')) return;
  //tell the new service worker to skip waiting and take over the page
  worker.postMessage('skipWaiting');
};