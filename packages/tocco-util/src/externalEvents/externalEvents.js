let events = {}

export const registerEvents = externalEvents => {
  events = {...events, ...externalEvents}
}

export const invokeExternalEvent = (eventName, ...args) => {
  if (events[eventName]) {
    events[eventName](...args)
  }
}

export const getEvents = () => {
  return Object.keys(events)
}
