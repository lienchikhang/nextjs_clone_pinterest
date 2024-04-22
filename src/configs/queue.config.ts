let requestQueue: any[] = [];

export function addToQueue(config: any) {
    requestQueue.push(config);
}

export function clearQueue() {
    requestQueue = [];
}

export function getQueue() {
    return requestQueue;
}