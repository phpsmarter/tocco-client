var events = {}

function registerEvents(externalEvents) {
  events = {...events, ...externalEvents}
}

function invokeExternalEvent(eventName, ...args) {
  if (events[eventName]) {
    events[eventName](...args)
  } else {
    console.log(`external event '${eventName}' not found. Provided arguments:`, ...args)
  }
}

function getEvents() {
  return Object.keys(events)
}

const obj = {
  invokeExternalEvent,
  registerEvents,
  getEvents
}

export default obj
